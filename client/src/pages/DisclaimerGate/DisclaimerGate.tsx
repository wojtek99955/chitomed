"use client";

import { useState, useEffect } from "react";
import styles from "./DisclaimerGate.module.css";

export default function DisclaimerGate() {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Persist confirmation in localStorage (so it doesn't re-appear on refresh)
  useEffect(() => {
    const alreadyConfirmed =
      localStorage.getItem("medical_disclaimer_accepted") === "true";
    if (alreadyConfirmed) {
      setConfirmed(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("medical_disclaimer_accepted", "true");
    setConfirmed(true);
  };

  const handleDecline = () => {
    // Redirect somewhere safe (change this URL as needed)
    window.location.href = "https://www.google.com";
    // Or just hide: setIsVisible(false);
  };

  if (confirmed || !isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>DECLARATION</h2>

        <div className={styles.content}>
          <p>
            The information and materials available in this section are intended
            exclusively for persons who possess
            <strong> formal medical education</strong> in the field of trauma
            surgery, spine surgery, and maxillofacial surgery.
          </p>
          <p>
            The materials in this section are not directed to the general
            public, including “lay persons” within the meaning of Article 2
            point 38 of Regulation (EU) 2017/745 of the European Parliament and
            of the Council of 5 April 2017 on medical devices.
          </p>
          <p>
            I declare that I possess formal medical education or appropriate
            qualifications in the field of healthcare, and therefore –{" "}
            <strong>I am not a “lay person”</strong> within the meaning of the
            aforementioned provision.
          </p>
        </div>

        <div className={styles.buttons}>
          <button
            onClick={handleConfirm}
            className={`${styles.btn} ${styles.btnConfirm}`}>
            I CONFIRM
          </button>

          <button
            onClick={handleDecline}
            className={`${styles.btn} ${styles.btnDecline}`}>
            I DO NOT CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}
