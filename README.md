# 🤖 PortfolioAI - AI-Powered Developer Portfolio Generator

A premium SaaS-style web application that instantly generates professional developer portfolios with modern design, smooth animations, and multiple themes.

## ✨ Features

### 🎨 Design & Themes
- **3 Professional Themes**: Dark, Light, and Cyberpunk
- **Glassmorphism Effects**: Modern frosted glass aesthetic
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Gradient Backgrounds**: Beautiful gradient color schemes
- **Responsive Layout**: Works perfectly on desktop and mobile

### 📝 Form Management
- **9 Input Fields**: Full name, title, about, skills, projects, social links
- **Real-time Validation**: Instant feedback on form inputs
- **Skill Management**: Add/remove skills with animated tags
- **Project Management**: Add multiple projects with modal dialog
- **Character Counters**: Track input limits

### 🖼️ Portfolio Sections
- **Hero Section**: Animated profile image with name and title
- **About Section**: Professional biography with gradient text
- **Skills Section**: Grid layout with hover effects
- **Projects Section**: Card-based project showcase
- **Contact Section**: Social links with interactive buttons

### 📥 Export Options
- **Download HTML**: Get standalone portfolio file
- **Copy Code**: Copy entire HTML to clipboard
- **View Code**: See generated HTML code with syntax highlighting
- **Share Ready**: Pre-formatted for easy sharing

### 🎯 Additional Features
- **Live Preview**: See changes in real-time
- **Tab System**: Preview/Code/Download tabs
- **Toast Notifications**: User feedback messages
- **Loading Screen**: Professional loading animation
- **Theme Persistence**: Saves user's theme preference
- **Sticky Navigation**: Easy access to controls
- **Mobile Optimized**: Fully responsive design

## 🚀 Quick Start

### Installation
1. Clone the repository:
```bash
git clone https://github.com/UjwalAnandpro/portfolio-generator.git
cd portfolio-generator
```

2. Open in browser:
```bash
# Simply open index.html in your web browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Usage
1. **Fill in Your Details**: Enter your information in the left sidebar
2. **Add Skills**: Type a skill and click the plus button
3. **Add Projects**: Click "Add Project" and fill in project details
4. **Select Template**: Choose between Modern, Minimalist, or Startup
5. **Toggle Theme**: Use the moon icon to switch themes
6. **Generate Portfolio**: Click "Generate Portfolio" button
7. **Preview & Export**: View, copy code, or download your portfolio

## 📁 File Structure

```
portfolio-generator/
├── index.html       # Main HTML structure
├── styles.css       # Complete CSS with themes
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## 🎨 Theme System

### Dark Theme (Default)
- Professional dark background
- Purple and indigo gradient accents
- Perfect for night viewing

### Light Theme
- Clean white background
- Vibrant purple accents
- Great for daytime viewing

### Cyberpunk Theme
- Neon cyan and magenta colors
- Glowing text shadows
- Futuristic aesthetic

## 🔧 Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables
- **Vanilla JavaScript**: No dependencies
- **Font Awesome**: Icon library
- **Unsplash API**: Default images

## 💾 Data Management

### State Structure
```javascript
state = {
    portfolio: {
        fullName,
        title,
        aboutMe,
        email,
        github,
        linkedin,
        profileImage,
        skills: [],
        projects: [],
        template: 'modern'
    },
    currentTheme: 'dark'
}
```

### Local Storage
- Theme preference is saved to localStorage
- Portfolio data is maintained in memory during session

## 🎯 Features Breakdown

### Form Features
- ✅ Full validation
- ✅ Character counters
- ✅ Real-time updates
- ✅ Skill management
- ✅ Project modal

### Preview Features
- ✅ Live updates
- ✅ Multiple themes
- ✅ Template selection
- ✅ Code highlighting
- ✅ Download option

### UX Features
- ✅ Loading screen
- ✅ Toast notifications
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Mobile responsive

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above (2-column layout)
- **Tablet**: 768px - 1199px (responsive grid)
- **Mobile**: Below 768px (stacked layout)
- **Small Mobile**: Below 480px (optimized spacing)

## 🎨 Color Palette

### Dark Theme
- Primary: `#6366f1` (Indigo)
- Secondary: `#a855f7` (Purple)
- Background: `#0f172a` (Dark Blue)
- Text: `#f1f5f9` (Light Gray)

### Light Theme
- Primary: `#6366f1` (Indigo)
- Secondary: `#a855f7` (Purple)
- Background: `#ffffff` (White)
- Text: `#0f172a` (Dark Blue)

### Cyberpunk Theme
- Primary: `#00ffff` (Cyan)
- Secondary: `#ff00ff` (Magenta)
- Background: `#0a0e27` (Deep Blue)
- Text: `#00ffff` (Cyan)

## 🎬 Animations

- **Spin**: Loading screen spinner
- **Float**: Hero image floating effect
- **PopIn**: Skill tags appearing
- **SlideInLeft**: Project items entering
- **SlideInRight**: Toast notifications
- **FadeIn**: Tab content transitions
- **SlideInUp**: Modal entrance

## 📊 Sample Data

The application comes pre-populated with sample data:
- **Name**: Sarah Anderson
- **Title**: Full Stack Developer & AI Enthusiast
- **Skills**: React, Node.js, JavaScript, TypeScript, Python, PostgreSQL, AWS, Docker
- **Projects**: 3 sample projects with descriptions and images

## 🔐 Security Considerations

- No data is stored on external servers
- All processing happens client-side
- HTML sanitization for user inputs
- CORS-safe external resources

## 🌟 Premium Features Included

✅ Professional UI/UX  
✅ Dark mode toggle  
✅ Theme persistence  
✅ Toast notifications  
✅ Loading animations  
✅ Responsive design  
✅ Code generation  
✅ HTML export  
✅ Real-time preview  
✅ Modal dialogs  

## 📈 Future Enhancements

- [ ] Share via URL
- [ ] Template library
- [ ] Custom domain deployment
- [ ] Portfolio analytics
- [ ] Cloud storage sync
- [ ] Social media preview
- [ ] PDF export
- [ ] AI content suggestions

## 🐛 Known Issues

None currently. Please report issues on GitHub.

## 📝 License

MIT License - Feel free to use for personal and commercial projects.

## 👨‍💻 Author

Created with ❤️ as a premium SaaS product demonstration.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS practices (variables, gradients, flexbox, grid)
- JavaScript state management
- Event handling and DOM manipulation
- File generation and download
- Clipboard API usage
- LocalStorage API
- Responsive web design
- UI/UX best practices

---

**Made with ❤️ for developers | 2026**

Live Demo: https://github.com/UjwalAnandpro/portfolio-generator