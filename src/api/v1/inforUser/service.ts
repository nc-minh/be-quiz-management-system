import { Request } from 'express';
import jwt from 'jsonwebtoken';
// import { UserModel } from 'databases/models/User';

const inforUser = async (req: Request) => {
	const token = req.cookies.tokenLogin;
	try {
		const verify = jwt.verify(token, process.env.JWT_SECRET);
		if (verify) {
            return {
				data: verify,
                message: 'Successfully',
                status: 200
			};
		}
	} catch (error) {
		return {
			data: error.name,
			message: error.message,
			status: 400
		};
	}
};

export { inforUser };
