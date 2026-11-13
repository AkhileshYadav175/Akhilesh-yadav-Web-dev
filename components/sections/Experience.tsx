"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";
import styles from "./Experience.module.css";

export default function Experience() {
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

      // Rows reveal & bottom ink line scrub
      const rows = sec.querySelectorAll(`.${styles.erow}`);
      rows.forEach((r) => {
        const directChildren = Array.from(r.children).filter(
          (c) => !c.classList.contains(styles.inkLine)
        );

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: r,
            start: "top 85%",
            once: true,
          },
        });
        tl2.from(directChildren, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          clearProps: "transform",
        });

        const line = r.querySelector(`.${styles.inkLine}`);
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: r,
                start: "top 80%",
                end: "bottom 55%",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  const { experience } = siteContent;

  return (
    <section ref={sectionRef} className={`sec ${styles.sec}`} id="experience">
      <div className="wrap">
        <div className={styles.secHead}>
          <h2 className={`h-sec ${styles.heading}`} data-split>
            <SplitWords>{experience.heading.line1}</SplitWords>
            <br />
            <SplitWords soft>{experience.heading.line2}</SplitWords>
          </h2>
          <span className="mono tag">{experience.tag}</span>
        </div>

        <div className={`exp ${styles.exp}`}>
          {experience.items.map((item, i) => (
            <div key={i} className={`erow ${styles.erow}`}>
              <span className={`mono ${item.isCurrent ? "now" : ""}`}>
                {item.period}
              </span>
              <div>
                <h3>{item.role}</h3>
                <div className={styles.co}>{item.company}</div>
              </div>
              <p>{item.desc}</p>
              <span className={styles.inkLine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

