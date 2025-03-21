import QuizForm from '@/modules/common/Forms/QuizForm/QuizForm.js';

export default function EditQuiz({ data }) {
	return (
		<>
			<h1>Edit Quiz</h1>
			<QuizForm data={data} />
		</>
	);
}
