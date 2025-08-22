// Skills.jsx
import React, { useState } from "react";
import styles from "./Desktop1.module.css";
import { FlipWords } from "../components/flip-words.jsx";

const normalizeShadow = (value) => {
  if (!value) return undefined;
  // Accept strings like "box-shadow: ..." and return just the value part
  if (typeof value === "string") {
    const trimmed = value.trim();
    const prefix = "box-shadow:";
    if (trimmed.toLowerCase().startsWith(prefix)) {
      return trimmed.slice(prefix.length).trim();
    }
    return trimmed;
  }
  return value;
};

const Skills = ({
  skills,
  showTitle = true,
  showSubtitle = true,
  showInfoPanel = true,
  iconSize = 60,
  pillHeight = 96,
  collapsedWidth = 96,
  expandedWidth = 500,
  labelMax = 520,
  className
}) => {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-dismiss the active skill after 3 seconds on mobile
  React.useEffect(() => {
    if (isMobile && active) {
      const timer = setTimeout(() => setActive(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [active, isMobile]);

  return (
    <div id="skills" className={`${styles.skillsSection} ${className || ''}`}>
      {showTitle && <b className={styles.skillsTitle}>Skills</b>}
      {showSubtitle && (
        <div className={styles.skillsSubtitle}>
          The skills and expertise that define my work.
        </div>
      )}
      <div className={styles.skillsContainer}>
        {skills.map((skill, index) => (
            <div
              className={styles.skillBox}
              key={index}
              style={{
                  "--skill-border": `2px solid ${skill.mainStrokeColor}`,
                  "--skill-shadow": normalizeShadow(` 0 0 6px ${skill.mainStrokeColor}, 0 0 12px ${skill.mainStrokeColor}`),
                  "--skill-shadow-hover": normalizeShadow(` 0 0 8px ${skill.mainStrokeColor}, 0 0 16px ${skill.mainStrokeColor}`),
                  "--skill-collapsed-width": isMobile ? '60px' : `${collapsedWidth}px`,
                  "--skill-expanded-width": isMobile ? '60px' : `${expandedWidth}px`,
                  "--skill-label-max": isMobile ? '0' : `${labelMax}px`,
                  height: isMobile ? '60px' : `${pillHeight}px`,
                  width: isMobile ? '60px' : 'auto',
                  aspectRatio: isMobile ? '1' : 'auto',
              }}
              onMouseEnter={() => !isMobile && setActive(skill)}
              onMouseLeave={() => !isMobile && setActive(null)}
              onFocus={() => !isMobile && setActive(skill)}
              onBlur={() => !isMobile && setActive(null)}
              onClick={() => isMobile && setActive(skill)}
              tabIndex={0}
            >
            <img
              className={styles.skillIcon}
              alt={skill.name}
              src={skill.image}
              style={{ 
                width: isMobile ? '32px' : `${iconSize}px`, 
                height: isMobile ? '32px' : `${iconSize}px`
              }}
            />
            {!isMobile && <span className={styles.visuallyHidden}>{skill.name}</span>}
          </div>
        ))}
      </div>
      {showInfoPanel && (
        <div 
          className={`${styles.skillsInfoPanel} ${isMobile ? styles.skillsInfoPanelMobile : ''}`} 
          aria-live="polite"
        >
          {(() => {
            const label = active
              ? `${active.name}${active.subtitle ? ` · ${active.subtitle}` : ""}`
              : isMobile ? "Tap a skill to see its name" : "Hover or focus a skill to see its name";
            const cls = active ? styles.skillsInfoTitle : styles.skillsInfoHint;
            return <FlipWords key={label} words={[label]} className={cls} duration={100}/>;
          })()}
        </div>
      )}
    </div>
  );
};

export default Skills;
