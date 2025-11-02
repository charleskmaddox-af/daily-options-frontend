# Daily Options Frontend (Next.js)

## Setup
1) Copy `.env.example` to `.env.local` and set:
   NEXT_PUBLIC_API_BASE=https://daily-options-tracker-pt8yk.ondigitalocean.app

2) Install & run locally
   npm install
   npm run dev
   # open http://localhost:3000

## Deploy to DigitalOcean App Platform
- Create App → GitHub repo → detected as Next.js
- Build command: npm install && npm run build
- Run command: npm start
- Environment variable:
  NEXT_PUBLIC_API_BASE=https://daily-options-tracker-pt8yk.ondigitalocean.app

## FastAPI CORS reminder
In your backend, set ALLOWED_ORIGINS to include:
  https://<the-url-of-this-frontend>.ondigitalocean.app
and optionally http://localhost:3000 for local dev.
