import express from 'express';
import { config } from 'dotenv';
import { logger } from './utils/logger';
import dbConnect from './database/connection';
import { adminRouter, authRouter, refreshRouter, userRouter } from './routers';
import { createDefaultAdmin } from './utils/adminSetup';
import { accessTokenAuth, ErrorHandler, verifyAdmin } from './middlewares';

config();


const app = express();
const port = process.env.PORT || 3000;

dbConnect();
createDefaultAdmin();
app.use(express.json());


app.use('/auth', authRouter);

app.use('/refresh', refreshRouter);

app.use(accessTokenAuth);

app.use('/admin', verifyAdmin, adminRouter);

app.use('/user',userRouter);

app.use(ErrorHandler);

app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
});
