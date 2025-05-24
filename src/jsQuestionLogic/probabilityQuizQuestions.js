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




// Function to create the fourth question style for probability questions
export const setQuestionStyleProbability4 = () => {
    // Random name
    const names = ["Alice", "Ben", "Cara", "Daniel", "Edward"];
    const name = names[getRandomInt(0, names.length - 1)];

    // Random total cards 
    const N = getRandomInt(7, 15);
    const k = getRandomInt(2, 4);

    // Random event type
    const eventType = Math.random() < 0.5 ? "even" : "odd";

    // Count of odd-numbered cards
    const oddCount = Math.ceil(N / 2);

    // Combination helper
    const comb = (n, r) => {
        let res = 1;
        for (let i = 1; i <= r; i++) {
            res = res * (n - r + i) / i;
        }
        return res;
    };

    const totalComb = comb(N, k);
    const oddComb = comb(oddCount, k);

    // Raw probability fraction
    let rawNum, rawDen;
    if (eventType === "odd") {
        rawNum = oddComb;
        rawDen = totalComb;
    } else {
        rawNum = totalComb - oddComb;
        rawDen = totalComb;
    }

    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const g = gcd(rawNum, rawDen);
    const simpNum = rawNum / g;
    const simpDen = rawDen / g;

    let steps = 
      `Total ways = ${totalComb}; ` +
      `Odd cards=${oddCount}, ways all odd = ${oddComb}; `;
    if (eventType === "odd") {
        steps += `P(odd product)=${oddComb}/${totalComb}=${simpNum}/${simpDen}`;
    } else {
        steps += `P(even product)=1-${oddComb}/${totalComb}=${rawNum}/${rawDen}=${simpNum}/${simpDen}`;
    }

    const question =
      `${name} has ${N} cards numbered 1 to ${N}. ` +
      `They draw ${k} cards at random. ` +
      `Work out the probability that the product of the numbers is ${eventType}.`;

    return [question, [simpNum, simpDen, steps]];
};

export const answerSectionStyleProbability4 = (
  <div className={styles.inputDiv} style={{display: "flex", lineHeight: "3.5em", marginTop: "1em"}}>
    <label className={styles.normalQuizLabel}>Probability: </label>
    <div className={styles.fractionDiv}>
        <input
          className={styles.fractionInput}
          type="number"
          id="Numerator"
          onWheel={disableScroll}
        />
        <hr className={styles.fractionBar} />
        <input
          className={styles.fractionInput}
          type="number"
          id="Denominator"
          onWheel={disableScroll}
        />
    </div>
  </div>
);

export const checkAnswerStyleProbability4 = (correctAnswers) => {
    const [simpNum, simpDen, steps] = correctAnswers;
    const numInput = document.querySelector('input[id="Numerator"]').value;
    const denInput = document.querySelector('input[id="Denominator"]').value;

    // Clear inputs
    document.querySelector('input[id="Numerator"]').value = "";
    document.querySelector('input[id="Denominator"]').value = "";

    if (numInput === "" || denInput === "") {
        document.getElementById("answerFeedback").innerHTML =
          "Incorrect. Please fill in both numerator and denominator.";
        return false;
    }

    const userNum = Number(numInput);
    const userDen = Number(denInput);
    if (userNum === simpNum && userDen === simpDen) {
        return true;
    } else {
        document.getElementById("answerFeedback").innerHTML =
          `You entered: ${userNum}/${userDen}. Solution steps: ${steps}`;
        return false;
    }
};

export const probabilityQuestionStyle4 = [setQuestionStyleProbability4, answerSectionStyleProbability4, checkAnswerStyleProbability4];


