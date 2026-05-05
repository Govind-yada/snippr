# Snippr — URL Shortener Frontend

React + Vite frontend for the [url_shortener](https://github.com/Govind-yada/url_shortener) backend.

## Tech Stack

- **React 18** — UI
- **Vite 5** — dev server & bundler
- **Custom CSS** — no UI framework, all styles in `src/styles/global.css`

## Getting Started

### Prerequisites

Make sure the backend is running first:

```bash
# In the backend directory
docker-compose up
# Server starts on http://localhost:5000
```

### Install & run

```bash
cd snippr
cp .env.example .env      # set VITE_API_BASE if needed
npm install
npm run dev               # http://localhost:3000
```

### Build for production

```bash
npm run build             # outputs to dist/
npm run preview           # preview the production build
```

## Environment Variables

| Variable         | Default                    | Description                  |
|------------------|----------------------------|------------------------------|
| `VITE_API_BASE`  | `http://localhost:5000`    | Backend base URL             |

## Project Structure

```
snippr/
├── index.html
├── package.json
├── vite.config.js          # dev proxy → localhost:5000
├── .env.example
└── src/
    ├── main.jsx             # entry point
    ├── App.jsx              # root, tab-based routing
    │
    ├── api/
    │   └── urlApi.js        # all API calls (shorten, list, delete, stats)
    │
    ├── constants/
    │   ├── config.js        # API_BASE, NAV_TABS, shared helpers
    │   └── palette.js       # design tokens
    │
    ├── hooks/
    │   └── useUrls.js       # data-fetching hook: load, remove, reload
    │
    ├── styles/
    │   └── global.css       # all styles (fonts, layout, components)
    │
    ├── components/          # reusable UI
    │   ├── Navbar.jsx       # sticky header + nav tabs
    │   ├── Toast.jsx        # auto-dismissing notification
    │   ├── ClickBar.jsx     # animated click progress bar
    │   └── UrlCard.jsx      # URL row card with inline analytics
    │
    └── pages/               # full-page views
        ├── ShortenPage.jsx  # hero + shorten form + advanced options
        ├── ManagePage.jsx   # list, search, delete all URLs
        └── AnalyticsPage.jsx# global stats + per-code lookup + leaderboard
```

## Backend API Endpoints Used

| Feature              | Method | Endpoint                    |
|----------------------|--------|-----------------------------|
| Shorten URL          | POST   | `/api/url/shorten`          |
| List all URLs        | GET    | `/api/url/all`              |
| Delete a URL         | DELETE | `/api/url/:shortCode`       |
| Per-URL stats        | GET    | `/api/url/stats/:shortCode` |

Rate limit (HTTP 429) is handled gracefully — a warning banner is shown instead of an error.

## Features

- **Shorten** — paste any URL, get a short link instantly
- **Custom slug** — optional vanity short code
- **Expiry** — set TTL in days via advanced options
- **Copy to clipboard** — one-click copy on every result
- **Rate limit UX** — sliding-window 429 handled with a friendly banner
- **Manage** — browse all URLs, search by code or original URL, delete
- **Per-URL analytics** — expandable click stats panel on each card
- **Analytics dashboard** — global stats, lookup by code, click leaderboard
