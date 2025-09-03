import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectCard.module.css';
import MediaCarousel from './MediaCarousel';

const ProjectCard = ({ title, description, expandedContent, sources, youtubeLink, accentColor, date, delay = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Prevent body scrolling when modal is open
    React.useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                className={styles.card}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                <div className={styles.content}>
                    <div className={styles.titleSection}>
                        <h2 className={styles.title}>{title}</h2>
                        {date && <span className={styles.projectDate}>{date}</span>}
                    </div>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.expandPrompt}>
                        Click to see more details
                        <motion.span 
                            className={styles.arrow}
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ↓
                        </motion.span>
                    </div>
                </div>
                <div className={styles.mediaWrapper}>
                    <MediaCarousel 
                        sources={sources} 
                        youtubeLink={youtubeLink}
                        accentColor={accentColor}
                        responsive={true}
                        simpleFrame={true}
                    />
                </div>
            </motion.div>

            {createPortal(
                <AnimatePresence>
                    {isExpanded && (
                        <>
                            <motion.div
                                className={styles.overlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                onClick={() => setIsExpanded(false)}
                            />
                            <motion.div
                                className={styles.expandedCard}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ 
                                    duration: 0.4, 
                                    ease: [0.19, 1, 0.22, 1],
                                    scale: { duration: 0.4 }
                                }}
                            >
                                <button 
                                    className={styles.closeButton}
                                    onClick={() => setIsExpanded(false)}
                                >
                                    ×
                                </button>
                                <div className={styles.expandedContent}>
                                    <div className={styles.expandedTitleSection}>
                                        <h2 className={styles.expandedTitle}>{title}</h2>
                                        {date && <span className={styles.expandedProjectDate}>{date}</span>}
                                    </div>
                                    <div className={styles.expandedMediaWrapper}>
                                        <MediaCarousel 
                                            sources={sources}
                                            youtubeLink={youtubeLink}
                                            accentColor={accentColor}
                                            responsive={true}
                                            simpleFrame={false}
                                            width="100%"
                                            height="auto"
                                        />
                                    </div>
                                    <div className={styles.expandedDescription}>
                                        {expandedContent.split('\n\n').map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ProjectCard;
