// Skills.jsx
import React from "react";
import styles from "./Desktop1.module.css";

const Skills = ({ skills }) => {
  return (
    <div id="skills" className={styles.skillsSection}>
      <b className={styles.skillsTitle}>Skills</b>
      <div className={styles.skillsSubtitle}>
        The skills and expertise that define my work.
      </div>
      <div className={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <div className={styles.skillBox} key={index}>
            <img
              className={styles.skillIcon}
              alt={skill.name}
              src={skill.image}
            />
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
