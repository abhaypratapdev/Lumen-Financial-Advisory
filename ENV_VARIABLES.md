# Environment Variables Reference

## 🌐 Vercel Dashboard (Frontend)

Go to: https://vercel.com/dashboard → Select Project → Settings → Environment Variables

### Add this Environment Variable:

```
Name: VITE_API_URL
Value: https://financial-advisor-web-application.onrender.com/api
```

**Important Notes:**
- Make sure there's NO trailing slash at the end
- This variable tells your React app where to find the backend API
- Changes take effect on your next deploy

---

## 🖥️ Render Dashboard (Backend)

Go to: https://dashboard.render.com → Select Service → Environment

### Add ALL these Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Tell Node.js we're in production |
| `PORT` | `5000` | The port your Express server runs on |
| `DATABASE_URL` | Your Neon PostgreSQL URL | Get this from Neon dashboard |
| `JWT_SECRET` | A strong random string (32+ chars) | Used to sign authentication tokens. Change from the default! |
| `CORS_ORIGIN` | `http://localhost:5173,https://financial-advisor-web-application.vercel.app` | Allow frontend to make requests |
| `GEMINI_API_KEY` | Your Google Gemini API key | Get from Google Cloud Console |
| `GEMINI_MODEL` | `gemini-1.5-flash` | The AI model to use |
| `NEWS_API_KEY` | Your News API key | Get from newsapi.org |

---

## 🗄️ Database (Neon PostgreSQL)

1. Go to https://console.neon.tech
2. Select your project
3. Copy the connection string
4. Paste it as `DATABASE_URL` in Render (format: `postgresql://...`)

---

## 🔐 Generating a Strong JWT_SECRET

### Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using Online Generator:
Visit: https://www.uuidgenerator.net/
Generate a new UUID and repeat twice or more for extra length

**Example JWT_SECRET:**
```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

---

## 🔑 Getting API Keys

### Google Gemini API Key
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Generative Language API"
4. Create API Key
5. Copy and paste into Render as `GEMINI_API_KEY`

### News API Key
1. Go to https://newsapi.org/
2. Sign up for free account
3. Copy your API key
4. Paste into Render as `NEWS_API_KEY`

---

## ✅ Deployment Checklist

### Before Deploying to Vercel:
- [ ] `frontend/vite.config.js` exists with proxy setup (for local dev)
- [ ] `frontend/vercel.json` exists
- [ ] `frontend/.env.example` shows: `VITE_API_URL=https://financial-advisor-web-application.onrender.com/api`
- [ ] Repository is connected to Vercel

### Before Deploying to Render:
- [ ] `backend/package.json` has no syntax errors (fixed: double comma)
- [ ] `backend/render.yaml` exists with proper configuration
- [ ] `backend/.env.example` shows production URLs
- [ ] All environment variables are ready
- [ ] Repository is connected to Render

### After Deploying Both:
- [ ] Visit frontend URL: https://financial-advisor-web-application.vercel.app/
- [ ] Check browser console (F12) for errors
- [ ] Test backend health: https://financial-advisor-web-application.onrender.com/api/health
- [ ] Try to register a new account
- [ ] Try to login
- [ ] Check Vercel and Render logs for any errors

---

## 🚀 Quick Command Reference

### Test Backend Locally:
```bash
cd backend
npm install
npm run dev
# Backend runs at http://localhost:5000
```

### Test Frontend Locally:
```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

### Validate Deployment:
```bash
cd backend
node deployment-validation.js
```

---

## 📞 Getting Help

If you encounter issues:

1. **Check Logs:**
   - Vercel: Deployments tab → Select deployment → View Logs
   - Render: Dashboard → Select service → Logs

2. **Common Issues:**
   - CORS Error: Check `CORS_ORIGIN` includes your Vercel URL
   - Can't reach backend: Check `VITE_API_URL` is correct and no trailing slash
   - Database error: Check `DATABASE_URL` and SSL settings

3. **Verify Services:**
   - Backend: https://financial-advisor-web-application.onrender.com/api/health
   - Frontend: https://financial-advisor-web-application.vercel.app/
