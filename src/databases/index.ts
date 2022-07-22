import mongoose from 'mongoose';
import configs from '../configs';
import logger from 'logger';

const databaseURI = configs.connectDB;

mongoose
	.connect(databaseURI)
	.then(() => {
		logger.info('connected to MongoDB cloud!');
	})
	.catch(err => {
		logger.error('Error! An error occurred.', err);
	});
