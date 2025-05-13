import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1
}from './jsQuestionLogic/probabilityQuizQuestions.js';
import {
    ratioQuestionStyle1,
    ratioQuestionStyle2,
    ratioQuestionStyle3,
    ratioQuestionStyle4
}from './jsQuestionLogic/ratioQuizQuestions.js';

const UniversalQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Universal Quiz"
            questionFunction = {[probabilityQuestionStyle1[0], ratioQuestionStyle1[0], ratioQuestionStyle2[0], ratioQuestionStyle3[0], ratioQuestionStyle4[0]]}
            answerSection={[probabilityQuestionStyle1[1], ratioQuestionStyle1[1], ratioQuestionStyle2[1], ratioQuestionStyle3[1], ratioQuestionStyle4[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2], ratioQuestionStyle1[2], ratioQuestionStyle2[2], ratioQuestionStyle3[2], ratioQuestionStyle4[2]]}
        />
    )
}

export default UniversalQuiz;