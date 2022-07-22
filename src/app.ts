import express from 'express';
import bodyParser from 'body-parser';
import routers from 'api';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './api/v1/swagger.json';

// require('dotenv').config()
// rest of the code remains same
const app = express();

// cookie parser
app.use(cookieParser());
// configuring CORS
app.use(cors());

// connect DB
import 'databases';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// init route
app.use(routers);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
