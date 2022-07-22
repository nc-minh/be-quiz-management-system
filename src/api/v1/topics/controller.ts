import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const getTopics = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getTopics();
	new ApiResponse(result).send(res);
};

const getTopic = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getTopic(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const createTopic = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.createTopic(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.deleteTopic(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.updateTopic(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const countTopics = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.countTopics();
	new ApiResponse(result).send(res);
};

export { getTopics, getTopic, createTopic, deleteTopic, updateTopic, countTopics };
