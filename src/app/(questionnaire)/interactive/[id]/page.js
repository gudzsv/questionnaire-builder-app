import InteractiveQuiz from '@/modules/interactiveQuestionnairePage/InteractiveQuiz/InteractiveQuiz.js';
import { getQuestionnaireById } from '@/services/questionnaireService.js';

export default async function Interactive({ params }) {
	const { id } = await params;
	const quiz = await getQuestionnaireById(id);
	const simpleQuiz = JSON.parse(JSON.stringify(quiz));

	return (
		<section style={{ padding: '1rem' }}>
			<InteractiveQuiz quiz={simpleQuiz} />
		</section>
	);
}
