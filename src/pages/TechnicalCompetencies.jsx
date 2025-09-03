import React from "react";
import { motion } from "framer-motion";
import styles from "./TechnicalCompetencies.module.css";

const TechnicalCompetencies = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      id="competencies"
      className={styles.competenciesContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2 
        className={styles.mainTitle}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Technical Competencies
      </motion.h2>
      
      <motion.p 
        className={styles.introText}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
            Below are the technical skills I've developed through my studies in Information Technology, my work in game development, and my ongoing projects in software engineering. I have a solid foundation in each and the ability to learn quickly when deeper expertise is needed. I'm confident in applying these skills to real projects and in strengthening them further through practice and collaboration.
        </p>
      </motion.p>
      
      <motion.div 
        className={styles.competenciesGrid}
        variants={containerVariants}
      >
        <motion.div 
          className={styles.competencyCard}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className={styles.cardIcon}>
            <span className={styles.mobileIcon}>💻</span>
          </div>
          <h3 className={styles.cardTitle}>Languages</h3>
          <p className={styles.cardContent}>
              I am experienced in Python, C and C++, Java, JavaScript, Bash, SQL, Assembly, HTML, CSS, Lua, Luau, and LaTeX.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.competencyCard}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className={styles.cardIcon}>
            <span className={styles.desktopIcon}>⚙️</span>
          </div>
          <h3 className={styles.cardTitle}>Coding Methodologies</h3>
          <p className={styles.cardContent}>
              I apply object-oriented programming, functional programming, and test-driven development in my projects. I also use version control with Git and follow agile practices when working in teams.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.competencyCard}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className={styles.cardIcon}>
                      <span className={styles.triangleIcon}>📁</span>
          </div>
          <h3 className={styles.cardTitle}>Project Management</h3>
          <p className={styles.cardContent}>
              I manage projects using GitHub and apply skills in presentation, team leadership, and cross-team communication. I also plan projects with a focus on clear goals and structured timelines.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.competencyCard}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className={styles.cardIcon}>
            <span className={styles.cubeIcon}>🎯</span>
          </div>
          <h3 className={styles.cardTitle}>Interests</h3>
          <p className={styles.cardContent}>
              My interests include software engineering, cybersecurity, machine learning, artificial intelligence, generative AI, and data visualization. I also follow developments in blockchain, cryptocurrency, and enjoy watching American football.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.competencyCard}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className={styles.cardIcon}>
            <span className={styles.globeIcon}>📚</span>
          </div>
          <h3 className={styles.cardTitle}>Relevant Courses</h3>
          <p className={styles.cardContent}>
               I have completed courses in data structures and algorithms, systems design covering operating systems, computer organization, and security, as well as AI and machine learning. My background also includes advanced mathematics, with coursework in calculus, linear algebra, statistics, and discrete mathematics.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.competencyCard}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className={styles.cardIcon}>
                      <span className={styles.serverIcon}>📈</span>
          </div>
          <h3 className={styles.cardTitle}>Development</h3>
          <p className={styles.cardContent}>
              I develop on Linux and MacOS and work with virtual machines, Docker, and React. I use JSON, Anaconda, and data science libraries such as NumPy, Pandas, and Matplotlib. I also work with machine learning frameworks like PyTorch and TensorFlow, as well as GPT and other generative AI tools.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TechnicalCompetencies;
