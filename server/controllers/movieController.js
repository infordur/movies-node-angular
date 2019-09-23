import MovieService from '../services/MovieService';
import ResHandler from '../middlewares/resHandler';


const resHandler = new ResHandler();

class MoviesController {

    //Get all Movies
    static async getAllMovies(req, res) {
        try {
            const allMovies = await MovieService.getAllMovies();
            if(allMovies.length > 0) {
                resHandler.setSuccess(200, 'Movies retrieved', allMovies);
            } else {
                resHandler.setSuccess(200, 'No Movies found');
            }

            return resHandler.send(res);

        } catch (error) {
            ResHandler.setError(400, error.message);
            return ResHandler.send(res);
        }
    }


    static async addMovie(req, res) {
        
        if(!req.body.title) {
            resHandler.setError(400, 'Please provide complete details');
            return resHandler.send(res);
        }
        
        const newMovie = req.body;

        try {
            const createdMovie = await MovieService.addMovie(newMovie);
            resHandler.setSuccess(201, 'Movie Added!', createdMovie);
            return resHandler.send(res); 
        } catch(error) {
            resHandler.setError(400, error.message);
            return resHandler.send(res);
        }
    }


    
    static async updateMovie(req, res) {
        const alteredMovie = req.body;
        const { id } = req.params;
        if(!Number(id)) {
            resHandler.setError(400, 'Please provide a valid numeric value');
            return resHandler.send(res);
        }

        try {
            const updatedMovie = await MovieService.updateMovie(id, alteredMovie);
            
            if(!updatedMovie) {
                resHandler.setError(404, `Cannot find movie with id: ${id}`)
            } else {
                resHandler.setSuccess(200, 'Movie updated', updatedMovie);
            }

            return resHandler.send(res);

        } catch(error) {
            resHandler.setError(404, error.message);
            return resHandler.send(res);
        }
    }


    static async getAMovie(req, res) {
       const { id } = req.params;

        if(!Number(id)) {
            resHandler.setError(400, 'Please provide a valid numeric value');
            return resHandler.send(res);
        }

        try {
            const movie = await MovieService.getAMovie(id);

            if(!movie) {
                resHandler.setError(404, `Cannot find movie with id: ${id}`);
            } else {
                resHandler.setSuccess(200, 'Movie found', movie);
            }

            return resHandler.send(res);
        } catch(error) {
            resHandler.setError(404, error.message);
            return res.send(res);
        }
 
    }


    static async deleteMovie(req, res) {
        const { id } = req.params;

        if(!Number(id)) {
            resHandler.setError(400, 'Please provide a valid numeric value');
            return resHandler.send(res);
        }

        try {
            const movieToDelete = await MovieService.deleteMovie(id);

            if(movieToDelete) {
                resHandler.setSuccess(200, 'Movie deleted');
            } else {
                resHandler.setError(404, `Cannot find movie with id: ${id}`);
            }

            return resHandler.send(res);
        } catch(error) {
            resHandler.setError(400, error.message);
            return resHandler.send(res);
        }
    }

}

export default MoviesController;