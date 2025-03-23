'use client';

import { completeQuizAction } from '@/actions/completeQuiz.js';
import { startTransition, useActionState, useState } from 'react';
import QuizQuestion from '../QuizQuestion/QuizQuestion.js';
import QuizResult from '../QuizResult/QuizResult';
import QuizTimer from '../QuizTimer/QuizTimer.js';
import s from './InteractiveQuiz.module.scss';

export default function InteractiveQuiz({ quiz }) {
	const [formData, formAction, pending] = useActionState(
		completeQuizAction,
		[]
	);

	const [isTimerRunning, setIsTimerRunning] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsTimerRunning(false);
		startTransition(() => {
			const formDataToSubmit = new FormData(e.target);
			formAction(formDataToSubmit);
		});
	};

	return (
		<>
			<div className={s.quizHeader}>
				<h1>{quiz.quizName}</h1>
				<p style={{ textAlign: 'center' }}>{quiz.quizDescription}</p>
				<QuizTimer isRunning={isTimerRunning} />
			</div>
			<form className={s.form} onSubmit={handleSubmit}>
				{quiz.questions.map((q) => (
					<QuizQuestion key={q._id} questionData={q} />
				))}
				<input
					hidden
					type='text'
					name='allQuestions'
					defaultValue={JSON.stringify(structuredClone(quiz?.questions))}
				/>
				<button type='submit'>{pending ? 'Sending...' : 'Submit'}</button>
			</form>
			{formData?.validationResults?.length === 0 && formData?.error && (
				<p>
					Something went wrong while processing your answers. Please try again.
				</p>
			)}
			{formData?.validationResults?.length > 0 &&
				!pending &&
				formData?.success && (
					<QuizResult validationResults={formData.validationResults} />
				)}
		</>
	);
}
