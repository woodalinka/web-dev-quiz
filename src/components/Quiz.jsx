import {useState} from 'react';
import QUESTIONS from '../questions.js'
import quizCompleteLogo from '../assets/quiz-complete.png'

export default function () {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length;
    const quizIsOver = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer]
        });
    }

    if (quizIsOver) {
        return (
            <div id="summary">
            <img src={quizCompleteLogo} alt="Trophy Icon"/>
            <h2>Quiz Completed!</h2>
        </div>)
    }


    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id="questions">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => <li id={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>)
}