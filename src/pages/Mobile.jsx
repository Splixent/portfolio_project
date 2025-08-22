import styles from "./Mobile.module.css";
import { FlipWords } from "../flip-words";
import Skills from "./Skills";
import MediaCarousel from "../components/MediaCarousel";
import ScrollingContactSection from "./ScrollingContactSection";

const Mobile = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const skillsList = [
    { name: "Lua", image: "/LuaLogo.png", mainStrokeColor: `rgba(0, 0, 128, 1)` },
    { name: "Luau", image: "/LuauLogo.png", mainStrokeColor: `rgba(0, 102, 204, 1)` },
    { name: "JavaScript", image: "/JavaScriptLogo.png", mainStrokeColor: `rgba(240, 219, 79, 1)` },
    { name: "TypeScript", image: "/TypeScriptLogo.png", mainStrokeColor: `rgba(49, 120, 198, 1)` },
    { name: "Python", image: "/PythonLogo.png", mainStrokeColor: `rgba(52, 102, 153, 1)` },
    { name: "C++", image: "/CppLogo.png", mainStrokeColor: `rgba(0, 102, 204, 1)` },
    { name: "React", image: "/ReactLogo.png", mainStrokeColor: `rgba(97, 218, 251, 1)` },
    { name: "Next.js", image: "/NextLogo.png", mainStrokeColor: `rgba(0, 0, 0, 1)` },
    { name: "Node.js", image: "/NodeLogo.png", mainStrokeColor: `rgba(0, 128, 0, 1)` },
    { name: "Vite", image: "/ViteLogo.png", mainStrokeColor: `rgba(49, 90, 254, 1)` },
    { name: "PostgreSQL", image: "/PostgresLogo.png", mainStrokeColor: `rgba(49, 103, 172, 1)` },
    { name: "Docker", image: "/DockerLogo.png", mainStrokeColor: `rgba(0, 136, 204, 1)` },
    { name: "Figma", image: "/FigmaLogo.png", mainStrokeColor: `rgba(242, 78, 30, 1)` },
    { name: "Adobe Photoshop", image: "/PhotoshopLogo.png", mainStrokeColor: `rgba(0, 168, 255, 1)` },
    { name: "Substance Painter", image: "/SubstancePainterLogo.png", mainStrokeColor: `rgba(227, 79, 38, 1)` },
    { name: "Blender", image: "/BlenderLogo.png", mainStrokeColor: `rgba(245, 117, 29, 1)` },
    { name: "Adobe After Effects", image: "/AfterEffectsLogo.png", mainStrokeColor: `rgba(146, 119, 255, 1)` },
    { name: "Adobe Premiere Pro", image: "/PremiereProLogo.png", mainStrokeColor: `rgba(63, 81, 181, 1)` },
  ];

  return (
    <div className={styles.mobileRoot}>

      {/* Red gradient fade background for mobile top */}
      <div className={styles.mobileVignette} />
      {/* Top bar: logo/name/subtitle left, contact button right */}
      <div className={styles.mobileTopBar}>
        <div className={styles.mobileLogoBlock}>
          <img src="/personallogo-1@2x.png" alt="logo" className={styles.mobileLogoImg} />
          <div className={styles.mobileLogoTextBlock}>
            <b className={styles.mobileName}>Tomi Okelana</b>
            <span className={styles.mobileSubtitle}>Software Engineer</span>
          </div>
        </div>
        <button onClick={() => scrollTo('contact')} className={styles.mobileContactBtn}>
          <span>Contact</span>
          <img src="/external-link@2x.png" alt="Contact" className={styles.mobileContactIcon} />
        </button>
      </div>

      {/* Desktop-style nav bar for mobile */}
      <nav className={styles.navbar}>
        <div className={styles.mobileNavBar}>
          <div className={styles.mobileNavInner}>
            <button onClick={() => scrollTo("top")} className={styles.mobileNavBtn}>Introduction</button>
            <button onClick={() => scrollTo("skills")} className={styles.mobileNavBtn}>Skills</button>
            <button onClick={() => scrollTo("gallery")} className={styles.mobileNavBtn}>Gallery</button>
          </div>
        </div>
      </nav>

      {/* Hero section: matches desktop structure, scaled for mobile */}
      <section id="top" className={styles.introHero}>
        <div className={styles.introHeroText}>
          <h1 className={styles.introHeroTitle}>
            <span className={styles.introHeroHi}>Hi, I’m </span>
            <span className={styles.accent}>Tomi</span>
          </h1>
          <h2 className={styles.introHeroSubtitle}>
            <span className={styles.introHeroWelcome}>Welcome to </span>
            <FlipWords words={["My Portfolio", "My Art", "My Projects", "My Work"]} className={styles.accent} />
          </h2>
          <div className={styles.introHeroDescMain}>Tech enthusiast based out of Oakville Canada.</div>
          <div className={styles.introHeroDescSub}>Passionate about learning tech, game design and creative projects.</div>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <p className={styles.sectionSub}>The skills and expertise that define my work.</p>
        <Skills
          skills={skillsList}
          showTitle={false}
          showSubtitle={false}
          showInfoPanel={false}
          iconSize={40}
          pillHeight={60}
          collapsedWidth={60}
          expandedWidth={200}
          labelMax={140}
        />
      </section>

      <section id="gallery" className={styles.section}>
        <h2 className={styles.sectionTitle}>Gallery</h2>
        <p className={styles.sectionSub}>A visual showcase of my creative projects.</p>

        <div className={styles.card}>
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>MorphGrid</h3>
            <p className={styles.cardDesc}>MorphGrid is a procedural map generator where pieces adapt and transform based on nearby structures, creating layouts that evolve organically. Inspired by wave function collapse and adapted into newer projects.</p>
          </div>
          <MediaCarousel sources={["/ProceduralMap.mp4", "/OutsideMap.mp4", "/InsideMap.mp4"]} accentColor="rgba(35, 46, 31, 1)" responsive aspectRatio="16 / 9" simpleFrame />
        </div>

        <div className={styles.card}>
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>ShaderScape</h3>
            <p className={styles.cardDesc}>ShaderScape is a generative art project built with shaders, blending C++ and p5.js to create evolving, colorful 3D structures. By layering procedural rules with GPU-driven rendering, it explores how simple instructions can generate vibrant, complex forms in real time.</p>
          </div>
          <MediaCarousel sources={["/Generative Art with Shaders.mp4"]} youtubeLink="https://www.youtube.com/watch?v=_Cs6kqOZeKY" accentColor="rgba(39, 27, 38, 1)" responsive aspectRatio="16 / 9" simpleFrame />
        </div>

        <div className={styles.card}>
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>LethalClone</h3>
            <p className={styles.cardDesc}>A survival-horror prototype built to test my skills in gameplay design, dynamic lighting, and interactive environments. Recreating Lethal Company pushed me to replicate complex gameplay loops while refining my approach to atmosphere and player experience.</p>
          </div>
          <MediaCarousel sources={["/Terminal.mp4", "/Gameplay.mp4"]} accentColor="rgba(35, 27, 13, 1)" responsive aspectRatio="16 / 9" simpleFrame />
        </div>

        <div className={styles.card}>
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>Starlight Cutscene</h3>
            <p className={styles.cardDesc}>A cinematic, real-time cutscene for a game, created with Blender, Photoshop, and VFX tools. As the project’s scope grew too large, I learned the importance of speed, planning, and efficiency, while also gaining valuable experience in animation and visual effects.</p>
          </div>
          <MediaCarousel sources={["/Cutscene.mp4", "/InnerWorkings.mp4"]} accentColor="rgba(72, 72, 72, 1)" responsive aspectRatio="16 / 9" simpleFrame />
        </div>
      </section>

      {/* Contact / Footer mirrors desktop structure */}
      <section className={styles.contactSection} id="contact">
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.contactFormWrapper}>
          <div className={styles.contactFormCard}>
            <div className={styles.contactFormHeader}>
              <h3 className={styles.contactFormTitle}>Contact Me</h3>
              <p className={styles.contactFormSub}>Fill up the form below to send me a message.</p>
            </div>
            <form action="https://api.web3forms.com/submit" method="POST" noValidate>
              <input type="hidden" name="access_key" value="79f38dca-9cce-4064-bea6-b6b08f1d8499" />
              <input type="hidden" name="subject" value="New Submission from portfolio site" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} readOnly />

              <div className={styles.contactFormGrid}>
                <div className={styles.contactFormCol}>
                  <label htmlFor="first_name" className={styles.contactLabel}>First Name</label>
                  <input type="text" name="name" id="first_name" required className={styles.contactInput} />
                </div>
                <div className={styles.contactFormCol}>
                  <label htmlFor="last_name" className={styles.contactLabel}>Last Name</label>
                  <input type="text" name="last_name" id="last_name" required className={styles.contactInput} />
                </div>
              </div>

              <div className={styles.contactFormGrid}>
                <div className={styles.contactFormCol}>
                  <label htmlFor="email" className={styles.contactLabel}>Email Address</label>
                  <input type="email" name="email" id="email" placeholder="you@company.com" required className={styles.contactInput} />
                </div>
                <div className={styles.contactFormCol}>
                  <label htmlFor="phone" className={styles.contactLabel}>Phone Number</label>
                  <input type="text" name="phone" id="phone" placeholder="+1 (555) 1234-567" required className={styles.contactInput} />
                </div>
              </div>

              <div className={styles.contactFormCol} style={{ flexBasis: '100%' }}>
                <label htmlFor="message" className={styles.contactLabel}>Your Message</label>
                <textarea rows={5} name="message" id="message" placeholder="Your Message" className={styles.contactTextarea} required />
              </div>

              <div style={{ marginTop: 12 }}>
                <button type="submit" className={styles.contactButton}>Send Message</button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.separator} />
        <div className={styles.scrollerWrap}>
          <ScrollingContactSection />
        </div>
        <div className={styles.separator} />

        <footer id="bottom" className={styles.mobileFooter}>
          <div className={styles.footerLeft}>
            <strong>2025 Tomi Okelana</strong>
            <div className={styles.footerLogo}>
              <img src="/personallogo-11@2x.png" alt="logo" />
              <b>
                <span>{`<tomi>`}</span>
                <span> okelana</span>
              </b>
            </div>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.footerLinks}>
              <button onClick={() => scrollTo('top')}>Introduction</button>
              <button onClick={() => scrollTo('skills')}>Skills</button>
              <button onClick={() => scrollTo('gallery')}>Gallery</button>
            </div>
            <b className={styles.cookie}>Cookie free website</b>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Mobile;
