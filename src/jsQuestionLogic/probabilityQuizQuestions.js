import styles from '../css/normalQuiz.module.css';

// Function to disable scrolling when using the number input
function disableScroll(event) {
    event.preventDefault();
    event.target.blur();
}

// Function to generate a random number
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to create the first question style for probability questions
const setQuestionStyle1 = () => {
    // Logic to set the question and answer options
    
    // Generate a random number for the number of sections in the spinner
    let spinnerNum = getRandomInt(3, 5);
    // Generate a number to decide if some spinner sections will share the same probability
    let shared = getRandomInt(1, 2);

    // Starting the question text for the spinner question
    let question = "A spinner has " + spinnerNum + " sections. The sections are A, B, C";
    question += ((spinnerNum > 3) ? ((spinnerNum == 4)? ", D." : ", D, E.") : ".");
    
    // Declaring the array that will hold the probabilities
    // This is done as an array for this question due to the number of probabilities in the question not being fixed
    let probsArray = [];

    // Different algorithms for different numbers of sections in the spinner or shared probabilities
    // The algorithms are each randomly generated to ensure the probabilities are not fixed but have limitations to prevent errors
    if (spinnerNum === 3) {
        // Three sections in the spinner with no shared probabilities
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
            // Algorithm for no shared probabilities
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
                // No shared probabilities with 4 sections
                let prob4 = totalProb;
                probsArray = [prob1, prob2, prob3, prob4];
                question += " The probability of landing on B is " + prob2 + ", the probability of landing on C is " + prob3 + " and the probability of landing on D is " + prob4 + ".";
            }
            else {
                // No shared probabilities with 5 sections
                let prob4 =  Number((getRandomInt(1, 10-num1-num2-num3-1) * 0.1).toFixed(1));
                let prob5 =  Number((totalProb - prob4).toFixed(1));
                probsArray = [prob1, prob2, prob3, prob4, prob5];
                question += " The probability of landing on B is " + prob2 + ", the probability of landing on C is " + prob3 + ", the probability of landing on D is " + prob4 + " and the probability of landing on E is " + prob5 + ".";
            }
        }
        else{
            // Algorithm for shared probabilities
            if (spinnerNum === 4) {
                // Shared probabilities with 4 sections
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
                // Shared probabilities with 5 sections
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

// Creating the answer section that should allow users to input their answers
const answerSectionStyle1 = (
    <div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Probability of A:  </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Probability' onWheel={disableScroll}/>
        </div>
    </div>
);

// Function to check the answer and return true or false based on the answer given
// Also clears the input fields after checking the answer
const checkAnswerStyle1 = (correctAnswers) => {
    // Get the answer from the input field
    const answer = document.querySelector('input[placeholder="Probability"]').value;

    // Clear the input field
    document.querySelector('input[placeholder="Probability"]').value = "";
    
    // Check if the answer is empty
    if (answer === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    // Check if the answer is correct
    let finalAnswer = correctAnswers[2][0]
    if (answer == finalAnswer) {
        return true;
    } else {
        // Due to the variety of answers, the feedback is different depending on the question
        // Starting the feedback with the answer given
        let newFeedback = "Incorrect. Your answer is " + answer + ". ";
        // Checking if there are shared probabilities
        if (correctAnswers[1] == 1) {
            // There are no shared probabilities
            newFeedback += "The other probabilities are ";
            // Looping through the probabilities to add them to the feedback with an appropraite message missing the first one
            for (let i = 1; i < correctAnswers[2].length; i++) {
                if (i == correctAnswers[2].length - 1) {
                    newFeedback += "and " + correctAnswers[2][i] + ".";
                } else {
                    newFeedback += correctAnswers[2][i] + ", ";
                }
            }
            // Adding the final answer to the feedback
            newFeedback += " which by adding together and taking away from 1 gives you the answer " + finalAnswer + ".";
        }
        else{
            // There are shared probabilities
            newFeedback += "The other probabilities are ";
            // Looping through the probabilities to add them to the feedback with an appropraite message missing the first and second one
            for (let i = 2; i < correctAnswers[2].length; i++) {
                if (i == correctAnswers[2].length - 1) {
                    newFeedback += "and " + correctAnswers[2][i] + ".";
                } else {
                    newFeedback += correctAnswers[2][i] + ", ";
                }
            }
            // Adding the final answer to the feedback
            newFeedback += " The probability of landing on A is the same as the probability of landing on B. So by ";
            newFeedback += "adding together the other probabilties and taking away from 1, we can divide the result by two";
            newFeedback += " to get the answer " + finalAnswer + ".";
        }
        // Setting the feedback to the answer feedback section
        document.getElementById("answerFeedback").innerHTML = newFeedback;
        return false;
    }
}

export const probabilityQuestionStyle1 = [setQuestionStyle1, answerSectionStyle1, checkAnswerStyle1];




// Function to create the second question style for probability questions
export const setQuestionStyleProbability2 = () => {
    const n = getRandomInt(1, 10);
    const total = 3 * n;

    // Finding the numbers for the solved fraction answer
    const numer = n * (n - 1) * (n - 2);
    const denom = total * (total - 1) * (total - 2);

    // Simplify fraction
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const g = gcd(numer, denom);
    const simpNum = numer / g;
    const simpDen = denom / g;

    const feedback = "Number of red counters is " + n + ". P(1st red) = " + n + "/" + total + ". P(2nd red) = " + (n - 1) + "/" +
        (total - 1) + ". P(3rd red) = " + (n - 2) + "/" + (total - 2) + ". Multiply the probabilities: " + numer + "/" + denom +
        ". Simplified: " + simpNum + "/" + simpDen;

    const question =
      `There are red counters, blue counters and yellow counters in a bag with a total of ${total} counters. ` +
      `Three counters are taken at random without replacement. Work out the probability of drawing three red counters.`;

    return [question, [simpNum, simpDen, feedback]];
};

export const answerSectionStyleProbability2 = (
    <div className={styles.inputDiv} style={{display: "flex", lineHeight: "3.5em", marginTop: "1em"}}>
        <label className={styles.normalQuizLabel}>Probability: </label>
        <div className={styles.fractionDiv}>
            <input className={styles.fractionInput} type="number" id="Numerator" onWheel={disableScroll}/>
            <hr className={styles.fractionBar} />
            <input className={styles.fractionInput} type="number" id="Denominator" onWheel={disableScroll}/>
        </div>
    </div>
);

export const checkAnswerStyleProbability2 = (correctAnswers) => {
    const [simpNum, simpDen, feedback] = correctAnswers;
    const numInput = document.querySelector('input[id="Numerator"]').value;
    const denInput = document.querySelector('input[id="Denominator"]').value;

    document.querySelector('input[id="Numerator"]').value = "";
    document.querySelector('input[id="Denominator"]').value = "";

    if (numInput === "" || denInput === "") {
        document.getElementById("answerFeedback").innerHTML =
          "Incorrect. Please fill in both numerator and denominator.";
        return false;
    }

    if (Number(numInput) === simpNum && Number(denInput) === simpDen) {
        return true;
    } else {
        document.getElementById("answerFeedback").innerHTML =
          "Incorrect your answer is " + numInput + "/" + denInput + ". " + feedback;
        return false;
    }
};

export const probabilityQuestionStyle2 = [setQuestionStyleProbability2, answerSectionStyleProbability2, checkAnswerStyleProbability2];





// Function to create the third question style for probability questions
export const setQuestionStyleProbability3 = () => {
    // Random probabilities with two decimals
    const pSat = Number((Math.random() * 0.8 + 0.1).toFixed(2));
    const pSunWin = Number((Math.random() * 0.8 + 0.1).toFixed(2));
    const pSunLose = Number((Math.random() * 0.8 + 0.1).toFixed(2));

    // Define event types and find probabilities
    const events = [
      {
        desc: 'win both matches',
        calc: () => pSat * pSunWin
      },
      {
        desc: 'win exactly one match',
        calc: () => pSat * (1 - pSunWin) + (1 - pSat) * pSunLose
      },
      {
        desc: 'lose exactly one match',
        calc: () => pSat * (1 - pSunWin) + (1 - pSat) * pSunLose
      },
      {
        desc: 'lose both matches',
        calc: () => (1 - pSat) * (1 - pSunLose)
      }
    ];
    const choice = events[getRandomInt(0, events.length - 1)];

    // Probabilities rounded to 4 decimals
    const raw = choice.calc();
    const correctProb = Number(raw.toFixed(4));

    const question =
      `A darts team plays on Saturday and Sunday. P(win Saturday) = ${pSat}. If they win Saturday, P(win Sunday) = ${pSunWin}. ` +
      `If they do not win Saturday, P(win Sunday) = ${pSunLose}. Find the probability that the team will ${choice.desc}. Round ` + 
      `your answer to 4 decimal places.`;

    return [question, [pSat, pSunWin, pSunLose, choice.desc, correctProb]];
};

export const answerSectionStyleProbability3 = (
  <div className={styles.inputDiv}>
    <label className={styles.normalQuizLabel}>Probability: </label>
    <input className={styles.normalQuizInput} type="number" placeholder="Enter Probability" onWheel={disableScroll} />
  </div>
);

export const checkAnswerStyleProbability3 = (correctAnswers) => {
    const [pSat, pSunWin, pSunLose, desc, correctProb] = correctAnswers;
    const input = document.querySelector('input[placeholder="Enter Probability"]').value;

    // Clear input
    document.querySelector('input[placeholder="Enter Probability"]').value = '';

    if (input === '') {
        document.getElementById('answerFeedback').innerHTML =
          'Incorrect. Please enter a probability.';
        return false;
    }
    const userProb = Number(input);
    if (userProb === correctProb) {
        return true;
    } else {
        const lines = [];
        lines.push(`You entered: ${userProb}`);
        lines.push(`P(win Sat) = ${pSat}`);
        lines.push(`P(win Sun | win Sat) = ${pSunWin}`);
        lines.push(`P(win Sun | lose Sat) = ${pSunLose}`);
        lines.push(`Event: ${desc}`);
        lines.push(
          `Correct probability = ${correctProb}`
        );
        document.getElementById('answerFeedback').innerHTML =
          'Incorrect. Solution:<br/>' + lines.join('<br/>');
        return false;
    }
};

export const probabilityQuestionStyle3 = [setQuestionStyleProbability3, answerSectionStyleProbability3, checkAnswerStyleProbability3];
