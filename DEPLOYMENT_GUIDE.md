# Deployment Configuration Guide

## Frontend (Vercel)

### Environment Variables to Set in Vercel Console:
```
VITE_API_URL=https://financial-advisor-web-application.onrender.com/api
```

### Build Command:
```bash
npm run build
```

### Output Directory:
```
dist
```

### Node Version:
18.x or higher recommended

---

## Backend (Render)

### Environment Variables to Set in Render Dashboard:

1. **DATABASE_URL** - Your Neon PostgreSQL connection string
   ```
   postgresql://user:password@host/database?sslmode=require&channel_binding=require&uselibpqcompat=true
   ```

2. **JWT_SECRET** - A strong random secret (minimum 32 characters)
   ```
   your-very-secure-random-secret-here-minimum-32-characters
   ```

3. **CORS_ORIGIN** - Frontend URLs
   ```
   http://localhost:5173,https://financial-advisor-web-application.vercel.app
   ```

4. **GEMINI_API_KEY** - Your Google Gemini API key (from Google Cloud Console)
   ```
   AIzaSyDgcGJW-iPCG5i989757WrySIQjNQM_zAU
   ```

5. **GEMINI_MODEL** - Model name
   ```
   gemini-1.5-flash
   ```

6. **NEWS_API_KEY** - Your News API key (from newsapi.org)
   ```
   c357b0f0224e4c798ff7d8c6d05d14e3
   ```

7. **NODE_ENV** - Set to production
   ```
   production
   ```

### Build Command:
```bash
npm install
```

### Start Command:
```bash
npm start
```

### Node Version:
18.x or higher recommended

---

## Deployment Steps

### 1. Frontend Deployment (Vercel)
- Connect your GitHub repository to Vercel
- Set the root directory to `frontend`
- Add the environment variable `VITE_API_URL` pointing to your Render backend
- Deploy

### 2. Backend Deployment (Render)
- Create a new Web Service on Render
- Connect your GitHub repository
- Set the root directory to `backend`
- Add all the environment variables listed above
- Deploy

### 3. Verify Connectivity
- Visit your Vercel frontend URL
- Try logging in or making API calls
- Check the browser console for any CORS errors
- Check Render logs for any connection errors

---

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Verify `CORS_ORIGIN` in backend .env includes your Vercel frontend URL
2. Ensure the Vercel URL doesn't have a trailing slash
3. Redeploy the backend after updating environment variables

### API Connection Errors
If the frontend can't reach the backend:
1. Verify `VITE_API_URL` is correctly set in Vercel environment variables
2. Test the backend health endpoint: `https://financial-advisor-web-application.onrender.com/api/health`
3. Check that the backend is running (green status on Render dashboard)

### Database Connection Errors
1. Verify `DATABASE_URL` is correctly set in Render environment variables
2. Ensure the database connection string includes `?sslmode=require`
3. Check Neon dashboard for any connection issues

---

## Local Development

### Start Backend Locally:
```bash
cd backend
npm install
npm run dev
```

### Start Frontend Locally:
```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`
Backend will be available at `http://localhost:5000`
