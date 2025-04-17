import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/footer.module.css';

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
        <div className={styles.links + " " + styles.footerContent}>
          <p className={styles.footerTitle}>Links</p>
          <a href="https://www.linkedin.com/in/dawidpaluch/">LinkedIn</a>
          <a href="https://github.com/dawid-paluch">Github</a>
        </div>
        <hr className={styles.line}/>
        <div className={styles.contactDetails + " " + styles.footerContent}>
          <p className={styles.footerTitle}>Contact Details</p>
          <p className={styles.contactDetail}>Email: dawid1paluch@gmail.com</p>
        </div>
        <p className={styles.credits}>Website made by Dawid Paluch</p>
    </div>
  );
}
  
  export default Footer;