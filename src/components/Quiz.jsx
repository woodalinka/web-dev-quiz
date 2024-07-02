import {useState, useCallback} from 'react';
import QUESTIONS from '../questions.js'
import quizCompleteLogo from '../assets/quiz-complete.png'
import Question from "./Question.jsx";

export default function () {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
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


    return (
        <div id="quiz">
                <Question
                    key={activeQuestionIndex}
                    index={activeQuestionIndex}
                    onSelectAnswer={handleSelectAnswer}
                    onSkip={handleSkipAnswer}/>
        </div>)
}