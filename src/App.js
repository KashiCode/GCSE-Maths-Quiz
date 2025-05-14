// All necessary imports
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import MainMenu from './mainMenu.js';
import GenericQuiz from './genericQuizInterface.js';
import RatioQuiz from './ratioQuiz.js';
import ProbabilityQuiz from './probabilityQuiz.js';
import FactorisationQuiz from './factorisationQuiz.js';
import UniversalQuiz from './universalQuiz.js';
import MissingPage from './noPage.js';
import Information from './information.js';

// Main App function
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/*Routes for each of the seperate web pages of the website*/}
          <Route path="/gcse-maths-quiz-website" element={<MainMenu />} />
          <Route path="/gcse-maths-quiz-website/information" element={<Information />} />

          {/*Routes for each of the quizzes on the website*/}
          <Route path="/gcse-maths-quiz-website/generic-quiz" element={<GenericQuiz />} />
          <Route path="/gcse-maths-quiz-website/ratio-quiz" element={<RatioQuiz />} />
          <Route path="/gcse-maths-quiz-website/probability-quiz" element={<ProbabilityQuiz />} />
          <Route path="/gcse-maths-quiz-website/factorisation-quiz" element={<FactorisationQuiz />} />
          <Route path="/gcse-maths-quiz-website/universal-quiz" element={<UniversalQuiz />} />
          
          {/*Route for Error 404 page*/}
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
