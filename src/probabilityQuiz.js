import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1,
    probabilityQuestionStyle2,
    probabilityQuestionStyle3,
    probabilityQuestionStyle4 
}from './jsQuestionLogic/probabilityQuizQuestions.js';

const ProbabilityQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Probability Quiz"
            questionFunction = {[probabilityQuestionStyle1[0], probabilityQuestionStyle2[0], probabilityQuestionStyle3[0], probabilityQuestionStyle4[0]]}
            answerSection={[probabilityQuestionStyle1[1], probabilityQuestionStyle2[1], probabilityQuestionStyle3[1], probabilityQuestionStyle4[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2], probabilityQuestionStyle2[2], probabilityQuestionStyle3[2], probabilityQuestionStyle4[2]]}
        />
    )
}

export default ProbabilityQuiz;
