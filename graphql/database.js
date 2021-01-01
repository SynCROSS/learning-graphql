let movies = [
  {
    id: 1,
    name: 'Movie1',
    score: 100,
    summary:
      'This Movie is Super Mega Sensational Über Top-Notch Smashing Glorious Marvelous Outstanding Amazing Bewildering Perfect Masterpiece Movie.',
  },
  {
    id: 2,
    name: 'Movie2',
    score: 90,
    summary: 'This Movie is the best in your life.',
  },
  {
    id: 3,
    name: 'Movie3',
    score: 80,
    summary: 'This Movie can be Fun for You.',
  },
];

export const getMovies = () => movies;

export const getMovieById = id => {
  const filteredMovie = movies.filter(movie => id === movie.id);
  return filteredMovie[0];
};

export const addMovie = (name, score, summary) => {
  for (const movie of movies) {
    if (name === movie.name) {
      return null;
    }
  }

  const newMovie = {
    id: movies.length + 1,
    name,
    score: isNull(score) ? 0 : score,
    summary: isNull(summary) ? '' : summary,
  };

  movies.push(newMovie);
  return newMovie;
};

const isNull = parameter => {
  if (parameter === null || parameter === undefined) {
    return true;
  }
  return false;
};
