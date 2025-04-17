import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/genericQuizInterface.module.css';

import Footer from './footer.js';

const GenericQuiz = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.background}>
        <div className={styles.quizContainer}>
            <div className={styles.quizHeader}>
                <span className={styles.returnButton} onClick={()=>navigate("/")}><span className={"material-symbols-outlined " + styles.backIcon}>arrow_back</span>  Return</span>
               <h1>Quiz A</h1>
            </div>
            <hr className={styles.line} />
            <div className={styles.quizContent}>
                <div className={styles.quizInfo}>
                    <p>Total Timer</p>
                    <p>Question Timer</p>
                    <p>Correct Count</p>
                    <p>Incorrect Count</p>
                </div>
                <hr className={styles.line} />
                <p className={styles.quizQuestion}>This is a quiz question</p>
                <span className={styles.submitButton}>Submit</span>
            </div>
        </div>
        <Footer />
    </div>
  );
}
  
  export default GenericQuiz;