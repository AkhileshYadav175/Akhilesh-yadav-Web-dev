"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";
import HangingCard from "./HangingCard";
import styles from "./Work.module.css";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const wirePathRef = useRef<SVGPathElement>(null);
  const swayWrapsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hangsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stringsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const vxRef = useRef(0);
  const lastXRef = useRef(0);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      vxRef.current = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const sec = sectionRef.current;
      const wire = wirePathRef.current;
      if (!sec || !wire) return;

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

      // Side note fade up
      const side = sec.querySelector(`.${styles.side}`);
      if (side) {
        gsap.from(side, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: side,
            start: "top 90%",
          },
        });
      }

      // Wire setup
      const wl = wire.getTotalLength();
      gsap.set(wire, { strokeDasharray: wl, strokeDashoffset: wl });

      const validHangs = hangsRef.current.filter(Boolean) as HTMLDivElement[];
      const validStrings = stringsRef.current.filter(Boolean) as HTMLSpanElement[];
      const validSways = swayWrapsRef.current.filter(Boolean) as HTMLDivElement[];

      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.clothes}`,
          start: "top 80%",
        },
      });

      workTl
        .to(wire, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power3.inOut",
        })
        .from(
          validStrings,
          {
            scaleY: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=.6"
        )
        .from(
          validHangs,
          {
            y: -80,
            opacity: 0,
            rotation: (i) => (i % 2 ? 1 : -1) * 18,
            duration: 2.2,
            ease: "elastic.out(1, .3)",
            stagger: 0.12,
          },
          "<.1"
        );

      // Idle sway per card
      validSways.forEach((swayEl, i) => {
        gsap.to(swayEl, {
          rotation: (i % 2 ? 1 : -1) * gsap.utils.random(0.8, 1.6),
          duration: gsap.utils.random(2.6, 3.8),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    },
    { scope: sectionRef }
  );

  const handleCardMouseEnter = (index: number) => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;
    const hang = hangsRef.current[index];
    if (!hang) return;

    const kick = gsap.utils.clamp(-14, 14, vxRef.current * 0.9 || 6);
    gsap.fromTo(
      hang,
      { rotation: kick },
      {
        rotation: 0,
        duration: 2.6,
        ease: "elastic.out(1.1, .22)",
        overwrite: true,
      }
    );
  };

  const { work } = siteContent;

  return (
    <section ref={sectionRef} className={`sec ${styles.sec}`} id="work">
      <div className="wrap">
        <div className={styles.secHead}>
          <h2 className={`h-sec ${styles.heading}`} data-split>
            <SplitWords>{work.heading.line1}</SplitWords>
            <br />
            <SplitWords soft>{work.heading.line2}</SplitWords>
          </h2>
          <div className={styles.side}>
            <span className="mono tag">{work.tag}</span>
            <p>{work.sideNote}</p>
          </div>
        </div>

        <div className={`clothes ${styles.clothes}`}>
          <svg
            className={`wire ${styles.wire}`}
            viewBox="0 0 1000 30"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={wirePathRef}
              id="wirePath"
              d="M0 2 Q500 8 1000 2"
            />
          </svg>

          <div className={`cards ${styles.cards}`}>
            {work.projects.map((project, i) => (
              <HangingCard
                key={project.id}
                ref={(el) => {
                  swayWrapsRef.current[i] = el;
                }}
                hangRef={(el) => {
                  hangsRef.current[i] = el;
                }}
                stringRef={(el) => {
                  stringsRef.current[i] = el;
                }}
                project={project}
                index={i}
                onCardMouseEnter={() => handleCardMouseEnter(i)}
              />
            ))}
          </div>

          <div className={`clothes-floor ${styles.clothesFloor}`} />
        </div>
      </div>
    </section>
  );
}

