import { Request, Response } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

const getUserExams = async (req: Request, res: Response) => {
	const result = await service.getUserExams(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const getUserExam = async (req: Request, res: Response) => {
	const result = await service.getUserExam(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const getAnsweredQuestions = async (req: Request, res: Response) => {
	const result = await service.getAnsweredQuestions(req);
	new ApiResponse(result).send(res);
};

//START: v1/exams/start/:id
const startExam = async (req: Request, res: Response) => {
	const result = await service.startExam(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

//FINISH: v1/exams/finish/:id
const finishExam = async (req: Request, res: Response) => {
	const result = await service.finishExam(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

export { getUserExams, getUserExam, startExam, finishExam, getAnsweredQuestions };
