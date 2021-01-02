import { getMovies, getMovieById, getMovieSuggestions } from './database';

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
    movie: (_, { movie_id, with_images, with_cast }) =>
      getMovieById(movie_id, with_images, with_cast),
    suggestions: (_, { movie_id }) => getMovieSuggestions(movie_id),
  },
};

export default resolvers;
