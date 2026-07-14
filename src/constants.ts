import type { AddLayerObject } from "maplibre-gl";
import { intToHexColor } from "./utils";
import type { OptionProp } from "./components/Sidebar";

export const mapLayers: (AddLayerObject & { beforeId?: string })[] = [
  {
    id: "sst-raster-layer",
    type: "raster",
    source: "sst-raster",
    minzoom: 2,
    maxzoom: 4,
  },
    {
      id: "sst-contours-layer",
      type: "line",
      source: "sst-contours",
      "source-layer": "sst",
      minzoom: 2,
      maxzoom: 4,
      paint: {
        "line-color": [
          "step",
          ["get", "temperature"],
          "#313695",
          ...Array.from({ length: 3304 }, (_, index) => [
            index,
            intToHexColor(index, 0, 3304),
          ]).flat(),
        ],
      },
    },
];

export const dateOptions: OptionProp[] = [
  { label: "June 1, 2026", value: "20260601" },
  { label: "June 2, 2026", value: "20260602" },
  { label: "June 3, 2026", value: "20260603" },
  { label: "June 4, 2026", value: "20260604" },
  { label: "June 5, 2026", value: "20260605" },
  { label: "June 6, 2026", value: "20260606" },
  { label: "June 7, 2026", value: "20260607" },
  { label: "June 8, 2026", value: "20260608" },
  { label: "June 9, 2026", value: "20260609" },
  { label: "June 10, 2026", value: "20260610" },
  { label: "June 11, 2026", value: "20260611" },
  { label: "June 12, 2026", value: "20260612" },
  { label: "June 13, 2026", value: "20260613" },
  { label: "June 14, 2026", value: "20260614" },
  { label: "June 15, 2026", value: "20260615" },
  { label: "June 16, 2026", value: "20260616" },
  { label: "June 17, 2026", value: "20260617" },
  { label: "June 18, 2026", value: "20260618" },
  { label: "June 19, 2026", value: "20260619" },
  { label: "June 20, 2026", value: "20260620" },
  { label: "June 21, 2026", value: "20260621" },
  { label: "June 22, 2026", value: "20260622" },
  { label: "June 23, 2026", value: "20260623" },
  { label: "June 24, 2026", value: "20260624" },
  { label: "June 25, 2026", value: "20260625" },
  { label: "June 26, 2026", value: "20260626" },
  { label: "June 27, 2026", value: "20260627" },
  { label: "June 28, 2026", value: "20260628" },
  { label: "June 29, 2026", value: "20260629" },
  { label: "June 30, 2026", value: "20260630" },
];
