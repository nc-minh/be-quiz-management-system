import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

// GET: v1/login
const login = async (req: Request, res: Response) => {
	const result = await service.login(req);
	
	new ApiResponse(result.data, result.message, result.status).send(res);
};

export { login };
