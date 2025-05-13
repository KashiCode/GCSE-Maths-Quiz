import styles from '../css/ratioQuiz.module.css';
import factorisationStyles from '../css/factorisationQuiz.module.css';

//Function to disable scrolling when using the number input
function disableScroll(event) {
    event.preventDefault();
    event.target.blur();
}

//Function to generate a random number
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Function to check if two numbers have a common factor
const hasCommonFactor = (num1, num2) => {
    for (let i = 2; i <= Math.min(num1, num2); i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            return true;
        }
    }
    return false;
}

//Function to create the first question style for factorisation questions
const setQuestionStyle1 = () => {
    // Logic to set the question and answer options
    let num1 = getRandomInt(1, 4);
    let num2 = getRandomInt(1, 7);
    while ((num1 === num2 || hasCommonFactor(num1, num2))&& !(num1 === 1 && num2 === 1)) {
        num2 = getRandomInt(1, 7);
    }
    let num3 = getRandomInt(1, 4);
    let num4 = getRandomInt(1, 7);
    while ((num3 === num4 || hasCommonFactor(num3, num4))&& !(num3 === 1 && num4 === 1)) {
        num4 = getRandomInt(1, 7);
    }
    let numA = num1 * num3;
    let numB = (num1 * num4) + (num2 * num3);
    let numC = num2 * num4;
    
    let question = (
        <span>
            Factorise the expression {numA}x<sup>2</sup> + {numB}x + {numC}.
        </span>
    );

    return [question, [num1, num2, num3, num4, numA, numB, numC]];
}

//Creating the answer section that should allow users to input their answers
const answerSectionStyle1 = (
    <div>
        <div className={factorisationStyles.inputDiv}>
            <label className={factorisationStyles.textLabel}> {`(`} </label>
            <input id={"value1"} class={factorisationStyles.boxInput} type='number' onWheel={disableScroll}/>
            <label className={factorisationStyles.textLabel}>{' x + '} </label>
            <input id={"value2"} class={factorisationStyles.boxInput} type='number' onWheel={disableScroll}/>
            <label className={factorisationStyles.textLabel}>{')   ('}</label>
            <input id={"value3"} class={factorisationStyles.boxInput} type='number' onWheel={disableScroll}/>
            <label className={factorisationStyles.textLabel}>{' x + '} </label>
            <input id={"value4"} class={factorisationStyles.boxInput} type='number' onWheel={disableScroll}/>
            <label className={factorisationStyles.textLabel}>{')'}</label>
        </div>
    </div>
);

//Function to check the answer and return true or false based on the answer given
//Also clears the input fields after checking the answer
const checkAnswerStyle1 = (correctAnswers) => {
    const value1 = document.querySelector('input[id="value1"]').value;
    const value2 = document.querySelector('input[id="value2"]').value;
    const value3 = document.querySelector('input[id="value3"]').value;
    const value4 = document.querySelector('input[id="value4"]').value;

    document.querySelector('input[id="value1"]').value = "";
    document.querySelector('input[id="value2"]').value = "";
    document.querySelector('input[id="value3"]').value = "";
    document.querySelector('input[id="value4"]').value = "";
        
    if (value1 === "" || value2 === "" || value3 === "" || value4 === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    if ((value1 == correctAnswers[0] && value2 == correctAnswers[1] && value3 == correctAnswers[2] && value4 == correctAnswers[3]) || (value1 == correctAnswers[2] && value2 == correctAnswers[3] && value3 == correctAnswers[0] && value4 == correctAnswers[1])) {
        return true;
    } else {
        let newFeedback = "Incorrect. Your answer is (" + value1 + "x + " + value2 + ")(" + value3 + "x + " + value4 + ").";
        newFeedback += " The correct answer is (" + correctAnswers[0] + "x + " + correctAnswers[1] + ")(" + correctAnswers[2] + "x + ";
        newFeedback += + correctAnswers[3] + ").";
        document.getElementById("answerFeedback").innerHTML = newFeedback;
        return false;
    }
}

export const factorisationQuestionStyle1 = [setQuestionStyle1, answerSectionStyle1, checkAnswerStyle1];