// Function to create the sixth question style for probability questions
const setQuestionStyleProbability6 = () => {
  const probs = [
    [1, 2], [1, 3], [2, 3],
    [2, 5], [3, 5], [3, 4],
  ];

  let F0, C0, A, p, q, x; // variables

  while (true) {
    F0 = getRandomInt(40, 90);            // initial total fish
    C0 = getRandomInt(15, F0 - 15);       // initial carp
    A  = getRandomInt(8, 15);             // fish added

    [p, q] = probs[getRandomInt(0, probs.length - 1)];
    const P = p / q;                      

    // Solve for x = tench added
    x = C0 + A - P * (F0 + A);

    if (Number.isInteger(x) && x >= 0 && x <= A) break; // good set
  }

  const question =
    `A pond had ${F0} fish.\n` +
    `${C0} were carp and the rest were tench.\n` +
    `${A} fish were added.\n\n` +
    `The probability that a fish picked at random is a carp is now ` +
    `${p}/${q}.\n\n` +
    `How many tench were added?`;
                                      
  return [question, x];
};

const answerSectionStyleProbability6 = (
  <div className={styles.inputDiv}>
    <label className={styles.normalQuizLabel}>Tench added: </label>
    <input
      className={styles.normalQuizInput}
      type="number"
      id="TenchInput"
      placeholder="Enter number"
      onWheel={disableScroll}
    />
  </div>
);

const checkAnswerStyleProbability6 = correctX => {
  const inp = document.getElementById("TenchInput").value;

  document.getElementById("TenchInput").value = "";

  if (inp === "") {
    document.getElementById("answerFeedback").innerHTML =
      "Incorrect. Please enter a number.";
    return false;
  }

  if (+inp === correctX) {
    return true;
  } else {
    document.getElementById("answerFeedback").innerHTML =
      `Incorrect. Your answer is ${inp}.  The correct number of tench added is ${correctX}.`;
    return false;
  }
};

export const probabilityQuestionStyle6 = [
  setQuestionStyleProbability6,
  answerSectionStyleProbability6,
  checkAnswerStyleProbability6,
];


