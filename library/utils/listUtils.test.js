// library/utils/listUtils.test.js
// Unit tests for list utilities

import {
  generateListId,
  generateShareCode,
  formatShareUrl,
  getShareableUrl,
  formatListText,
  formatListDate,
} from './listUtils';

// Mock console for cleaner test output
const originalConsole = { ...console };
beforeAll(() => {
  console.log = jest.fn();
});
afterAll(() => {
  console.log = originalConsole.log;
});

describe('generateListId', () => {
  test('generates unique IDs', () => {
    const id1 = generateListId();
    const id2 = generateListId();

    expect(id1).not.toEqual(id2);
  });

  test('IDs start with "list_" prefix', () => {
    const id = generateListId();
    expect(id).toMatch(/^list_/);
  });

  test('IDs contain alphanumeric characters', () => {
    const id = generateListId();
    expect(id).toMatch(/^list_[a-z0-9]+_[a-z0-9]+$/);
  });
});

describe('generateShareCode', () => {
  test('generates 6 character codes', () => {
    const code = generateShareCode();
    expect(code).toHaveLength(6);
  });

  test('generates unique codes', () => {
    const codes = new Set();
    for (let i = 0; i < 100; i++) {
      codes.add(generateShareCode());
    }
    // All 100 should be unique
    expect(codes.size).toBe(100);
  });

  test('only contains allowed characters (no ambiguous chars)', () => {
    const code = generateShareCode();
    // Should not contain 0, 1, I, l, O (ambiguous)
    expect(code).not.toMatch(/[01IlO]/);
  });
});

describe('formatShareUrl', () => {
  test('formats movie list URL correctly', () => {
    const url = formatShareUrl('movies', 'list_abc123');
    expect(url).toBe('/lists/movies/publish/list_abc123');
  });

  test('formats TV list URL correctly', () => {
    const url = formatShareUrl('tv', 'list_xyz789');
    expect(url).toBe('/lists/tv/publish/list_xyz789');
  });
});

describe('formatListText', () => {
  const movieItems = [
    { id: 1, title: 'Dune', release_date: '2021-10-22' },
    { id: 2, title: 'Oppenheimer', release_date: '2023-07-21' },
    { id: 3, title: 'Barbie', release_date: '2023-07-21' },
  ];

  const tvItems = [
    { id: 1, name: 'Breaking Bad', first_air_date: '2008-01-20' },
    { id: 2, name: 'The Office', first_air_date: '2005-03-24' },
  ];

  test('formats movie list correctly', () => {
    const text = formatListText(movieItems, 'movie');

    expect(text).toContain('1. Dune (2021)');
    expect(text).toContain('2. Oppenheimer (2023)');
    expect(text).toContain('3. Barbie (2023)');
  });

  test('formats TV list correctly', () => {
    const text = formatListText(tvItems, 'tv');

    expect(text).toContain('1. Breaking Bad (2008)');
    expect(text).toContain('2. The Office (2005)');
  });

  test('returns empty string for empty list', () => {
    expect(formatListText([], 'movie')).toBe('');
    expect(formatListText(null, 'movie')).toBe('');
    expect(formatListText(undefined, 'movie')).toBe('');
  });

  test('handles missing dates', () => {
    const items = [{ id: 1, title: 'Unknown Movie' }];
    const text = formatListText(items, 'movie');

    expect(text).toContain('Unknown Movie (Unknown)');
  });
});

describe('formatListDate', () => {
  test('formats date in short format', () => {
    const date = formatListDate('2024-03-15T12:00:00Z', 'short');

    // Should contain month, day, and year
    expect(date).toMatch(/Mar.*15.*2024|2024.*Mar.*15|15.*Mar.*2024/i);
  });

  test('formats date in long format', () => {
    const date = formatListDate('2024-03-15T12:00:00Z', 'long');

    // Should contain full month name
    expect(date).toMatch(/March/i);
  });

  test('handles null/undefined dates', () => {
    expect(formatListDate(null)).toBe('Unknown Date');
    expect(formatListDate(undefined)).toBe('Unknown Date');
    expect(formatListDate('')).toBe('Unknown Date');
  });

  test('handles invalid dates', () => {
    expect(formatListDate('not-a-date')).toBe('Invalid Date');
  });
});
