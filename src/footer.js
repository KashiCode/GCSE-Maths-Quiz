import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/footer.module.css';

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
        <a href="https://www.linkedin.com/in/dawidpaluch/">LinkedIn</a>
        <a href="https://github.com/dawid-paluch">Github</a>
        <a href="">Email</a>
        <p>Website made by Dawid Paluch</p>
    </div>
  );
}
  
  export default Footer;