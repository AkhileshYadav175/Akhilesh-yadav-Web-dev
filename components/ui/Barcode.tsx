import React from "react";
import styles from "./Barcode.module.css";

interface BarcodeProps {
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

export default function Barcode({ seed = 42, className }: BarcodeProps) {
  const rand = mulberry32(seed);
  const widths: number[] = [];
  const options = [1, 1, 2, 3];
  for (let i = 0; i < 34; i++) {
    widths.push(options[Math.floor(rand() * options.length)]);
  }

  return (
    <div
      className={`${styles.barcode} ${className || ""}`.trim()}
      data-barcode
      aria-hidden="true"
    >
      {widths.map((w, i) => (
        <i key={i} style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

