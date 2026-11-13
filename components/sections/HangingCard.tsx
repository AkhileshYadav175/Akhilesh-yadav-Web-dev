"use client";

import React, { forwardRef } from "react";
import type { ProjectItem } from "@/data/content";
import FlipCard from "@/components/ui/FlipCard";
import QrPattern from "@/components/ui/QrPattern";
import styles from "./HangingCard.module.css";

interface HangingCardProps {
  project: ProjectItem;
  index: number;
  hangRef?: React.Ref<HTMLDivElement>;
  stringRef?: React.Ref<HTMLSpanElement>;
  onCardMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const HangingCard = forwardRef<HTMLDivElement, HangingCardProps>(
  function HangingCard(
    { project, index, hangRef, stringRef, onCardMouseEnter },
    swayWrapRef
  ) {
    const renderThumb = () => {
      switch (project.thumbType) {
        case "t1":
          return (
            <div className={`${styles.thumb} ${styles.t1}`}>
              <div className={styles.ui} style={{ height: "14px", width: "55%" }} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "8px",
                  flex: 1,
                }}
              >
                <div className={styles.ui} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  <div className={styles.ui} style={{ background: "#fff" }} />
                  <div className={styles.ui} />
                  <div className={styles.ui} />
                  <div className={styles.ui} style={{ background: "#CFC6FF" }} />
                </div>
              </div>
            </div>
          );
        case "t2":
          return (
            <div className={`${styles.thumb} ${styles.t2}`}>
              <div className={styles.ui} style={{ height: "20px" }} />
              <div className={styles.ui} style={{ height: "12px", width: "80%" }} />
              <div className={styles.ui} style={{ height: "12px", width: "92%" }} />
              <div
                className={styles.ui}
                style={{ height: "12px", width: "60%", background: "#FFD0B0" }}
              />
              <div className={styles.ui} style={{ height: "12px", width: "74%" }} />
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "auto",
                }}
              >
                <div className={styles.ui} style={{ height: "34px", flex: 1 }} />
                <div className={styles.ui} style={{ height: "34px", flex: 1 }} />
                <div className={styles.ui} style={{ height: "34px", flex: 1 }} />
              </div>
            </div>
          );
        case "t3":
          return (
            <div
              className={`${styles.thumb} ${styles.t3}`}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div
                className={styles.ui}
                style={{
                  position: "absolute",
                  left: "14px",
                  right: "14px",
                  bottom: "14px",
                  height: "6px",
                }}
              >
                <div
                  style={{
                    width: "42%",
                    height: "100%",
                    background: "var(--ink)",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>
          );
        case "t4":
          return (
            <div
              className={`${styles.thumb} ${styles.t4}`}
              style={{ justifyContent: "flex-end" }}
            >
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 600,
                  letterSpacing: "-.06em",
                  lineHeight: 0.9,
                }}
              >
                AY<span style={{ color: "var(--accent)" }}>.</span>
              </div>
              <div
                className={styles.ui}
                style={{ height: "10px", width: "70%" }}
              />
            </div>
          );
        default:
          return null;
      }
    };

    const frontContent = (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="mono" style={{ fontSize: "10px" }}>
            Project · {project.num}
          </span>
          <span
            className={`mono ${project.isLive ? "now" : ""}`}
            style={{ fontSize: "10px" }}
          >
            {project.status}
          </span>
        </div>

        {renderThumb()}

        <div>
          <h3>{project.title}</h3>
          <p className={styles.sub}>{project.subtitle}</p>
        </div>

        <div className={styles.foot}>
          <span className="mono" style={{ fontSize: "10px" }}>
            View details
          </span>
          <i />
        </div>
      </>
    );

    const backContent = (
      <div className={styles.backIn}>
        <span
          className="mono"
          style={{ fontSize: "10px", color: "var(--ink2)" }}
        >
          {project.backTag}
        </span>
        <h4>{project.backTitle}</h4>
        <p>{project.backDesc}</p>
        <div className={styles.chips}>
          {project.chips.map((chip, idx) => (
            <span key={idx}>{chip}</span>
          ))}
        </div>
        <div className={styles.backFoot}>
          <div className={styles.backLinks}>
            {project.links.map((link, idx) => (
              <a key={idx} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <QrPattern seed={200 + index * 37} />
        </div>
      </div>
    );

    return (
      <div
        ref={swayWrapRef}
        className={styles.swayWrapper}
        style={{
          transformOrigin: "50% 0",
          flex: "none",
          scrollSnapAlign: "center",
        }}
      >
        <div
          ref={hangRef}
          className={`hang ${styles.hang}`}
          data-len={project.stringLen}
          onMouseEnter={onCardMouseEnter}
          style={{ transformOrigin: "50% 0" }}
        >
          <span
            ref={stringRef}
            className={`string ${styles.string}`}
            style={{ height: `${project.stringLen}px` }}
          />
          <span className={`peg ${styles.peg}`} />

          <FlipCard
            className={styles.pcardFlip}
            innerClassName={styles.pcardInner}
            frontClassName={styles.pcardFront}
            backClassName={styles.pcardBack}
            front={frontContent}
            back={backContent}
          />
        </div>
      </div>
    );
  }
);

export default HangingCard;

