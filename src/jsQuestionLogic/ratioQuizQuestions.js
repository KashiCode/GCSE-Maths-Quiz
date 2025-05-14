import { toWords } from 'number-to-words';
import styles from '../css/normalQuiz.module.css';

//Function to disable scrolling when using the number input
function disableScroll(event) {
    event.preventDefault();
    event.target.blur();
}

//Function to generate a random number
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Function to generate a question based off ratios in the first style
export const setQuestionStyle1 = () => {
    // Logic to set the question and answer options
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
export const answerSectionStyle1 = (
    <div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Red: </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Red' onWheel={disableScroll}/>
        </div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Blue: </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Blue' onWheel={disableScroll}/>
        </div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Green: </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Green' onWheel={disableScroll}/>
        </div>
    </div>
);

//Function to check the answer and return true or false based on the answer given
//Also clears the input fields after checking the answer
export const checkAnswerStyle1 = (correctAnswers) => {
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
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Your answer is " + red + ":" + blue + ":" + green + " for the Red:Blue:Green. When the ratio of red to blue is " + correctAnswers[3] + ":" + correctAnswers[4] + " and the ratio of blue to green is " + correctAnswers[5] + ":" + correctAnswers[6] + ". " + "The correct answer is " + correctAnswers[0] + ":" + correctAnswers[1] + ":" + correctAnswers[2];
        return false;
    }
}

export const ratioQuestionStyle1 = [setQuestionStyle1, answerSectionStyle1, checkAnswerStyle1];



//Function to create the second question style for ratio questions
const setQuestionStyle2 = () => {
    // Logic to set the question and answer options
    const generateName = () => {
        const names = ["Lucy", "Fred", "Bob", "Adam", "Max", "Aaron", "Jack", "Jake", "Frank", "Will", "Tom", "Sam", "Ben", "Joe", "James", "John", "Charlie", "Harry", "George", "Henry"];
        let num1 = Math.floor(Math.random() * names.length);
        let name1 = names[num1];
        let num2 = Math.floor(Math.random() * names.length);
        while (num1 == num2) {
            let num2 = Math.floor(Math.random() * names.length);
        }
        let name2 = names[num2];
        return [name1, name2];
    }

    let num1 = 1;
    let num2 = 1;
    while (num1 == num2){
        num1 = getRandomInt(1, 15);
        num2 = getRandomInt(1, 15);
    }

    //Finding the solution for the given ratio question
    let numDiff = 0;
    if (num1 > num2) {
        numDiff = num1 - num2;
    }
    else {
        numDiff = num2 - num1; 
    }

    let costDiff = numDiff * 5 * getRandomInt(1, 12);

    let costUnit = costDiff / numDiff;
    let cost1 = costUnit * num1;

    //Creating the question string
    let generatedNames = generateName();
    let question = generatedNames[0] + " and " + generatedNames[1] + " share some money in the ratio " + num1 + ":" + num2 + ".";
    question += " The difference in their money is £" + costDiff + ".";
    question += " Work out how much money " + generatedNames[0] + " recieves.";

    return [question, [generatedNames[0], generatedNames[1], num1, num2, numDiff, costDiff, costUnit, cost1]];
}

//Creating the answer section that should allow users to input their answers
const answerSectionStyle2 = (
    <div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Amount(£): </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Amount' onWheel={disableScroll}/>
        </div>
    </div>
);

