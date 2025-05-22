import React, { use } from 'react';

import GenericQuiz from './genericQuizInterface';
import {
    ratioQuestionStyle1,
    ratioQuestionStyle2,
    ratioQuestionStyle3,
    ratioQuestionStyle4,
    ratioQuestionStyle5,
    ratioQuestionStyle6,
    ratioQuestionStyle7,
    ratioQuestionStyle8
}from './jsQuestionLogic/ratioQuizQuestions.js';

const RatioQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Ratio Quiz"
            questionFunction = {[ratioQuestionStyle1[0], ratioQuestionStyle2[0], ratioQuestionStyle3[0], ratioQuestionStyle4[0], ratioQuestionStyle5[0], ratioQuestionStyle6[0], ratioQuestionStyle7[0],ratioQuestionStyle8[0]]}
            answerSection={[ratioQuestionStyle1[1], ratioQuestionStyle2[1], ratioQuestionStyle3[1], ratioQuestionStyle4[1], ratioQuestionStyle5[1], ratioQuestionStyle6[1], ratioQuestionStyle7[1],ratioQuestionStyle8[1]]}
            checkAnswerFunction={[ratioQuestionStyle1[2], ratioQuestionStyle2[2], ratioQuestionStyle3[2], ratioQuestionStyle4[2], ratioQuestionStyle5[2], ratioQuestionStyle6[2], ratioQuestionStyle7[2],ratioQuestionStyle8[2]]}
        />
    )
}

export default RatioQuiz;