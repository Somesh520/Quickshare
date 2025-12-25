# Deployment Guide for Quickshare

Follow these steps to deploy your full-stack application.

## 1. Push to GitHub
Make sure your code is pushed to a GitHub repository. Vercel and Netlify both pull directly from GitHub.

## 2. Deploy Backend (Vercel)
1.  Go to [Vercel](https://vercel.com) and **Add New Project**.
2.  Import your `Quickshare` repository.
3.  **Root Directory**: Click "Edit" and select `Quickshare` (the root folder where `server.js` is).
4.  **Environment Variables**: Add the following (from your `.env` file):
    *   `MONGO_URL`
    *   `CLOUDINARY_CLOUD_NAME`
    *   `CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_SECRET`
    *   `CLIENT_URL`: The URL of your Netlify frontend (e.g., `https://sharequick.netlify.app`). **CRITICAL for generating correct share links.**
5.  Click **Deploy**.
6.  Once deployed, copy the **Vercel Domain** (e.g., `https://quickshare-backend.vercel.app`).

## 3. Deploy Frontend (Netlify)
1.  Go to [Netlify](https://netlify.com) and **Add new site** -> **Import from Git**.
2.  Access your `Quickshare` repository.
3.  **Base directory**: `frontend`
4.  **Build command**: `npm run build`
5.  **Publish directory**: `dist`
6.  **Environment Variables** (Advanced settings):
    *   Key: `VITE_API_URL`
    *   Value: `https://your-vercel-backend-url.vercel.app` (The URL you copied in Step 2). **IMPORTANT:** Do NOT add a trailing slash.
7.  Click **Deploy site**.

## 4. Final Connection
1.  Go back to your **Vercel** project settings.
2.  We added CORS support, but you might need to update the `origin` array in `server.js` if you face issues, or simply allow all origins `*` temporarily if debugging.
    *   *Note: I've set it to `http://localhost:5173` and `https://quickshare-frontend.netlify.app` roughly, but you should update `server.js` with your EXACT Netlify URL once you have it.*
3.  Redeploy Vercel if you changed `server.js`.

## 5. SEO & Google
1.  I have already added **Meta Tags** (Description, Keywords) to your `index.html`.
2.  Once deployed, verify your site on **Google Search Console** to get listed faster.
