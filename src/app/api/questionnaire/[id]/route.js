import { createApiResponse } from '@/lib/utils/apiResponse.js';
import {
	deleteQuestionnaire,
	getQuestionnaireById,
	updateQuestionnaire,
} from '@/services/questionnaireService.js';

export async function GET(req, { params }) {
	try {
		const { id } = params;
		const questionnaire = await getQuestionnaireById(id);

		if (!questionnaire) {
			return new Response(
				JSON.stringify(
					{ message: 'Questionnaire not found by id' },
					{ status: 404 }
				)
			);
		}

		return new Response(
			JSON.stringify(
				{ message: 'Questionnaire found successfully', data: questionnaire },
				{ status: 200 }
			)
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ message: 'Failed to fetch questionnaire' }),
			{ status: 500 }
		);
	}
}

export async function PUT(req, { params }) {
	try {
		const { id } = params;
		const data = await req.json();
		const updatedQuestionnaire = await updateQuestionnaire(id, data);

		if (!updatedQuestionnaire) {
			return createApiResponse({
				message: 'Not found questionnaire to update',
				status: 404,
			});
		}

		return createApiResponse({
			message: 'Questionnaire updated successfully',
			data: updatedQuestionnaire,
			status: 200,
		});
	} catch (error) {
		return createApiResponse({
			message: 'Failed to update questionnaire',
			status: 500,
		});
	}
}

export async function DELETE(req, { params }) {
	try {
		const { id } = params;
		const deleted = await deleteQuestionnaire(id);

		if (!deleted) {
			return createApiResponse({
				message: 'Not found questionnaire to delete',
				status: 404,
			});
		}

		return createApiResponse({
			message: 'Questionnaire deleted successfully',
			status: 200,
		});
	} catch (error) {
		return createApiResponse({
			message: 'Failed to delete questionnaire',
			status: 500,
		});
	}
}
