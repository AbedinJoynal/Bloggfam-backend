import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', router);
app.use('/api/blog', blogRouter);
mongoose
    .connect(
        'mongodb+srv://m74:JqcOpxOY391q3fel@cluster0.pw7nde3.mongodb.net/Blogfam?retryWrites=true&w=majority'
    )
    .then(() => app.listen(5000))
    .then(() => console.log('connected to db and server'))
    .catch((err) => console.log(err));

