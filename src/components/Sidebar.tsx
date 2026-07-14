import type { AddLayerObject } from "maplibre-gl";
import type { ChangeEventHandler } from "react";

export type OptionProp = { label: string; value: string };
export function Sidebar({
  options,
  onOptionsChange,
  value,
  layers,
  layerVisibility,
  onLayerToggle,
}: {
  options: OptionProp[];
  onOptionsChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>;
  value: string;
  layers: (AddLayerObject & { beforeId?: string })[];
  layerVisibility: Record<string, boolean>;
  onLayerToggle: (layerId: string) => void
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <select value={value} onChange={onOptionsChange} name="city" id="city">
          {options.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="layer-list">
          {layers.map((layer) => (
            <label className="layer-option" htmlFor={layer.id} key={layer.id}>
              <input
                checked={layerVisibility[layer.id]}
                id={layer.id}
                name={layer.id}
                onChange={() => onLayerToggle(layer.id)}
                type="checkbox"
              />
              <span>{layer.id}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
