import { Request } from 'express';
import Exam, { ExamModel } from 'databases/models/Exam';
import { UserAnswerModel } from 'databases/models/UserAnswer';

const getUserExams = async (req: Request) => {
	const user = req.body.user;
	if (!user) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	const userExams = await ExamModel.find({ email: user.email });
	return {
		data: userExams.map(exam => ({
			_id: exam._id,
			email: exam.email,
			numberOfQuestions: exam.questions.length,
			duration: exam.duration,
			startAt: exam.startAt,
			endAt: exam.endAt
		})),
		message: 'Succesfully',
		status: 200
	};
};

const getUserExam = async (req: Request) => {
	const _id = req.params.id;
	const exam = await ExamModel.findById(_id).populate({
		path: 'questions',
		populate: [
			{
				path: 'topic',
				model: 'Topic'
			},
			{
				path: 'answers',
				model: 'Answer'
			}
		]
	});
	if (!exam || exam.email !== req.body.user.email) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	if (exam.startAt === null) {
		return {
			data: {
				_id: exam._id,
				email: exam.email,
				numberOfQuestions: exam.questions.length,
				duration: exam.duration,
				startAt: exam.startAt,
				endAt: exam.endAt
			},
			message: `Successfully`,
			status: 200
		};
	}
	if (new Date().getTime() > new Date(exam.endAt).getTime()) {
		return {
			data: {},
			message: 'Exam had been finished',
			status: 400
		};
	}
	return {
		data: {
			_id: exam._id,
			email: exam.email,
			questions: exam.questions.map(q => ({
				_id: q._id,
				question: q.question,
				topic: q.topic,
				answers: q.answers
			})),
			duration: exam.duration,
			startAt: exam.startAt,
			endAt: exam.endAt,
			status: exam.status
		},
		message: 'Successfully',
		status: 200
	};
};

const getAnsweredQuestions = async (req: Request) => {
	const _id = req.params.id;
	const result = await UserAnswerModel.find({ exam: _id });

	return result.map(e => e.question);
};

const startExam = async (req: Request) => {
	const _id = req.params.id;
	const exam: Exam = await ExamModel.findById(_id);
	if (!exam || exam.email !== req.body.user.email || exam.startAt !== null) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	const startAt: Date = new Date();
	const endAt: Date = new Date(startAt.getTime() + exam.duration * 60000);
	const data = await ExamModel.findByIdAndUpdate(_id, {
		startAt,
		endAt
		//score: 0
	});
	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

const finishExam = async (req: Request) => {
	const _id = req.params.id;
	const exam: Exam = await ExamModel.findById(_id);
	if (!exam) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	if (!exam.endAt) {
		return {
			data: {},
			message: `Exam hasn't been started`,
			status: 400
		};
	}
	if (new Date().getTime() > new Date(exam.endAt).getTime()) {
		return {
			data: {},
			message: 'Exam had been finished',
			status: 400
		};
	}
	const endAt: Date = new Date();
	const data = await ExamModel.findByIdAndUpdate(_id, {
		endAt
	});
	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

export { getUserExams, getUserExam, startExam, finishExam, getAnsweredQuestions };
