import { getMovies, getMovieById, addMovie, deleteMovieById } from './database';

const resolvers = {
  Query: {
    movies: () => getMovies(),
    movie: (_, { id }) => getMovieById(id),
  },
  Mutation: {
    addMovie: (_, { name, score, summary }) => addMovie(name, score, summary),
    deleteMovieById: (_, { id }) => deleteMovieById(id),
  },
};

export default resolvers;
