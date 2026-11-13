"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { siteContent } from "@/data/content";
import FlipCard from "@/components/ui/FlipCard";
import Barcode from "@/components/ui/Barcode";
import QrPattern from "@/components/ui/QrPattern";
import styles from "./IdBadge.module.css";

interface IdBadgeProps {
  avatarSrc?: string;
  badgeHangRef?: React.Ref<HTMLDivElement>;
}

const IdBadge = forwardRef<HTMLDivElement, IdBadgeProps>(function IdBadge(
  { avatarSrc, badgeHangRef },
  swayRef
) {
  const { badge } = siteContent.hero;

  const frontContent = (
    <>
      <span className={styles.hole} />
      <div className={styles.row}>
        <span className="mono" style={{ fontSize: "10px" }}>
          {badge.front.category}
        </span>
        <span className="mono" style={{ fontSize: "10px" }}>
          {badge.front.serial}
        </span>
      </div>

      <div className={styles.avatar}>
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={badge.front.name}
            fill
            sizes="300px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <>
            <b>{badge.front.initials}</b>
            <small>{badge.front.avatarNote}</small>
          </>
        )}
      </div>

      <div>
        <h3>{badge.front.name}</h3>
        <div className={styles.role}>{badge.front.role}</div>
      </div>

      <div className={styles.row} style={{ marginTop: 0 }}>
        <Barcode seed={101} />
        <span className="mono" style={{ fontSize: "10px" }}>
          {badge.front.countryCode}
        </span>
      </div>
    </>
  );

  const backContent = (
    <div className={styles.backIn}>
      <span
        className="mono"
        style={{ fontSize: "10px", color: "var(--ink2)" }}
      >
        {badge.back.tag}
      </span>
      <h4>{badge.back.name}</h4>
      <div className={styles.kv}>
        {badge.back.kv.map((item, i) => (
          <div key={i}>
            <span>{item.key}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.backFoot}>
        <span
          className="mono"
          style={{ fontSize: "10px", color: "var(--ink2)" }}
        >
          {badge.back.location.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx === 0 && <br />}
            </React.Fragment>
          ))}
        </span>
        <QrPattern seed={9876} />
      </div>
    </div>
  );

  return (
    <div
      ref={swayRef}
      className={`sway ${styles.sway}`}
      id="badgeSway"
    >
      <div
        ref={badgeHangRef}
        className={`hang ${styles.hang}`}
        id="badgeHang"
        style={{ transformOrigin: "50% 0" }}
      >
        <div className={styles.lanyard}>
          <span>{badge.lanyardText}</span>
        </div>
        <div className={styles.clip} />

        <FlipCard
          className={styles.badgeFlip}
          innerClassName={styles.badgeInner}
          frontClassName={styles.badgeFront}
          backClassName={styles.badgeBack}
          front={frontContent}
          back={backContent}
        />
      </div>
    </div>
  );
});

export default IdBadge;

