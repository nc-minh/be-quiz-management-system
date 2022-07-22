import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

//GET: v1/questions?topic=
const getQuestions = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getQuestions(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

//GET: v1/questions/:id
const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getQuestion(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.createQuestion(req);
	new ApiResponse(result).send(res);
};

const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.deleteQuestion(req);
	new ApiResponse(result).send(res);
};

const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.updateQuestion(req);
	new ApiResponse(result).send(res);
};

const getQuantity = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getQuantity();
	new ApiResponse(result).send(res);
};

const getQuantityOfQuestions = async (req: Request, res: Response) => {
	const result = await service.quantityOfQuestions();
	new ApiResponse(result).send(res);
}

export {
	getQuestions,
	getQuestion,
	createQuestion,
	deleteQuestion,
	updateQuestion,
	getQuantity,
	getQuantityOfQuestions
};
