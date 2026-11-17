/** Geometría del arco solar en un viewBox fijo, para que el astro siempre sea redondo. */

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
