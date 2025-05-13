import React, { use } from 'react';

import GenericQuiz from './genericQuizInterface';
import {
    factorisationQuestionStyle1,
}from './jsQuestionLogic/factorisationQuizQuestions.js';

const FactorisationQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Ratio Quiz"
            questionFunction = {[factorisationQuestionStyle1[0]]}
            answerSection={[factorisationQuestionStyle1[1]]}
            checkAnswerFunction={[factorisationQuestionStyle1[2]]}
        />
    )
}

export default FactorisationQuiz;