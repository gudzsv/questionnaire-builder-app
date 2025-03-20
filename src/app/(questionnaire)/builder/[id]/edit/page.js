import QuizForm from '@/modules/common/Forms/QuizForm/QuizForm.js';

async function fetchQuestionById(id) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/questionnaire/${id}`,
		{
			cache: 'no-store',
		}
	);
	const { data } = await response.json();
	console.log('data: ', data);
	return data;
}

export default async function EditPage({ params }) {
	// const params = await params;
	// console.log('params: ', params);
	const { id } = params;
	console.log('>>>id: ', id);

	const data = await fetchQuestionById(id);
	console.log('questionnaires: ', data);

	return <QuizForm data={data} />;
	// return <p>EDIT</p>;
}
