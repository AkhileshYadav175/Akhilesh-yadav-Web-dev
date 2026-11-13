"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";
import styles from "./Process.module.css";

export default function Process() {
  const processRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const sec = processRef.current;
      const stage = stageRef.current;
      if (!sec || !stage) return;

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
      const tagEl = sec.querySelector(`.${styles.pHead} > .tag`);
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

      const validSteps = stepsRef.current.filter(Boolean) as HTMLDivElement[];

      const buildStep = (s: HTMLDivElement) => {
        const t = gsap.timeline();
        const panel = s.querySelector(`.${styles.panel}`);
        const numSpan = s.querySelector(`.${styles.num} span`);
        const bar = s.querySelector(`.${styles.bar}`);
        const h3 = s.querySelector("h3");
        const p = s.querySelector("p");

        t.fromTo(
          panel,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "expo.inOut" }
        )
          .from(
            numSpan,
            { yPercent: 105, duration: 1, ease: "expo.out" },
            "-=.4"
          )
          .from(
            bar,
            { scaleX: 0, duration: 0.8, ease: "expo.inOut" },
            "-=.8"
          )
          .from(
            [h3, p],
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
            },
            "-=.6"
          );
        return t;
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1021px) and (min-height: 860px)", () => {
        const pt = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 1,
          },
        });

        validSteps.forEach((s, i) => {
          pt.add(buildStep(s), i * 0.9);
        });

        pt.to(
          `.${styles.sCircle}`,
          { rotation: 180, x: 120, y: 80, duration: 4, ease: "none" },
          0
        )
          .to(
            `.${styles.sTri}`,
            { rotation: -140, x: -100, y: -60, duration: 4, ease: "none" },
            0
          )
          .to(
            `.${styles.sSq}`,
            { rotation: 90, y: -120, duration: 4, ease: "none" },
            0
          );
      });

      mm.add("(max-width: 1020px), (max-height: 859px)", () => {
        validSteps.forEach((s) => {
          const t = buildStep(s);
          t.pause();
          ScrollTrigger.create({
            trigger: s,
            start: "top 85%",
            once: true,
            onEnter: () => t.play(),
          });
        });
      });
    },
    { scope: processRef }
  );

  const { process } = siteContent;

  return (
    <section ref={processRef} className={`process ${styles.process}`} id="process">
      <div ref={stageRef} className={`p-stage ${styles.pStage}`}>
        {/* Floating Shapes */}
        <div
          className={`shape ${styles.shape} ${styles.sCircle}`}
          style={{ width: "120px", height: "120px", left: "2%", top: "10%" }}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div
          className={`shape ${styles.shape} ${styles.sTri}`}
          style={{ width: "110px", height: "110px", right: "3%", top: "14%" }}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M50 6L95 90H5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div
          className={`shape ${styles.shape} ${styles.sSq}`}
          style={{ width: "80px", height: "80px", right: "30%", bottom: "3%" }}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <rect
              x="6"
              y="6"
              width="88"
              height="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="wrap" style={{ width: "100%", position: "relative", zIndex: 1 }}>
          <div className={styles.pHead}>
            <h2 className={`h-sec ${styles.heading}`} data-split>
              <SplitWords>{process.heading.line1}</SplitWords>
              <br />
              <SplitWords soft>{process.heading.line2}</SplitWords>
            </h2>
            <span className="mono tag">{process.tag}</span>
          </div>

          <div className={styles.pGrid}>
            {process.steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
                className={`step ${styles.step}`}
              >
                <div
                  className={`panel ${styles.panel}`}
                  dangerouslySetInnerHTML={{ __html: step.codeHtml }}
                />
                <div className={`num ${styles.num}`}>
                  <span>{step.num}</span>
                </div>
                <span className={`bar ${styles.bar}`} />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

