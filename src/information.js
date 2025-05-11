import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/information.module.css';

import BubblesBackground from './bubblesBackground.js';
import Footer from './footer.js';

const Information = () => {

  const [animate,setAnimate] = React.useState(false);

  const navigate = useNavigate();

  const triggerAnimation = () => {
    setAnimate(true);

    setTimeout(() => navigate("/gcse-maths-quiz-website"), 750);
  }

  return (
    <div className={styles.background}>
      <BubblesBackground green={true} animate={animate}/>
      <div className={styles.informationContainer + " " + (animate ? styles.fadeoutContainer: "")}>
        <h1>Website Information</h1>
        <p className={styles.text}>
        This website is made for the purpose of aiding you in sharpening and helping to strengthen the maths skills that you have
        through a variety of interactive quizzes asking you appropriately generated questions and allowing you to answer them in an
        appropriate way. Within the main menu screen you'll be able to view over each of the currently available options to begin
        practicing your skills across different mathematical topics. Currently the website is still in development and is limited
        in what it can offer through a limited selection of quizzes but it is expected for the website to improve as we are actively
        working on expanding the available content provided by the website. Our goal is to offer an appropriate range of topics to
        support learners in the abilities they have to learn what they know better across all levels. Stay tuned as more challenges
        and features will be on the way promptyl to help you boost the confidence and mastery that you may need in maths!
        </p>
        <span className={styles.button} onClick={triggerAnimation}>Get Started</span>
      </div>
      <Footer />
    </div>
  );
}
  
  export default Information;