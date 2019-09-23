import express from 'express';
import MovieController from "../controllers/movieController";

const movieRoutes = express.Router()

movieRoutes.get('/', MovieController.getAllMovies);
movieRoutes.get('/:id', MovieController.getAMovie);
movieRoutes.post('/', MovieController.addMovie);
movieRoutes.put('/:id', MovieController.updateMovie);
movieRoutes.delete('/:id', MovieController.deleteMovie);


export default movieRoutes;