// Function to create the eighth question style for probability questions
const setQuestionStyleProbability8 = () => {

  const fracText = f => {
    const map = {0.25:"a quarter", 0.2:"a fifth", 0.3:"3 tenths", 0.33:"a third"};
    return map[f.toFixed(2)] || `${f*100}%`;
  };

  const ratioOptions = [
    [5, 2],
    [4, 3],
    [3, 2],
  ];

  const factorOptions = [
    [2, "double"],
    [3, "triple"],
    [0.5, "half"],
  ];

  let N, menFrac, a, b, k, kWord;
  let M, Mp, Mf, W, Wp, Wf;

  while (true) {
    // total candidates
    N = getRandomInt(60, 120);

    // men fraction
    menFrac = Math.random() < 0.5 ? 0.25 : 1 / 3;
    M = N * menFrac;
    if (!Number.isInteger(M)) continue;

    // men pass : fail
    [a, b] = ratioOptions[getRandomInt(0, ratioOptions.length - 1)];
    Mp = (a / (a + b)) * M;
    Mf = M - Mp;
    if (!Number.isInteger(Mp)) continue;

    // women numbers
    W = N - M;

    [k, kWord] = factorOptions[getRandomInt(0, factorOptions.length - 1)];
    Wf = W / (k + 1);
    Wp = W - Wf;

    if (
      Number.isInteger(Wf) &&
      Number.isInteger(Wp)
    ) break;
  }

  /*Build the JSX stem – paragraph + inline SVG tree with inputs    */

  const question = (
    <>
      <p>
        {N} people take a driving test.<br />
        {fracText(menFrac)} are men.<br />
        For the men, the ratio <strong>pass : fail = {a} : {b}</strong>.<br />
        The number of women who pass is <strong>{kWord}</strong> the number of
        women who fail.
      </p>

      {/* --- frequency tree --- */}
      <svg width="450" height="240" style={{overflow: "visible"}}>
        {/* lines */}
        <line x1="70" y1="60"  x2="170" y2="40"  stroke="black" />
        <line x1="70" y1="60"  x2="170" y2="140" stroke="black" />
        <line x1="170" y1="40" x2="300" y2="20"  stroke="black" />
        <line x1="170" y1="40" x2="300" y2="70"  stroke="black" />
        <line x1="170" y1="140" x2="300" y2="110" stroke="black" />
        <line x1="170" y1="140" x2="300" y2="170" stroke="black" />

        {/* root node – total (given) */}
        <ellipse cx="70" cy="60" rx="30" ry="20" stroke="black" fill="white"/>
        <text x="70" y="60" textAnchor="middle" dominantBaseline="middle">{N}</text>

        {/* men / women intermediate nodes (inputs) */}
        <ellipse cx="170" cy="40" rx="30" ry="20" stroke="black" fill="white"/>
        <foreignObject x="140" y="25" width="60" height="30">
          <input data-key="menTotal" className="treeInput" />
        </foreignObject>

        <ellipse cx="170" cy="140" rx="30" ry="20" stroke="black" fill="white"/>
        <foreignObject x="140" y="125" width="60" height="30">
          <input data-key="womenTotal" className="treeInput" />
        </foreignObject>

        {/* leaf nodes */}
        {/* men pass */}
        <ellipse cx="300" cy="20" rx="30" ry="20" stroke="black" fill="white"/>
        <foreignObject x="270" y="5" width="60" height="30">
          <input data-key="menPass" className="treeInput" />
        </foreignObject>
        {/* men fail */}
        <ellipse cx="300" cy="70" rx="30" ry="20" stroke="black" fill="white"/>
        <foreignObject x="270" y="55" width="60" height="30">
          <input data-key="menFail" className="treeInput" />
        </foreignObject>
        {/* women pass */}
        <ellipse cx="300" cy="110" rx="30" ry="20" stroke="black" fill="white"/>
        <foreignObject x="270" y="95" width="60" height="30">
          <input data-key="womenPass" className="treeInput" />
        </foreignObject>
        {/* women fail */}
        <ellipse cx="300" cy="170" rx="30" ry="20" stroke="black" fill="white"/>
        <foreignObject x="270" y="155" width="60" height="30">
          <input data-key="womenFail" className="treeInput" />
        </foreignObject>

        {/* labels */}
        <text x="105" y="36">men</text>
        <text x="95" y="136">women</text>
        <text x="335" y="16">pass</text>
        <text x="335" y="66">fail</text>
        <text x="335" y="106">pass</text>
        <text x="335" y="166">fail</text>
      </svg>

      <p>Complete the frequency tree.</p>
    </>
  );


  const answers = {
    menTotal:   M,
    womenTotal: W,
    menPass:    Mp,
    menFail:    Mf,
    womenPass:  Wp,
    womenFail:  Wf,
  };

  return [question, answers];
};

const answerSectionStyleProbability8 = (
  <div>
    {/*N/A - IGNORE THIS LINE*/}
  </div>
);

const checkAnswerStyleProbability8 = correctObj => {
  const keys = Object.keys(correctObj);
  const wrong = [];

  keys.forEach(k => {
    const val = document.querySelector(`input[data-key="${k}"]`).value;
    if (+val !== correctObj[k]) wrong.push({k, val});
    document.querySelector(`input[data-key="${k}"]`).value = "";
  });

  if (wrong.length === 0) return true;

  const msgLines = wrong.map(
    ({k, val}) => `${k.replace(/([A-Z])/g," $1")}: entered ${val}, should be ${correctObj[k]}`
  );
  document.getElementById("answerFeedback").innerHTML =
    "Incorrect.<br/>" + msgLines.join("<br/>");
  return false;
};

export const probabilityQuestionStyle8 = [
  setQuestionStyleProbability8,
  answerSectionStyleProbability8,
  checkAnswerStyleProbability8,
];


