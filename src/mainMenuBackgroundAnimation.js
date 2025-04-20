import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/mainMenuBackgroundAnimation.module.css';

const MainMenuBackgroundAnimation = ({animate,info, ratio }) => {
    return (
    <div className={styles.backgroundAnimation + " " + (animate ? styles.fadeout : "")}>
        <span className={styles.infoSpan1 + " " + (info ? styles.animateInfo1: "")}>INFO</span>
        <span class="material-symbols-outlined" className={styles.infoSpan2 + " " + (info ? styles.animateInfo2: "")}><span class="material-symbols-outlined">info</span></span>

        <span className={styles.ratioSpan1 + " " + (ratio ? styles.animateRatio1 : "")}>1:2</span>
        <span className={styles.ratioSpan2 + " " + (ratio ? styles.animateRatio2 : "")}>3:2</span>
    </div>
    );
}

export default MainMenuBackgroundAnimation;