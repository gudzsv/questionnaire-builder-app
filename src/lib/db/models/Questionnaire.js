import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
	answer: { type: String, required: true },
	isCorrect: { type: Boolean, required: true },
});

const QuestionSchema = new mongoose.Schema({
	question: { type: String, required: true },
	type: { type: String, enum: ['text', 'single', 'multiple'], required: true },
	answers: {
		type: [AnswerSchema],
		required: function () {
			return this.type !== 'text';
		},
	},
});

const QuestionnaireSchema = new mongoose.Schema(
	{
		quizName: { type: String, required: true },
		quizDescription: { type: String, required: true },
		questions: { type: [QuestionSchema], required: true },
		amountOfCompletions: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

const Questionnaire =
	mongoose.models.Questionnaire ||
	mongoose.model('Questionnaire', QuestionnaireSchema);

export default Questionnaire;
