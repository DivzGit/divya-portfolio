# 🚀 Deployment Guide - Divya's Portfolio

This guide covers different deployment options for your modern portfolio website.

## 📋 Pre-Deployment Checklist

- [ ] Update personal information in all components
- [ ] Add your own images to `frontend/public/images/`
- [ ] Configure email settings for contact form
- [ ] Test all features locally
- [ ] Update social media links
- [ ] Add your actual project links and GitHub repos

## 🌐 Frontend Deployment Options

### Option 1: Netlify (Recommended)

1. **Build the project:**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect your GitHub repository

3. **Configure redirects:**
Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

### Option 2: Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel --prod
```

### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
cd frontend
npm install --save-dev gh-pages
```

2. **Add to package.json:**
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

## 🔧 Backend Deployment Options

### Option 1: Railway (Recommended)

1. **Connect GitHub repo:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the backend folder

2. **Environment Variables:**
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.netlify.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=divyamailz19999@gmail.com
MONGODB_URI=your-mongodb-atlas-url
```

### Option 2: Heroku

1. **Install Heroku CLI**

2. **Create Heroku app:**
```bash
cd backend
heroku create your-portfolio-api
```

3. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-url.netlify.app
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
```

4. **Deploy:**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Option 3: DigitalOcean App Platform

1. **Create new app on DigitalOcean**
2. **Connect GitHub repository**
3. **Configure build settings:**
   - Build Command: `npm install`
   - Run Command: `npm start`
4. **Set environment variables**

## 💾 Database Options

### Option 1: MongoDB Atlas (Recommended)

1. **Create cluster at [mongodb.com](https://mongodb.com)**
2. **Get connection string**
3. **Update environment variables:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Option 2: Local MongoDB

For development only:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication**
2. **Generate App Password:**
   - Google Account → Security → 2-Step Verification → App Passwords
3. **Use app password in environment variables:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

## 🔒 Security Considerations

### Environment Variables
Never commit `.env` files to version control:
```bash
echo ".env" >> .gitignore
```

### CORS Configuration
Update backend CORS settings:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### Rate Limiting
Already configured in the backend to prevent abuse.

## 🎯 Performance Optimization

### Frontend Optimizations

1. **Image Optimization:**
   - Compress images using tools like TinyPNG
   - Use WebP format where possible
   - Add proper alt tags for SEO

2. **Code Splitting:**
   - Already implemented with React.lazy
   - Consider additional splitting for large components

3. **Bundle Analysis:**
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Backend Optimizations

1. **Compression:**
```bash
npm install compression
```

2. **Caching:**
```javascript
app.use(express.static('build', {
  maxAge: '1y',
  etag: false
}));
```

## 🐛 Troubleshooting Common Issues

### 1. CORS Errors
- Ensure backend CORS is configured for your frontend domain
- Check that both HTTP and HTTPS protocols are allowed

### 2. Environment Variables Not Working
- Verify variable names match exactly
- Restart servers after changes
- Check for typos in .env files

### 3. 3D Elements Not Loading
- Ensure WebGL is supported
- Check browser console for errors
- Consider fallbacks for older browsers

### 4. Contact Form Not Working
- Verify email credentials
- Check email provider settings
- Test with simple email services first

## 📊 Analytics & Monitoring

### Google Analytics
Add to `frontend/public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Error Monitoring
Consider integrating:
- Sentry for error tracking
- LogRocket for user session replay
- Hotjar for user behavior analytics

## 🚀 Final Steps

1. **Test everything in production environment**
2. **Set up domain name (optional)**
3. **Configure SSL certificates**
4. **Set up monitoring and alerts**
5. **Create backup strategy**
6. **Document any custom configurations**

## 📝 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Contact form sends emails
- [ ] 3D animations work on different devices
- [ ] Mobile responsiveness verified
- [ ] All links work correctly
- [ ] Analytics tracking active
- [ ] SEO meta tags configured
- [ ] Performance scores optimized

---

**Need help?** Check the main README.md or create an issue in the repository.

**Good luck with your deployment! 🚀**