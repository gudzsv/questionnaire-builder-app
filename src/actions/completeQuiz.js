'use server';

export const completeQuizAction = async (prevState, formData) => {
	try {
		function validateUserAnswers(formData) {
			const allQuestions = JSON.parse(formData.get('allQuestions'));
			const updatedQuestions = [];

			for (let [qId, selectedAnswers] of formData.entries()) {
				selectedAnswers = formData.getAll(qId);

				if (qId === 'allQuestions') continue;

				if (!selectedAnswers) continue;

				const question = allQuestions.find((q) => q._id === qId);

				if (question) {
					selectedAnswers = Array.isArray(selectedAnswers)
						? selectedAnswers
						: [selectedAnswers];

					let isCorrectForQuestion = checkAnswers(question, selectedAnswers);

					question.isAnswersCorrect = isCorrectForQuestion;

					updatedQuestions.push(question);
				}
			}

			return updatedQuestions;
		}

		function checkAnswers(question, selectedAnswers) {
			let isCorrectForQuestion = true;

			switch (question.type) {
				case 'single':
					isCorrectForQuestion =
						selectedAnswers.length === 1 &&
						selectedAnswers.every((answerId) =>
							question.answers.some(
								(answer) => answer._id === answerId && answer.isCorrect
							)
						);

					break;

				case 'multiple':
					const correctAnswers = question.answers
						.filter((answer) => answer.isCorrect)
						.map((answer) => answer._id);
					isCorrectForQuestion =
						selectedAnswers.every((answerId) =>
							correctAnswers.includes(answerId)
						) && correctAnswers.length === selectedAnswers.length;

					break;

				case 'text':
					const userAnswer = selectedAnswers[0].trim().toLowerCase();
					const correctAnswer = question.answers.find(
						(answer) => answer.isCorrect
					);

					isCorrectForQuestion =
						userAnswer === correctAnswer.answer.trim().toLowerCase();

					break;

				default:
					isCorrectForQuestion = false;
					break;
			}

			return isCorrectForQuestion;
		}

		const updatedQuestions = [...new Set(validateUserAnswers(formData))];

		return {
			success: true,
			error: null,
			validationResults: updatedQuestions,
		};
	} catch (error) {
		return {
			success: false,
			error: 'Error in quiz save process' + error,
			validationResults: [],
		};
	}
};
