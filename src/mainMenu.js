import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/mainMenu.module.css';

import BubblesBackground from './bubblesBackground.js';
import Footer from './footer.js';

const MainMenu = () => {

  const [animate,setAnimate] = React.useState(false);

  const navigate = useNavigate();

  const triggerAnimation = (navigationLink) => {
    setAnimate(true);

    setTimeout(() => navigate(navigationLink), 750);
  }

  return (
    <div className={styles.background}>
      <BubblesBackground animate={animate}/>
      <div className={styles.mainMenuContainer + " " + (animate ? styles.fadeoutContainer: "")}>
        <h1>Welcome to PaceMaths</h1>
        <p className={styles.text}>This is the main menu.
          This website is made to train various maths skills.
          You can choose from a variety of quizzes and challenges as shown below.
          Currently the website is in development and only a few quizzes are available
          but in due time we hope to cover a wide variety of topics to help advance your maths skills.
        </p>
        <p className={styles.button} onClick={() => triggerAnimation("/genericquiz")}>Option A</p>
        <p className={styles.button} onClick={() => triggerAnimation("/ratio-quiz")}>Ratio Quiz</p>
        <p className={styles.button}>Option C</p>
        <p className={styles.button}>Option D</p>
        <p className={styles.button}>Option E</p>
      </div>
      <Footer />
    </div>
  );
}
  
  export default MainMenu;