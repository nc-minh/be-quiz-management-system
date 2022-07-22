import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

// GET: v1/login
const logout = (req: Request, res: Response) => {
	const result = service.logout(req);
	res.clearCookie('tokenLogin');
	new ApiResponse(result).send(res);
};

export { logout };
