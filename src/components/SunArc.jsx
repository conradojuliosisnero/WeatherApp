/**
 * Arco del sol (o la luna) entre amanecer y atardecer.
 * La geometría vive en un viewBox fijo para que el astro siempre sea redondo.
 */

export const ARC = { w: 1000, h: 250, cx: 500, base: 240, rx: 455, ry: 215 };

export const ARC_PATH = `M${ARC.cx - ARC.rx} ${ARC.base} A${ARC.rx} ${ARC.ry} 0 0 1 ${
  ARC.cx + ARC.rx
} ${ARC.base}`;

export const arcPoint = (t) => {
  const angle = Math.PI * (1 - t);
  return {
    x: ARC.cx + ARC.rx * Math.cos(angle),
    y: ARC.base - ARC.ry * Math.sin(angle),
  };
};

export default function SunArc({ progress, isNight }) {
  const { x, y } = arcPoint(progress);

  return (
    <svg
      className="arc"
      viewBox={`0 0 ${ARC.w} ${ARC.h}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="glow">
          <stop offset="0%" stopColor="var(--star)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--star)" stopOpacity="0" />
        </radialGradient>
        <mask id="crescent">
          <rect x="-50" y="-50" width="100" height="100" fill="white" />
          <circle cx="11" cy="-9" r="22" fill="black" />
        </mask>
      </defs>

      <path className="arc__track" d={ARC_PATH} pathLength="1" />
      <path
        className="arc__trail js-trail"
        d={ARC_PATH}
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset={1 - progress}
      />

      <g className="js-star" transform={`translate(${x} ${y})`}>
        <circle r="90" fill="url(#glow)" className="arc__glow" />
        {isNight ? (
          <circle r="24" className="arc__star" mask="url(#crescent)" />
        ) : (
          <circle r="26" className="arc__star" />
        )}
      </g>
    </svg>
  );
}
