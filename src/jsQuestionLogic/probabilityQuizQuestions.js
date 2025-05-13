import styles from '../css/ratioQuiz.module.css';

//Function to disable scrolling when using the number input
function disableScroll(event) {
    event.preventDefault();
    event.target.blur();
}

//Function to generate a random number
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Function to create the first question style for probability questions
const setQuestionStyle1 = () => {
    // Logic to set the question and answer options
    let spinnerNum = getRandomInt(3, 5);
    let shared = getRandomInt(1, 2);
    let question = "A spinner has " + spinnerNum + " sections. The sections are A, B, C";
    question += ((spinnerNum > 3) ? ((spinnerNum == 4)? ", D." : ", D, E.") : ".");
    let probsArray = [];
    if (spinnerNum === 3) {
        let totalProb = 1; 
        let num1 = getRandomInt(1, 8);
        let prob1 =  Number((num1 * 0.1).toFixed(1));
        totalProb =  Number((totalProb - prob1).toFixed(1));
        let prob2 =  Number((getRandomInt(1, 9-num1) * 0.1).toFixed(1));
        let prob3 =  Number((totalProb - prob2).toFixed(1));
        question += " The probability of landing on B is " + prob2 + " and the probability of landing on C is " + prob3 + ".";
        probsArray = [prob1, prob2, prob3];
    }
    else{
        if (shared === 1) {
            let num1 = getRandomInt(1, 6);
            let prob1 =  Number((num1 * 0.1).toFixed(1));
            let totalProb =  Number((1 - prob1).toFixed(1));
            let num2 = getRandomInt(1, 9-num1);
            let prob2 =  Number((num2 * 0.1).toFixed(1));
            totalProb =  Number((totalProb - prob2).toFixed(1));
            let num3 = getRandomInt(1, 9-num1-num2);
            let prob3 =  Number((num3 * 0.1).toFixed(1));
            totalProb =  Number((totalProb - prob3).toFixed(1));
            if (spinnerNum === 4) {
                let prob4 = totalProb;
                probsArray = [prob1, prob2, prob3, prob4];
                question += " The probability of landing on B is " + prob2 + ", the probability of landing on C is " + prob3 + " and the probability of landing on D is " + prob4 + ".";
            }
            else {
                let prob4 =  Number((getRandomInt(1, 10-num1-num2-num3-1) * 0.1).toFixed(1));
                let prob5 =  Number((totalProb - prob4).toFixed(1));
                probsArray = [prob1, prob2, prob3, prob4, prob5];
                question += " The probability of landing on B is " + prob2 + ", the probability of landing on C is " + prob3 + ", the probability of landing on D is " + prob4 + " and the probability of landing on E is " + prob5 + ".";
            }
        }
        else{
            if (spinnerNum === 4) {
                let sharedNum = getRandomInt(1, 4);
                let totalProb =  Number((1 - sharedNum * 0.2).toFixed(1));
                let num3 = getRandomInt(1, 9-(sharedNum*2));
                let prob3 =  Number((num3 * 0.1).toFixed(1));
                totalProb =  Number((totalProb - prob3).toFixed(1));
                let prob4 = totalProb;
                let prob1 =  Number((sharedNum * 0.1).toFixed(1));
                let prob2 = prob1;
                probsArray = [prob1, prob2, prob3, prob4];
                question += " The probability of landing on C is " + prob3 + " and the probability of landing on D is " + prob4 + ". The probability of landing on A is the same as the probability of landing on B.";
            }
            else {
                let sharedNum = getRandomInt(1, 3);
                let totalProb =  Number((1 - sharedNum * 0.2).toFixed(1));
                let num3 =  Number((getRandomInt(1, 8-(sharedNum*2)).toFixed(1)));
                let prob3 =  Number((num3 * 0.1).toFixed(1));
                totalProb =  Number((totalProb - prob3).toFixed(1));
                let num4 = getRandomInt(1, 8-(sharedNum*2)-num3);
                let prob4 =  Number((num4 * 0.1).toFixed(1));
                totalProb =  Number((totalProb - prob4).toFixed(1));
                let prob5 = totalProb;
                let prob1 =  Number((sharedNum * 0.1).toFixed(1));
                let prob2 = prob1;
                probsArray = [prob1, prob2, prob3, prob4, prob5];
                question += " The probability of landing on C is " + prob3 + ", the probability of landing on D is " + prob4 + " and the probability of landing on E is " + prob5 + ". The probability of landing on A is the same as the probability of landing on B.";
            }
        }
    }
    question += " What is the probability of landing on A?";

    return [question, [spinnerNum, shared, probsArray]];
}

//Creating the answer section that should allow users to input their answers
const answerSectionStyle1 = (
    <div>
        <div className={styles.inputDiv}>
            <label class={styles.ratioQuizLabel}>Probability of A:  </label>
            <input class={styles.ratioQuizInput} type='number' placeholder='Probability' onWheel={disableScroll}/>
        </div>
    </div>
);

//Function to check the answer and return true or false based on the answer given
//Also clears the input fields after checking the answer
const checkAnswerStyle1 = (correctAnswers) => {
    const answer = document.querySelector('input[placeholder="Probability"]').value;

    document.querySelector('input[placeholder="Probability"]').value = "";
        
    if (answer === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    console.log("Answer: " + answer);
    console.log("Correct Answer: " + correctAnswers[2, 0]);
    console.log("Correct Answers: " + correctAnswers[2]);
    let finalAnswer = correctAnswers[2][0]
    if (answer == finalAnswer) {
        return true;
    } else {
        let newFeedback = "Incorrect. Your answer is " + answer + ". ";
        if (correctAnswers[1] == 1) {
            newFeedback += "The other probabilities are ";
            for (let i = 1; i < correctAnswers[2].length; i++) {
                if (i == correctAnswers[2].length - 1) {
                    newFeedback += "and " + correctAnswers[2][i] + ".";
                } else {
                    newFeedback += correctAnswers[2][i] + ", ";
                }
            }
            newFeedback += " which by adding together and taking away from 1 gives you the answer " + finalAnswer + ".";
        }
        else{
            newFeedback += "The other probabilities are ";
            for (let i = 2; i < correctAnswers[2].length; i++) {
                if (i == correctAnswers[2].length - 1) {
                    newFeedback += "and " + correctAnswers[2][i] + ".";
                } else {
                    newFeedback += correctAnswers[2][i] + ", ";
                }
            }
            newFeedback += " The probability of landing on A is the same as the probability of landing on B. So by ";
            newFeedback += "adding together the other probabilties and taking away from 1, we can divide the result by two";
            newFeedback += " to get the answer " + finalAnswer + ".";
        }
        document.getElementById("answerFeedback").innerHTML = newFeedback;
        return false;
    }
}

export const probabilityQuestionStyle1 = [setQuestionStyle1, answerSectionStyle1, checkAnswerStyle1];