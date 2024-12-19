import express from 'express';
import { config } from 'dotenv';
import { logger } from './utils/logger';
import dbConnect from './database/connection';

config();


const app = express();
const port = process.env.PORT || 3000;

dbConnect();


app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
});
