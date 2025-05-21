import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1,
    probabilityQuestionStyle2,
    probabilityQuestionStyle3,
    probabilityQuestionStyle4
}from './jsQuestionLogic/probabilityQuizQuestions.js';
import {
    ratioQuestionStyle1,
    ratioQuestionStyle2,
    ratioQuestionStyle3,
    ratioQuestionStyle4,
    ratioQuestionStyle5,
    ratioQuestionStyle6,
    ratioQuestionStyle7
}from './jsQuestionLogic/ratioQuizQuestions.js';
import {
    factorisationQuestionStyle1,
    factorisationQuestionStyle2,
    factorisationQuestionStyle3,
    factorisationQuestionStyle4
}from './jsQuestionLogic/factorisationQuizQuestions.js';

const UniversalQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Universal Quiz"
            questionFunction = {[probabilityQuestionStyle1[0], probabilityQuestionStyle2[0], probabilityQuestionStyle3[0], probabilityQuestionStyle4[0], ratioQuestionStyle1[0], ratioQuestionStyle2[0], ratioQuestionStyle3[0], ratioQuestionStyle4[0], ratioQuestionStyle5[0], ratioQuestionStyle6[0], ratioQuestionStyle7[0], factorisationQuestionStyle1[0], factorisationQuestionStyle2[0], factorisationQuestionStyle3[0], factorisationQuestionStyle4[0]]}
            answerSection={[probabilityQuestionStyle1[1], probabilityQuestionStyle2[1], probabilityQuestionStyle3[1], probabilityQuestionStyle4[1], ratioQuestionStyle1[1], ratioQuestionStyle2[1], ratioQuestionStyle3[1], ratioQuestionStyle4[1], ratioQuestionStyle5[1], ratioQuestionStyle6[1], ratioQuestionStyle7[1], factorisationQuestionStyle1[1], factorisationQuestionStyle2[1], factorisationQuestionStyle3[1], factorisationQuestionStyle4[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2], probabilityQuestionStyle2[2], probabilityQuestionStyle3[2], probabilityQuestionStyle4[2], ratioQuestionStyle1[2], ratioQuestionStyle2[2], ratioQuestionStyle3[2], ratioQuestionStyle4[2], ratioQuestionStyle5[2], ratioQuestionStyle6[2], ratioQuestionStyle7[2], factorisationQuestionStyle1[2], factorisationQuestionStyle2[2], factorisationQuestionStyle3[2], factorisationQuestionStyle4[2]]}
        />
    )
}

export default UniversalQuiz;