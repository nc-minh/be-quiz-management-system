import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

// POST: v1/users
const addUser = async (req: Request, res: Response) => {
	const result: any = await service.addUser(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

// GET: v1/users
const getUsers = async (req: Request, res: Response) => {
	const result = await service.getUsers();
	new ApiResponse(result).send(res);
};

// GET: v1/users/:id
const getOneUser = async (req: Request, res: Response) => {
	const result = await service.getOneUser(req);
	new ApiResponse(result).send(res);
};

// GET: v1/users/quantity
const getQuantityUsers = async (req: Request, res: Response) => {
	const result = await service.countUsers();
	new ApiResponse(result).send(res);
};

// DELETE: v1/users/:id
const deleteUser = async (req: Request, res: Response) => {
	const result = await service.deleteUser(req);
	new ApiResponse(result).send(res);
};

// PUT: v1/users/role
const updateUser = async (req: Request, res: Response) => {
	const result = await service.updateUser(req);
	new ApiResponse(result.data, result.message, result.status).send(res);
};

export { addUser, getUsers, getOneUser, deleteUser, updateUser, getQuantityUsers };
