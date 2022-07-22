import { ApiResponse } from 'utils/rest/ApiResponse';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
// Google Auth

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.token_login;
	
	try {
		const verify = jwt.verify(token.toString(), process.env.JWT_SECRET)
		if(verify){
			req.body.user = verify;
			next();
		}
	} catch (error) {
		new ApiResponse(error, 'Login failure!', 401).send(res);
	}

};

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.body.user;
	if (!user || user.role != 'ADMIN') {
		new ApiResponse(null, 'Not permission!', 401).send(res);
	} else {
		next();
	}
};

export { authenticationMiddleware, adminMiddleware };
