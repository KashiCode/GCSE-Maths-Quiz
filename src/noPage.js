import React, { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/noPage.module.css';

import BubblesBackground from './bubblesBackground.js';
import Footer from './footer.js';

const MissingPage = (props) => {
  
  const navigate = useNavigate();

  return (
    <div className={styles.background}>
        <BubblesBackground red={true}/>
        <h1>ERROR 404</h1>
        <p>This page has been entered wrong or does not exist.</p>
        <span className={styles.button} onClick={() => navigate("/")}>Return to Homepage</span>
        <span className={styles.button + " " + styles.previousPage} onClick={() => navigate(-1)}>Return to Previous Page</span>
        <Footer />
    </div>
  );
}
  
  export default MissingPage;