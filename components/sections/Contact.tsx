"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import SplitWords from "@/components/ui/SplitWords";
import RollText from "@/components/ui/RollText";
import Magnetic from "@/components/ui/Magnetic";
import styles from "./Contact.module.css";

export default function Contact() {
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

      // Email and socials reveal
      const mail = sec.querySelector(`.${styles.mail}`);
      const pills = sec.querySelectorAll(`.${styles.socials} a`);
      if (mail) {
        gsap.from([mail, ...Array.from(pills)], {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          clearProps: "transform",
          scrollTrigger: {
            trigger: mail,
            start: "top 92%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const { contact } = siteContent;

  return (
    <section ref={sectionRef} className={`contact ${styles.contact}`} id="contact">
      <div className="wrap">
        <span className="mono tag">{contact.tag}</span>
        <h2 className={styles.heading} data-split style={{ marginTop: "24px" }}>
          <SplitWords>{contact.heading.line1}</SplitWords>
          <br />
          <SplitWords soft>{contact.heading.line2}</SplitWords>
        </h2>

        <a href={`mailto:${contact.email}`} className={`mail ${styles.mail}`}>
          <RollText text={contact.emailDisplay} className={styles.mailRoll} />
        </a>

        <div className={`socials ${styles.socials}`}>
          {contact.socials.map((social, i) => (
            <Magnetic key={i}>
              <a href={social.href} className="pill pill-ghost">
                <RollText text={social.label} />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}

