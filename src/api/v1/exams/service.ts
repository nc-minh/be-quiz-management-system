import { Request } from 'express';
import Exam, { ExamModel } from 'databases/models/Exam';
import { QuestionModel } from 'databases/models/Question';
import { UserAnswerModel } from 'databases/models/UserAnswer';
import { ObjectId } from 'mongodb';
import User, { UserModel } from 'databases/models/User';

const getExams = async () => {
	const result = await ExamModel.find({});
	return result;
};

const getExam = async (req: Request) => {
	const _id = req.params.id;
	try {

		const exam: Exam = await ExamModel.findById(_id).populate({
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

		const userAnswers = await UserAnswerModel.find({
			exam
		});

		const newQuestions = exam.toObject().questions.map(question => {
			let userAnswer
			for (let i = 0; i < userAnswers.length; i++){
				if (String(userAnswers[i].question) === String(question._id)) {
					userAnswer = userAnswers[i].answer;
				}
			}
			return {
				...question,
				userAnswer: userAnswer
			};
		});

		const newExam = {
			...exam.toObject(),
			questions: newQuestions
		};
		
		return {
			data: newExam,
			message: 'Get successfully!',
			status: 200
		};
	} catch (error) {
		return {
			data: error,
			message: 'Get failure!',
			status: 400
		};
	}
};

const getQuantityOfExam = async () => {
	const result = ExamModel.count();
	return result;
};

const createExam = async (req: Request) => {
	const { email, duration, required } = req.body;

	/* ---------------sample------------------
            required: [
                {
                    topicID: TopicID,
                    level: number,
                    quantity: number
                }...
            ]
    */

	// create an account when create exam
	const newUser = {
		email: email,
		role: 'USER'
	} as User;

	const findUser = await UserModel.find({
		email: email
	});

	if (findUser.length === 0) {
		const inforUser = await UserModel.create(newUser);
	}

	let questions: any = [];

	for (let i = 0; i < required.length; i++) {
		if (!required[i].topicID || !required[i].quantity || !required[i].level) {
			return {
				data: {},
				message: 'Request is incorrect',
				status: 400
			};
		}
		const arr = await QuestionModel.aggregate([
			{
				$match: {
					topic: new ObjectId(required[i].topicID),
					level: required[i].level
				}
			},
			{
				$sample: { size: required[i].quantity }
			}
		]);
		questions = [...questions, ...arr];
	}

	const newExam = {
		email: email,
		questions,
		duration,
		startAt: null,
		endAt: null,
		score: null
	} as Exam;

	const data = await ExamModel.create(newExam);
	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

const updateExam = async (req: Request) => {
	const _id = req.params.id;
	const exam: Exam = req.body.exam;
	const data = await ExamModel.findByIdAndUpdate(_id, exam);

	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

const deleteExam = async (req: Request) => {
	const _id = req.params.id;
	const result = await ExamModel.deleteOne({ _id });
	return result;
};

export { getExams, getExam, getQuantityOfExam, createExam, updateExam, deleteExam };
