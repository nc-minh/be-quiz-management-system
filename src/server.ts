import app from './app';
import config from './configs';
import logger from 'logger';

app.listen(config.port, () => {
	logger.info(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
