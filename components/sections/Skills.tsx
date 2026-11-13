"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";
import styles from "./Skills.module.css";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const sec = sectionRef.current;
      if (!sec) return;

      // Heading split reveal
      const heading = sec.querySelector(`.${styles.heading}`);
      if (heading) {
        gsap.from(heading.querySelectorAll(".wi"), {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          },
        });
      }

      // Tag reveal
      const tagEl = sec.querySelector(`.${styles.secHead} > .tag`);
      if (tagEl) {
        gsap.from(tagEl, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tagEl,
            start: "top 90%",
          },
        });
      }

      // Rows reveal
      const rows = sec.querySelectorAll(`.${styles.srow}`);
      rows.forEach((r) => {
        gsap.from(r.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          clearProps: "transform",
          scrollTrigger: {
            trigger: r,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const { skills } = siteContent;

  return (
    <section ref={sectionRef} className={`sec ${styles.sec}`} id="skills">
      <div className="wrap">
        <div className={styles.secHead}>
          <h2 className={`h-sec ${styles.heading}`} data-split>
            <SplitWords>{skills.heading.line1}</SplitWords>
            <br />
            <SplitWords soft>{skills.heading.line2}</SplitWords>
          </h2>
          <span className="mono tag">{skills.tag}</span>
        </div>

        <div className={`rows ${styles.rows}`}>
          {skills.categories.map((cat) => (
            <div
              key={cat.num}
              className={`srow ${styles.srow}`}
              data-cursor="STACK"
            >
              <span className="mono">{cat.num}</span>
              <h3>{cat.title}</h3>
              <div className={`tools ${styles.tools}`}>
                {cat.tools.map((tool, i) => (
                  <span key={i}>{tool}</span>
                ))}
              </div>
              <svg
                className={`arr ${styles.arr}`}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

