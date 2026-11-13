"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./FlipCard.module.css";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  innerClassName?: string;
  frontClassName?: string;
  backClassName?: string;
  style?: React.CSSProperties;
}

export default function FlipCard({
  front,
  back,
  className = "",
  innerClassName = "",
  frontClassName = "",
  backClassName = "",
  style,
}: FlipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isFlipped = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMouseEnter = () => {
      if (!canHover) return;
      isFlipped.current = true;
      card.dataset.flipped = "1";
      gsap.to(inner, {
        rotateY: 180,
        duration: 1.1,
        ease: "power3.inOut",
        overwrite: true,
      });
    };

    const onMouseLeave = () => {
      if (!canHover) return;
      isFlipped.current = false;
      card.dataset.flipped = "";
      gsap.to(inner, {
        rotateY: 0,
        duration: 1.1,
        ease: "power3.inOut",
        overwrite: true,
      });
    };

    const onClick = (e: MouseEvent) => {
      if (canHover) return;
      if ((e.target as HTMLElement).closest("a")) return;
      isFlipped.current = !isFlipped.current;
      card.dataset.flipped = isFlipped.current ? "1" : "";
      gsap.to(inner, {
        rotateY: isFlipped.current ? 180 : 0,
        duration: 1.1,
        ease: "power3.inOut",
        overwrite: true,
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", 100 - x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
      card.style.setProperty("--hx", x * 100 + "%");
      card.style.setProperty("--hy", y * 100 + "%");
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mouseleave", onMouseLeave);
    card.addEventListener("click", onClick);
    card.addEventListener("pointermove", onPointerMove);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mouseleave", onMouseLeave);
      card.removeEventListener("click", onClick);
      card.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flip ${styles.flip} ${className}`.trim()}
      data-flip
      data-cursor="FLIP"
      style={style}
    >
      <div
        ref={innerRef}
        className={`flip-in ${styles.flipIn} ${innerClassName}`.trim()}
      >
        <div
          className={`face front ${styles.face} ${styles.frontFace} ${frontClassName}`.trim()}
        >
          {front}
        </div>
        <div
          className={`face back holo ${styles.face} ${styles.backFace} ${backClassName}`.trim()}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

