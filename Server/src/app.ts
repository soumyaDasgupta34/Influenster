import express from 'express';
import cors from 'cors';
import userRouter from './user/user.route';
import { globalErrorHandler } from './middlewares/errorHandlingMiddleware';
import postRouter from './post/post.route';
import commentRouter from './comments/comments.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${process.cwd()}/src/upload`));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

app.use(globalErrorHandler);

export default app;
