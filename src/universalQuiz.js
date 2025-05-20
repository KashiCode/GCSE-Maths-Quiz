import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1
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
    factorisationQuestionStyle1
}from './jsQuestionLogic/factorisationQuizQuestions.js';

const UniversalQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Universal Quiz"
            questionFunction = {[probabilityQuestionStyle1[0], ratioQuestionStyle1[0], ratioQuestionStyle2[0], ratioQuestionStyle3[0], ratioQuestionStyle4[0], ratioQuestionStyle5[0], ratioQuestionStyle6[0], ratioQuestionStyle7[0], factorisationQuestionStyle1[0]]}
            answerSection={[probabilityQuestionStyle1[1], ratioQuestionStyle1[1], ratioQuestionStyle2[1], ratioQuestionStyle3[1], ratioQuestionStyle4[1], ratioQuestionStyle5[1], ratioQuestionStyle6[1], ratioQuestionStyle7[1], factorisationQuestionStyle1[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2], ratioQuestionStyle1[2], ratioQuestionStyle2[2], ratioQuestionStyle3[2], ratioQuestionStyle4[2], ratioQuestionStyle5[2], ratioQuestionStyle6[2], ratioQuestionStyle7[2], factorisationQuestionStyle1[2]]}
        />
    )
}

export default UniversalQuiz;