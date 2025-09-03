import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectCardExpanded.module.css';

const ProjectCardExpanded = ({ title, description, media, onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                className={styles.expandedCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2 className={styles.title}>{title}</h2>
                {media && <div className={styles.media}>{media}</div>}
                <div className={styles.content}>{description}</div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectCardExpanded;
