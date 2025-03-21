'use client';

import { createQuizAction } from '@/actions/createQuizAction.js';
import { APP_ROUTES } from '@/constants/index.js';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import s from './QuizForm.module.scss';

const initialData = [
	{
		question: '',
		type: 'text',
		answers: [{ answer: '' }],
	},
];

const initialState = { success: false, error: null, savedData: initialData };

export default function QuizForm({ data }) {
	const [formData, formAction, pending] = useActionState(
		createQuizAction,
		initialState
	);
	const [questions, setQuestions] = useState(
		data ? data.questions : initialData
	);
	const [quizName, setQuizName] = useState(data ? data.quizName : '');
	const [quizDescription, setQuizDescription] = useState(
		data ? data.quizDescription : ''
	);
	const router = useRouter();

	useEffect(() => {
		if (formData.success && !pending) {
			router.push(APP_ROUTES.catalog);
		}
	}, [formData.success, router, pending]);

	const handleAddQuestion = () => {
		setQuestions([...questions, ...initialData]);
	};

	const handleAddAnswers = (qIndex) => {
		setQuestions((prev) =>
			prev.map((q, index) =>
				index === qIndex
					? { ...q, answers: [...q.answers, { answer: '', isCorrect: false }] }
					: q
			)
		);
	};

	const handleChangeQuestionType = (qIndex, qType) => {
		setQuestions((prev) =>
			prev.map((q, index) =>
				index === qIndex
					? {
							...q,
							type: qType,
							answers: q.answers.map((a) => ({ ...a, isCorrect: false })),
					  }
					: q
			)
		);
	};

	const handleAnswerChange = (qIndex, aIndex, value) => {
		setQuestions((prev) =>
			prev.map((q, index) =>
				index === qIndex
					? {
							...q,
							answers: q.answers.map((a, i) =>
								i === aIndex ? { ...a, answer: value } : a
							),
					  }
					: q
			)
		);
	};

	const handleCorrectChange = (qIndex, aIndex) => {
		setQuestions((prev) =>
			prev.map((q, index) =>
				index === qIndex
					? {
							...q,
							answers: q.answers.map((a, i) =>
								q.type === 'single'
									? { ...a, isCorrect: i === aIndex }
									: i === aIndex
									? { ...a, isCorrect: !a.isCorrect }
									: a
							),
					  }
					: q
			)
		);
	};

	const SubmitButton = ({ text }) => {
		return (
			<button type='submit' aria-disabled={pending} disabled={pending}>
				{pending ? 'Saving...' : text}
			</button>
		);
	};

	return (
		<form action={formAction} className={s.form}>
			{data && <input hidden type='text' name={'id'} defaultValue={data._id} />}
			<div>
				<label className={s.label} htmlFor='quiz-name'>
					Quiz name
				</label>
				<input
					className={s.input}
					id='quiz-name'
					type='text'
					name='quizName'
					value={quizName}
					onChange={(e) => setQuizName(e.target.value)}
				/>
			</div>
			<div>
				<label className={s.label} htmlFor='quiz-description'>
					Quiz description
				</label>
				<textarea
					className={s.input}
					id='quiz-description'
					type='text'
					name='quizDescription'
					value={quizDescription}
					onChange={(e) => setQuizDescription(e.target.value)}
				/>
			</div>

			<div className={s.titleWrapper}>
				<h3>Questions</h3>
				<button type='button' onClick={handleAddQuestion}>
					+
				</button>
			</div>
			{questions.map((q, qIndex) => (
				<div key={qIndex} className={s.questionWrapper}>
					<div className={s.flexWrap}>
						<div className={s.inputWrapper}>
							<label className={s.label} htmlFor={`q${qIndex + 1}`}>
								Question {qIndex + 1}
							</label>
							<input
								className={s.input}
								id={`q${qIndex + 1}`}
								type='text'
								value={q.question}
								onChange={(e) =>
									setQuestions((prev) =>
										prev.map((q, i) =>
											i === qIndex ? { ...q, question: e.target.value } : q
										)
									)
								}
								name={`question-${qIndex}`}
							/>
						</div>
						<div>
							<label className={s.label} htmlFor={`s${qIndex}`}>
								Type
							</label>
							<select
								id={`s${qIndex}`}
								value={q.type}
								onChange={(e) =>
									handleChangeQuestionType(qIndex, e.target.value)
								}
								className='border p-1'
								name={`type-${qIndex}`}
							>
								<option value='text'>text</option>
								<option value='single'>single choice</option>
								<option value='multiple'>multiple choices</option>
							</select>
						</div>
					</div>

					<div className={s.answersWrapper}>
						<div className={s.titleWrapper}>
							<h4>Answers</h4>
							{q.type !== 'text' && (
								<button type='button' onClick={() => handleAddAnswers(qIndex)}>
									+
								</button>
							)}
						</div>

						{q.answers.map((a, aIndex) => (
							<div key={aIndex} className={s.flexWrap}>
								<em>{aIndex + 1}.</em>
								<input
									className={s.input}
									type='text'
									value={a.answer}
									onChange={(e) =>
										handleAnswerChange(qIndex, aIndex, e.target.value)
									}
									name={`answers-${qIndex}-${aIndex}`}
								/>
								{q.type !== 'text' && (
									<input
										type={q.type === 'single' ? 'radio' : 'checkbox'}
										name={`isCorrect-${qIndex}-${aIndex}`}
										checked={a.isCorrect}
										onChange={() => handleCorrectChange(qIndex, aIndex)}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			))}

			<SubmitButton text={'Save'} />

			{formData.error && <p className={s.error}>{formData.error}</p>}
			{formData.success && <p className={s.success}>Quiz save successfuly!</p>}

			{/* <pre>{JSON.stringify(formData.savedData, null, 2)}</pre> */}
		</form>
	);
}
