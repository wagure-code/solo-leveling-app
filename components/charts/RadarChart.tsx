import { StatKey } from "@/types/quest";

interface RadarChartProps {
  data: Record<StatKey, number>; // tiap nilai 0-100
}

const AXES: { key: StatKey; label: string; angle: number }[] = [
  { key: "STR", label: "STR", angle: -90 },
  { key: "AGI", label: "AGI", angle: -18 },
  { key: "INT", label: "INT", angle: 54 },
  { key: "VIT", label: "VIT", angle: 126 },
  { key: "PER", label: "PER", angle: 198 },
];

const CENTER = 150;
const MAX_RADIUS = 95;

function pointOnAxis(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export default function RadarChart({ data }: RadarChartProps) {
  const ringLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = AXES.map((axis) => {
    const value = Math.max(0, Math.min(100, data[axis.key]));
    return pointOnAxis(axis.angle, (value / 100) * MAX_RADIUS);
  });

  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 300 300" className="w-full">
      {ringLevels.map((level) => {
        const ringPoints = AXES.map((axis) => pointOnAxis(axis.angle, level * MAX_RADIUS))
          .map((p) => `${p.x},${p.y}`)
          .join(" ");
        return (
          <polygon
            key={level}
            points={ringPoints}
            className="fill-none stroke-border/60"
            strokeWidth={1}
          />
        );
      })}

      {AXES.map((axis) => {
        const edge = pointOnAxis(axis.angle, MAX_RADIUS);
        return (
          <line
            key={axis.key}
            x1={CENTER}
            y1={CENTER}
            x2={edge.x}
            y2={edge.y}
            className="stroke-border/60"
            strokeWidth={1}
          />
        );
      })}

      <polygon points={dataPath} className="fill-cyan-glow/15 stroke-cyan-glow" strokeWidth={2} />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} className="fill-cyan-glow" />
      ))}

      {AXES.map((axis) => {
        const labelPoint = pointOnAxis(axis.angle, MAX_RADIUS + 22);
        return (
          <text
            key={axis.key}
            x={labelPoint.x}
            y={labelPoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-text-mid text-[11px] font-mono uppercase tracking-wide"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}