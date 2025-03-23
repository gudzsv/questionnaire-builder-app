import { QUESTION_TYPES } from '@/constants/index.js';
import s from './QuizAnswers.module.scss';

export default function QuizAnswers({ questionId: qId, type, answers }) {
	return (
		<ol className={s.quizAnswersList}>
			{answers?.map(({ _id: aId, answer }) => {
				const inputType =
					type === QUESTION_TYPES.single
						? 'radio'
						: type === QUESTION_TYPES.multiple
						? 'checkbox'
						: 'text';

				return (
					<li key={aId} className={s.inputWrapper}>
						<input
							type={inputType}
							id={aId}
							name={qId}
							value={type === QUESTION_TYPES.text ? undefined : aId}
						/>
						{type !== QUESTION_TYPES.text && (
							<label htmlFor={aId}>{answer}</label>
						)}
					</li>
				);
			})}
		</ol>
	);
}