//Function to check the answer and return true or false based on the answer given
//Also clears the input fields after checking the answer
const checkAnswerStyle2 = (correctAnswers) => {
    const answer = document.querySelector('input[placeholder="Amount"]').value;

    document.querySelector('input[placeholder="Amount"]').value = "";
        
    if (answer === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    if (answer == correctAnswers[7]) {
        return true;
    } else {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Your answer is £" + answer + ". When " + correctAnswers[0] + " and " + correctAnswers[1] + " share money in the ratio " + correctAnswers[2] + ":" + correctAnswers[3] + ". The difference in their money is £" + correctAnswers[5] + ". The correct answer is £" + correctAnswers[7] + ". This is as the difference between the two in the ratio is " + correctAnswers[4] + " and so amount per unit is £" + correctAnswers[6] + " leading to the answer.";
        return false;
    }
}

export const ratioQuestionStyle2 = [setQuestionStyle2, answerSectionStyle2, checkAnswerStyle2];




//Function to create the second question style for ratio questions
const setQuestionStyle3 = () => {
    // Logic to set the question and answer options
    const generateIngredient = () => {
        const ingredients = ["flour", "sugar", "butter", "eggs", "milk", "salt", "baking powder", "vanilla extract", "chocolate chips", "nuts", "fruit", "yogurt", "honey", "jam", "cream cheese", "peanut butter"];
        let num1 = Math.floor(Math.random() * ingredients.length);
        let ingredient1 = ingredients[num1];
        let num2 = Math.floor(Math.random() * ingredients.length);
        while (num1 == num2) {
            let num2 = Math.floor(Math.random() * ingredients.length);
        }
        let ingredient2 = ingredients[num2];
        let num3 = Math.floor(Math.random() * ingredients.length);
        while (num1 == num3 || num2 == num3) {
            let num3 = Math.floor(Math.random() * ingredients.length);
        }
        let ingredient3 = ingredients[num3];
        return [ingredient1, ingredient2, ingredient3];
    }

    let num1 = 1;
    let num2 = 1;
    let num3 = 1;
    while (num1 == num2 || num1 == num3 || num2 == num3){
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        num3 = getRandomInt(1, 10);
    }

    let amount2 = num2 * 2.5 * getRandomInt(1, 40);

    let amountUnit = amount2 / num2;
    let amount1 = amountUnit * num1;
    let amount3 = amountUnit * num3;

    //Creating the question string
    let generatedIngredients = generateIngredient();
    let question = "A recipe uses " + toWords(num1) + " parts " + generatedIngredients[0] + " for " + toWords(num2) + " parts ";
    question += generatedIngredients[1] + " and " + toWords(num3) + " parts " + generatedIngredients[2] + ".";
    question += " When preparing for a party, the chef uses " + amount2 + "g of " + generatedIngredients[1] + ", ";
    question += "how much " + generatedIngredients[0] + " and " + generatedIngredients[2] + " do they need?";

    return [question, [generatedIngredients[0], generatedIngredients[1], generatedIngredients[2], num1, num2, num3, amount2, amountUnit, amount1, amount3]];
}

//Creating the answer section that should allow users to input their answers
const answerSectionStyle3 = (
    <div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Ingredient 1(g): </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Ingredient 1' onWheel={disableScroll}/>
        </div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Ingredient 3(g): </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Ingredient 3' onWheel={disableScroll}/>
        </div>
    </div>
);

//Function to check the answer and return true or false based on the answer given
//Also clears the input fields after checking the answer
const checkAnswerStyle3 = (correctAnswers) => {
    const amount1 = document.querySelector('input[placeholder="Ingredient 1"]').value;
    const amount3 = document.querySelector('input[placeholder="Ingredient 3"]').value;

    document.querySelector('input[placeholder="Ingredient 1"]').value = "";
    document.querySelector('input[placeholder="Ingredient 3"]').value = "";
        
    if (amount1 === "" || amount3 === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    if (amount1 == correctAnswers[8] && amount3 == correctAnswers[9]) {
        return true;
    } else {
        let newFeedback = "Incorrect. Your answer is " + amount1 + "g of " + correctAnswers[0] + " and " + amount3 + "g of ";
        newFeedback += correctAnswers[2] + ". When the ratio of " + correctAnswers[0] + ":" + correctAnswers[1] + ":";
        newFeedback +=correctAnswers[2] + " is used, the amount of " + correctAnswers[1] + " used is " + correctAnswers[6];
        newFeedback += "g. The correct amounts are " + correctAnswers[8] + "g of " + correctAnswers[0] + " and " + correctAnswers[9];
        newFeedback += "g of " + correctAnswers[2];
        document.getElementById("answerFeedback").innerHTML = newFeedback;
        return false;
    }
}

export const ratioQuestionStyle3 = [setQuestionStyle3, answerSectionStyle3, checkAnswerStyle3];



//Function to create the fourth question style for ratio questions
const setQuestionStyle4 = () => {
    // Logic to set the question and answer options
    const generateGroup = () => {
        const groups = [["men", "women"], ["students", "teachers"], ["children", "adults"], ["employees", "managers"], ["cyclists", "drivers"], ["pilots", "passengers"]];
        let num1 = Math.floor(Math.random() * groups.length);
        let group = groups[num1]
        return group;
    }

    const generateCondition = () => {
        const conditions = ["blonde", "green-eyed", "not green-eyed", "tall", "not tall", "short", "healthy", "unhealthy", "young", "old"];
        let num1 = Math.floor(Math.random() * conditions.length);
        let condition = conditions[num1];
        return condition;
    }

    //This makes sure that the random numbers of the ratio work well for the question
    // The ratio has to add up to 4, 5, 8, 10 to make sure that the percentages are easy to work with
    let num1 = getRandomInt(1, 5);
    let num2 = 1;
    if (num1 == 5) {
        num1 = 4;
        num2 = 1;
    }
    else if (num1 == 4) {
        num1 = 9;
        num2 = 1;
    }
    else if (num1 == 3) {
        num1 = 7;
        num2 = getRandomInt(1, 2);
        if (num2 == 2) {
            num2 = 3;
        }
    }
    else if (num1 == 2) {
        num1 = 5;
        num2 = 3;
    }
    else if (num1 == 1) {
        num1 = 3;
        num2 = getRandomInt(1, 2);
    }

    let totalNum = num1 + num2;
    let unitPercentage = 100 / totalNum;
    let percentageNum1 = unitPercentage * num1;
    let percentageNum2 = unitPercentage * num2;
    let percentageQuestion1 = getRandomInt(1, 19) * 5;
    let percentageQuestion2 = getRandomInt(1, 19) * 5;
    let percentageProduct1 = percentageNum1 * percentageQuestion1 / 100;
    let percentageProduct2 = percentageNum2 * percentageQuestion2 / 100;
    let percentageTotal = percentageProduct1 + percentageProduct2;

    //Creating the question string
    let generatedGroup = generateGroup();
    let generatedCondition = generateCondition();
    let question = "In a group, the ratio of " + generatedGroup[0] + " to " + generatedGroup[1] + " is " + num1 + ":" + num2 + ".";
    question += " " + percentageQuestion1 + "% of the " + generatedGroup[0] + " are " + generatedCondition + ".";
    question += " " + percentageQuestion2 + "% of the " + generatedGroup[1] + " are " + generatedCondition + ".";
    question += " What percentage of the group is " + generatedCondition + "?";

    return [question, [generatedGroup[0], generatedGroup[1], num1, num2, percentageNum1, percentageNum2, generatedCondition, totalNum, unitPercentage, percentageQuestion1, percentageQuestion2, percentageProduct1, percentageProduct2, percentageTotal]];
}

//Creating the answer section that should allow users to input their answers
const answerSectionStyle4 = (
    <div>
        <div className={styles.inputDiv}>
            <label class={styles.normalQuizLabel}>Matching Percentage(%): </label>
            <input class={styles.normalQuizInput} type='number' placeholder='Percentage' onWheel={disableScroll}/>
        </div>
    </div>
);

//Function to check the answer and return true or false based on the answer given
//Also clears the input fields after checking the answer
const checkAnswerStyle4 = (correctAnswers) => {
    const answer = document.querySelector('input[placeholder="Percentage"]').value;

    document.querySelector('input[placeholder="Percentage"]').value = "";
        
    if (answer === "") {
        document.getElementById("answerFeedback").innerHTML = "Incorrect. Please fill in all fields to answer the question.";
        return false;
    }
    if (answer == correctAnswers[13]) {
        return true;
    } else {
        let newFeedback = "Incorrect. Your answer is " + answer + "%. The ratio of " + correctAnswers[0] + ":" + correctAnswers[1];
        newFeedback +=  " is " + correctAnswers[2] + ":" + correctAnswers[3] + ", " + correctAnswers[9] + "% of the ";
        newFeedback += correctAnswers[0] + " are " + correctAnswers[6] + " and " + correctAnswers[10] + "% of the " + correctAnswers[1];
        newFeedback += " are " + correctAnswers[6] + ". The total of the ratio is " + correctAnswers[7] + " meaning that the percentage";
        newFeedback += " per unit is " + correctAnswers[8] + "%. The percentage of " + correctAnswers[0] + " in the group is ";
        newFeedback += correctAnswers[4] + "% and the percentage of " + correctAnswers[1] + " in the group is " + correctAnswers[5] + "%.";
        newFeedback += " By multiplying the percentages of " + correctAnswers[9] + "% by " + correctAnswers[4] + "% we get ";
        newFeedback += correctAnswers[11] + "% and by multiplying the percentages of " + correctAnswers[10] + "% by " + correctAnswers[5];
        newFeedback += "% we get " + correctAnswers[12] + "%. Adding these two together gives us " + correctAnswers[13] + "%.";
        document.getElementById("answerFeedback").innerHTML = newFeedback;
        return false;
    }
}

export const ratioQuestionStyle4 = [setQuestionStyle4, answerSectionStyle4, checkAnswerStyle4];