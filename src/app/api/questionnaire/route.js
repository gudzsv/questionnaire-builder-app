import { createApiResponse } from '@/lib/utils/apiResponse.js';
import {
	createQuestionnaire,
	getAllQuestionnaires,
} from '@/services/questionnaireService.js';

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const page = parseInt(searchParams.get('page') || '1');
		const perPage = parseInt(searchParams.get('perPage') || '10');
		const questionnaires = await getAllQuestionnaires(page, perPage);

		return createApiResponse({
			message: 'Questionnaires found successfully',
			data: questionnaires,
			status: 200,
		});
	} catch (error) {
		return createApiResponse({
			message: 'Failed to fetch questionnaires',
			status: 500,
		});
	}
}

export async function POST(req) {
	try {
		const { name, description, amountOfQuestions, amountOfCompletions } =
			await req.json();

		if (!name || !description || !amountOfQuestions || !amountOfCompletions) {
			return createApiResponse({
				message: 'Missing required fields',
				status: 400,
			});
		}

		const newQuestionnaire = await createQuestionnaire({
			name,
			description,
			amountOfQuestions,
			amountOfCompletions,
		});

		return createApiResponse({
			message: 'Questionnaire successfully created',
			data: newQuestionnaire,
			status: 201,
		});
	} catch (error) {
		return createApiResponse({
			message: 'An error occurred during the questionnaire creation process',
			status: 500,
		});
	}
}
