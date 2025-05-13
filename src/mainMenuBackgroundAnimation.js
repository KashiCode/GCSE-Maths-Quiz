import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/mainMenuBackgroundAnimation.module.css';

const MainMenuBackgroundAnimation = ({animate, info, ratio, probability, universal}) => {
    return (
    <div className={styles.backgroundAnimation + " " + (animate ? styles.fadeout : "")}>
        <span className={styles.infoSpan1 + " " + (info ? styles.animateInfo1: "")}>INFO</span>
        <span className={styles.infoSpan2 + " " + (info ? styles.animateInfo2: "")}><span class="material-symbols-outlined">info</span></span>

        <span className={styles.ratioSpan1 + " " + (ratio ? styles.animateRatio1 : "")}>1:2</span>
        <span className={styles.ratioSpan2 + " " + (ratio ? styles.animateRatio2 : "")}>3:2</span>

        <span className={styles.probabilitySpan1 + " " + (probability ? styles.animateProbability1 : "")}>P(A) = 0.2</span>
        <span className={styles.probabilitySpan2 + " " + (probability ? styles.animateProbability2 : "")}>35%</span>
        <span className={styles.probabilitySpan3 + " " + (probability ? styles.animateProbability3 : "")}><span class="material-symbols-outlined">casino</span></span>
    
        <span className={styles.universalSpan1 + " " + (universal ? styles.animateUniversal1 : "")}><span class="material-symbols-outlined">calculate</span></span>
        <span className={styles.universalSpan2 + " " + (universal ? styles.animateUniversal2 : "")}><span class="material-symbols-outlined">public</span></span>
        <span className={styles.universalSpan3 + " " + (universal ? styles.animateUniversal3 : "")}><span class="material-symbols-outlined">architecture</span></span>
    </div>
    );
}

export default MainMenuBackgroundAnimation;