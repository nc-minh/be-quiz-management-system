import { Request } from 'express';
import jwt from 'jsonwebtoken';
import logger from 'logger';
// Google Auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
import { UserModel } from 'databases/models/User';

async function verify(tokenGoogle: any, user: any) {
	const ticket = await client.verifyIdToken({
		idToken: tokenGoogle,
		audience: process.env.CLIENT_ID // Specify the      of the app that accesses the backend
	});
	const payload = await ticket.getPayload();
	user.name = payload.name;
	user.email = payload.email;
	user.picture = payload.picture;
	
	return user;
}

async function findRole(email: String) {
	const user = await UserModel.findOne({ email });

	return user ? user.role : null;
}

const login = async (req: Request) => {
	const tokenGoogle = req.headers.token_google;
	logger.info('tokenGoogle: ' + tokenGoogle);

	const EXPIRESIN = process.env.EXPIRESIN || '1d';

	const user = {
		name: String,
		email: String,
		picture: String,
		token: String
	};

	let data: any;
	let message: any;
	let status = 10;

	const result = await verify(tokenGoogle, user);
	if (result) {
		const role = await findRole(result.email);
		const tokenLogin = jwt.sign(
			{
				email: result.email,
				role: role
			},
			process.env.JWT_SECRET,
			{
				expiresIn: EXPIRESIN
			}
		);
		data = {
			role: role,
			tokenLogin: tokenLogin,
			userName: result.name,
			userPicture: result.picture
		};
		message = 'Login with Google successfully!';
		status = 200;
	} else {
		data = undefined;
		message = 'Login with Google failure!';
		status = 401;
	}

	return {
		data,
		message,
		status
	};
};

export { login };
