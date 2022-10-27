import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors';
require('dotenv').config();
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', router);
app.use('/api/blog', blogRouter);
//setting mongodb to env
mongoose
    .connect(
        process.env.MONGO_URI
    )
    //setting port
    .then(() => app.listen(process.env.PORT || 5000))
    .then(() => console.log('connected to db and server'))
    .catch((err) => console.log(err));

    if(process.env.NODE_ENV === 'production'){
        app.use(express.static('frontend/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
        })
    }

