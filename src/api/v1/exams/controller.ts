import { Request, Response } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

// GET: v1/exams
const getExams = async (req: Request, res: Response) => {
	const result = await service.getExams();
	new ApiResponse(result).send(res);
};

const getExam = async (req: Request, res: Response) => {
	const result = await service.getExam(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

const getQuantityOfExam = async (req: Request, res: Response) => {
	const result = await service.getQuantityOfExam();
	new ApiResponse(result).send(res);
};

// POST: v1/exams
const createExam = async (req: Request, res: Response) => {
	const result = await service.createExam(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

// UPDATE: v1/exams/update/:id
const updateExam = async (req: Request, res: Response) => {
	const result = await service.updateExam(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

// DELETE: v1/exams/:id
const deleteExam = async (req: Request, res: Response) => {
	const result = await service.deleteExam(req);
	new ApiResponse(result).send(res);
};

export { createExam, getExams, getQuantityOfExam, updateExam, deleteExam, getExam };
