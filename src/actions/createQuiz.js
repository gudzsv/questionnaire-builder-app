'use server';

import connectToDatabase from '@/lib/db/connect.js';
import Questionnaire from '@/lib/db/models/Questionnaire.js';

export async function createQuizAction(prevState, formData) {
	try {
		const id = formData.get('id');
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
				if (questionType !== 'text') {
					answers.push({
						answer: formData.get(`answers-${index}-${answerIndex}`),
						isCorrect:
							formData.get(`isCorrect-${index}-${answerIndex}`) === 'on',
					});
				} else {
					answers.push({
						answer: formData.get(`answers-${index}-${answerIndex}`),
						isCorrect: true,
					});
				}
				answerIndex++;
			}

			questions.push({
				question: questionText,
				type: questionType,
				answers,
			});

			index++;
		}

		const data = { quizName, quizDescription, questions };

		if (questions.length > 0) {
			await connectToDatabase();
			if (!id) {
				const newQuestionnaire = new Questionnaire(data);
				await newQuestionnaire.save();
			} else {
				const updatedQuiz = await Questionnaire.findByIdAndUpdate(
					id,
					{ quizName, quizDescription, questions },
					{ new: true }
				);

				if (!updatedQuiz) {
					throw new Error('Quiz not found');
				}
			}
		}
		return {
			success: true,
			error: null,
			savedData: data,
		};
	} catch (error) {
		return { success: false, error: 'Error in quiz save process' + error };
	}
}
