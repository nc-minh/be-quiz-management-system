import { COLLECTION_NAME_USERS } from 'utils/constants/Collection_Name';
import { DOCUMENT_NAME_USER } from 'utils/constants/Document_Name';
import { model, Schema, Document } from 'mongoose';

export default interface User extends Document {
	email: string;
	role: 'ADMIN' | 'USER';
	status?: boolean;
}

const schema = new Schema(
	{
		email: {
			type: Schema.Types.String,
			unique: true
		},
		status: {
			type: Schema.Types.Boolean,
			default: true
		},
		role: String
	},
	{ timestamps: true }
);

export const UserModel = model<User>(DOCUMENT_NAME_USER, schema, COLLECTION_NAME_USERS);
