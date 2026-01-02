'use client';

import { motion } from 'framer-motion';

interface RadarChartProps {
  data: {
    clarity: number;
    specificity: number;
    structure: number;
    actionability: number;
    creativity: number;
  };
  size?: number;
  className?: string;
}

const AXES = [
  { key: 'clarity', label: 'Clarity', angle: -90 },
  { key: 'specificity', label: 'Specificity', angle: -18 },
  { key: 'structure', label: 'Structure', angle: 54 },
  { key: 'actionability', label: 'Action', angle: 126 },
  { key: 'creativity', label: 'Creative', angle: 198 },
] as const;

export function RadarChart({ data, size = 200, className = '' }: RadarChartProps) {
  const center = size / 2;
  const maxRadius = (size / 2) - 30;

  const polarToCartesian = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const dataPoints = AXES.map((axis) => {
    const value = data[axis.key as keyof typeof data] || 0;
    const radius = (value / 100) * maxRadius;
    return polarToCartesian(axis.angle, radius);
  });

  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridLevels.map((level) => {
          const radius = (level / 100) * maxRadius;
          const points = AXES.map((axis) => polarToCartesian(axis.angle, radius));
          return (
            <polygon
              key={level}
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}

        {AXES.map((axis) => {
          const end = polarToCartesian(axis.angle, maxRadius);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="var(--border-subtle)"
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}

        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          points={polygonPoints}
          fill="var(--accent-primary)"
          fillOpacity={0.2}
          stroke="var(--accent-primary)"
          strokeWidth={2}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {dataPoints.map((point, i) => (
          <motion.circle
            key={AXES[i].key}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            cx={point.x}
            cy={point.y}
            r={4}
            fill="var(--accent-primary)"
            stroke="var(--bg-primary)"
            strokeWidth={2}
          />
        ))}

        {AXES.map((axis) => {
          const labelPos = polarToCartesian(axis.angle, maxRadius + 18);
          return (
            <text
              key={axis.key}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-[var(--text-muted)]"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        {AXES.map((axis, i) => {
          const value = data[axis.key as keyof typeof data] || 0;
          const pos = polarToCartesian(axis.angle, maxRadius * 0.65);
          return (
            <motion.div
              key={axis.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="absolute text-xs font-bold text-[var(--accent-primary)]"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
