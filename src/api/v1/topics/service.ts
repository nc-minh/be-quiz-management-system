import Topic, { TopicModel } from 'databases/models/Topic';
import { QuestionModel } from 'databases/models/Question';
import { AnswerModel } from 'databases/models/Answer';
import { Request } from 'express';

const getTopics = async () => {
	const result = await TopicModel.find({});
	return result;
};

const getTopic = async (req: Request) => {
	const result = await TopicModel.findOne({name: req.params.id});
	if(!result){
		return{
			data: {},
			message: 'Topic does not exist',
			status: 400
		}
	}else{
		return{
			data: result,
			message: 'Succesfully',
			status: 200
		}
	}
};

const createTopic = async (req: Request) => {
	const newTopic: Topic = req.body.topic;
	if (!newTopic || !newTopic.name) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	const findTopic = await TopicModel.find({ name: newTopic.name });
	if (findTopic.length !== 0) {
		return {
			data: {},
			message: 'Topic has existed',
			status: 400
		};
	}
	const data = await TopicModel.create(newTopic);
	return {
		data,
		message: 'Succesfully',
		status: 200
	};
};

const updateTopic = async (req: Request) => {
	const _id = req.params.id;
	const topic: Topic = req.body.topic;
	if (!topic || !topic.name) {
		return {
			data: {},
			message: 'Request is incorrect',
			status: 400
		};
	}
	const data = await TopicModel.findByIdAndUpdate(_id, topic);
	return {
		data,
		message: 'Successfully',
		status: 200
	};
};

const deleteTopic = async (req: Request) => {
	const _id = req.params.id;
	try {
		// get all questions belongs to this topic
		const questionsBelongsTopicID = await QuestionModel.find({ topic: _id });

		// delete all answers by questions array
		for (let i = 0; i < questionsBelongsTopicID.length; i++) {
			await AnswerModel.deleteMany({
				_id: questionsBelongsTopicID[i].answers
			});
		}

		// delete all questions
		await QuestionModel.deleteMany({
			_id: questionsBelongsTopicID
		});

		// delete all topics
		await TopicModel.findByIdAndDelete(_id);

		return {
			data: '',
			message: 'Delete topic successfully!',
			status: 200
		};
	} catch (error) {
		return {
			data: error,
			message: 'Delete topic failure!',
			status: 400
		};
	}
};

const countTopics = () => {
	const quantityTopic = TopicModel.count();
	return quantityTopic;
}

export { getTopics, getTopic, createTopic, deleteTopic, updateTopic, countTopics };
