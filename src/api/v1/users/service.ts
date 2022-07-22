import { Request } from 'express';
import User, { UserModel } from 'databases/models/User';

const addUser = async (req: Request) => {
	const { email, role } = req.body;

	const newUser = {
		email,
		role
	} as User;

	const findUser = await UserModel.find({
		email: email
	});

	if (findUser.length != 0) {
		return {
			data: {},
			message: 'Existed',
			status: 400
		};
	}

	const user = await UserModel.create(newUser);

	return {
		data: user,
		message: 'Successfully',
		status: 200
	};
};

const getUsers = async () => {
	const users = await UserModel.find({});
	return users;
};

const getOneUser = async (req: Request) => {
	const _id = req.params.id;
	const user = await UserModel.findOne({ _id });
	return user;
};

const deleteUser = async (req: Request) => {
	const _id = req.params.id;
	const status = await UserModel.findOneAndDelete({ _id });
	return status;
};

const updateUser = async (req: Request) => {
	const { email, role } = req.body;
	const _id = req.params.id;
	if (role == 'ADMIN' || role == 'USER') {
		const data = await UserModel.findByIdAndUpdate(_id, {
			email,
			role
		});

		return {
			data,
			message: 'Successfully!',
			status: 200
		};
	} else {
		return {
			data: {},
			message: 'Invalid role! You can only set "ADMIN" || "USER"',
			status: 400
		};
	}
};

const countUsers = async () => {
	const quantityUser = UserModel.count();
	return quantityUser;
};

export { addUser, getUsers, getOneUser, deleteUser, updateUser, countUsers };
