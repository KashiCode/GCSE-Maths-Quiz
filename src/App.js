import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './css/App.css';
import MainMenu from './mainMenu.js';
import GenericQuiz from './genericQuizInterface.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/genericquiz" element={<GenericQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
