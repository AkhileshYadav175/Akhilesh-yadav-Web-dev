"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      menu.style.visibility = "visible";
      gsap.to(menu, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "expo.inOut",
      });
      gsap.from(menu.querySelectorAll("a"), {
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        delay: 0.35,
        duration: 0.7,
        ease: "expo.out",
      });
    } else {
      if (menu.style.visibility === "visible") {
        gsap.to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => {
            menu.style.visibility = "hidden";
          },
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`mobile-menu ${styles.mobileMenu}`}
      id="mobileMenu"
    >
      <button
        className={`x ${styles.closeBtn}`}
        id="menuClose"
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {siteContent.nav.links.map((link) => (
        <a key={link.href} href={link.href} onClick={onClose}>
          {link.label}
        </a>
      ))}
    </div>
  );
}

