import styles from "./Desktop1.module.css";
import { FlipWords } from "../flip-words";
import ScrollingContactSection from "./ScrollingContactSection";
import Skills from "./Skills";

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

  const skillsList = [
    { name: "Vite", image: "/image-2@2x.png", gradientClass: "image2Parent" },
    { name: "Roblox Fusion", image: "/fusoinlogo-1@2x.png", gradientClass: "fusoinlogo1Parent" },
    { name: "Roblox Fusion", image: "/fusoinlogo-1@2x.png", gradientClass: "fusoinlogo1Parent" },
    // Add more skills here
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
      <div id="top" className={styles.infocontact}>
        <div className={styles.logo}>
          <b className={styles.tomiOkelana}>Tomi Okelana</b>
          <b className={styles.digitalCreationGeneralist}>
            Digital Creation Generalist
          </b>
          <img
            className={styles.personallogo1Icon}
            alt=""
            src="/personallogo-1@2x.png"
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={() => contact()} className={styles.button}>
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
              <span>{`Hi, i’m `}</span>
              <span className={styles.tomi}>Tomi</span>
            </p>
            <p className={styles.welcomeToMyPortfolio}>
              <span className={styles.welcomeTo}>{`Welcome to `}</span>
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
        <Skills skills={skillsList} />
        <div id="gallery" className={styles.gallery1}>
          <b className={styles.gallery2}>Gallery</b>
          <div className={styles.aVisualShowcase}>
            A visual showcase of my creative projects.
          </div>
          <div className={styles.galleryInner}>
            <div className={styles.frameWrapper}>
              <div className={styles.frameGroup}>
                <div className={styles.worknameParent}>
                  <b className={styles.workname}>workName</b>
                  <div className={styles.loremIpsumDolor}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                  </div>
                </div>
                <img
                  className={styles.image3Icon}
                  alt=""
                  src="/image-3@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contact1}>
          <div className={styles.contactInner}>
            <div className={styles.frameChild} />
          </div>
          <div className={styles.frameContainer}>
            <ScrollingContactSection/>
          </div>
          <div id="bottom" className={styles.contactChild}>
            <div className={styles.frameParent1}>
              <div className={styles.tomiOkelanaDigitalCreatioParent}>
                <b className={styles.tomiOkelana2}>
                  2024 Tomi Okelana | Digital Creation Generalist
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
