import fetch from 'node-fetch';

const API_URL = 'https://yts.mx/api/v2/list_movies.json';

export const getMovies = (
  limit = 20,
  page = 1,
  quality = 'All',
  minimum_rating = 0.0,
  query_term = '0',
  genre = ['All'],
  sort_by = 'date_added',
  order_by = 'desc',
  with_rt_ratings = 'false',
) => {
  let request_url = isValidValue(
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

  return fetch(`${request_url}`)
    .then(res => res.json())
    .then(json => json.data.movies);
};

// * I think Babel probably doesn't support the '??' operator,
// * So I used this function instead.
const isNull = parameter => {
  if (parameter === null || parameter === undefined) {
    return true;
  }
  return false;
};

const isValidValue = (
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
  let request_url = API_URL + '?';

  if (limit >= 1 && limit <= 50) {
    request_url += `&limit=${limit}`;
  }

  if (page * 1 === page) {
    request_url += `&page=${page}`;
  }

  switch (
    quality === 'All' ||
    quality === '720p' ||
    quality === '1080p' ||
    quality === '2160p' ||
    quality === '3D'
  ) {
    case true:
      request_url += `&quality=${quality}`;
      break;
    default:
      break;
  }

  if (minimum_rating >= 0 && minimum_rating <= 9) {
    request_url += `&minimum_rating=${minimum_rating}`;
  }

  request_url += `&query_term=${query_term}`;

  const genres = [
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

  for (const movieGenre of genres) {
    if (genre === 'All') {
      break;
    }
    if (genre === movieGenre) {
      request_url += `&genre=${genre}`;
    }
  }

  switch (
    sort_by === 'title' ||
    sort_by === 'year' ||
    sort_by === 'rating' ||
    sort_by === 'peers' ||
    sort_by === 'seeds' ||
    sort_by === 'download_count' ||
    sort_by === 'like_count' ||
    sort_by === 'date_added'
  ) {
    case true:
      request_url += `&sort_by=${sort_by}`;
      break;
    default:
      break;
  }

  switch (order_by) {
    case 'desc':
    case 'asc':
      request_url += `&order_by=${order_by}`;
      break;
    default:
      break;
  }

  switch (with_rt_ratings === 'true' || with_rt_ratings === 'false') {
    case true:
      request_url += `&with_rt_ratings=${with_rt_ratings}`;
      break;
    default:
      break;
  }

  return request_url;
};
