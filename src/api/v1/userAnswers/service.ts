import { Request } from 'express';
import UserAnswer, { UserAnswerModel } from 'databases/models/UserAnswer';
import Exam, { ExamModel } from 'databases/models/Exam';

const getUserAnswers = async () => {
	const result = await UserAnswerModel.find({});
	return result;
};

const getUserAnswer = async (req: Request) => {
	const { exam, question } = req.body;
	const result = await UserAnswerModel.findOne({ exam, question });
	return result;
};

const updateScore = async (exam: Exam) => {
	if (exam.endAt === null) {
		return null;
	}

	let score: number = 0;
	const userAnswers = await UserAnswerModel.find({ exam })
		.populate('answer')
		.populate({
			path: 'question',
			populate: {
				path: 'result',
				model: 'Answer'
			}
		});
	score = userAnswers.filter(
		userAnswer =>
			userAnswer.answer &&
			userAnswer.question.result &&
			userAnswer.answer._id.equals(userAnswer.question.result._id)
	).length;

	const data = await ExamModel.findByIdAndUpdate(exam._id, { score });
	return score;
};

const createUserAnswer = async (req: Request) => {
	const userAnswer: UserAnswer = req.body.userAnswer;
	const exam: Exam = await ExamModel.findById(userAnswer.exam);
	if (!exam.endAt) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	if (new Date().getTime() > new Date(exam.endAt).getTime()) {
		return {
			data: {},
			message: 'Over time',
			status: 400
		};
	}
	const data = await UserAnswerModel.create(userAnswer);
	const score = await updateScore(exam);
	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

const updateUserAnswer = async (req: Request) => {
	const _id = req.params.id;
	const userAnswer: UserAnswer = req.body.userAnswer;
	const exam: Exam = await ExamModel.findById(userAnswer.exam);
	if (!exam.endAt) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	if (new Date().getTime() > new Date(exam.endAt).getTime()) {
		return {
			data: {},
			message: 'Over time',
			status: 400
		};
	}
	const data = await UserAnswerModel.findByIdAndUpdate(_id, userAnswer);
	const score = await updateScore(exam);
	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

const deleteUserAnswer = async (req: Request) => {
	const _id = req.params.id;
	const result = await UserAnswerModel.findByIdAndDelete(_id);
	return result;
};

export { getUserAnswers, getUserAnswer, createUserAnswer, updateUserAnswer, deleteUserAnswer };
