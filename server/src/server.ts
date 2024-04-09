// index.ts
import express from 'express';
import userRouter from './routes/user';
import movieRouter from './routes/movies';
import authMiddleware from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/movies', authMiddleware, movieRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
