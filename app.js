import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';

import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('server is connected now');
});
app.use('/api/user', router);
app.use('/api/blog', blogRouter);
const DB = process.env.MONGO_URI;
mongoose
    .connect(DB)
    .then(() => app.listen(process.env.PORT || 5000))
    .then(() => console.log('connected to db and server'))

    .catch((err) => console.log(err));