// Function to create the ninth question style for probability questions
const setQuestionStyleProbability9 = () => {
  /* Pick three probabilities that sum to < 1 so the red slot is left over.
                */
  let Pblue, Pyel, Pgreen, Pred;

  while (true) {
    const pool = [0.10,0.15,0.20,0.25,0.30,0.35,0.40];
    Pblue  = pool[getRandomInt(0, pool.length - 1)];
    Pyel   = pool[getRandomInt(0, pool.length - 1)];
    Pgreen = pool[getRandomInt(0, pool.length - 1)];

    if (Pblue + Pyel + Pgreen < 1) {
      Pred = +(1 - (Pblue + Pyel + Pgreen)).toFixed(2);
      if (Pred > 0) break;
    }
  }

  const totals = [48, 60, 72, 80, 84, 96, 100, 120];
  let N, blueCount;
  while (true) {
    N = totals[getRandomInt(0, totals.length - 1)];
    blueCount = N * Pblue;
    if (Number.isInteger(blueCount) && blueCount > 20 && blueCount < 100) break;
  }

  const redCount = N * Pred;   

  /*JSX stem with the probability table                            */
  const question = (
    <>
      <p>
        A box contains counters that are red, blue, yellow or green. The table shows some information about picking a counter at random.
      </p>

      <table className={styles.probTable}>
        <thead>
          <tr>
            <th></th>
            <th>red</th>
            <th>blue</th>
            <th>yellow</th>
            <th>green</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Probability</td>
            <td>?</td>
            <td>{Pblue.toFixed(2)}</td>
            <td>{Pyel.toFixed(2)}</td>
            <td>{Pgreen.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <p>There are {blueCount} blue counters.</p> <p><strong>How many red counters are there?</strong></p>
    </>
  );

  return [question, redCount];
};


const answerSectionStyleProbability9 = (
  <div className={styles.inputDiv}>
    <label className={styles.normalQuizLabel}>Red counters: </label>
    <input
      className={styles.normalQuizInput}
      type="number"
      id="RedTableInput"
      placeholder="Enter number"
      onWheel={disableScroll}
    />
  </div>
);


const checkAnswerStyleProbability9 = correctRed => {
  const val = document.getElementById("RedTableInput").value;
  document.getElementById("RedTableInput").value = "";   

  if (val === "") {
    document.getElementById("answerFeedback").innerHTML =
      "Incorrect. Please enter a number.";
    return false;
  }

  if (+val === correctRed) return true;

  document.getElementById("answerFeedback").innerHTML =
    `Incorrect. Your answer is ${val}. <br/>` +
    `The correct number of red counters is ${correctRed}.`;
  return false;
};

export const probabilityQuestionStyle9 = [
  setQuestionStyleProbability9,
  answerSectionStyleProbability9,
  checkAnswerStyleProbability9,
];


// Function to create the fifth question style for probability questions
const setQuestionStyleProbability5 = () => {
  const names = ["Temi", "Alex", "Ben", "Cara", "Dev", "Ella"];
  const name  = names[getRandomInt(0, names.length - 1)];

                            
  const diceCount = 2;
  const faces     = 6;

  // Generate all possible totals and count the single-digit primes
  const isPrime = n => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  };

  let favourable = 0;
  const totalOutcomes = faces ** diceCount; 

  for (let d1 = 1; d1 <= faces; d1++) {
    for (let d2 = 1; d2 <= faces; d2++) {
      const sum = d1 + d2;
      if (sum < 10 && isPrime(sum)) favourable++;
    }
  }

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const g   = gcd(favourable, totalOutcomes);
  const simpNum = favourable / g;
  const simpDen = totalOutcomes / g;

  const question =
    `${name} rolls two fair, six-sided dice. The two numbers are added ` +
    `to give a total.\n\n` +
    `Work out the probability that the total is a single-digit prime ` +
    `number.`;

  return [question, [simpNum, simpDen, favourable, totalOutcomes]];
};

const answerSectionStyleProbability5 = (
  <div className={styles.inputDiv} style={{display:"flex",lineHeight:"3.5em",marginTop:"1em"}}>
    <label className={styles.normalQuizLabel}>Probability: </label>
    <div className={styles.fractionDiv}>
      <input className={styles.fractionInput} type="number" id="Numerator"   onWheel={disableScroll}/>
      <hr   className={styles.fractionBar}/>
      <input className={styles.fractionInput} type="number" id="Denominator" onWheel={disableScroll}/>
    </div>
  </div>
);

