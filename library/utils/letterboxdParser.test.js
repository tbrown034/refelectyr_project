// library/utils/letterboxdParser.test.js
// Unit tests for Letterboxd parser

import {
  parseCSV,
  parseLetterboxdCSV,
  parseDiaryCSV,
  parseRatingsCSV,
  parseWatchedCSV,
  parseLetterboxdRating,
  mergeLetterboxdImports,
  filterByYear,
  filterByDecade,
  sortMovies,
  getWatchedPoolStats,
} from './letterboxdParser';

// Mock console for cleaner test output
const originalConsole = { ...console };
beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});
afterAll(() => {
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

describe('parseCSV', () => {
  test('parses simple CSV correctly', () => {
    const csv = `Name,Year,Rating
Dune,2021,4.5
Oppenheimer,2023,5`;

    const result = parseCSV(csv);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ Name: 'Dune', Year: '2021', Rating: '4.5' });
    expect(result[1]).toEqual({ Name: 'Oppenheimer', Year: '2023', Rating: '5' });
  });

  test('handles quoted fields with commas', () => {
    const csv = `Name,Year,Tags
"The Good, The Bad and The Ugly",1966,"western, classic"`;

    const result = parseCSV(csv);

    expect(result).toHaveLength(1);
    expect(result[0].Name).toBe('The Good, The Bad and The Ugly');
    expect(result[0].Tags).toBe('western, classic');
  });

  test('handles empty CSV', () => {
    expect(parseCSV('')).toEqual([]);
    expect(parseCSV('Header Only')).toEqual([]);
  });

  test('handles null/undefined input', () => {
    expect(parseCSV(null)).toEqual([]);
    expect(parseCSV(undefined)).toEqual([]);
  });
});

describe('parseLetterboxdRating', () => {
  test('parses valid ratings', () => {
    expect(parseLetterboxdRating('5')).toBe(5);
    expect(parseLetterboxdRating('4.5')).toBe(4.5);
    expect(parseLetterboxdRating('3')).toBe(3);
    expect(parseLetterboxdRating('0.5')).toBe(0.5);
  });

  test('handles empty/invalid ratings', () => {
    expect(parseLetterboxdRating('')).toBeNull();
    expect(parseLetterboxdRating(null)).toBeNull();
    expect(parseLetterboxdRating('not a number')).toBeNull();
  });

  test('clamps out of range values', () => {
    expect(parseLetterboxdRating('6')).toBe(5);
    expect(parseLetterboxdRating('-1')).toBe(0);
  });
});

describe('parseDiaryCSV', () => {
  test('parses diary format correctly', () => {
    const csv = `Date,Name,Year,Letterboxd URI,Rating,Rewatch,Tags,Watched Date
2024-03-15,Dune: Part Two,2024,https://letterboxd.com/film/dune-part-two/,5,No,"sci-fi, epic",2024-03-01
2024-02-10,Poor Things,2023,https://letterboxd.com/film/poor-things/,4.5,No,drama,2024-02-10`;

    const result = parseDiaryCSV(csv);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      title: 'Dune: Part Two',
      year: 2024,
      rating: 5,
      isRewatch: false,
      source: 'letterboxd-diary',
    });
    expect(result[0].tags).toContain('sci-fi');
  });

  test('handles rewatch flag', () => {
    const csv = `Date,Name,Year,Letterboxd URI,Rating,Rewatch,Tags,Watched Date
2024-01-01,The Matrix,1999,uri,5,Yes,,2024-01-01`;

    const result = parseDiaryCSV(csv);
    expect(result[0].isRewatch).toBe(true);
  });
});

describe('parseRatingsCSV', () => {
  test('parses ratings format correctly', () => {
    const csv = `Date,Name,Year,Letterboxd URI,Rating
2024-01-15,Inception,2010,https://letterboxd.com/film/inception/,5
2024-01-10,Interstellar,2014,https://letterboxd.com/film/interstellar/,4.5`;

    const result = parseRatingsCSV(csv);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      title: 'Inception',
      year: 2010,
      rating: 5,
      source: 'letterboxd-ratings',
    });
  });
});

describe('parseWatchedCSV', () => {
  test('parses watched format correctly', () => {
    const csv = `Date,Name,Year,Letterboxd URI
2024-01-15,The Godfather,1972,https://letterboxd.com/film/the-godfather/
2024-01-10,Pulp Fiction,1994,https://letterboxd.com/film/pulp-fiction/`;

    const result = parseWatchedCSV(csv);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      title: 'The Godfather',
      year: 1972,
      source: 'letterboxd-watched',
    });
  });
});

