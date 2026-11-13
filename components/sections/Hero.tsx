"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import RollText from "@/components/ui/RollText";
import Magnetic from "@/components/ui/Magnetic";
import IdBadge from "./IdBadge";
import styles from "./Hero.module.css";

interface HeroProps {
  avatarSrc?: string;
}

export default function Hero({ avatarSrc }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const swayRef = useRef<HTMLDivElement>(null);
  const badgeHangRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      const sway = swayRef.current;
      const badgeHang = badgeHangRef.current;
      if (!sway || !badgeHang) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Nav children (queried globally)
      tl.from(".nav .wrap > *", {
        y: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
      })
        // 2. H1 lines
        .from(
          "#heroTitle .line > span",
          {
            yPercent: 110,
            duration: 1.3,
            stagger: 0.09,
          },
          "-=.7"
        )
        // 3. Badge sway wrapper
        .from(
          sway,
          {
            y: -700,
            duration: 2,
            ease: "elastic.out(1, .55)",
          },
          "-=1.2"
        )
        // 4. Badge hang
        .from(
          badgeHang,
          {
            rotation: 14,
            duration: 2.6,
            ease: "elastic.out(1.2, .22)",
          },
          "<.2"
        )
        // 5. Intro fade items
        .from(
          ".intro-fade",
          {
            y: 24,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
          },
          "-=2.2"
        );

      // Idle sway
      gsap.to(sway, {
        rotation: 1.6,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Pointer follow
      const hangRot = gsap.quickTo(badgeHang, "rotation", {
        duration: 1.4,
        ease: "elastic.out(1, .35)",
      });

      const heroEl = heroRef.current;
      if (!heroEl) return;

      const onPointerMove = (e: PointerEvent) => {
        const r = sway.getBoundingClientRect();
        hangRot(
          gsap.utils.clamp(-9, 9, (e.clientX - (r.left + r.width / 2)) / 40)
        );
      };

      const onPointerLeave = () => {
        hangRot(0);
      };

      heroEl.addEventListener("pointermove", onPointerMove);
      heroEl.addEventListener("pointerleave", onPointerLeave);

      // Hero scroll-out scrub
      gsap.to("#heroTitle", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("#badgeStage", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        heroEl.removeEventListener("pointermove", onPointerMove);
        heroEl.removeEventListener("pointerleave", onPointerLeave);
      };
    },
    { scope: heroRef }
  );

  const { hero } = siteContent;

  return (
    <section ref={heroRef} className={`hero ${styles.hero}`} id="home">
      <div
        className="wrap"
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.heroTop}>
          <span className="mono tag intro-fade">{hero.tag}</span>
        </div>

        <div className={styles.heroMain}>
          <div>
            <h1 id="heroTitle" className={styles.h1}>
              {hero.titleLines.map((line, i) => (
                <span key={i} className="line">
                  <span className={line.isSoft ? "soft" : ""}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <div className={styles.heroSub}>
              <p className={`lead intro-fade ${styles.lead}`}>
                {hero.lead.greeting}{" "}
                <strong>{hero.lead.highlightName}</strong>
                {hero.lead.rest}
              </p>

              <div className={`intro-fade ${styles.heroCtas}`}>
                <Magnetic>
                  <a href={hero.ctas.primary.href} className="pill">
                    <RollText text={hero.ctas.primary.label} />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={hero.ctas.secondary.href}
                    className="pill pill-ghost"
                    download={hero.ctas.secondary.download}
                  >
                    <RollText text={hero.ctas.secondary.label} />
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 4v12M7 11l5 5 5-5M5 20h14" />
                    </svg>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Hanging developer ID badge */}
          <div className={`badge-stage ${styles.badgeStage}`} id="badgeStage">
            <IdBadge
              ref={swayRef}
              badgeHangRef={badgeHangRef}
              avatarSrc={avatarSrc}
            />
            <span className={`mono flip-hint intro-fade ${styles.flipHint}`}>
              {hero.badge.flipHint}
            </span>
          </div>
        </div>

        <div className={`intro-fade ${styles.heroBottom}`}>
          <div className={styles.heroMeta}>
            {hero.bottomMeta.map((meta, i) => (
              <span key={i} className="mono">
                {meta}
              </span>
            ))}
          </div>
          <span className="mono">{hero.scrollPrompt}</span>
        </div>
      </div>
    </section>
  );
}

