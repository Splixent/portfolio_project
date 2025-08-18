import styles from "./Desktop1.module.css";

const AutoScrollingText = ({ id, items }) => {
  // Increase duplication count for a seamless effect
  const DUPLICATE_COUNT = 1000; // Increase if needed

  return (
    <div className={styles.tomiokelanagmailcomWrapper} id={id}>
      <div className={styles.scrollWrapper}>
        <div className={styles.scrollContent}>
          {/* Original Content + Multiple Duplicates for Seamless Scrolling */}
          {Array.from({ length: DUPLICATE_COUNT }).flatMap((_, dupIndex) =>
            items.map((item, itemIndex) => (
              <div key={`${dupIndex}-${itemIndex}`} className={styles.scrollItem}>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ScrollingContactSection = () => {
  return (
    <div className={styles.frameContainer}>
      {/* Email Row */}
      <AutoScrollingText
        id="email"
        items={[<b className={styles.contact}>tomi.okelana@gmail.com</b>]}
      />

      {/* Instagram Row */}
      <AutoScrollingText
        id="instagram"
        items={[
          <div className={styles.image4Parent}>
            <img className={styles.image4Icon} alt="Instagram" src="/image-4@2x.png" />
            <b className={styles.contact}>@tomiokel</b>
          </div>,
        ]}
      />

      {/* LinkedIn Row */}
      <AutoScrollingText
        id="linkedin"
        items={[
          <div className={styles.image4Parent}>
            <img className={styles.image4Icon} alt="LinkedIn" src="/image-41@2x.png" />
            <b className={styles.contact}>Tomi Okelana</b>
          </div>,
        ]}
      />
    </div>
  );
};

export default ScrollingContactSection;
