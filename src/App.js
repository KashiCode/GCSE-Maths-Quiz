import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import MainMenu from './mainMenu.js';
import GenericQuiz from './genericQuizInterface.js';
import RatioQuiz from './ratioQuiz.js';
import MissingPage from './noPage.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/genericquiz" element={<GenericQuiz />} />
          <Route path="/ratio-quiz" element={<RatioQuiz />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
