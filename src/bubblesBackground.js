import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/bubblesBackground.module.css';

import Footer from './footer.js';

const BubblesBackground = ({animate, red, green}) => {

  return (
  <div className={styles.bubbles + " " + (red ? styles.red: "") + (green ? styles.green: "") + " " + (animate ? styles.fadeoutBubbles: "")}>
    <span style={{ "--i":12}}></span>
    <span style={{ "--i":7}}></span>
    <span style={{ "--i":21}}></span>
    <span style={{"--i":30}}></span>
    <span style={{"--i":12}}></span>
    <span style={{"--i":16}}></span>
    <span style={{"--i":9}}></span>
    <span style={{"--i":13}}></span>
    <span style={{"--i":21}}></span>
    <span style={{"--i":32}}></span>
    <span style={{"--i":19}}></span>
    <span style={{"--i":15}}></span>
    <span style={{"--i":17}}></span>
    <span style={{"--i":23}}></span>
    <span style={{"--i":16}}></span>
    <span style={{"--i":27}}></span>
    <span style={{"--i":12}}></span>
    <span style={{"--i":28}}></span>
    <span style={{"--i":31}}></span>
    <span style={{"--i":29}}></span>
    <span style={{"--i":33}}></span>
    <span style={{"--i":13}}></span>
    <span style={{"--i":37}}></span>
    <span style={{"--i":11}}></span>
    <span style={{"--i":7}}></span>
  </div>
  );
}
  
  export default BubblesBackground;