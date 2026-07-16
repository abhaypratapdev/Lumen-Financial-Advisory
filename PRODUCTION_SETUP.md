# Production Deployment Checklist

This document outlines all the steps needed to fully connect the frontend (Vercel) and backend (Render) for production.

## ✅ Already Completed in the Repository

- ✅ Fixed backend package.json syntax error
- ✅ Created `frontend/vercel.json` for Vercel build configuration
- ✅ Created `backend/render.yaml` for Render deployment configuration
- ✅ Updated `backend/.env` and `backend/.env.example` with production CORS origins
- ✅ Updated `frontend/.env.example` with Render backend API URL
- ✅ Verified frontend builds without errors

## 🔧 Manual Setup Required in Vercel Dashboard

1. **Connect Repository**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Set Framework Preset to "Vite"
   - Set Root Directory to `frontend`

2. **Environment Variables**
   - Add the following environment variable:
     ```
     VITE_API_URL = https://financial-advisor-web-application.onrender.com/api
     ```
   - Click "Deploy"

3. **Verify Deployment**
   - Visit https://financial-advisor-web-application.vercel.app/
   - Open browser DevTools (F12)
   - Check Console and Network tabs for any errors

## 🔧 Manual Setup Required in Render Dashboard

1. **Create New Web Service**
   - Go to https://dashboard.render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `financial-advisor-backend`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   Add the following in the Render dashboard environment variables section:
   
   | Variable | Value |
   |----------|-------|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | Your Neon PostgreSQL connection string |
   | `JWT_SECRET` | Generate a strong random secret (min 32 chars) |
   | `CORS_ORIGIN` | `http://localhost:5173,https://financial-advisor-web-application.vercel.app` |
   | `GEMINI_API_KEY` | Your Gemini API key from Google Cloud Console |
   | `GEMINI_MODEL` | `gemini-1.5-flash` |
   | `NEWS_API_KEY` | Your News API key from newsapi.org |

4. **Deploy**
   - Click "Deploy Web Service"
   - Wait for deployment to complete (check logs)
   - Verify backend is running: https://financial-advisor-web-application.onrender.com/api/health

## 🧪 Testing the Connection

After both deployments are complete:

1. **Test Backend Health**
   ```
   curl https://financial-advisor-web-application.onrender.com/api/health
   ```
   Should return:
   ```json
   {
     "ok": true,
     "service": "financial-advisor-api",
     "env": "production",
     "db": { "connected": true, "provider": "neon-postgres" }
   }
   ```

2. **Test Frontend**
   - Visit https://financial-advisor-web-application.vercel.app/
   - Try to register a new account
   - Check browser console (F12) for any errors
   - Try to login

3. **Monitor Logs**
   - **Vercel**: Deployments > Logs
   - **Render**: Dashboard > Services > Logs

## 🐛 Common Issues & Solutions

### Issue: CORS Error in Browser Console
**Error**: `Access to XMLHttpRequest at 'https://...' from origin 'https://financial-advisor-web-application.vercel.app' has been blocked by CORS policy`

**Solution**:
1. Check `CORS_ORIGIN` in Render environment variables
2. Ensure it includes: `https://financial-advisor-web-application.vercel.app`
3. Redeploy the backend after updating

### Issue: Network Error / Cannot Reach Backend
**Error**: `Cannot POST /api/auth/login` or connection timeout

**Solution**:
1. Verify `VITE_API_URL` in Vercel environment variables
2. Check that the URL doesn't have a trailing slash
3. Test backend manually: https://financial-advisor-web-application.onrender.com/api/health
4. Check Render logs for any errors

### Issue: Database Connection Error
**Error**: `Connection refused` or `Database connection failed`

**Solution**:
1. Verify `DATABASE_URL` is correctly set in Render
2. Check that it includes `?sslmode=require`
3. Test the database connection from your local machine
4. Check Neon dashboard for any issues

### Issue: Backend Cold Start Taking Too Long
**Note**: Render's free tier experiences cold starts (service sleeps after 15 mins of inactivity)

**Solution**: 
- Upgrade to Render's paid tier for better performance, or
- Set up a cron job to ping the health endpoint regularly

## 📝 Local Development

To test locally before deploying:

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend  
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## 📊 Architecture

```
┌─────────────────────────────────────────────┐
│     Vercel (Frontend)                       │
│ https://financial-advisor-...vercel.app    │
│                                             │
│  React App (dist/)                          │
│  Env: VITE_API_URL → Render Backend URL    │
└────────────────┬────────────────────────────┘
                 │ API Requests (HTTPS)
                 │ (/api/auth, /api/chat, etc.)
                 ↓
┌─────────────────────────────────────────────┐
│     Render (Backend)                        │
│ https://financial-advisor-...onrender.com  │
│                                             │
│  Node.js/Express API                        │
│  Env: CORS_ORIGIN → Vercel URL             │
│       DATABASE_URL → Neon PostgreSQL        │
└──────────┬──────────────┬────────────────────┘
           │              │
           ↓              ↓
    Neon PostgreSQL   External APIs
    (Database)        (Gemini, NewsAPI)
```

## ✨ After Initial Setup

- Consider upgrading Render to a paid tier for better performance
- Set up monitoring and alerting
- Configure custom domain names if desired
- Set up SSL certificates (Vercel and Render handle this automatically)
- Regular backups for your database (Neon provides this)
