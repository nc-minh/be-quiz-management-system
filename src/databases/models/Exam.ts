import { DOCUMENT_NAME_EXAM } from 'utils/constants/Document_Name';
import { COLLECTION_NAME_EXAMS } from 'utils/constants/Collection_Name';
import { model, Schema, Document } from 'mongoose';
import Question from './Question';
export default interface Exam extends Document {
	email: string;
	questions: Question[];
	duration: number;
	startAt: null | Date;
	endAt: null | Date;
	score: null | number;
	status?: boolean;
}

const schema = new Schema(
	{
		email: {
			type: Schema.Types.String,
			required: true
		},
		questions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Question'
			}
		],
		score: {
			type: Schema.Types.Number,
			default: null
		},
		duration: Number,
		startAt: {
			type: Schema.Types.Date,
			default: null
		},
		endAt: {
			type: Schema.Types.Date,
			default: null
		},
		status: {
			type: Schema.Types.Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export const ExamModel = model<Exam>(DOCUMENT_NAME_EXAM, schema, COLLECTION_NAME_EXAMS);
