# ReflectYr

Create and share your year-end movie rankings. Perfect for award season.

## What It Does

1. **Import your watches** - Upload your Letterboxd export or search/add movies manually
2. **Build ranked lists** - Create your "Best of 2024" with drag-and-drop ranking
3. **Add your takes** - Personal comments, ratings, and list descriptions
4. **Customize the look** - Choose themes (classic, poster grid, Family Feud style, awards show)
5. **Share & compare** - Generate shareable links, invite friends, compare picks

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS 4, Framer Motion
- **Auth**: NextAuth 5 with Google OAuth
- **Database**: Neon PostgreSQL
- **APIs**: TMDB (movie data), Claude AI (recommendations)
- **Deployment**: Vercel

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```
TMDB_API_TOKEN=        # TMDB API read token
ANTHROPIC_API_KEY=     # For AI recommendations
DATABASE_URL=          # Neon PostgreSQL connection string
AUTH_SECRET=           # NextAuth secret
AUTH_GOOGLE_ID_DEV=    # Google OAuth (development)
AUTH_GOOGLE_SECRET_DEV=
AUTH_GOOGLE_ID_PROD=   # Google OAuth (production)
AUTH_GOOGLE_SECRET_PROD=
```

## Project Structure

```
app/
├── (media)/movies/    # Movie browse & detail
├── (media)/tv/        # TV show browse & detail
├── lists/             # User lists, publish, recommendations
├── api/               # API routes (auth, recommendations)
└── profile/           # User profile

components/
├── layout/            # Header, Footer, Sidebar
└── ui/                # Reusable UI components

library/
├── api/               # TMDB API utilities
├── contexts/          # React Context (ListContext, YearContext)
└── utils/             # Helpers, constants
```

## Current Status

See [TODO.md](./TODO.md) for roadmap and current progress.

### Working
- Browse movies/TV from TMDB
- Create ranked lists (localStorage)
- AI-powered recommendations
- Google OAuth authentication

### In Progress
- Letterboxd import
- Per-item comments & ratings
- List themes/templates
- Social sharing & comparison

## License

MIT
