import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Desktop1.module.css";
import MediaCarousel from "../components/MediaCarousel";
import { FlipWords } from "../flip-words";
import ScrollingContactSection from "./ScrollingContactSection";
import FloatingSkills from "./FloatingSkills";
import TechnicalCompetencies from "./TechnicalCompetencies";
import FadeInUp from "./FadeInUp";
import IntroAnimation from "./IntroAnimation";
import ProjectCard from "../components/ProjectCard";

const Desktop1 = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [contentLoaded, setContentLoaded] = useState(false);

    const handleIntroComplete = () => {
        setShowIntro(false);
        setContentLoaded(true);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const contact = () => {
        const element = document.getElementById("bottom");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Example skill list
    const skillsList = [
        // Programming Languages
        {
            name: "Lua",
            image: "/LuaLogo.png",
            mainStrokeColor: `rgba(0, 0, 128, 1)`,
        },
        {
            name: "Luau",
            image: "/LuauLogo.png",
            mainStrokeColor: `rgba(0, 102, 204, 1)`,
        },
        {
            name: "JavaScript",
            image: "/JavaScriptLogo.png",
            mainStrokeColor: `rgba(240, 219, 79, 1)`,
        },
        {
            name: "TypeScript",
            image: "/TypeScriptLogo.png",
            mainStrokeColor: `rgba(49, 120, 198, 1)`,
        },
        {
            name: "Python",
            image: "/PythonLogo.png",
            mainStrokeColor: `rgba(52, 102, 153, 1)`,
        },
        {
            name: "C++",
            image: "/CppLogo.png",
            mainStrokeColor: `rgba(0, 102, 204, 1)`,
        },

        // Frameworks & Libraries
        {
            name: "React",
            image: "/ReactLogo.png",
            mainStrokeColor: `rgba(97, 218, 251, 1)`,
        },
        {
            name: "Next.js",
            image: "/NextLogo.png",
            mainStrokeColor: `rgba(0, 0, 0, 1)`,
        },
        {
            name: "Node.js",
            image: "/NodeLogo.png",
            mainStrokeColor: `rgba(0, 128, 0, 1)`,
        },
        {
            name: "Vite",
            image: "/ViteLogo.png",
            mainStrokeColor: `rgba(49, 90, 254, 1)`,
        },

        // Databases & DevOps
        {
            name: "PostgreSQL",
            image: "/PostgresLogo.png",
            mainStrokeColor: `rgba(49, 103, 172, 1)`,
        },
        {
            name: "Docker",
            image: "/DockerLogo.png",
            mainStrokeColor: `rgba(0, 136, 204, 1)`,
        },

        // Design & Creative Tools
        {
            name: "Figma",
            image: "/FigmaLogo.png",
            mainStrokeColor: `rgba(242, 78, 30, 1)`,
        },
        {
            name: "Adobe Photoshop",
            image: "/PhotoshopLogo.png",
            mainStrokeColor: `rgba(0, 168, 255, 1)`,
        },
        {
            name: "Substance Painter",
            image: "/SubstancePainterLogo.png",
            mainStrokeColor: `rgba(227, 79, 38, 1)`,
        },
        {
            name: "Blender",
            image: "/BlenderLogo.png",
            mainStrokeColor: `rgba(245, 117, 29, 1)`,
        },
        {
            name: "Adobe After Effects",
            image: "/AfterEffectsLogo.png",
            mainStrokeColor: `rgba(146, 119, 255, 1)`,
        },
        {
            name: "Adobe Premiere Pro",
            image: "/PremiereProLogo.png",
            mainStrokeColor: `rgba(63, 81, 181, 1)`,
        },
    ];

    return (
        <>
            <AnimatePresence>
                {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
            </AnimatePresence>
            
            <motion.div 
                className={styles.desktop}
                initial={{ opacity: 0 }}
                animate={{ opacity: contentLoaded ? 1 : 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.vignette} />
                <div className={styles.navbar}>
                    <div className={styles.topbuttons}>
                        <div onClick={() => scrollToSection("top")}>Introduction</div>
                        <div onClick={() => scrollToSection("experience")}>Experience</div>
                        <div onClick={() => scrollToSection("biography")}>Biography</div>
                        <div onClick={() => scrollToSection("education")}>Education</div>
                        <div onClick={() => scrollToSection("competencies")}>Competencies</div>
                        <div onClick={() => scrollToSection("projects")}>Projects</div>
                    </div>
                </div>

                <div id="top" className={styles.infocontact}>
                    <div className={styles.logo}>
                        <b className={styles.tomiOkelana}>Tomi Okelana</b>
                        <b className={styles.softwareEngineer}>
                            Software Engineer
                        </b>
                        <img
                            className={styles.personallogo1Icon}
                            alt=""
                            src="/personallogo-1@2x.png"
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={contact} className={styles.button}>
                            <div className={styles.buttonbackground} />
                            <div className={styles.buttoncontainer}>
                                <b className={styles.contact}>Contact</b>
                                <img
                                    className={styles.externalLinkIcon}
                                    alt=""
                                    src="/external-link@2x.png"
                                />
                            </div>
                        </button>
                    </div>
                </div>

                <div className={styles.infoParent}>
                    <div id="introduction" className={styles.info}>
                        <b className={styles.hiImTomiContainer}>
                            <p className={styles.hiImTomi}>
                                <span>Hey, My name is </span>
                                <span className={styles.tomi}>Tomi</span>
                            </p>
                            <p className={styles.welcomeToMyPortfolio}>
                                <span className={styles.welcomeTo}>and Welcome to my </span>
                                <FlipWords
                                    words={["My Portfolio", "My Projects"]}
                                    duration={8000}
                                    className={styles.tomi}
                                />
                            </p>
                        </b>
                        <div className={styles.techEnthusiastBased}>
                            Software Engineer & Creative Developer based in Oakville, Canada.
                        </div>
                        <div className={styles.passionateAboutLearning}>
                            Passionate about building intuitive software, game development, and AI-driven solutions.
                        </div>
                    </div>

                    <div id="biography" className={styles.biography}>
                        <b className={styles.sectionTitle}>
                            <FlipWords
                                words={["Biography", "Background"]}
                                duration={8000}
                                className={styles.flipTitle}
                            />
                        </b>
                        <div className={styles.biographyCard}>
                            <div className={styles.biographyContent}>
                                <p>
                                    I'm a freelance game developer and aspiring professional in interactive entertainment. My passion for development began at a young age when I was gifted a Nintendo DS. Using an Action Replay on the device sparked my curiosity about the inner workings of games and encouraged me to study the systems that make interactive experiences possible.
                                </p>
                                <p>
                                    I graduated high school in 2023 with an International Baccalaureate diploma. The program was rigorous and strengthened my understanding of core academic skills. During high school I began experimenting with game development in my free time, and after graduating I committed to it more seriously.
                                </p>
                                <p>
                                    I taught myself programming, design, and graphics, and soon began taking on freelance commission work. These projects gave me experience not only in coding but also in project management, client communication, and the business side of development.
                                </p>
                                <p>
                                    Today, I continue to expand my expertise in game engines, procedural generation, and interactive systems. Through building a diverse portfolio of projects, I aim to grow as both a developer and creative problem solver while working toward a professional career in the game industry or related fields.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id="experience" className={styles.education}>
                        <b className={styles.sectionTitle}>
                            <FlipWords
                                words={["Work", "History", "Career"]}
                                duration={4000}
                                className={styles.flipTitle}
                            />
                        </b>
                        <div className={styles.timelineContainer}>
                            <div className={styles.timelineLine}></div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2020 - Present</div>
                                    <h3>Freelance Game Developer</h3>
                                    <div className={styles.timelineSchool}>Independent Contractor</div>
                                    <p>Developing custom games and interactive experiences for clients. Specializing in procedural generation, gameplay mechanics, and technical implementation. Managing full project lifecycles from concept to delivery while maintaining client relationships and project timelines.</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2022</div>
                                    <h3>Sales Associate - Meat Department</h3>
                                    <div className={styles.timelineSchool}>Fortinos</div>
                                    <p>Provided customer service in a fast-paced retail environment. Maintained product displays, handled inventory management, and ensured food safety standards. Developed strong communication skills and attention to detail in a customer-focused role.</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2021 - 2022</div>
                                    <h3>Operations Associate (Volunteer)</h3>
                                    <div className={styles.timelineSchool}>Goodwill</div>
                                    <p>Managed incoming and outgoing apparel and items in a volunteer capacity. Organized inventory systems, processed donations, and maintained warehouse operations. Gained experience in logistics, organization, and community service while supporting charitable initiatives.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="education" className={styles.education}>
                        <b className={styles.sectionTitle}>
                            <FlipWords
                                words={["Education", "Academia"]}
                                duration={2000}
                                className={styles.flipTitle}
                            />
                        </b>
                        <div className={styles.timelineContainer}>
                            <div className={styles.timelineLine}></div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2023 - Present</div>
                                    <h3>BA Hons. Maj/Min Information Technology & Computational Arts and Technology Minor</h3>
                                    <div className={styles.timelineSchool}>York University</div>
                                    <p>Studying software engineering fundamentals, game development, and digital media creation. Coursework includes data structures, algorithms, computer graphics, and interactive system design.</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2023</div>
                                    <h3>Data Science Certification</h3>
                                    <div className={styles.timelineSchool}>University of Waterloo</div>
                                    <p>Focus on data analysis, machine learning, and statistical modeling.</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2020 - Present</div>
                                    <h3>Freelance Game Development</h3>
                                    <div className={styles.timelineSchool}></div>
                                    <p>Self-taught curriculum covering a wide range of game development areas, including Unity, Roblox, Lua, C++, and 2D/3D graphics.</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineYear}>2019 - 2023</div>
                                    <h3>International Baccalaureate Diploma</h3>
                                    <div className={styles.timelineSchool}>Saint Thomas Aquinas Oakville</div>
                                    <p>Comprehensive international curriculum emphasizing critical thinking, research skills, and global awareness. Courses: English Lang. and Lit. HL, Business Management HL, Chemistry HL, French SL, Physics SL, Math Analysis SL</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FloatingSkills skills={skillsList} />

                    <TechnicalCompetencies />

                    <div id="projects" className={styles.gallery1}>
                        <b className={styles.gallery2}>Personal Projects</b>
                        <div className={styles.aVisualShowcase}>
                            Completed and ongoing development projects, a showcase of my notable development and creative projects. 
                        </div>
                        <div className={styles.projectsContainer}>
                            <FadeInUp delay={0.0}>
                                <ProjectCard
                                    title="Starlight Cutscene"
                                    description="A cinematic, real-time cutscene showcasing advanced animation and visual effects techniques."
                                    expandedContent={`A cinematic sequence exploring narrative, animation flow, and the integration of multiple mediums.

Technologies Used: Lua, Blender, Adobe Photoshop

The Starlight Cutscene was a project where I focused on creating a smooth and cohesive narrative experience. My goal was to build a sequence that flowed without feeling choppy, balancing pacing, visuals, and transitions so that the story unfolded in a natural way.

This project taught me the importance of rhythm in animation. Every movement, camera shift, and effect had to connect to the next, forming a sequence that felt intentional rather than stitched together. I learned how small details such as easing curves, visual timing, and color transitions can shape the emotional tone of a scene.

It also showed me how animation connects with other mediums. Programming, visual effects, sound, and design choices all merged into a single piece. The project gave me a deeper understanding of how these elements support one another and how to bring them together into a final cohesive work.`}
                                    sources={["/Cutscene.mp4", "/InnerWorkings.mp4"]}
                                    accentColor="rgba(72, 72, 72, 1)"
                                    date="2025"
                                    delay={0.0}
                                />
                            </FadeInUp>

                            <FadeInUp delay={0.3}>
                                <ProjectCard
                                    title="ShaderScape"
                                    description="A generative art project built with shaders, blending C++ and p5.js to create evolving, colorful 3D structures."
                                    expandedContent={`A generative 3D field of holographic pillars created with GLSL fragment shaders.

Technologies Used: C++, p5.js

ShaderScape was my introduction to writing shaders from the ground up. I wanted to explore how fragment shaders could drive generative art, and I built a system where color, shape, and movement all came from simple mathematical rules. The pillars react to input values and transform into a holographic field that shifts as parameters change.

Working on ShaderScape taught me how fragment shaders process pixels, and how small changes in formulas can produce dramatic differences in output. I learned how to use functions like sine and noise to control color gradients and depth, and how to combine them to create effects that look more complex than the code behind them.

The project gave me a foundation in shader programming and showed me how math and visual design connect. It shaped how I think about real-time graphics and how I use shaders to build atmosphere and style in other projects.`}
                                    sources={["/Generative Art with Shaders.mp4"]}
                                    youtubeLink="https://www.youtube.com/watch?v=_Cs6kqOZeKY"
                                    accentColor="rgba(39, 27, 38, 1)"
                                    date="2024"
                                    delay={0.3}
                                />
                            </FadeInUp>

                            <FadeInUp delay={0.6}>
                                <ProjectCard
                                    title="MorphGrid"
                                    description="A procedural map generator where pieces adapt and transform based on nearby structures, creating layouts that evolve organically."
                                    expandedContent={`A procedural map generator built in extension to my developed LethalClone Game. Where layouts evolve around a central elevator shaft and deeper floors unlock rarer rewards.

Technologies Used: Lua

MorphGrid was designed to solve a specific problem: how to create a procedural facility that feels structured while still unpredictable. In LethalClone, I wanted players to descend through levels where resources became rarer and more valuable. To support this, each floor needed a central elevator shaft and a key system that let players return to the surface quickly.

The challenge was placing rooms in a way that preserved the elevator shaft and kept navigation coherent. My approach was to give each room rules about how it connected to others, and to let those rules adapt based on what was already placed. This meant the layout could grow outward while respecting the fixed position of the elevator shaft.

At the time I had not learned about wave function collapse. The mechanic of adjacent nodes influencing each other came from experimenting with heuristics. I treated the generator as a constraint system where one piece limited the possibilities of its neighbors. This kept maps functional while still producing variety.

The methods I developed for MorphGrid carried over into other projects that required procedural map generation. The same ideas of local constraints, adjacency, and adaptive growth shaped how I designed generators beyond LethalClone. MorphGrid became a foundation for how I approach procedural systems as a whole.`}
                                    sources={["/ProceduralMap.mp4", "/OutsideMap.mp4", "/InsideMap.mp4"]}
                                    accentColor="rgba(35, 46, 31, 1)"
                                    date="2023"
                                    delay={0.6}
                                />
                            </FadeInUp>

                            <FadeInUp delay={0.9}>
                                <ProjectCard
                                    title="LethalClone"
                                    description="A survival-horror prototype testing gameplay design, dynamic lighting, and interactive environments."
                                    expandedContent={`A survival and exploration project inspired by Lethal Company, built to explore procedural generation and gameplay loop design.

Technologies Used: Lua, Adobe Photoshop, Blender, Substance Painter

LethalClone was where I studied how to design layered gameplay systems that interact to form complete loops. The central mechanic was the ship, which acted as both a hub and a checkpoint. Players used a terminal on board to order supplies, manage resources, and prepare for the next run.

Each expedition began by leaving the safety of the ship to explore a facility. Deeper floors held rarer items but carried more risk. To return, players had to find a key and bring it back to the elevator shaft, feeding into a loop of exploration, escalation, and retreat. The ship tied this all together by resetting the cycle and providing strategic decisions between expeditions.

Supporting systems reinforced these loops. Procedural generation controlled room placement, AI navigated changing layouts, and progression pacing ensured that challenges escalated without becoming random. Each mechanic was simple on its own, but together they created a complex structure that made survival meaningful.

LethalClone taught me how central hubs like the ship and terminal can anchor a game loop. I learned how mechanics connect across runs, and how strong progression depends on clear constraints and interlocking systems.`}
                                    sources={["/Terminal.mp4", "/Gameplay.mp4"]}
                                    accentColor="rgba(35, 27, 13, 1)"
                                    date="2023"
                                    delay={0.9}
                                />
                            </FadeInUp>
                        </div>
                    </div>

                    {/* CONTACT / FOOTER */}
                    <div className={styles.contact1}>
                        <div className={styles.contactCallToAction}>
                            Thanks for reading! If you like what you see, feel free to contact me!
                        </div>
                        <div id="bottom" className={styles.contactFormWrapper}>
                            <div className={styles.contactFormCard}>
                                <div className={styles.contactFormHeader}>
                                    <h2 className={styles.contactFormTitle}>Contact Me</h2>
                                    <p className={styles.contactFormSub}>Fill up the form below to send me a message.</p>
                                </div>
                                <form
                                    action="https://api.web3forms.com/submit"
                                    method="POST"
                                    id="contactForm"
                                    noValidate
                                >
                                    <input type="hidden" name="access_key" value="79f38dca-9cce-4064-bea6-b6b08f1d8499" />
                                    <input type="hidden" name="subject" value="New Submission from portfolio site" />
                                    <input type="checkbox" name="botcheck" style={{ display: 'none' }} readOnly />

                                    <div className={styles.contactFormGrid}>
                                        <div className={styles.contactFormCol}>
                                            <label htmlFor="first_name" className={styles.contactLabel}>First Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="first_name"
                                                placeholder=""
                                                required
                                                className={styles.contactInput}
                                            />
                                        </div>
                                        <div className={styles.contactFormCol}>
                                            <label htmlFor="last_name" className={styles.contactLabel}>Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                placeholder=""
                                                required
                                                className={styles.contactInput}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.contactFormGrid}>
                                        <div className={styles.contactFormCol}>
                                            <label htmlFor="email" className={styles.contactLabel}>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="you@company.com"
                                                required
                                                className={styles.contactInput}
                                            />
                                        </div>
                                        <div className={styles.contactFormCol}>
                                            <label htmlFor="phone" className={styles.contactLabel}>Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder="+1 (555) 1234-567"
                                                required
                                                className={styles.contactInput}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.contactFormCol} style={{ flexBasis: '100%' }}>
                                        <label htmlFor="message" className={styles.contactLabel}>Your Message</label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            id="message"
                                            placeholder="Your Message"
                                            className={styles.contactTextarea}
                                            required
                                        />
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <button type="submit" className={styles.contactButton}>Send Message</button>
                                    </div>
                                    <p className={styles.contactResult} id="result"></p>
                                </form>
                            </div>
                        </div>

                        <div className={styles.contactInner}>
                            <div className={styles.frameChild} />
                        </div>
                        <div className={styles.frameContainer}>
                            <ScrollingContactSection />
                        </div>
                        <div className={styles.contactInner}>
                            <div className={styles.frameChild} />
                        </div>
                        <div className={styles.contactChild}>
                            <div className={styles.frameParent1}>
                                <div className={styles.tomiOkelanaDigitalCreatioParent}>
                                    <b className={styles.tomiOkelana2}>
                                        2025 Tomi Okelana
                                    </b>
                                    <div className={styles.personallogo1Parent}>
                                        <img
                                            className={styles.personallogo1Icon1}
                                            alt=""
                                            src="/personallogo-11@2x.png"
                                        />
                                        <b className={styles.tomiOkelana3}>
                                            <span>{`<tomi>`}</span>
                                            <span className={styles.welcomeTo}> okelana</span>
                                        </b>
                                    </div>
                                </div>
                                <div className={styles.frameParent2}>
                                    <div
                                        id="introductionParent"
                                        className={styles.introductionParent}
                                    >
                                        <div onClick={() => scrollToSection("top")}>Introduction</div>
                                        <div onClick={() => scrollToSection("experience")}>Experience</div>
                                        <div onClick={() => scrollToSection("biography")}>Biography</div>
                                        <div onClick={() => scrollToSection("education")}>Education</div>
                                        <div onClick={() => scrollToSection("competencies")}>Competencies</div>
                                        <div onClick={() => scrollToSection("projects")}>Projects</div>
                                    </div>
                                    <b className={styles.cookieFreeWebsite}>Cookie free website</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Desktop1;
