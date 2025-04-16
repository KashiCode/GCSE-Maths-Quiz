import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './css/App.css';
import MainMenu from './mainMenu.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
