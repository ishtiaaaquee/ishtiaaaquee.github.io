# Ishtiaque Ahmed - Professional Portfolio Website

A modern, responsive portfolio website showcasing professional experience, skills, education, and achievements.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Sections Include**:
  - Hero section with introduction
  - About Me
  - Work Experience timeline
  - Education cards
  - Skills with progress bars
  - Certifications
  - Leadership & Co-curricular activities
  - Contact form
  - Social media links

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript
- Font Awesome Icons

## Setup Instructions

1. **Add Your Profile Image**:
   - Place your profile photo in the `assets/images/` folder
   - Name it `profile.jpg` (or update the image path in `index.html`)

2. **Customize Content**:
   - Open `index.html` and update any personal information
   - Modify colors in `styles/main.css` by changing CSS variables at the top of the file

3. **Run Locally**:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using PHP
     php -S localhost:8000
     ```

4. **Deploy**:
   - You can deploy this website to:
     - GitHub Pages
     - Netlify
     - Vercel
     - Any web hosting service

## Customization

### Changing Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --primary-color: #4a5f7f;
    --secondary-color: #6b7fa8;
    --accent-color: #3498db;
    /* ... */
}
```

### Adding More Sections
Follow the existing section structure in `index.html` and add corresponding styles in `main.css`.

### Contact Form Integration
To make the contact form functional, integrate with:
- EmailJS
- Formspree
- Your own backend API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Contact

- **Email**: ishtiaqueue@gmail.com
- **Phone**: +880 1721346909
- **LinkedIn**: [linkedin.com/in/ishtiaque](https://www.linkedin.com/in/ishtiaque)
- **Location**: Dhaka, Bangladesh

---

Built with ❤️ by Ishtiaque Ahmed
