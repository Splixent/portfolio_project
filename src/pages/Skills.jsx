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
}) => {
  const [active, setActive] = useState(null);

  return (
    <div id="skills" className={styles.skillsSection}>
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
                  "--skill-shadow-hover": normalizeShadow(` 0 0 6px ${skill.mainStrokeColor}, 0 0 12px ${skill.mainStrokeColor}`),
                  "--skill-collapsed-width": `${collapsedWidth}px`,
                  "--skill-expanded-width": `${expandedWidth}px`,
                  "--skill-label-max": `${labelMax}px`,
                  height: `${pillHeight}px`,
              }}
              onMouseEnter={() => setActive(skill)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(skill)}
              onBlur={() => setActive(null)}
              tabIndex={0}
            >
            <img
              className={styles.skillIcon}
              alt={skill.name}
              src={skill.image}
              style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            />
            {/* Flyout text is handled by a fixed panel below; keep label for screen readers */}
            <span className={styles.visuallyHidden}>{skill.name}</span>
          </div>
        ))}
      </div>
      {showInfoPanel && (
        <div className={styles.skillsInfoPanel} aria-live="polite">
          {(() => {
            const label = active
              ? `${active.name}${active.subtitle ? ` · ${active.subtitle}` : ""}`
              : "Hover or focus a skill to see its name";
            const cls = active ? styles.skillsInfoTitle : styles.skillsInfoHint;
            return <FlipWords key={label} words={[label]} className={cls} duration={100}/>;
          })()}
        </div>
      )}
    </div>
  );
};

export default Skills;
