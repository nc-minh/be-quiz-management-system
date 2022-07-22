import { COLLECTION_NAME_USERANSWERS } from 'utils/constants/Collection_Name';
import { DOCUMENT_NAME_USERANSWER } from 'utils/constants/Document_Name';
import { model, Schema, Document } from 'mongoose';
import Question from './Question';
import Answer from './Answer';
import Exam from './Exam';

export default interface UserAnswer extends Document {
	exam: Exam;
	question: Question;
	answer: Answer;
	status?: boolean;
}

const schema = new Schema(
	{
		exam: {
			type: Schema.Types.ObjectId,
			ref: 'Exam'
		},
		question: {
			type: Schema.Types.ObjectId,
			ref: 'Question'
		},
		answer: {
			type: Schema.Types.ObjectId,
			ref: 'Answer',
			default: null
		},
		status: {
			type: Schema.Types.Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export const UserAnswerModel = model<UserAnswer>(DOCUMENT_NAME_USERANSWER, schema, COLLECTION_NAME_USERANSWERS);
