import React from 'react';
import styles from '../styles/MainContent.module.css'; // CSS 모듈 import

const MainContent = ({ currentComponent }) => {
    return (
        <div className={styles.mainContent}>
            {currentComponent}
        </div>
    );
};

export default MainContent;
