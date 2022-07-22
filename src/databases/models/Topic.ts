import { COLLECTION_NAME_TOPICS } from 'utils/constants/Collection_Name';
import { DOCUMENT_NAME_TOPIC } from 'utils/constants/Document_Name';
import { model, Schema, Document } from 'mongoose';

export default interface Topic extends Document {
	name: string;
	status?: boolean;
}

const schema = new Schema(
	{
		name: String,
		status: {
			type: Schema.Types.Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export const TopicModel = model<Topic>(DOCUMENT_NAME_TOPIC, schema, COLLECTION_NAME_TOPICS);
