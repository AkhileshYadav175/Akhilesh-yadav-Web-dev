import React from "react";
import styles from "./QrPattern.module.css";

interface QrPatternProps {
  seed?: number;
  className?: string;
}

function mulberry32(seed: number) {
  let s = seed;
  return function () {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function QrPattern({ seed = 12345, className }: QrPatternProps) {
  const n = 21;
  const rand = mulberry32(seed);
  const rects: { x: number; y: number }[] = [];

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const inFinder =
        (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      if (!inFinder && rand() > 0.55) {
        rects.push({ x, y });
      }
    }
  }

  const renderFinder = (ox: number, oy: number, keyPrefix: string) => (
    <React.Fragment key={keyPrefix}>
      <rect x={ox} y={oy} width="7" height="7" fill="#111113" />
      <rect x={ox + 1} y={oy + 1} width="5" height="5" fill="#fff" />
      <rect x={ox + 2} y={oy + 2} width="3" height="3" fill="#111113" />
    </React.Fragment>
  );

  return (
    <div
      className={`${styles.qr} ${className || ""}`.trim()}
      data-qr
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${n} ${n}`}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {rects.map((pt, i) => (
          <rect
            key={i}
            x={pt.x}
            y={pt.y}
            width="1"
            height="1"
            fill="#111113"
          />
        ))}
        {renderFinder(0, 0, "f1")}
        {renderFinder(14, 0, "f2")}
        {renderFinder(0, 14, "f3")}
      </svg>
    </div>
  );
}

