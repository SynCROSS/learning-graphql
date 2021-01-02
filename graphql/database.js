// import fetch from 'node-fetch';
import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2/';
const LIST_MOVIE_URL = `${BASE_URL}list_movies.json`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json`;
const MOVIE_SUGGESTIONS_URL = `${BASE_URL}movie_suggestions.json`;

export const getMovies = async (
  limit,
  page,
  quality,
  minimum_rating,
  query_term,
  genre,
  sort_by,
  order_by,
  with_rt_ratings,
) => {
  const validParams = isValidValueForGetMovies(
    limit,
    page,
    quality,
    minimum_rating,
    query_term,
    genre,
    sort_by,
    order_by,
    with_rt_ratings,
  );

  const {
    data: {
      data: { movies },
    },
  } = await axios(LIST_MOVIE_URL, {
    params: {
      limit: validParams.limit,
      page: validParams.page,
      quality: validParams.quality,
      minimum_rating: validParams.minimum_rating,
      query_term: validParams.query_term,
      genre: validParams.genre,
      sort_by: validParams.sort_by,
      order_by: validParams.order_by,
      with_rt_ratings: validParams.with_rt_ratings,
    },
  });

  return movies;
};

export const getMovieById = async (
  movie_id = null,
  with_images = false,
  with_cast = false,
) => {
  switch (movie_id) {
    case null:
    case movie_id * 1:
      break;
    default:
      movie_id = null;
      break;
  }

  switch (with_images) {
    case true:
    case false:
      break;
    default:
      with_images = false;
      break;
  }

  switch (with_cast) {
    case true:
    case false:
      break;
    default:
      with_cast = false;
      break;
  }

  const {
    data: {
      data: { movie },
    },
  } = await axios(MOVIE_DETAILS_URL, {
    params: { movie_id, with_images, with_cast },
  });

  return movie;
};

// * Why getMovieSuggestions requires movie_id is like Youtube Algorithm.
// * If who watch the Movie, Get That Movie's Id and Show related Movies using that Id
export const getMovieSuggestions = async movie_id => {
  switch (movie_id) {
    case null:
    case movie_id * 1:
      break;
    default:
      movie_id = null;
      break;
  }

  const {
    data: {
      data: { movies },
    },
  } = await axios(MOVIE_SUGGESTIONS_URL, { params: { movie_id } });

  return movies;
};

// * I think Babel probably doesn't support the '??' operator,
// * So I used this function instead.
const isNullOrUndefined = parameter => {
  if (parameter === null || parameter === undefined) {
    return true;
  }
  return false;
};

const isValidValueForGetMovies = (
  limit,
  page,
  quality,
  minimum_rating,
  query_term,
  genre,
  sort_by,
  order_by,
  with_rt_ratings,
) => {
  if (isNullOrUndefined(limit) && (limit < 1 || limit > 50)) {
    limit = 20;
  }

  if (isNullOrUndefined(page) && page * 1 !== page) {
    page = 1;
  }

  switch (
    isNullOrUndefined(quality) ||
    (quality !== 'All' &&
      quality !== '720p' &&
      quality !== '1080p' &&
      quality !== '2160p' &&
      quality !== '3D')
  ) {
    case true:
      quality = 'All';
      break;
    default:
      break;
  }

  if (
    isNullOrUndefined(minimum_rating) &&
    (minimum_rating < 0 || minimum_rating > 9)
  ) {
    minimum_rating = 0.0;
  }

  if (isNullOrUndefined(query_term)) {
    query_term = '0';
  }

  const genres = [
    'All',
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film Noir',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Short Film',
    'Sport',
    'Superhero',
    'Thriller',
    'War',
    'Western',
  ];

  if (!isNullOrUndefined(genre)) {
    for (const g of genre) {
      for (const movieGenre of genres) {
        if (g === movieGenre) {
          break;
        }
      }
    }
  } else genre = ['All'];

  switch (
    isNullOrUndefined(sort_by) ||
    (sort_by !== 'title' &&
      sort_by !== 'year' &&
      sort_by !== 'rating' &&
      sort_by !== 'peers' &&
      sort_by !== 'seeds' &&
      sort_by !== 'download_count' &&
      sort_by !== 'like_count' &&
      sort_by !== 'date_added')
  ) {
    case true:
      sort_by = 'date_added';
      break;
    default:
      break;
  }

  switch (
    isNullOrUndefined(order_by) ||
    (order_by !== 'desc' && order_by !== 'asc')
  ) {
    case true:
      order_by = 'desc';
      break;
    default:
      break;
  }

  switch (
    isNullOrUndefined(with_rt_ratings) ||
    (with_rt_ratings !== true && with_rt_ratings !== false)
  ) {
    case true:
      with_rt_ratings = false;
      break;
    default:
      break;
  }

  return {
    limit,
    page,
    quality,
    minimum_rating,
    query_term,
    genre,
    sort_by,
    order_by,
    with_rt_ratings,
  };
};
