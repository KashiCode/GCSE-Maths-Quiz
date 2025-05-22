import GenericQuiz from './genericQuizInterface';
import {
    probabilityQuestionStyle1,
    probabilityQuestionStyle2,
    probabilityQuestionStyle3,
    probabilityQuestionStyle4,
    probabilityQuestionStyle5,
    probabilityQuestionStyle6,
    probabilityQuestionStyle8,
    probabilityQuestionStyle9,
    probabilityQuestionStyle10 
}from './jsQuestionLogic/probabilityQuizQuestions.js';

const ProbabilityQuiz = () => {
    //Returning the generic quiz component with the appropriate props for the ratio quiz
    return (
        <GenericQuiz
            quizTitle="Probability Quiz"
            questionFunction = {[probabilityQuestionStyle1[0], probabilityQuestionStyle2[0], probabilityQuestionStyle3[0], probabilityQuestionStyle4[0],probabilityQuestionStyle6[0],probabilityQuestionStyle8[0],probabilityQuestionStyle9[0],probabilityQuestionStyle5[0],probabilityQuestionStyle10[0]]}
            answerSection={[probabilityQuestionStyle1[1], probabilityQuestionStyle2[1], probabilityQuestionStyle3[1], probabilityQuestionStyle4[1],probabilityQuestionStyle6[1],probabilityQuestionStyle8[1],probabilityQuestionStyle9[1],probabilityQuestionStyle5[1],probabilityQuestionStyle10[1]]}
            checkAnswerFunction={[probabilityQuestionStyle1[2], probabilityQuestionStyle2[2], probabilityQuestionStyle3[2], probabilityQuestionStyle4[2],probabilityQuestionStyle6[2],probabilityQuestionStyle8[2],probabilityQuestionStyle9[2],probabilityQuestionStyle5[2],probabilityQuestionStyle10[2]]}
        />
    )
}

export default ProbabilityQuiz;