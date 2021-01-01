import { getMovies, getMovieById, addMovie } from './database';

const resolvers = {
  Query: {
    movies: () => getMovies(),
    movie: (_, { id }) => getMovieById(id),
  },
  Mutation: {
    addMovie: (_, { name, score, summary }) => addMovie(name, score, summary),
  },
};

export default resolvers;
