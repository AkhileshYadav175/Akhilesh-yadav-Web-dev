"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import RollText from "@/components/ui/RollText";
import Magnetic from "@/components/ui/Magnetic";
import MobileMenu from "./MobileMenu";
import styles from "./Nav.module.css";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      // Sticky background & show/hide on scroll
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (s) => {
          if (s.scroll() > 40) {
            nav.classList.add(styles.scrolled);
          } else {
            nav.classList.remove(styles.scrolled);
          }

          gsap.to(nav, {
            yPercent: s.direction === 1 && s.scroll() > 400 ? -110 : 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });

      // Section active link indicator
      const navLinks = nav.querySelectorAll(`.${styles.links} a`);
      const sections = ["work", "process", "skills", "experience", "contact"];

      sections.forEach((id) => {
        const trigger = document.getElementById(id);
        if (!trigger) return;

        ScrollTrigger.create({
          trigger: trigger,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (s) => {
            if (s.isActive) {
              navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                if (href === `#${id}`) {
                  link.classList.add(styles.on);
                } else {
                  link.classList.remove(styles.on);
                }
              });
            }
          },
        });
      });
    },
    { scope: navRef }
  );

  return (
    <>
      <header ref={navRef} className={`nav ${styles.nav}`} id="nav">
        <div className={`wrap ${styles.wrap}`}>
          <a href="#home" className={`brand ${styles.brand}`}>
            <i className={styles.dot} />
            {siteContent.nav.brand}
          </a>

          <nav className={`links ${styles.links}`} aria-label="Primary">
            {siteContent.nav.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <Magnetic>
            <a href={siteContent.nav.cta.href} className="pill">
              <RollText text={siteContent.nav.cta.label} />
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </Magnetic>

          <button
            className={`menu-btn ${styles.menuBtn}`}
            id="menuOpen"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
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
              <path d="M4 9h16M4 15h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

