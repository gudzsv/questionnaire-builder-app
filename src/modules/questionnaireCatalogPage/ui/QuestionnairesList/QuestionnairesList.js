import QuestionnairesItem from '../QuestionnairesItem/QuestionnairesItem.js';
import s from './QuestionnairesList.module.scss';

function QuestionnairesList({ data }) {
	return (
		<ul className={s.cardList}>
			{data.map((quiz) => (
				<QuestionnairesItem key={quiz._id} quiz={quiz} />
			))}
		</ul>
	);
}

export default QuestionnairesList;
