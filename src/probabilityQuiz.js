import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1
}from './jsQuestionLogic/probabilityQuizQuestions.js';

const ProbabilityQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Probability Quiz"
            questionFunction = {[probabilityQuestionStyle1[0]]}
            answerSection={[probabilityQuestionStyle1[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2]]}
        />
    )
}

export default ProbabilityQuiz;