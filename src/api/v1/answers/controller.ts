import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const getAnswers = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getAnswers();
	new ApiResponse(result).send(res);
};

const getAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getAnswer(req);
	new ApiResponse(result).send(res);
};

const createAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.createAnswer(req);
	new ApiResponse(result).send(res);
};

const deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.deleteAnswer(req);
	new ApiResponse(result).send(res);
};

const updateAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.updateAnswer(req);
	new ApiResponse(result).send(res);
};

export { getAnswers, getAnswer, createAnswer, deleteAnswer, updateAnswer };
