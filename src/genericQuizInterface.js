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

  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};


const GenericQuiz = (props) => {
  // Setting general quiz variables
  const quizTitle = props.quizTitle ? props.quizTitle : "Quiz Unknown";
  const [animate,setAnimate] = React.useState(false);

  // Setting the quiz states for the different quiz questions, answers sections and current answer
  const [question,setQuestion] = React.useState();
  const [answerSection,setAnswerSection] = React.useState();
  const [currentAnswer, setCurrentAnswer] = React.useState();

  // Setting the quiz question styles and the other appropriate variables to allow variable question types
  const [questionStyle, setQuestionStyle] = React.useState(0);
  const [questionTypes, setQuestionTypes] = React.useState(() => [() => {}]);
  const [answerTypes, setAnswerTypes] = React.useState(() => [null]);
  const [checkAnswerTypes, setCheckAnswerTypes] = React.useState(() => [() => true]);

  // Getting the props for the quiz
  // If each props exists, set the question types, answer types and check answer types to the props
  // If not set them to a default value for an empty quiz
  useEffect(() => {
    setQuestionTypes(props.questionFunction ? props.questionFunction : [() => {
      return ["Question function is missing. Quiz is not functional.",null]}]);
    setAnswerTypes(props.answerSection ? props.answerSection : ["There is no answer section yet."]);
    setCheckAnswerTypes(props.checkAnswerFunction ? props.checkAnswerFunction : [() => {
    return true}]);

    // Sets initial question and answer section
    // These are always the first question style
    let currentAnswer;
    let currentFunction;
    if (props.questionFunction) {
      currentFunction = props.questionFunction[0];
      currentAnswer = props.answerSection[0]
    } else {
      currentFunction = () => {return ["Question function is missing. Quiz is not functional.",null];};
      currentAnswer = "There is no answer section yet."
    }

    let questionReturn = currentFunction();
    setQuestion(questionReturn[0]);
    setCurrentAnswer(questionReturn[1]);
    setAnswerSection(currentAnswer);
  }, []);

  // Setting the timer variables for the quiz
  const [totalTimer,setTotalTimer] = React.useState(0);
  const [questionTimer,setQuestionTimer] = React.useState(0);

  // Setting the correct and incorrect answer counts
  const [correctCount,setCorrectCount] = React.useState(0);
  const [incorrectCount,setIncorrectCount] = React.useState(0);

  //Setting variables for the correct and incorrect answer animations
  const [correctAnimation,setCorrectAnimation] = React.useState(false);
  const [incorrectAnimation,setIncorrectAnimation] = React.useState(false);

  // Setting the timer for the quiz
  // This timer will run every second and update the total time and question time
  useEffect(() => {

    const timer = setInterval(() => {
      setTotalTimer((prev) => prev + 1);
      setQuestionTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  // Animation function for returning to the main page
  const triggerAnimation = () => {
    setAnimate(true);

    setTimeout(() => navigate("/gcse-maths-quiz-website"), 650);
  }

  // Animation function for the correct answer
  const triggerCorrectAnimation = () => {
    setCorrectAnimation(true);
    setTimeout(() => {
      setCorrectAnimation(false);
    }, 1500);
  }

  // Animation function for the incorrect answer
  const triggerIncorrectAnimation = () => {
    setIncorrectAnimation(true);
  }

  // This function closes the incorrect answer animation and clears the feedback message
  const closeIncorrectAnimation = () => {
    setIncorrectAnimation(false);
    document.getElementById("answerFeedback").innerHTML = "";
  }

  // This function checks the answer and updates the correct and incorrect counts
  // It also sets the question timer to 0 and generates a new question
  const submitAnswer = () => {
    if (checkAnswerTypes[questionStyle](currentAnswer)) {
      setCorrectCount((prev) => prev + 1);
      triggerCorrectAnimation();
    } else {
      setIncorrectCount((prev) => prev + 1);
      triggerIncorrectAnimation();
    }
    setQuestionTimer(0);

    const newIndex = Math.floor(Math.random() * questionTypes.length);
    setQuestionStyle(newIndex);
    let questionReturn = questionTypes[newIndex]();

    setQuestion(questionReturn[0]);
    setCurrentAnswer(questionReturn[1]);
    setAnswerSection(answerTypes[newIndex]);
  }
  return (
    <div className={styles.background}>
        <div className={styles.quizContainer + " " + (animate ? styles.fadeOutContainer: "")}>
            <div className={styles.quizHeader}>
                <span className={styles.returnButton} onClick={()=>triggerAnimation()}><span className={"material-symbols-outlined " + styles.backIcon}>arrow_back</span><span className={styles.backIcon + " " + styles.returnText}>  Return</span></span>
               <h1>{quizTitle}</h1>
            </div>
            <hr className={styles.line} />
            <div className={styles.quizContent}>
                <div className={styles.quizInfo}>
                    <p className={styles.totalTimer}><span className={styles.smallerScreenText}>Total Timer: </span>{formatTime(totalTimer)}</p>
                    <p className={styles.questionTimer}>Question Timer: {formatTime(questionTimer)}</p>
                    <p className={styles.correctCount}>Correct<span className={styles.smallerScreenText}> Count</span>: {correctCount}</p>
                    <p className={styles.incorrectCount}>Incorrect Count: {incorrectCount}</p>
                </div>
                <hr className={styles.line} />
                <p className={styles.quizQuestion}>{question}</p>
                <div className={styles.quizAnswerSection}>{answerSection}</div>
                <hr className={styles.line} />
                <div className={styles.quizFooter}>
                  <span className={styles.submitButton} onClick={()=>submitAnswer()}>Submit</span>
                </div>
            </div>
        </div>
        <div className={styles.correctAlert + " " + (correctAnimation ? styles.animateCorrectAlert : "")}>
          <h1>CORRECT ANSWER</h1>
        </div>
        <div className={styles.alertContainer + " " + (incorrectAnimation ? styles.animateAlertContainer : "")} onClick={() => closeIncorrectAnimation()}>
          <div className={styles.incorrectAlert + " " + (incorrectAnimation ? styles.animateIncorrectAlertIn : "")}>
            <span class="material-symbols-outlined" onClick={() => closeIncorrectAnimation()}>close</span>
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