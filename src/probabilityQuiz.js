import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1,
    probabilityQuestionStyle2
}from './jsQuestionLogic/probabilityQuizQuestions.js';

const ProbabilityQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Probability Quiz"
            questionFunction = {[probabilityQuestionStyle1[0], probabilityQuestionStyle2[0]]}
            answerSection={[probabilityQuestionStyle1[1], probabilityQuestionStyle2[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2], probabilityQuestionStyle2[2]]}
        />
    )
}

export default ProbabilityQuiz;