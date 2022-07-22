import { Request } from 'express';

const logout = (req: Request) => {
	const token = req.cookies.tokenLogin;
	return token;
};

export { logout };
