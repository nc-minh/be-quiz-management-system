import { COLLECTION_NAME_QUESTIONS } from 'utils/constants/Collection_Name';
import { DOCUMENT_NAME_QUESTION } from 'utils/constants/Document_Name';
import { model, Schema, Document } from 'mongoose';
import Topic from './Topic';
import Answer from './Answer';

export default interface Question extends Document {
	question: string;
	image?: string;
	topic: Topic;
	answers: Answer[];
	result: Answer;
	level: number;
	status?: boolean;
}

const schema = new Schema(
	{
		question: String,
		image: String,
		topic: {
			type: Schema.Types.ObjectId,
			ref: 'Topic'
		},
		status: {
			type: Schema.Types.Boolean,
			default: true
		},
		answers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Answer'
			}
		],
		result: {
			type: Schema.Types.ObjectId,
			ref: 'Answer'
		},
		level: Number
	},
	{ timestamps: true }
);

export const QuestionModel = model<Question>(DOCUMENT_NAME_QUESTION, schema, COLLECTION_NAME_QUESTIONS);