describe('parseLetterboxdCSV', () => {
  test('auto-detects diary format from filename', () => {
    const csv = `Date,Name,Year,Letterboxd URI,Rating,Rewatch,Tags,Watched Date
2024-01-01,Test,2024,uri,5,No,,2024-01-01`;

    const result = parseLetterboxdCSV(csv, 'diary.csv');
    expect(result.type).toBe('diary');
  });

  test('auto-detects ratings format from filename', () => {
    const csv = `Date,Name,Year,Letterboxd URI,Rating
2024-01-01,Test,2024,uri,5`;

    const result = parseLetterboxdCSV(csv, 'ratings.csv');
    expect(result.type).toBe('ratings');
  });

  test('auto-detects from content when no filename match', () => {
    const csv = `Date,Name,Year,Letterboxd URI,Rating,Rewatch,Tags,Watched Date
2024-01-01,Test,2024,uri,5,No,,2024-01-01`;

    const result = parseLetterboxdCSV(csv, 'unknown.csv');
    expect(result.type).toBe('diary');
  });
});

describe('mergeLetterboxdImports', () => {
  test('merges multiple imports and deduplicates', () => {
    const imports = [
      {
        type: 'watched',
        data: [
          { title: 'Dune', year: 2021 },
          { title: 'Inception', year: 2010 },
        ],
      },
      {
        type: 'ratings',
        data: [
          { title: 'Dune', year: 2021, rating: 5 },
          { title: 'Interstellar', year: 2014, rating: 4.5 },
        ],
      },
    ];

    const result = mergeLetterboxdImports(imports);

    expect(result).toHaveLength(3);

    const dune = result.find(m => m.title === 'Dune');
    expect(dune.rating).toBe(5); // Merged rating from ratings import
  });

  test('prefers existing data over null', () => {
    const imports = [
      { type: 'diary', data: [{ title: 'Test', year: 2024, rating: 5, watchedDate: '2024-01-01' }] },
      { type: 'watched', data: [{ title: 'Test', year: 2024 }] },
    ];

    const result = mergeLetterboxdImports(imports);

    expect(result[0].rating).toBe(5);
    expect(result[0].watchedDate).toBe('2024-01-01');
  });
});

describe('filterByYear', () => {
  const movies = [
    { title: 'Movie 2024', year: 2024 },
    { title: 'Movie 2023', year: 2023 },
    { title: 'Movie 2024 B', year: 2024 },
  ];

  test('filters movies by year', () => {
    const result = filterByYear(movies, 2024);
    expect(result).toHaveLength(2);
    expect(result.every(m => m.year === 2024)).toBe(true);
  });

  test('returns all movies when no year specified', () => {
    const result = filterByYear(movies, null);
    expect(result).toHaveLength(3);
  });
});

describe('filterByDecade', () => {
  const movies = [
    { title: 'Movie 2024', year: 2024 },
    { title: 'Movie 2019', year: 2019 },
    { title: 'Movie 2015', year: 2015 },
    { title: 'Movie 1999', year: 1999 },
  ];

  test('filters movies by decade', () => {
    const result = filterByDecade(movies, 2020);
    expect(result).toHaveLength(1);
    expect(result[0].year).toBe(2024);
  });

  test('includes all years in decade', () => {
    const result = filterByDecade(movies, 2010);
    expect(result).toHaveLength(2);
  });
});

describe('sortMovies', () => {
  const movies = [
    { title: 'B Movie', year: 2020, rating: 3, watchedDate: '2024-01-15' },
    { title: 'A Movie', year: 2024, rating: 5, watchedDate: '2024-01-01' },
    { title: 'C Movie', year: 2022, rating: 4, watchedDate: null },
  ];

  test('sorts by watched date descending', () => {
    const result = sortMovies(movies, 'watchedDate');
    expect(result[0].title).toBe('B Movie');
    expect(result[2].title).toBe('C Movie'); // null dates go last
  });

  test('sorts by rating descending', () => {
    const result = sortMovies(movies, 'rating');
    expect(result[0].rating).toBe(5);
    expect(result[2].rating).toBe(3);
  });

  test('sorts by year descending', () => {
    const result = sortMovies(movies, 'year');
    expect(result[0].year).toBe(2024);
  });

  test('sorts by title alphabetically', () => {
    const result = sortMovies(movies, 'title');
    expect(result[0].title).toBe('A Movie');
    expect(result[2].title).toBe('C Movie');
  });
});

describe('getWatchedPoolStats', () => {
  const movies = [
    { title: 'M1', year: 2024, rating: 5, watchedDate: '2024-01-01', isRewatch: false },
    { title: 'M2', year: 2024, rating: 4, watchedDate: '2024-01-02', isRewatch: true },
    { title: 'M3', year: 2023, rating: null, watchedDate: null, isRewatch: false },
    { title: 'M4', year: 2020, rating: 3, watchedDate: '2024-01-03', isRewatch: false },
  ];

  test('calculates correct statistics', () => {
    const stats = getWatchedPoolStats(movies);

    expect(stats.total).toBe(4);
    expect(stats.withRatings).toBe(3);
    expect(stats.withDates).toBe(3);
    expect(stats.rewatches).toBe(1);
    expect(stats.byYear[2024]).toBe(2);
    expect(stats.byYear[2023]).toBe(1);
    expect(stats.byDecade[2020]).toBe(3);
    expect(parseFloat(stats.averageRating)).toBe(4); // (5+4+3)/3
  });
});
