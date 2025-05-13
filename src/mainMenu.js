import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/mainMenu.module.css';

import BubblesBackground from './bubblesBackground.js';
import MainMenuBackgoundAnimation from './mainMenuBackgroundAnimation.js';
import Footer from './footer.js';

const MainMenu = () => {
  //Use state to trigger the animation for fading out
  const [animate,setAnimate] = React.useState(false);

  //Use state to trigger the background animation for the button hovers
  const [infoHover, setInfoHover] = React.useState(false);
  const [ratioHover, setRatioHover] = React.useState(false);
  const [probabilityHover, setProbabilityHover] = React.useState(false);
  const [universalHover, setUniversalHover] = React.useState(false);

  const navigate = useNavigate();

  const triggerAnimation = (navigationLink) => {
    setAnimate(true);

    setTimeout(() => navigate(navigationLink), 750);
  }

  return (
    <div className={styles.background}>
      <BubblesBackground animate={animate}/>
      <MainMenuBackgoundAnimation animate={animate} info={infoHover} ratio={ratioHover} probability={probabilityHover} universal={universalHover}/>
      <div className={styles.mainMenuContainer + " " + (animate ? styles.fadeoutContainer: "")}>
        <h1>Welcome to PaceMaths</h1>
        <p className={styles.text}>
          This website is made to train various maths skills.
          If this is your first time here, please read the information page to learn more about the website.
        </p>
        <p className={styles.button}
          onClick={() => triggerAnimation("/gcse-maths-quiz-website/information")}
          onMouseEnter={() => setInfoHover(true)}
          onMouseLeave={() => setInfoHover(false)}>Information Page</p>
        <p className={styles.button} 
          onClick={() => triggerAnimation("/gcse-maths-quiz-website/ratio-quiz")}
          onMouseEnter={() => setRatioHover(true)}
          onMouseLeave={() => setRatioHover(false)}>Ratio Quiz</p>
        <p className={styles.button}
          onClick={() => triggerAnimation("/gcse-maths-quiz-website/probability-quiz")}
          onMouseEnter={() => setProbabilityHover(true)}
          onMouseLeave={() => setProbabilityHover(false)}>Probability Quiz</p>
        <p className={styles.button}
          onClick={() => triggerAnimation("/gcse-maths-quiz-website/factorisation-quiz")}
          onMouseEnter={() => { return false; }}
          onMouseLeave={() => { return false; }}>Factorisation Quiz</p>
        <p className={styles.button}
          onClick={() => triggerAnimation("/gcse-maths-quiz-website/universal-quiz")}
          onMouseEnter={() => setUniversalHover(true)}
          onMouseLeave={() => setUniversalHover(false)}>Universal Quiz</p>
        <p className={styles.button} onClick={() => triggerAnimation("/gcse-maths-quiz-website/generic-quiz")}>Empty Quiz</p>
      </div>
      <Footer />
    </div>
  );
}
  
  export default MainMenu;