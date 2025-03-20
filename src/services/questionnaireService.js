import connectToDatabase from '@/lib/db/connect.js';
import Questionnaire from '@/lib/db/models/Questionnaire.js';

export async function createQuestionnaire(data) {
	await connectToDatabase();

	const { name, description, amountOfQuestions, amountOfCompletions } = data;

	const newQuestionnaire = new Questionnaire({
		name,
		description,
		amountOfQuestions,
		amountOfCompletions,
	});
	return await newQuestionnaire.save();
}

export async function getAllQuestionnaires(page = 1, perPage = 10) {
	await connectToDatabase();

	const totalCount = await Questionnaire.countDocuments();
	const skip = (page - 1) * perPage;
	const questionnaires = await Questionnaire.find().skip(skip).limit(perPage);

	return {
		questionnaires,
		pagination: {
			totalItems: totalCount,
			totalPages: Math.ceil(totalCount / perPage),
			currentPage: page,
			perPage,
		},
	};
}

export async function getQuestionnaireById(id) {
	await connectToDatabase();
	return await Questionnaire.findById(id);
}

export async function updateQuestionnaire(id, updateData) {
	await connectToDatabase();
	return await Questionnaire.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteQuestionnaire(id) {
	await connectToDatabase();
	return await Questionnaire.findByIdAndDelete(id);
}
