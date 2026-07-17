import { intToHexColor } from "../utils";

export function Legend() {
  const minTemp = 0;
  const maxTemp = 3304;

  return (
    <div className="legend">
      <h3 className="legend-title">Temperature (°C)</h3>
      <div className="legend-gradient">
        {Array.from({ length: 100 }, (_, i) => {
          const value = minTemp + (i / 99) * (maxTemp - minTemp);
          const color = intToHexColor(value, minTemp, maxTemp);
          return (
            <div
              key={i}
              className="legend-gradient-bar"
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
      <div className="legend-labels">
        <div
          key={0}
          className="legend-label"
          style={{
            //   left: `${(index / 8) * 100}%`,
            left: 0,
          }}
        >
          <span className="legend-label-text">{minTemp}</span>
        </div>
        <div
          key={1}
          className="legend-label"
          style={{
            //   left: `${(index / 8) * 100}%`,
            right: 0,
          }}
        >
          <span className="legend-label-text">{maxTemp * 0.01}</span>
        </div>
      </div>
    </div>
  );
}
