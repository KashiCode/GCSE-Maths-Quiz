import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/bubblesBackground.module.css';

import Footer from './footer.js';

const BubblesBackground = ({animate, red, green}) => {

  return (
  <div className={styles.bubbles + " " + (red ? styles.red: "") + (green ? styles.green: "") + " " + (animate ? styles.fadeoutBubbles: "")}>
    <div style={{display: "flex"}}>
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
    <div className={(green ? styles.extraGreenBubbles : "") + " " + styles.hiddenBubbles}>
      <span style={{ "--i":24}}></span>
      <span style={{ "--i":14}}></span>
      <span style={{ "--i":42}}></span>
      <span style={{"--i":60}}></span>
      <span style={{"--i":24}}></span>
      <span style={{"--i":32}}></span>
      <span style={{"--i":18}}></span>
      <span style={{"--i":26}}></span>
      <span style={{"--i":42}}></span>
      <span style={{"--i":64}}></span>
      <span style={{"--i":38}}></span>
      <span style={{"--i":30}}></span>
      <span style={{"--i":34}}></span>
      <span style={{"--i":46}}></span>
      <span style={{"--i":32}}></span>
      <span style={{"--i":54}}></span>
      <span style={{"--i":24}}></span>
      <span style={{"--i":56}}></span>
      <span style={{"--i":62}}></span>
      <span style={{"--i":58}}></span>
      <span style={{"--i":66}}></span>
      <span style={{"--i":26}}></span>
      <span style={{"--i":74}}></span>
      <span style={{"--i":22}}></span>
      <span style={{"--i":14}}></span>
    </div>
  </div>
  );
}
  
  export default BubblesBackground;