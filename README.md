# NewsWave

NewsWave is a React news web app that shows top headlines by category with a clean, responsive card layout. It uses the GNews API when an API key is available and falls back to saved local headlines when the API is unavailable, rate-limited, or missing.

Built by [Tayyab Aslam](https://thisistayyab.dev), a Full Stack Developer working with React, Next.js, Node.js, PostgreSQL, and REST APIs.

## Features

- Category-based top headlines
- Responsive Bootstrap card grid
- Equal-height news cards with consistent image, title, description, and meta spacing
- Manual `Load More` button to avoid unnecessary API calls
- 10-minute session cache for API responses
- Request de-duplication to reduce duplicate calls in React development mode
- Graceful fallback news when GNews blocks, rate-limits, or fails
- Static-hosting friendly routing with `HashRouter`
- Top loading progress bar

## Tech Stack

- React
- React Router
- Bootstrap
- GNews API
- Create React App

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your GNews API key for local development:

```env
REACT_APP_GNEWS_API_KEY=your_gnews_api_key_here
```

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

```bash
npm test
```

Runs the test watcher.

## API Notes

The app uses `REACT_APP_GNEWS_API_KEY` only for local development on `localhost`.

On production, the browser calls the Netlify function at `/.netlify/functions/news`. Add this environment variable in Netlify:

```env
GNEWS_API_KEY=your_gnews_api_key_here
```

This keeps the GNews key out of the public JavaScript bundle and avoids browser-side request failures. Without an API key, NewsWave still works by showing saved fallback headlines from `src/data/newsFallback.json`.

GNews can rate-limit requests if too many calls are made in a short time. To reduce that problem, NewsWave caches API responses for 10 minutes and uses a manual `Load More` button instead of automatic infinite scrolling.

## Deployment

Build the app:

```bash
npm run build
```

Deploy the generated `build` folder to your hosting provider. On Netlify, also deploy the `netlify/functions/news.js` function and set `GNEWS_API_KEY` in Site settings > Environment variables.

The app currently uses hash routes like:

```text
/#/business
/#/technology
```

This keeps routes working on static hosts such as GitHub Pages. If you want clean URLs like `/business`, switch back to `BrowserRouter` and configure your host to redirect all routes to `index.html`.

## Author

Tayyab Aslam

- Portfolio: [thisistayyab.dev](https://thisistayyab.dev)
- Email: [tayyab@taylancetech.com](mailto:tayyab@taylancetech.com)

## License

MIT
