import React, { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ratioQuiz.module.css';

import GenericQuiz from './genericQuizInterface';

const RatioQuiz = () => {
    //Function to generate a question based off ratios
    const setQuestion = () => {
        // Logic to set the question and answer options
        //Function to generate a random number
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        //Function to find the highest common factor of two numbers
        const hcf2 = (a, b) => {
            while (b) {
                let t = b;
                b = a % b;
                a = t;
            }
            return a;
        }

        //Function to find the highest common factor of three numbers
        const hcf3 = (a, b, c) => {
            return hcf2(hcf2(a, b), c);
        }

        //Function finds 4 random numbers that would be appropriate for a ratio question
        let num1 = 1;
        let num2 = 1;
        let num3 = 1;
        let num4 = 1;
        while (num1 == num2 || num3 == num4 || num2 == num3){
            num1 = getRandomInt(1, 15);
            num2 = getRandomInt(1, 10);
            num3 = getRandomInt(1, 10);
            num4 = getRandomInt(1, 15);
        }

        //Finding the solution for the given ratio question
        let factorOf2 = num2 / hcf2(num2, num3);
        let factorOf3 = num3 / hcf2(num2, num3);
        
        let correctRed = num1 * factorOf3;
        let correctBlue = num3 * factorOf2;
        let correctGreen = num4 * factorOf2;

        //Finding simplest form of the ratio
        if (hcf3(correctRed, correctBlue, correctGreen) != 1) {
            let factor = hcf3(correctRed, correctBlue, correctGreen);
            correctRed = correctRed / factor;
            correctBlue = correctBlue / factor;
            correctGreen = correctGreen / factor;
        }

        //Creating the question string
        let question = "There are three types of counters in a bag. Red, blue and green.";
        question += " The ratio of red to blue is " + num1 + ":" + num2;
        question += " and the ratio of blue to green is " + num3 + ":" + num4 + ". What is the ratio of red to green?";

        return [question, [correctRed, correctBlue, correctGreen, num1, num2, num3, num4]];
    }

    //Creating the answer section that should allow users to input their answers
    const answerSection = (
        <div>
            <div className={styles.inputDiv}>
                <label class={styles.ratioQuizLabel}>Red: </label>
                <input class={styles.ratioQuizInput} type='number' placeholder='Red' onWheel={disableScroll}/>
            </div>
            <div className={styles.inputDiv}>
                <label class={styles.ratioQuizLabel}>Blue: </label>
                <input class={styles.ratioQuizInput} type='number' placeholder='Blue' onWheel={disableScroll}/>
            </div>
            <div className={styles.inputDiv}>
                <label class={styles.ratioQuizLabel}>Green: </label>
                <input class={styles.ratioQuizInput} type='number' placeholder='Green' onWheel={disableScroll}/>
            </div>
        </div>
    );

    //Function to disable scrolling when using the number input
    function disableScroll(event) {
        event.preventDefault();
        event.target.blur();
    }

    //Function to check the answer and return true or false based on the answer given
    //Also clears the input fields after checking the answer
    const checkAnswer = (correctAnswers) => {
        const red = document.querySelector('input[placeholder="Red"]').value;
        const blue = document.querySelector('input[placeholder="Blue"]').value;
        const green = document.querySelector('input[placeholder="Green"]').value;

        document.querySelector('input[placeholder="Red"]').value = "";
        document.querySelector('input[placeholder="Blue"]').value = "";
        document.querySelector('input[placeholder="Green"]').value = "";
        
        if (red === "" || blue === "" || green === "") {
            document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
            return false;
        }
        console.log(correctAnswers);
        if (red == correctAnswers[0] && blue == correctAnswers[1] && green == correctAnswers[2]) {
            return true;
        } else {
            document.getElementById("answerFeedback").innerHTML = "Incorrect. When the ratio of red to blue is " + correctAnswers[3] + ":" + correctAnswers[4] + " and the ratio of blue to green is " + correctAnswers[5] + ":" + correctAnswers[6] + ". " + "The correct answer is " + correctAnswers[0] + ":" + correctAnswers[1] + ":" + correctAnswers[2];
            return false;
        }
    }

    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Ratio Quiz"
            questionFunction = {setQuestion}
            answerSection={answerSection}
            checkAnswerFunction={checkAnswer}
        />
    )
}

export default RatioQuiz;