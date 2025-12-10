# ReflectYr - Status & Roadmap

## Current State (Dec 2024)

### What Works
- [x] Build passes, app runs
- [x] Google OAuth configured (dev + prod credentials)
- [x] Neon DB connected via NextAuth adapter
- [x] TMDB API integration with caching
- [x] localStorage-based list management
- [x] AI recommendations via Claude API
- [x] Browse movies/TV, add to lists, reorder, publish

### What's Been Built (This Session)

#### Security Fixes
- [x] Auth check added to `/api/recommendations` endpoint
- [x] Removed console.log exposing Google Client ID
- [x] Added middleware route matcher config
- [x] Fixed TMDB token exposure (removed NEXT_PUBLIC fallback)

#### Letterboxd Import
- [x] CSV parser utility (`library/utils/letterboxdParser.js`)
- [x] Support for diary.csv, ratings.csv, watched.csv, watchlist.csv
- [x] Merge/deduplication logic
- [x] Import UI component with drag-drop (`components/ui/LetterboxdImport.jsx`)
- [x] Stats preview (total movies, ratings, dates)

#### Enhanced List Features
- [x] Watched pool in ListContext (separate from temp lists)
- [x] Per-item comments field
- [x] Per-item star ratings (1-5)
- [x] List title and description fields
- [x] Year filtering for lists
- [x] Share codes for public lists

#### List Themes
- [x] Classic - Numbered list with posters and comments
- [x] Poster Grid - Visual grid with hover details
- [x] Family Feud - One-by-one reveal game show style
- [x] Awards Show - Winner spotlight with nominees
- [x] Minimalist - Simple text-based list

#### New Pages & Components
- [x] `/create` - Full list creation wizard with theme selection
- [x] `/share/[code]` - Public shareable list view
- [x] `/compare` - Side-by-side list comparison
- [x] `/api/search` - TMDB search endpoint
- [x] ThemeSelector component with color picker
- [x] ListThemeRenderer - Dynamic theme switching

#### Unit Tests
- [x] Letterboxd parser tests (`letterboxdParser.test.js`)
- [x] List utilities tests (`listUtils.test.js`)

---

## The Killer Feature: Year-End List Maker & Sharer

**Status: MVP Complete!**

### User Flow (Working)
1. **Get your movies in**
   - [x] Upload Letterboxd export (CSV parsing)
   - [x] Search TMDB and add manually
   - [x] Filter by year

2. **Build your ranked list**
   - [x] Drag-and-drop reordering
   - [x] Add personal comments per movie
   - [x] Add star ratings per movie
   - [x] Write list description

3. **Customize the look**
   - [x] 5 theme options (Classic, Poster Grid, Family Feud, Awards, Minimalist)
   - [x] Custom accent colors (presets + color picker)
   - [x] Live preview

4. **Share & Compare**
   - [x] Generate shareable links with short codes
   - [x] Public list view page
   - [x] Compare two lists side-by-side
   - [x] Overlap statistics

---

## Remaining Tasks

### Priority 1: Polish & Bug Fixes
- [ ] Test full user flow end-to-end
- [ ] Add loading states to all async operations
- [ ] Handle empty states gracefully everywhere
- [ ] Mobile responsiveness testing
- [ ] Error boundary components

### Priority 2: Enhanced Features
- [ ] Friend invite system (share link to create competing list)
- [ ] Social share images (OG meta tags)
- [ ] Instagram story export (vertical image)
- [ ] TV show support in create flow
- [ ] Decade lists (not just yearly)

### Priority 3: Cloud Sync
- [ ] Design DB schema for user lists
- [ ] Sync localStorage <-> DB on login
- [ ] Remove list limits for logged-in users
- [ ] Cross-device sync

### Priority 4: Community Features
- [ ] Public list discovery/browse
- [ ] "X people also picked this" stats
- [ ] Comments on shared lists
- [ ] User profiles with public lists

---

## File Structure (New Files)

```
app/
├── api/search/route.js           # TMDB search API
├── create/page.jsx               # List creation wizard
├── compare/page.jsx              # Compare two lists
└── share/[code]/page.jsx         # Public shared list view

components/ui/
├── LetterboxdImport.jsx          # Letterboxd import modal
├── ThemeSelector.jsx             # Theme and color picker
└── lists/
    ├── index.js                  # Exports and ListThemeRenderer
    ├── ListThemeClassic.jsx      # Classic numbered list
    ├── ListThemePosterGrid.jsx   # Visual poster grid
    ├── ListThemeFamilyFeud.jsx   # Game show reveal style
    ├── ListThemeAwards.jsx       # Awards ceremony style
    └── ListThemeMinimalist.jsx   # Simple text list

library/utils/
├── letterboxdParser.js           # CSV parsing utilities
├── letterboxdParser.test.js      # Parser tests
├── listUtils.js                  # List utilities (enhanced)
└── listUtils.test.js             # Utility tests
```

---

## Data Structures

### Enhanced List (in localStorage)
```javascript
{
  id: "list_abc123_xyz789",
  type: "movie",
  title: "My Best of 2024",
  description: "A year of incredible cinema...",
  year: 2024,
  theme: "classic",           // classic, poster-grid, family-feud, awards, minimalist
  accentColor: "#3B82F6",
  shareCode: "X7Kp2m",        // 6-char shareable code
  isPublic: true,
  publishedAt: "2024-12-09T...",
  items: [{
    id: 693134,               // TMDB ID
    title: "Dune: Part Two",
    poster_path: "/abc.jpg",
    release_date: "2024-03-01",
    rank: 1,
    userRating: 5,            // 1-5 stars
    comment: "Denis Villeneuve delivers a masterpiece",
  }]
}
```

### Watched Pool (in localStorage)
```javascript
{
  movies: [{
    id: "lb-123...",          // Letterboxd temp ID or TMDB ID
    title: "Dune",
    year: 2021,
    poster_path: "/...",
    rating: 4.5,              // From Letterboxd
    watchedDate: "2021-10-22",
    source: "letterboxd",     // letterboxd or manual
    needsTmdbMatch: true,     // Flag for items needing TMDB lookup
  }],
  tv: [...]
}
```

---

## Console Logging

All new code includes console logging with prefixes for easy debugging:
- `[LetterboxdParser]` - CSV parsing operations
- `[LetterboxdImport]` - Import UI component
- `[ListContext]` - State management operations
- `[listUtils]` - Utility functions
- `[CreateListPage]` - List creation flow
- `[ComparePage]` - List comparison
- `[SharePage]` - Public list viewing
- `[API/search]` - Search endpoint
- Theme components: `[ListThemeClassic]`, etc.

---

## Running Tests

```bash
# Install Jest if not present
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Or run specific test file
npx jest library/utils/letterboxdParser.test.js
```

---

## Notes

- Build passes with all new code
- No Prisma schema - DB tables auto-created by NextAuth adapter
- Lists work fully offline via localStorage
- Share codes are 6 characters, avoiding ambiguous chars (0, 1, I, l, O)
- Themes support both light and dark mode
