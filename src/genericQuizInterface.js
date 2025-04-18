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
  const [quizTitle,setQuizTitle] = React.useState(props.quizTitle ? props.quizTitle : "Quiz Unknown");
  const [animate,setAnimate] = React.useState(false);

  const questionFunction = props.questionFunction ? props.questionFunction : () => {
    return ["Question function is missing. Quiz is not functional."];
  }
  const [question,setQuestion] = React.useState("There is no question yet.");
  const checkAnswerFunction = props.checkAnswerFunction ? props.checkAnswerFunction : () => {
    return "There is no answer checking function yet.";
  }
  const [answerSection, setAnswerSection] = React.useState(props.answerSection ? props.answerSection : "There is no answer section yet.");
  const [currentAnswer, setCurrentAnswer] = React.useState([]);
  const [totalTimer,setTotalTimer] = React.useState(0);
  const [questionTimer,setQuestionTimer] = React.useState(0);
  const [correctCount,setCorrectCount] = React.useState(0);
  const [incorrectCount,setIncorrectCount] = React.useState(0);

  useEffect(() => {

    const timer = setInterval(() => {
      setTotalTimer((prev) => prev + 1);
      setQuestionTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, [totalTimer, questionTimer]);

  useEffect(() => {
    let questionReturn = questionFunction();

    setQuestion(questionReturn[0]);
    setCurrentAnswer(questionReturn[1]);
  }, []);

  const navigate = useNavigate();

  const triggerAnimation = () => {
    setAnimate(true);

    setTimeout(() => navigate("/"), 650);
  }

  const submitAnswer = () => {
    if (checkAnswerFunction(currentAnswer)) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
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
                <span className={styles.submitButton} onClick={()=>submitAnswer()}>Submit</span>
            </div>
        </div>
        <Footer />
    </div>
  );
}
  
  export default GenericQuiz;