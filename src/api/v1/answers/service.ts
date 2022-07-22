import Answer, { AnswerModel } from 'databases/models/Answer';
import { Request } from 'express';

const getAnswers = async () => {
	const result = await AnswerModel.find({});
	return result;
};

const getAnswer = async (req: Request) => {
	const result = await AnswerModel.findById(req.params.id);
	return result;
};

const createAnswer = async (req: Request) => {
	const newAnswer: Answer = req.body.answer;
	const result = await AnswerModel.create(newAnswer);
	return result;
};

const updateAnswer = async (req: Request) => {
	const _id = req.params.id;
	const answer: Answer = req.body.answer;
	const result = await AnswerModel.findByIdAndUpdate(_id, answer);
	return result;
};

const deleteAnswer = async (req: Request) => {
	const _id = req.params.id;
	const result = await AnswerModel.findByIdAndDelete(_id);
	return result;
};

export { getAnswers, getAnswer, createAnswer, updateAnswer, deleteAnswer };