const checkAnswerStyleProbability5 = correct => {
  const [simpNum, simpDen, fav, tot] = correct;
  const numInput = document.getElementById("Numerator").value;
  const denInput = document.getElementById("Denominator").value;

  document.getElementById("Numerator").value   = "";
  document.getElementById("Denominator").value = "";

  if (numInput === "" || denInput === "") {
    document.getElementById("answerFeedback").innerHTML =
      "Incorrect. Please fill in both numerator and denominator.";
    return false;
  }

  if (+numInput === simpNum && +denInput === simpDen) return true;

  document.getElementById("answerFeedback").innerHTML =
    `Incorrect. Your answer is ${numInput}/${denInput}. ` +
    `There are ${fav} favourable outcomes out of ${tot}, ` +
    `so the probability simplifies to ${simpNum}/${simpDen}.`;
  return false;
};

export const probabilityQuestionStyle5 = [
  setQuestionStyleProbability5,
  answerSectionStyleProbability5,
  checkAnswerStyleProbability5,
];


const makeContingencyData = () => {
  const ratioMS = [2, 3];                 // Maths : Science
  const kOptions = [
    [0.5, "half as many"],
    [2,   "double"],
    [3,   "triple"],
  ];

  let N, diff, k, kText,
      B, G, Tm, Ts, Gm, Gs, Bm, Bs;

  while (true) {
    N   = 5 * getRandomInt(14, 30);       // total pupils – multiple of 5
    diff = 2 * getRandomInt(3, 10);       // boys – girls  (even number)
    B   = (N + diff) / 2;
    G   = N - B;
    if (!Number.isInteger(B)) continue;   // keep looping until integer

    [k, kText] = kOptions[getRandomInt(0, kOptions.length - 1)];

    // girls split k : 1 between Maths : Science
    const denom = 1 + k;                  // e.g. 1.5, 3, 4
    if (Math.abs(denom - 1.5) < 1e-9) {   // k = 0.5
      if (G % 3) continue;
      Gs = (G * 2) / 3;                   //  G / 1.5
    } else {
      if (G % denom) continue;
      Gs = G / denom;
    }
    Gm = Math.round(k * Gs);

    Tm = (ratioMS[0] / 5) * N;            // total Maths
    Ts = N - Tm;
    if (!Number.isInteger(Tm)) continue;

    Bm = Tm - Gm;
    Bs = B - Bm;
    if (Bm < 0 || Bs < 0) continue;       // reject impossible splits

    break;
  }

  return { N, diff, kText, B, G, Tm, Ts, Gm, Gs, Bm, Bs };
};

// Function to create the tenth question style for probability questions
const setQuestionStyleProbability10a = () => {
  const data = makeContingencyData();
  const { N, diff, kText } = data;

  const question = (
    <>
      <p>
        {N} students have Maths or Science next lesson.<br/>
        There are <strong>{diff} more boys than girls</strong> altogether.<br/>
        The ratio&nbsp;<strong>Maths : Science = 2 : 3</strong>.<br/>
        {kText.charAt(0).toUpperCase() + kText.slice(1)} girls have Maths as have Science.
      </p>

      <p><strong>5 (a)</strong> Complete the table.</p>

      <table className={styles.contTable}>
        <thead>
          <tr><th></th><th>Boys</th><th>Girls</th><th>Total</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Maths</td>
            <td><input data-key="Bm" className="contInp" /></td>
            <td><input data-key="Gm" className="contInp" /></td>
            <td><input data-key="Tm" className="contInp" /></td>
          </tr>
          <tr>
            <td>Science</td>
            <td><input data-key="Bs" className="contInp" /></td>
            <td><input data-key="Gs" className="contInp" /></td>
            <td><input data-key="Ts" className="contInp" /></td>
          </tr>
          <tr>
            <td>Total</td>
            <td><input data-key="B" className="contInp" /></td>
            <td><input data-key="G" className="contInp" /></td>
            <td>{N}</td>
          </tr>
        </tbody>
      </table>
    </>
  );


  return [question, data];
};

