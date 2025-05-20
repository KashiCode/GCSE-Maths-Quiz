import styles from '../css/normalQuiz.module.css';
import factorisationStyles from '../css/factorisationQuiz.module.css';

// Function to disable scrolling when using the number input
function disableScroll(event) {
    event.preventDefault();
    event.target.blur();
}

// Function to generate a random number
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to check if two numbers have a common factor
const hasCommonFactor = (num1, num2) => {
    for (let i = 2; i <= Math.min(num1, num2); i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            return true;
        }
    }
    return false;
}

// Function to create the first question style for factorisation questions
const setQuestionStyle1 = () => {
    // Logic to set the question and answer options

    // Generate two random numbers between 1 and 4 for the first bracket
    // Generate two random numbers between 1 and 7 for the first bracket
    // This represent the the numbers making up the first brackets for the solved equation
    // The while loop ensures the two have no common factors to prevent multiple solutions
    let num1 = getRandomInt(1, 4);
    let num2 = getRandomInt(1, 7);
    while (hasCommonFactor(num1, num2) && !(num1 === 1 && num2 === 1)) {
        num2 = getRandomInt(1, 7);
    }
    // Generates second pair of random numbers for the second bracket in the same way
    // This represent the the numbers making up the second brackets for the solved equation
    let num3 = getRandomInt(1, 4);
    let num4 = getRandomInt(1, 7);
    while ((num3 === num4 || hasCommonFactor(num3, num4))&& !(num3 === 1 && num4 === 1)) {
        num4 = getRandomInt(1, 7);
    }

    // This is calculating the values of the numbers in the quadratic equation used as the question
    let numA = num1 * num3;
    let numB = (num1 * num4) + (num2 * num3);
    let numC = num2 * num4;
    
    // Writing of the question while making sure to use appropriate signs for squared
    let question = (
        <span className={styles.quizQuestion} style={{ fontSize: "1.5em" }}>
            Factorise the expression {numA}x<sup style={{ fontSize: "0.75em"}}>2</sup> + {numB}x + {numC}.
        </span>
    );

    return [question, [num1, num2, num3, num4, numA, numB, numC]];
}

// Creating the answer section that should allow users to input their answers
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

// Function to check the answer and return true or false based on the answer given
const checkAnswerStyle1 = (correctAnswers) => {
    // Get the values from the input fields
    const value1 = document.querySelector('input[id="value1"]').value;
    const value2 = document.querySelector('input[id="value2"]').value;
    const value3 = document.querySelector('input[id="value3"]').value;
    const value4 = document.querySelector('input[id="value4"]').value;

    // Clear the input fields
    document.querySelector('input[id="value1"]').value = "";
    document.querySelector('input[id="value2"]').value = "";
    document.querySelector('input[id="value3"]').value = "";
    document.querySelector('input[id="value4"]').value = "";
    
    // Check if the values are empty
    if (value1 === "" || value2 === "" || value3 === "" || value4 === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    // Check if the values are correct
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



// Function to create the second question style for factorisation questions
export const setQuestionStyleFactor2 = () => {
    const letter = 'a';

    // Random numbers between 1 and 9
    const o1 = getRandomInt(1, 9);
    const i1 = getRandomInt(1, 9);
    const c1 = getRandomInt(1, 9);
    const o2 = getRandomInt(1, 9);
    const i2 = getRandomInt(1, 9);
    const c2 = getRandomInt(1, 9);

    // Random signs for each bracket: true for '+', false for '-'
    const sign1 = Math.random() < 0.5;
    const sign2 = Math.random() < 0.5;

    const part1 = `${o1}(${i1}${letter} ${sign1 ? '+' : '-'} ${c1})`;
    const part2 = `${o2}(${i2}${letter} ${sign2 ? '+' : '-'} ${c2})`;
    const expr = `${part1} + ${part2}`;

    // Expand and simplify
    const coef1 = o1 * i1;
    const const1 = sign1 ? o1 * c1 : -o1 * c1;
    const coef2 = o2 * i2;
    const const2 = sign2 ? o2 * c2 : -o2 * c2;
    const totalCoef = coef1 + coef2;
    const totalConst = const1 + const2;

    const simplified = `${totalCoef}${letter}${totalConst >= 0 ? ' + ' : ' - '}${Math.abs(totalConst)}`;
    const question = 'Expand and simplify ' + expr;

    return [question, [totalCoef, totalConst, simplified]
    ];
};

export const answerSectionStyleFactor2 = (
    <div>
        <div className={factorisationStyles.inputDiv}>
            <input className={factorisationStyles.boxInput} type="number" id="Coeff" onWheel={disableScroll}/>
            <label className={factorisationStyles.textLabel}>a</label>
            <select name="sign" className={factorisationStyles.boxInput}>
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
            <input className={factorisationStyles.boxInput} type="number" id="Const" onWheel={disableScroll}/>
        </div>
    </div>
);

export const checkAnswerStyleFactor2 = (correctAnswers) => {
    const [totalCoef, totalConst, simplified] = correctAnswers;

    const inputCoef = document.querySelector('input[id="Coeff"]').value;
    const selectSign = document.querySelector('select[name="sign"]').value;
    const inputConst = document.querySelector('input[id="Const"]').value;

    document.querySelector('input[id="Coeff"]').value = "";
    document.querySelector('select[name="sign"]').value = "+";
    document.querySelector('input[id="Const"]').value = "";

    // Validate filled
    if (!inputCoef || !inputConst) {
        document.getElementById("answerFeedback").innerHTML = 
            "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }

    const userCoef = Number(inputCoef);
    const userConst = selectSign === '+' ? Number(inputConst) : -Number(inputConst);

    if (userCoef === totalCoef && userConst === totalConst) {
        return true;
    } else {
        const incorrectFeedback = `Incorrect Your answer is ${inputCoef}a ${selectSign} ${inputConst}. The correct expanded form is ${simplified}.`;
        document.getElementById("answerFeedback").innerHTML = incorrectFeedback;
        return false;
    }
};

export const factorisationQuestionStyle2 = [setQuestionStyleFactor2, answerSectionStyleFactor2, checkAnswerStyleFactor2];
