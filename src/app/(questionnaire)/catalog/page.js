import Pagination from '@/modules/questionnaireCatalogPage/ui/Pagination/Pagination.js';
import QuestionnairesList from '@/modules/questionnaireCatalogPage/ui/QuestionnairesList/QuestionnairesList.js';

async function fetchAllQuestionnaires(page, perPage) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/questionnaire?page=${page}&perPage=${perPage}`,
		{
			cache: 'no-store',
		}
	);
	const { data } = await response.json();
	return data;
}

export default async function CatalogPage({ searchParams }) {
	const params = await searchParams;
	const page = parseInt(params?.page ?? '1', 10);
	const perPage = 3;
	const { questionnaires, pagination } = await fetchAllQuestionnaires(
		page,
		perPage
	);

	return (
		<>
			<h1>Quiz Catalog</h1>
			<QuestionnairesList data={questionnaires} />
			<Pagination
				page={pagination.currentPage}
				totalPages={pagination.totalPages}
			/>
		</>
	);
}
