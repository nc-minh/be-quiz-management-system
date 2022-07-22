import { COLLECTION_NAME_ANSWERS } from 'utils/constants/Collection_Name';
import { DOCUMENT_NAME_ANSWER } from 'utils/constants/Document_Name';
import { model, Schema, Document } from 'mongoose';

export default interface Answer extends Document {
	content: string;
	status?: boolean;
}

const schema = new Schema(
	{
		content: String,
		status: {
			type: Schema.Types.Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export const AnswerModel = model<Answer>(DOCUMENT_NAME_ANSWER, schema, COLLECTION_NAME_ANSWERS);
