import styles from "./Desktop1.module.css";
import { FlipWords } from "../flip-words";

const Desktop1 = () => {
  return (
    <div className={styles.desktop} id="mainRoot">
      <div className={styles.vignette} />
      <div className={styles.navbar} >
        <div className={styles.topbuttons}>
          <div className={styles.introduction}>Introduction</div>
          <div className={styles.skills}>Skills</div>
          <div className={styles.skills}>Gallery</div>
        </div>
      </div>
      <div className={styles.infocontact}>
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
          <div className={styles.button}>
            <div className={styles.buttonbackground} />
            <div className={styles.buttoncontainer}>
              <b className={styles.contact}>Contact</b>
              <img
                className={styles.externalLinkIcon}
                alt=""
                src="/external-link@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoParent}>
        <div className={styles.info}>
          <b className={styles.hiImTomiContainer}>
            <p className={styles.hiImTomi}>
              <span>{`Hi, i’m `}</span>
              <span className={styles.tomi}>Tomi</span>
            </p>
            <p className={styles.welcomeToMyPortfolio}>
              <span className={styles.welcomeTo}>{`Welcome to `}</span>
              <FlipWords words={["My Portfolio", "My Art", "My Projects", "My Work"]} classname={styles.tomi} />
            </p>
          </b>
          <div className={styles.techEnthusiastBased}>
            Tech enthusiast based out of Oakville Canada.
          </div>
          <div className={styles.passionateAboutLearning}>
            Passionate about learning tech, game design and creative projects.
          </div>
        </div>
        <div className={styles.skills1}>
          <b className={styles.skills2}>Skills</b>
          <div className={styles.theSkillsAnd}>
            The skills and expertise that define my work.
          </div>
          <div className={styles.frameParent}>
            <div className={styles.image2Parent}>
              <img className={styles.image2Icon} alt="" src="/image-2@2x.png" />
              <b className={styles.vite}>Vite</b>
            </div>
            <div className={styles.fusoinlogo1Parent}>
              <img
                className={styles.fusoinlogo1Icon}
                alt=""
                src="/fusoinlogo-1@2x.png"
              />
              <b className={styles.vite}>roblox-fusion</b>
            </div>
          </div>
        </div>
        <div className={styles.gallery1}>
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
            <div className={styles.tomiokelanagmailcomWrapper}>
              <b className={styles.contact}>tomi.okelana@gmail.com</b>
            </div>
            <div className={styles.tomiokelanagmailcomWrapper}>
              <div className={styles.image4Parent}>
                <img
                  className={styles.image4Icon}
                  alt=""
                  src="/image-4@2x.png"
                />
                <b className={styles.contact}>@tomiokel</b>
              </div>
            </div>
            <div className={styles.tomiokelanagmailcomWrapper}>
              <div className={styles.image4Parent}>
                <img
                  className={styles.image4Icon}
                  alt=""
                  src="/image-41@2x.png"
                />
                <b className={styles.contact}>Tomi Okelana</b>
              </div>
            </div>
          </div>
          <div className={styles.contactChild}>
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
                <div className={styles.introductionParent}>
                  <b className={styles.introduction1}>introduction</b>
                  <b className={styles.contact}>skills</b>
                  <b className={styles.contact}>gallery</b>
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
