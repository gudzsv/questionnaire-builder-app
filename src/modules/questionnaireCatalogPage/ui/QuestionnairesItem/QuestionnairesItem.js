'use client';

import { deleteQuiz } from '@/actions/deleteQuiz.js';
import { APP_ROUTES } from '@/constants/index.js';
import Link from 'next/link';
import { useState } from 'react';
import s from './QuestionnairesItem.module.scss';

export default function QuestionnairesItem({ quiz }) {
	const [pending, setPending] = useState(false);

	const handleDelete = async (event) => {
		event.preventDefault();
		if (window?.confirm('Are you sure you want to delete this quiz?')) {
			setPending(true);

			try {
				const response = await deleteQuiz(quiz._id);
			} catch (error) {
				console.error('Error deleting quiz:', error);
			} finally {
				setPending(false);
			}
		}
	};

	return (
		<li className={s.cardItem}>
			<div className={s.titleContainer}>
				<h2>{quiz.quizName}</h2>
				<ul className={s.listWrapper}>
					<li>
						<Link href={`${APP_ROUTES.interactive}/${quiz._id}`}>run</Link>
					</li>
					<li>
						<Link href={`builder/${quiz._id}/edit`}>edit</Link>
					</li>
					<li>
						<form onSubmit={handleDelete}>
							<button className={s.btnLink} type='submit' disabled={pending}>
								{pending ? 'deleting...' : 'delete'}
							</button>
						</form>
					</li>
				</ul>
			</div>
			<p>{quiz.quizDescription}</p>
			<div className={s.questionCountContainer}>
				<span>Questions:</span>
				<span>{quiz?.questions?.length > 0 ? quiz.questions.length : 0}</span>
			</div>
		</li>
	);
}
