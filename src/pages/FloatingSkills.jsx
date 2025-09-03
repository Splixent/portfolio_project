import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./FloatingSkills.module.css";

const FloatingSkills = ({ skills }) => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const controls = useAnimation();

    useEffect(() => {
        const updateDimensions = () => {
            const container = document.getElementById('skillsContainer');
            if (container) {
                setContainerDimensions({
                    width: container.offsetWidth,
                    height: container.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const floatingAnimation = async () => {
            while (true) {
                await controls.start(i => ({
                    x: Math.random() * (containerDimensions.width - 100),
                    y: Math.random() * (containerDimensions.height - 100),
                    transition: {
                        duration: Math.random() * 10 + 15,
                        ease: "easeInOut"
                    }
                }));
            }
        };

        if (containerDimensions.width && containerDimensions.height) {
            floatingAnimation();
        }
    }, [controls, containerDimensions]);

    return (
        <div className={styles.skillsSection}>
            <div className={styles.skillsHeader}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.skillsTitle}
                >
                    Skills
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.skillsSubtitle}
                >
                    <p>
                        Here are just a few of the many coding languages and softwares I use and I am experienced with. 
                    </p>
                </motion.p>
            </div>

            <div id="skillsContainer" className={styles.skillsContainer}>
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        className={styles.skillItem}
                        initial={{
                            x: Math.random() * (containerDimensions.width - 100),
                            y: Math.random() * (containerDimensions.height - 100),
                            scale: 1
                        }}
                        animate={controls}
                        custom={index}
                        whileHover={{
                            scale: 1.2,
                            zIndex: 10,
                            transition: { duration: 0.2 }
                        }}
                        style={{
                            backgroundColor: hoveredSkill === skill.name ? 'rgba(15, 15, 18, 0.9)' : 'rgba(15, 15, 18, 0.7)',
                            borderColor: skill.mainStrokeColor
                        }}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        drag
                        dragConstraints={{
                            left: 0,
                            right: containerDimensions.width - 100,
                            top: 0,
                            bottom: containerDimensions.height - 100
                        }}
                        dragElastic={0.2}
                    >
                        <motion.img
                            src={skill.image}
                            alt={skill.name}
                            className={styles.skillIcon}
            draggable="false"
            style={{ userSelect: 'none', pointerEvents: 'none' }}
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: hoveredSkill === skill.name ? 1 : 0.8 }}
                        />
                        <motion.span
                            className={styles.skillName}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {skill.name}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FloatingSkills;
