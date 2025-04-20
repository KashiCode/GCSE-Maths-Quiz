import React, { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/genericQuizInterface.module.css';

import Footer from './footer.js';

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad with leading zeros if needed
  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};


const GenericQuiz = (props) => {
  //Setting general quiz variables
  const quizTitle = props.quizTitle ? props.quizTitle : "Quiz Unknown";
  const [animate,setAnimate] = React.useState(false);

  //Setting variables specific to the given version of the quiz
  const questionFunction = props.questionFunction ? props.questionFunction : () => {
    return ["Question function is missing. Quiz is not functional."];
  }
  const [question,setQuestion] = React.useState("There is no question yet.");
  const checkAnswerFunction = props.checkAnswerFunction ? props.checkAnswerFunction : () => {
    return "There is no answer checking function yet.";
  }
  const answerSection =props.answerSection ? props.answerSection : "There is no answer section yet.";
  const [currentAnswer, setCurrentAnswer] = React.useState([]);
  const [totalTimer,setTotalTimer] = React.useState(0);
  const [questionTimer,setQuestionTimer] = React.useState(0);
  const [correctCount,setCorrectCount] = React.useState(0);
  const [incorrectCount,setIncorrectCount] = React.useState(0);

  //Setting variables for the correct and incorrect answer animations
  const [correctAnimation,setCorrectAnimation] = React.useState(false);
  const [incorrectAnimation,setIncorrectAnimation] = React.useState(false);

  //Setting the timer for the quiz
  //This timer will run every second and update the total time and question time
  useEffect(() => {

    const timer = setInterval(() => {
      setTotalTimer((prev) => prev + 1);
      setQuestionTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimer, questionTimer]);

  //This sets the question and current answer when the quiz is first loaded
  useEffect(() => {
    let questionReturn = questionFunction();

    setQuestion(questionReturn[0]);
    setCurrentAnswer(questionReturn[1]);
  }, []);

  const navigate = useNavigate();

  //Animation function for returning to the main page
  const triggerAnimation = () => {
    setAnimate(true);

    setTimeout(() => navigate("/"), 650);
  }

  //Animation function for the correct answer
  const triggerCorrectAnimation = () => {
    setCorrectAnimation(true);
    setTimeout(() => {
      setCorrectAnimation(false);
    }, 1500);
  }

  //Animation function for the incorrect answer
  const triggerIncorrectAnimation = () => {
    setIncorrectAnimation(true);
  }

  //This function closes the incorrect answer animation and clears the feedback message
  const closeIncorrectAnimation = () => {
    setIncorrectAnimation(false);
    document.getElementById("answerFeedback").innerHTML = "";
  }

  const submitAnswer = () => {
    if (checkAnswerFunction(currentAnswer)) {
      setCorrectCount((prev) => prev + 1);
      triggerCorrectAnimation();
    } else {
      setIncorrectCount((prev) => prev + 1);
      triggerIncorrectAnimation();
    }
    setQuestionTimer(0);

    let questionReturn = questionFunction();

    setQuestion(questionReturn[0]);
    setCurrentAnswer(questionReturn[1]);
  }
  return (
    <div className={styles.background}>
        <div className={styles.quizContainer + " " + (animate ? styles.fadeOutContainer: "")}>
            <div className={styles.quizHeader}>
                <span className={styles.returnButton} onClick={()=>triggerAnimation()}><span className={"material-symbols-outlined " + styles.backIcon}>arrow_back</span>  Return</span>
               <h1>{quizTitle}</h1>
            </div>
            <hr className={styles.line} />
            <div className={styles.quizContent}>
                <div className={styles.quizInfo}>
                    <p>Total Timer: {formatTime(totalTimer)}</p>
                    <p>Question Timer: {formatTime(questionTimer)}</p>
                    <p>Correct Count: {correctCount}</p>
                    <p>Incorrect Count: {incorrectCount}</p>
                </div>
                <hr className={styles.line} />
                <p className={styles.quizQuestion}>{question}</p>
                <div className={styles.quizAnswerSection}>{answerSection}</div>
                <hr className={styles.line} />
                <div className={styles.quizFooter}>
                  <p className={styles.answerFeedback}></p>
                  <span className={styles.submitButton} onClick={()=>submitAnswer()}>Submit</span>
                </div>
            </div>
        </div>
        <div className={styles.correctAlert + " " + (correctAnimation ? styles.animateCorrectAlert : "")}>
          <h1>CORRECT ANSWER</h1>
        </div>
        <div className={styles.alertContainer + " " + (incorrectAnimation ? styles.animateAlertContainer : "")}>
          <div className={styles.incorrectAlert + " " + (incorrectAnimation ? styles.animateIncorrectAlertIn : "")}>
            <span onClick={() => closeIncorrectAnimation()}>x</span>
            <h1>INCORRECT ANSWER</h1>
            <hr className={styles.line}/>
            <p id="answerFeedback"></p>
          </div>
        </div>
        <Footer />
    </div>
  );
}
  
  export default GenericQuiz;