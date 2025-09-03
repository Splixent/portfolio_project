import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";

const ScrollingContactSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:tomi.okelana@gmail.com";
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/tomiokelana?igsh=MXh3dWRsZ3RrYjF1&utm_source=qr", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/tomi-okelana-3476312a6/", "_blank");
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactRow} onClick={handleEmailClick}>
        <span className={isMobile ? styles.mobileContact : styles.desktopContact}>
          tomi.okelana@gmail.com
        </span>
      </div>

      <div className={styles.contactRow} onClick={handleInstagramClick}>
        <div className={styles.contactWithIcon}>
          <img 
            className={isMobile ? styles.mobileIcon : styles.desktopIcon} 
            alt="Instagram" 
            src="/image-4@2x.png" 
          />
          <span className={isMobile ? styles.mobileContact : styles.desktopContact}>
            @tomiokel
          </span>
        </div>
      </div>

      <div className={styles.contactRow} onClick={handleLinkedInClick}>
        <div className={styles.contactWithIcon}>
          <img 
            className={isMobile ? styles.mobileIcon : styles.desktopIcon} 
            alt="LinkedIn" 
            src="/image-41@2x.png" 
          />
          <span className={isMobile ? styles.mobileContact : styles.desktopContact}>
            Tomi Okelana
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollingContactSection;