const answerSectionStyleProbability10a = <></>;

const checkAnswerStyleProbability10a = correct => {
  const keys = ["Bm","Gm","Tm","Bs","Gs","Ts","B","G"];
  const wrong = [];

  keys.forEach(k => {
    const el = document.querySelector(`input[data-key="${k}"]`);
    if (+el.value !== correct[k]) wrong.push(`${k}: ${el.value} → ${correct[k]}`);
    el.value = "";
  });

  if (wrong.length === 0) return true;
  document.getElementById("answerFeedback").innerHTML =
    "Incorrect.<br/>" + wrong.join("<br/>");
  return false;
};

export const probabilityQuestionStyle10a = [
  setQuestionStyleProbability10a,
  answerSectionStyleProbability10a,
  checkAnswerStyleProbability10a,
];


const setQuestionStyleProbability10b = () => {
  const d = makeContingencyData();

  /* Static table (no inputs needed) */
  const tableRow = (row, rKey) => (
    <tr>
      <td>{row}</td>
      <td>{d[`${rKey}m`]}</td>
      <td>{d[`${rKey}s`]}</td>
      <td>{d[`T${rKey}`]}</td>
    </tr>
  );

  /* randomly choose one of the four groups */
  const opts = [
    { fav: d.Bm, label: "a boy who has Maths" },
    { fav: d.Bs, label: "a boy who has Science" },
    { fav: d.Gm, label: "a girl who has Maths" },
    { fav: d.Gs, label: "a girl who has Science" },
  ];
  const { fav, label } = opts[getRandomInt(0, opts.length - 1)];

  const gcd = (a,b)=>b?gcd(b,a%b):a;
  const g = gcd(fav, d.N);
  const num = fav / g, den = d.N / g;

  const question = (
    <>
      <p>
        {d.N} students have Maths or Science next lesson.<br/>
        There are <strong>{d.diff} more boys than girls</strong> altogether.<br/>
        The ratio&nbsp;<strong>Maths : Science = 2 : 3</strong>.<br/>
        {d.kText.charAt(0).toUpperCase() + d.kText.slice(1)} girls have Maths as have Science.
      </p>

      <table className={styles.contTable}>
        <thead>
          <tr><th></th><th>Boys</th><th>Girls</th><th>Total</th></tr>
        </thead>
        <tbody>
          {tableRow("Maths",    "T")}   
          {tableRow("Science",  "S")}
          <tr><td>Total</td><td>{d.B}</td><td>{d.G}</td><td>{d.N}</td></tr>
        </tbody>
      </table>

      <p>
        A student is chosen at random.<br/>
        Work out the probability that it is <strong>{label}</strong>.
      </p>
    </>
  );

  return [question, { num, den }];
};

const answerSectionStyleProbability10b = (
  <div className={styles.inputDiv} style={{display:"flex",lineHeight:"3.5em"}}>
    <label className={styles.normalQuizLabel}>Probability: </label>
    <div className={styles.fractionDiv}>
      <input className={styles.fractionInput} type="number" id="ProbNum" onWheel={disableScroll}/>
      <hr className={styles.fractionBar}/>
      <input className={styles.fractionInput} type="number" id="ProbDen" onWheel={disableScroll}/>
    </div>
  </div>
);

const checkAnswerStyleProbability10b = correct => {
  const n = +document.getElementById("ProbNum").value;
  const d = +document.getElementById("ProbDen").value;
  document.getElementById("ProbNum").value = "";
  document.getElementById("ProbDen").value = "";

  if (n === correct.num && d === correct.den) return true;

  document.getElementById("answerFeedback").innerHTML =
    `Incorrect. Your answer is ${n}/${d}. The correct probability is ` +
    `${correct.num}/${correct.den}.`;
  return false;
};

export const probabilityQuestionStyle10b = [
  setQuestionStyleProbability10b,
  answerSectionStyleProbability10b,
  checkAnswerStyleProbability10b,
];