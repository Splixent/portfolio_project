// Desktop1.jsx
import styles from "./Desktop1.module.css";
import { FlipWords } from "../flip-words";
import ScrollingContactSection from "./ScrollingContactSection";
import Skills from "./Skills";
import FadeInUp from "./FadeInUp"; // path to your new file

const Desktop1 = () => {
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
        <div className={styles.desktop}>
            <div className={styles.vignette} />
            <div className={styles.navbar}>
                <div className={styles.topbuttons}>
                    <div onClick={() => scrollToSection("top")}>Introduction</div>
                    <div onClick={() => scrollToSection("skills")}>Skills</div>
                    <div onClick={() => scrollToSection("gallery")}>Gallery</div>
                </div>
            </div>

            {/* TOP / HEADER */}
            <div id="top" className={styles.infocontact}>
                <div className={styles.logo}>
                    <b className={styles.tomiOkelana}>Tomi Okelana</b>
                    <b className={styles.digitalCreationGeneralist}>
                        Digital Creation Specialist
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
                {/* INTRODUCTION SECTION */}
                <div id="introduction" className={styles.info}>
                    <b className={styles.hiImTomiContainer}>
                        <p className={styles.hiImTomi}>
                            <span>Hi, i’m </span>
                            <span className={styles.tomi}>Tomi</span>
                        </p>
                        <p className={styles.welcomeToMyPortfolio}>
                            <span className={styles.welcomeTo}>Welcome to </span>
                            <FlipWords
                                words={["My Portfolio", "My Art", "My Projects", "My Work"]}
                                classname={styles.tomi}
                            />
                        </p>
                    </b>
                    <div className={styles.techEnthusiastBased}>
                        Tech enthusiast based out of Oakville Canada.
                    </div>
                    <div className={styles.passionateAboutLearning}>
                        Passionate about learning tech, game design and creative projects.
                    </div>
                </div>

                {/* SKILLS SECTION */}
                <Skills skills={skillsList} />

                {/* GALLERY SECTION */}
                <div id="gallery" className={styles.gallery1}>
                    <b className={styles.gallery2}>Gallery</b>
                    <div className={styles.aVisualShowcase}>
                        A visual showcase of my creative projects.
                    </div>
                    <div className={styles.galleryInner}>
                        <div className={styles.frameWrapper}>
                            {/* FIRST ITEM, delay=0.0s => no delay */}
                            <FadeInUp delay={0.0}>
                                <div className={styles.frameGroup}>
                                    <div className={styles.worknameParent}>
                                        <b className={styles.workname}>workName</b>
                                        <div className={styles.loremIpsumDolor}>
                                            Lorem ipsum dolor sit amet...
                                        </div>
                                    </div>
                                    <img className={styles.image3Icon} alt="" src="/image-3@2x.png" />
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </div>

                {/* CONTACT / FOOTER */}
                <div className={styles.contact1}>
                    <div className={styles.contactInner}>
                        <div className={styles.frameChild} />
                    </div>
                    <div className={styles.frameContainer}>
                        <ScrollingContactSection />
                    </div>
                    <div id="bottom" className={styles.contactChild}>
                        <div className={styles.frameParent1}>
                            <div className={styles.tomiOkelanaDigitalCreatioParent}>
                                <b className={styles.tomiOkelana2}>
                                    2024 Tomi Okelana | Digital Creation Specialist
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
                                    <div onClick={() => scrollToSection("skills")}>Skills</div>
                                    <div onClick={() => scrollToSection("gallery")}>Gallery</div>
                                </div>
                                <b className={styles.cookieFreeWebsite}>Cookie free website</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Desktop1;
