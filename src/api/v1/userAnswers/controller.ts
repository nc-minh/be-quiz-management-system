import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const getUserAnswers = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getUserAnswers();
	new ApiResponse(result).send(res);
};

const getUserAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getUserAnswer(req);
	new ApiResponse(result).send(res);
};

const createUserAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.createUserAnswer(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const updateUserAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.updateUserAnswer(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const deleteUserAnswer = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.deleteUserAnswer(req);
	new ApiResponse(result).send(res);
};

export { getUserAnswers, getUserAnswer, createUserAnswer, updateUserAnswer, deleteUserAnswer };
