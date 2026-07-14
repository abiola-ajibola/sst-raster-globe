import { useCallback, useEffect, useRef, useState } from "react";
import { Map, type AddLayerObject } from "maplibre-gl";

import { Sidebar } from "./components/Sidebar";
import { dateOptions, mapLayers } from "./constants";

import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import { parseWindowLocationHash } from "./utils";

function App() {
  const mapRef = useRef<Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState("20260601");
  const [layerVisibility, setLayerVisibility] = useState<
    Record<string, boolean>
  >(Object.fromEntries(mapLayers.map((layer) => [layer.id, true])));

  const layerVisibilityRef = useRef<Record<string, boolean>>(
    Object.fromEntries(mapLayers.map((layer) => [layer.id, true])),
  );
  const firstLoadRef = useRef<boolean>(true);

  const applyLayerVisibility = useCallback(
    (map: Map | null, visibility: Record<string, boolean>) => {
      mapLayers.forEach((layer) => {
        if (!map?.getLayer(layer.id)) return;
        map.setLayoutProperty(
          layer.id,
          "visibility",
          visibility[layer.id] ? "visible" : "none",
        );
      });
    },
    [],
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapRef.current = new Map({
      container: mapContainerRef.current,
      style: import.meta.env.VITE_STYLE_URL || "/style.json",
      zoom: 2,
      maxZoom: 22,
      minZoom: 2,
    });
    const map = mapRef.current;
    if (!map) return;
    map.on("load", async function () {
      if (!firstLoadRef.current) {
        const { lat, lng, zoom } = parseWindowLocationHash();
        console.log({ lat, lng, zoom });
        if (lat && lng && zoom) {
          map.setCenter({ lat, lng });
          map.setZoom(zoom);
        }
      } else {
        window.location.hash = "";
      }
      map.on("zoomend", (e) => {
        const { lat, lng } = e.target.getCenter();
        window.location.hash = `#${e.target.getZoom()}/${lng}/${lat}`;
      });

      map.on("moveend", (e) => {
        const { lat, lng } = e.target.getCenter();
        window.location.hash = `#${e.target.getZoom()}/${lng}/${lat}`;
      });

      map.addSource("sst-raster", {
        type: "raster",
        tiles: [`${window.location.origin}/raster/${date}/{z}/{x}/{y}.png`],
        maxzoom: 4,
        minzoom: 2,
      });

      map.addSource("sst-contours", {
        type: "vector",
        tiles: [`${window.location.origin}/contours/${date}/{z}/{x}/{y}.pbf`],
        maxzoom: 5,
        minzoom: 2,
      });

      mapLayers.forEach((layer) =>
        map.addLayer(
          {
            ...layer,
            layout: {
              visibility: layerVisibilityRef.current[layer.id]
                ? "visible"
                : "none",
            },
          } as AddLayerObject,
          layer.beforeId,
        ),
      );
      firstLoadRef.current = false;
    });
    return () => {
      map.remove();
    };
  }, [date]);

  useEffect(() => {
    if (!mapRef.current) return;
    applyLayerVisibility(mapRef.current, layerVisibility);
  }, [applyLayerVisibility, layerVisibility]);

  const handleLayerToggle = (layerId: string) => {
    layerVisibilityRef.current = {
      ...layerVisibility,
      [layerId]: !layerVisibility[layerId],
    };
    setLayerVisibility((current) => ({
      ...current,
      [layerId]: !current[layerId],
    }));
  };

  return (
    <div className="wrapper">
      <Sidebar
        layers={mapLayers}
        layerVisibility={layerVisibility}
        options={dateOptions}
        value={date}
        onOptionsChange={(ev) => setDate(ev.target.value)}
        onLayerToggle={handleLayerToggle}
      />
      <div className="map_wrapper">
        <div id="map" ref={mapContainerRef}></div>
      </div>
    </div>
  );
}

export default App;
