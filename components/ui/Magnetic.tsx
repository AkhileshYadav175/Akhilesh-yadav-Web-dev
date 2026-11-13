"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: React.ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  }>;
  strengthX?: number;
  strengthY?: number;
}

export default function Magnetic({
  children,
  strengthX = 0.25,
  strengthY = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strengthX;
    const y = (e.clientY - r.top - r.height / 2) * strengthY;
    gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  return React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
      const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof childRef === "function") {
        childRef(node);
      } else if (childRef && typeof childRef === "object" && "current" in childRef) {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseMove?.(e);
      handleMouseMove(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseLeave?.(e);
      handleMouseLeave();
    },
  });
}

