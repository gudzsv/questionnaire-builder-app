import s from './QuizResult.module.scss';

export default function QuizResult({ validationResults }) {
	return (
		<div className={s.answersWrapper}>
			<h3>Quiz completed! Your result below.</h3>
			<ul className={s.answers}>
				{validationResults.map(
					({ _id: quesrionId, question, isAnswersCorrect }) => (
						<li className={s.answerIcon} key={quesrionId}>
							<h3>{question}</h3>
							<span>{isAnswersCorrect ? '✅' : '❌'}</span>
						</li>
					)
				)}
			</ul>
		</div>
	);
}
