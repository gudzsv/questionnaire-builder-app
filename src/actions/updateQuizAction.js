'use server';

import connectToDatabase from '@/lib/db/connect.js';
import Questionnaire from '@/lib/db/models/Questionnaire.js';

export async function updateQuizAction(id, formData) {
	console.log('>>>>formData: ', formData);

	try {
		// const id = formData.get('id');
		if (!id) {
			throw new Error('Quiz ID is required');
		}

		const quizName = formData.get('quizName');
		const quizDescription = formData.get('quizDescription');

		const questions = [];
		let index = 0;

		while (formData.has(`question-${index}`)) {
			const questionText = formData.get(`question-${index}`);
			const questionType = formData.get(`type-${index}`);

			const answers = [];
			let answerIndex = 0;

			while (formData.has(`answers-${index}-${answerIndex}`)) {
				answers.push({
					answer: formData.get(`answers-${index}-${answerIndex}`),
					isCorrect: formData.get(`isCorrect-${index}-${answerIndex}`) === 'on',
				});
				answerIndex++;
			}

			questions.push({ question: questionText, type: questionType, answers });
			index++;
		}

		if (questions.length === 0) {
			throw new Error('At least one question is required');
		}

		await connectToDatabase();
		const updatedQuiz = await Questionnaire.findByIdAndUpdate(
			id,
			{ quizName, quizDescription, questions },
			{ new: true }
		);

		if (!updatedQuiz) {
			throw new Error('Quiz not found');
		}

		return { success: true, error: null, savedData: updatedQuiz };
	} catch (error) {
		console.error('Error in quiz save process:', error);
		return {
			success: false,
			error: 'Error in quiz save process: ' + error.message,
		};
	}
}
