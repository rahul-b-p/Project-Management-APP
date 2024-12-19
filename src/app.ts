import express from 'express';
import { config } from 'dotenv';
import { logger } from './utils/logger';
import dbConnect from './database/connection';
import { authRouter, refreshRouter } from './routers';

config();


const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());


app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);


app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
});
