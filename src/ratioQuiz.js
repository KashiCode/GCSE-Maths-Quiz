import React, { use } from 'react';

import GenericQuiz from './genericQuizInterface';
import {
    ratioQuestionStyle1,
    ratioQuestionStyle2
}from './jsQuestionLogic/ratioQuizQuestions.js';

const RatioQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Ratio Quiz"
            questionFunction = {[ratioQuestionStyle1[0], ratioQuestionStyle2[0]]}
            answerSection={[ratioQuestionStyle1[1], ratioQuestionStyle2[1]]}
            checkAnswerFunction={[ratioQuestionStyle1[2], ratioQuestionStyle2[2]]}
        />
    )
}

export default RatioQuiz;