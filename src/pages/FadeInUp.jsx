// FadeInUp.js
import React, { useRef, useState, useEffect } from "react";
import styles from "./Desktop1.module.css"; // or your CSS file

const FadeInUp = ({ children, threshold = 0.1, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If it's visible in viewport => set true, otherwise false
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold }
    );

    if (domRef.current) observer.observe(domRef.current);

    // Cleanup when component unmounts
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [threshold]);

  // We’ll pass the delay as inline style so each item can have its own
  const transitionStyle = {
    transitionDelay: `${delay}s`,
  };

  return (
    <div
      ref={domRef}
      // Start “hidden,” become “active” if isVisible
      className={`${styles.fadeInUpInitial} ${
        isVisible ? styles.fadeInUpActive : ""
      }`}
      style={transitionStyle}
    >
      {children}
    </div>
  );
};

export default FadeInUp;
