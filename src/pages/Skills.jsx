import React from "react";
import styles from "./Desktop1.module.css"; // Uses your existing styles

const Skills = ({ skills }) => {
  return (
    <div id="skills" className={styles.skills1}>
      <b className={styles.skills2}>Skills</b>
      <div className={styles.theSkillsAnd}>
        The skills and expertise that define my work.
      </div>
      <div className={styles.frameParent}>
        {skills.map((skill, index) => (
          <div key={index} className={styles[skill.gradientClass]}>
            <img className={styles.image2Icon} alt={skill.name} src={skill.image} />
            <b className={styles.vite}>{skill.name}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
