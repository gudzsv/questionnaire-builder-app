import QuizForm from '@/modules/common/Forms/QuizForm/QuizForm.js';

async function fetchQuestionById(id) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/questionnaire/${id}`,
		{
			cache: 'no-store',
		}
	);
	const { data } = await response.json();

	return data;
}

export default async function EditPage({ params }) {
	const { id } = params;
	const data = await fetchQuestionById(id);

	return <QuizForm data={data} />;
}
