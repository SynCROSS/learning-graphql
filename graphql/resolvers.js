import { getMovies, getMovieById, addMovie, deleteMovieById } from './database';

const resolvers = {
  Query: {
    movies: (
      _,
      {
        limit,
        page,
        quality,
        minimum_rating,
        query_term,
        genre,
        sort_by,
        order_by,
        with_rt_ratings,
      },
    ) =>
      getMovies(
        limit,
        page,
        quality,
        minimum_rating,
        query_term,
        genre,
        sort_by,
        order_by,
        with_rt_ratings,
      ),
  },
};

export default resolvers;
