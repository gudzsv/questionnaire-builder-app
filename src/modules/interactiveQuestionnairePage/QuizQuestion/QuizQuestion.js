import QuizAnswers from '../QuizAnswers/QuizAnswers.js';
import s from './QuizQuestion.module.scss';

export default function QuizQuestion({ questionData }) {
	const { _id, question, type, answers } = questionData;
	return (
		<article className={s.question}>
			<h2>{question}</h2>
			<QuizAnswers answers={answers} questionId={_id} type={type} />
		</article>
	);
}
