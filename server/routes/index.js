import express from 'express';
import movieRoutes from './movies';
import userRoutes from './user';

const app = express();

// ---------------------------------------
//Routes for Users
// ---------------------------------------
app.use('/api/users', userRoutes);

// ---------------------------------------
// Routes for Movies
//----------------------------------------
app.use('/api/movies', movieRoutes);

// ---------------------------------------
//Routes for Categories
// ---------------------------------------
// TODO

export default app;

