"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("FLIP");

  useEffect(() => {
    const isHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isHover || isReduced) return;

    const cur = curRef.current;
    if (!cur) return;

    const cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
    const cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });

    const onPointerMove = (e: PointerEvent) => {
      cx(e.clientX);
      cy(e.clientY);
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const flipTarget = target.closest("[data-flip]") as HTMLElement | null;
      const srowTarget = target.closest(".srow") as HTMLElement | null;

      if (cursorTarget && cursorTarget.dataset.cursor) {
        setLabel(cursorTarget.dataset.cursor);
        cur.classList.add(styles.isBig);
      } else if (flipTarget) {
        setLabel("FLIP");
        cur.classList.add(styles.isBig);
      } else if (srowTarget) {
        setLabel("STACK");
        cur.classList.add(styles.isBig);
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (!target) return;

      const currentHover =
        related?.closest("[data-cursor]") ||
        related?.closest("[data-flip]") ||
        related?.closest(".srow");

      if (!currentHover) {
        cur.classList.remove(styles.isBig);
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseover", onPointerOver);
    document.addEventListener("mouseout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onPointerOver);
      document.removeEventListener("mouseout", onPointerOut);
    };
  }, []);

  return (
    <div
      ref={curRef}
      className={`cur ${styles.cur}`}
      aria-hidden="true"
    >
      <div className={`cur-dot ${styles.curDot}`} />
      <div className={`cur-label ${styles.curLabel}`}>{label}</div>
    </div>
  );
}

