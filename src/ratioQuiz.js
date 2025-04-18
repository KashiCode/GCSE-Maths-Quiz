import React, { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/genericQuizInterface.module.css';

import GenericQuiz from './genericQuizInterface';

const RatioQuiz = () => {
    return (
        <GenericQuiz
            quizTitle="Ratio Quiz"
            question="What is the ratio of 2:3 to 4:5?"
            answerSection={
                <div>
                    <p>Answer Options:</p>
                    <ul>
                        <li>A) 2:3</li>
                        <li>B) 4:5</li>
                        <li>C) 8:15</li>
                        <li>D) 10:15</li>
                    </ul>
                </div>
            }
        />
    )
}
    export default RatioQuiz;