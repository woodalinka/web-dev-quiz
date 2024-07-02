import {useState, useCallback} from 'react';
import QUESTIONS from '../questions.js'
import quizCompleteLogo from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

export default function () {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length;
    const quizIsOver = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setUserAnswers((prev) => {
                return [...prev, selectedAnswer]
            });
        }, [])


    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsOver) {
        return (
            <div id="summary">
                <img src={quizCompleteLogo} alt="Trophy Icon"/>
                <h2>Quiz Completed!</h2>
            </div>)
    }


    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id="questions">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>)
                    )}
                </ul>
            </div>
        </div>)
}