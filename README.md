# 🚀 Divya's Modern Portfolio Website

A stunning, modern portfolio website featuring 3D animations, particle effects, and interactive elements. Built with React.js, Node.js, and cutting-edge web technologies.

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0a/00f5ff?text=Divya's+Portfolio)

## ✨ Features

### 🎨 Visual Effects
- **3D Interactive Backgrounds**: Three.js powered floating geometric shapes
- **Particle Systems**: Dynamic particle effects with user interaction
- **Neon Cyber Theme**: Dark theme with vibrant neon accents
- **Smooth Animations**: Framer Motion for fluid transitions
- **Glass Morphism UI**: Modern glass-effect components

### 🛠️ Technical Features
- **Full Stack Architecture**: React.js frontend + Node.js backend
- **Responsive Design**: Optimized for all devices
- **Contact Form**: Functional email integration
- **Performance Optimized**: Lazy loading and code splitting
- **SEO Friendly**: Proper meta tags and structure
- **Type Safety**: Modern JavaScript/TypeScript patterns

### 📱 Sections
- **Hero**: Interactive 3D text animations and typing effects
- **About**: Personal story with floating 3D elements
- **Skills**: Interactive skill bars with category filters
- **Projects**: Portfolio showcase with live demos
- **Experience**: Professional timeline with achievements
- **Contact**: Functional contact form with social links

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - for contact form storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Environment Setup**
```bash
# Create .env file in backend directory
cp .env.example .env

# Edit the .env file with your configurations:
# - MongoDB URI (optional)
# - Email credentials for contact form
# - Frontend URL
```

### 🏃‍♂️ Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will start on `http://localhost:3000`

#### Production Mode

1. **Build Frontend:**
```bash
cd frontend
npm run build
```

2. **Start Production Server:**
```bash
cd backend
NODE_ENV=production npm start
```

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React.js Frontend
│   ├── public/
│   │   ├── images/           # Profile and project images
│   │   └── fonts/            # 3D text fonts
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Hero/         # Hero section with 3D text
│   │   │   ├── About/        # About section
│   │   │   ├── Skills/       # Skills with animations
│   │   │   ├── Projects/     # Project showcase
│   │   │   ├── Experience/   # Professional timeline
│   │   │   ├── Contact/      # Contact form
│   │   │   ├── Navbar/       # Navigation
│   │   │   ├── ParticlesBackground/ # Particle effects
│   │   │   └── ThreeJSScene/        # 3D scene
│   │   ├── App.js            # Main app component
│   │   └── App.css           # Global styles
│   └── package.json
├── backend/                  # Node.js Backend
│   ├── routes/               # API routes
│   │   ├── contact.js        # Contact form handling
│   │   ├── projects.js       # Projects API
│   │   └── skills.js         # Skills API
│   ├── models/               # Database models
│   ├── server.js             # Express server
│   ├── .env.example          # Environment variables template
│   └── package.json
└── README.md
```

## 🎨 Customization

### 🎨 Colors & Theme
Edit `frontend/src/App.css` to customize the color scheme:
```css
:root {
  --primary-bg: #0a0a0a;
  --neon-cyan: #00f5ff;
  --neon-pink: #ff0080;
  --neon-purple: #8b00ff;
  --neon-green: #39ff14;
}
```

### 📝 Content
1. **Personal Info**: Update `Hero/Hero.js` with your name and role
2. **About Section**: Modify `About/About.js` with your story
3. **Skills**: Update skill arrays in `Skills/Skills.js`
4. **Projects**: Add your projects in `Projects/Projects.js`
5. **Experience**: Update work history in `Experience/Experience.js`

### 🖼️ Images
Add your images to `frontend/public/images/`:
- `profile.jpg` - Your profile picture
- `about-coding.jpg` - Coding setup image
- `project1.jpg`, `project2.jpg`, etc. - Project screenshots
- `company1.png`, `company2.png`, etc. - Company logos

## 🔧 Configuration

### Email Setup (Contact Form)
1. Create a Gmail app password
2. Update backend `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-email@gmail.com
```

### MongoDB Setup (Optional)
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Deployment
1. **Netlify/Vercel** (Frontend)
2. **Heroku/Railway** (Backend)
3. **MongoDB Atlas** (Database)

## 📱 Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Performance Tips
- Images are optimized and lazy-loaded
- 3D effects are reduced on mobile devices
- Particle count is adjusted based on device capability
- Components use React.memo for optimization

## 🐛 Troubleshooting

### Common Issues:

**1. 3D Elements Not Loading:**
- Check browser WebGL support
- Update graphics drivers
- Try different browser

**2. Contact Form Not Working:**
- Verify email credentials in .env
- Check backend server is running
- Ensure CORS is properly configured

**3. Slow Performance:**
- Reduce particle count in ParticlesBackground.js
- Disable 3D effects on low-end devices
- Check network tab for large assets

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

## 👨‍💻 Author
**Divya** - Software Engineer
- Email: divyamailz19999@gmail.com
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments
- Three.js for 3D graphics
- Framer Motion for animations
- Particles.js for particle effects
- React ecosystem for amazing tools

---

⭐ **If you found this project helpful, please give it a star!** ⭐