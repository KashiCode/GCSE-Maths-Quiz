import React, { use } from 'react';

import GenericQuiz from './genericQuizInterface';
import {
    factorisationQuestionStyle1,
    factorisationQuestionStyle2,
    factorisationQuestionStyle3,
    factorisationQuestionStyle4
}from './jsQuestionLogic/factorisationQuizQuestions.js';

const FactorisationQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Ratio Quiz"
            questionFunction = {[factorisationQuestionStyle1[0], factorisationQuestionStyle2[0], factorisationQuestionStyle3[0], factorisationQuestionStyle4[0]]}
            answerSection={[factorisationQuestionStyle1[1], factorisationQuestionStyle2[1], factorisationQuestionStyle3[1], factorisationQuestionStyle4[1]]}
            checkAnswerFunction={[factorisationQuestionStyle1[2], factorisationQuestionStyle2[2], factorisationQuestionStyle3[2], factorisationQuestionStyle4[2]]}
        />
    )
}

export default FactorisationQuiz;