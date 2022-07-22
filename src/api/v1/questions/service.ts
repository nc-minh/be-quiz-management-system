import Question, { QuestionModel } from 'databases/models/Question';
import { TopicModel } from 'databases/models/Topic';
import { AnswerModel } from 'databases/models/Answer';
import { Request } from 'express';

const getQuestions = async (req: Request) => {
	const topic = req.query.topic;

	if (topic === '' || !topic) {
		return {
			data: {},
			message: 'Topic does not exist',
			status: 400
		};
	} else {
		const topicID = await TopicModel.findOne({ name: topic });
		
		const result = await QuestionModel.find({ topic: topicID })
			.populate('topic')
			.populate('answers')
			.populate('result');
		return {
			data: {
				result,
				topicID: topicID ? topicID._id : null
			},
			message: 'Succesfully',
			status: 200
		};
	}
};

const getQuestion = async (req: Request) => {
	const _id = req.params.id;
	
	try {
		const result = await QuestionModel.findOne({
			_id
		}).populate('answers').populate('result');
		
		return {
			data: result,
			message: 'Get succesfully!',
			status: 200
		}
	} catch (error) {
		return {
			data: error,
			message: 'Get failure!',
			status: 400
		};
	}
};

const createQuestion = async (req: Request) => {
	const newQuestion: Question = req.body.question;

	const result = await QuestionModel.create(newQuestion);
	return result;
};

const updateQuestion = async (req: Request) => {
	const _id = req.params.id;
	const question = req.body.question;
	const result = await QuestionModel.findByIdAndUpdate(_id, { ...question });
	return result;
};

// after delete a question need delete all of answer belongs that question
const deleteQuestion = async (req: Request) => {
	const _id = req.params.id;
	const result = await QuestionModel.findOne({ _id });
	await QuestionModel.findByIdAndDelete(_id);
	
	await AnswerModel.deleteMany({
		_id: result.answers
	});
	
	return result;
};

const getQuantity = async () => {
	const allTopics = await TopicModel.find({});
	const allQuestions = await QuestionModel.find({});
	let result: any[] = [];
	allTopics.forEach(topic => {
		//const topic = allTopics[i];
		for (let level = 1; level <= 3; level++) {
			const quantity = allQuestions.filter(
				question => String(question.topic) === String(topic._id) && question.level === level
			).length;
			result.push({
				name: topic.name,
				level: `Level ${level}`,
				quantity
			});
		}
	});

	return result;
};

const quantityOfQuestions = async () => {
	const result = QuestionModel.count();
	return result;
}

export { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion, getQuantity, quantityOfQuestions };
