import db from '../models';

const Movie = db.Movie;

class MovieService {
    
    static async getAllMovies() {
        try {
            return await Movie.findAll();
        } catch (error) {
            throw error;
        }
    }


    static async addMovie(newMovie) {
        try {
            return await Movie.create(newMovie);
        } catch(error) {
            throw error;
        }
    }

    static async updateMovie(id, updateMovie) {
        try {
            const movieToUpdate = await Movie.findOne({
                where: {
                    id: Number(id)
                }
            });

            if(movieToUpdate) {
                await Movie.update(updateMovie, { 
                    where: {
                        id: Number(id)
                    }
                });

                return updateMovie;
            }
            
            return null;
        } catch(error) {
            throw error;
        }
    }


    static async getAMovie(id) {
        try {
            const movie = await Movie.findOne({
                where: {
                    id: Number(id)
                }
            });

            return movie;
        } catch(error) {
            throw error;
        }
    }

    static async deleteMovie(id) {
        try {
            const movieToDelete = await Movie.findOne({
                where: {
                    id: Number(id)
                }
            });

            if(movieToDelete) {
                const deletedMovie = await Movie.destroy({
                    where: {
                        id: Number(id)
                    }
                });

                return deletedMovie;
            }

            return null;
        } catch(error) {
            throw error;
        }
    }
}


export default MovieService;