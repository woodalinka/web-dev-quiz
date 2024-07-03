import quizCompleteLogo from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js"

export default function Summary ({userAnswers}) {
    const skippedAnswers = userAnswers.filter(userAnswer => userAnswer === null);
    const correctAnswers = userAnswers.filter((userAnswers, index) => userAnswers === QUESTIONS[index].answers[0])
    const skippedAnswersShare = Math.round((skippedAnswers.length/userAnswers.length) * 100)
    const correctAnswersShare = Math.round((correctAnswers.length/userAnswers.length) * 100)
    const wrongAnswerShare = 100 - skippedAnswersShare - correctAnswersShare

    return <div id="summary">
        <img src={quizCompleteLogo} alt="Trophy Icon"/>
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
            <p>
                <span className="number">{skippedAnswersShare}%</span>
                <span className="text">skipped</span>
            </p>
            <p>
                <span className="number">{correctAnswersShare}%</span>
                <span className="text">answered correct</span>
            </p>
            <p>
                <span className="number">{wrongAnswerShare}%</span>
                <span className="text">answered wrong</span>
            </p>
        </div>
            <ol>
                {userAnswers.map((userAnswer, index) => {
                    let cssClass = 'user-answer'

                    if (userAnswer === null) {
                        cssClass += ' skipped'
                    } else if (userAnswer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct'
                    } else {
                        cssClass += ' wrong'
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{userAnswer ?? "Skipped"}</p>
                        </li>
                        )

                })}

            </ol>
    </div>
}