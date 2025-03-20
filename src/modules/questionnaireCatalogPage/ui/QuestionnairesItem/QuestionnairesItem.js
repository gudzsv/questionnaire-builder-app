import Link from 'next/link.js';
import s from './QuestionnairesItem.module.scss';

function QuestionnairesItem({ quiz }) {
	return (
		<li className={s.cardItem}>
			<div className={s.titleContainer}>
				<h2>{quiz.quizName}</h2>
				<ul>
					<li>
						<button>run</button>
					</li>
					<li>
						<Link href={`builder/${quiz._id}/edit`}>edit</Link>
					</li>
					<li>
						<button>delete</button>
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

export default QuestionnairesItem;
