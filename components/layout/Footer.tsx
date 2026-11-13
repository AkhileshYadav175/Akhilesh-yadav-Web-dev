import React from "react";
import { siteContent } from "@/data/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.wrap}`}>
        <span className="mono">{siteContent.footer.copyright}</span>
        <span className="mono">{siteContent.footer.location}</span>
        <a href="#home" className="mono">
          {siteContent.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}

