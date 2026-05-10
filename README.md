

# 🌾 KrishiLink

**Connecting Farmers to Markets, Digitally**


*A modern agricultural marketplace platform empowering farmers with direct market access through technology.*



---

## 🎯 About

KrishiLink is a revolutionary agricultural marketplace platform that bridges the gap between farmers and buyers. Built with modern web technologies, it provides a seamless experience for farmers to showcase their products and connect directly with buyers, eliminating traditional supply chain inefficiencies.

### 🌟 Why KrishiLink?

- **🤝 Direct Connection**: Farmers connect directly with buyers, cutting out middlemen
- **📱 Mobile-First**: Responsive design works seamlessly on all devices
- **🌍 Multi-Language**: Support for English and Hindi languages
- **🔒 Secure**: Role-based authentication with Supabase
- **🎨 Beautiful UI**: Modern, intuitive interface with Tailwind CSS

---

## ✨ Features

### 🏠 Core Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure login/signup with role-based access (Farmer, Buyer, Admin) |
| 📦 **Product Management** | Add, edit, and manage agricultural products with ease |
| 📊 **Dashboard Analytics** | Real-time insights and product performance metrics |
| 🛒 **Marketplace** | Browse and discover products from verified farmers |
| 📱 **Responsive Design** | Optimized for mobile, tablet, and desktop experiences |
| 🌙 **Theme System** | Dark/Light mode with localStorage persistence |
| 🌐 **Multi-Language** | English and Hindi language support |
| 📧 **Order Management** | Track and manage customer orders efficiently |

### 🎨 User Experience

- **Intuitive Navigation**: Clean, user-friendly interface
- **Real-time Updates**: Live data synchronization
- **Offline Support**: Basic functionality works offline
- **Fast Performance**: Optimized for speed and efficiency

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)

### Backend & Database
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat-square&logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat-square&logo=postcss&logoColor=white)
![Autoprefixer](https://img.shields.io/badge/Autoprefixer-DD3735?style=flat-square&logo=autoprefixer&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/krishilink.git
cd krishilink

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start the development server
npm run dev
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Run the SQL from `database-schema.sql` in your Supabase SQL Editor
3. Update your environment variables with your project credentials

---

## 📖 Usage

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### User Roles

| Role | Permissions |
|------|-------------|
| 👨‍🌾 **Farmer** | Add products, manage inventory, view orders |
| 🛒 **Buyer** | Browse products, place orders, view purchase history |
| 👑 **Admin** | Manage users, view all orders, system administration |

### Key Features

1. **Authentication**: Secure login/signup with email verification
2. **Product Management**: Add products with images, descriptions, and pricing
3. **Order Tracking**: Real-time order status updates
4. **Multi-language**: Switch between English and Hindi
5. **Theme Toggle**: Dark and light mode support

---

## 📁 Project Structure

```
krishilink/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📄 BottomNav.jsx
│   │   ├── 📄 LanguageToggle.jsx
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 ProtectedRoute.jsx
│   │   └── 📄 SettingsModal.jsx
│   ├── 📁 contexts/           # React Context providers
│   │   ├── 📄 AppDataContext.jsx
│   │   ├── 📄 AuthContext.jsx
│   │   ├── 📄 LanguageContext.jsx
│   │   ├── 📄 ProductContext.jsx
│   │   └── 📄 ThemeContext.jsx
│   ├── 📁 pages/              # Page components
│   │   ├── 📄 AddProduct.jsx
│   │   ├── 📄 Buyers.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 Orders.jsx
│   │   ├── 📄 Profile.jsx
│   │   ├── 📄 Signup.jsx
│   │   └── 📄 Unauthorized.jsx
│   ├── 📁 services/           # External services
│   │   └── 📄 supabase.js
│   ├── 📁 utils/              # Utility functions
│   │   └── 📄 translations.js
│   ├── 📄 App.jsx             # Main App component
│   ├── 📄 main.jsx            # Application entry point
│   └── 📄 index.css           # Global styles
├── 📄 database-schema.sql     # Database schema
├── 📄 package.json           # Dependencies and scripts
├── 📄 tailwind.config.js     # Tailwind configuration
├── 📄 vite.config.js         # Vite configuration
└── 📄 README.md              # This file
```

---

## 🎨 Components Overview

### Authentication System
- **Login/Signup**: Secure authentication with role-based access
- **Protected Routes**: Route guards for different user roles
- **Session Management**: Persistent login state

### Product Management
- **Add Product**: Form for adding new agricultural products
- **Product Listings**: Grid view with filtering and search
- **Product Details**: Detailed product information

### User Interface
- **Responsive Navigation**: Mobile-friendly navigation menu
- **Theme System**: Dark/light mode toggle
- **Language Support**: Multi-language interface

---

## 🔧 Configuration

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configurations:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#3B82F6',
      },
    },
  },
  plugins: [],
}
```

### Supabase Setup

1. **Create Project**: Sign up at [Supabase](https://supabase.com)
2. **Database Schema**: Run the provided SQL schema
3. **Environment Variables**: Configure your credentials
4. **RLS Policies**: Row Level Security is pre-configured

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- 🎯 Follow the existing code style
- 📝 Write clear commit messages
- 🧪 Test your changes thoroughly
- 📖 Update documentation as needed
- 🤝 Be respectful and constructive

### Code Standards

- Use **ESLint** for code linting
- Follow **React** best practices
- Write **semantic** HTML
- Use **Tailwind CSS** for styling
- Keep components **small and focused**

---

## 📝 API Reference

### Authentication Endpoints

```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})
```

### Database Operations

```javascript
// Insert Product
const { data, error } = await supabase
  .from('products')
  .insert([{ name: 'Product Name', price: 100 }])

// Get Products
const { data, error } = await supabase
  .from('products')
  .select('*')
```

---

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking (if using TypeScript)
npm run type-check

# Build test
npm run build
```

---

## 📈 Performance

- ⚡ **Fast Loading**: Optimized bundle size
- 🎯 **SEO Friendly**: Meta tags and semantic HTML
- 📱 **Mobile Optimized**: Responsive design
- 🔄 **Lazy Loading**: Components load as needed

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables

Set these in your deployment platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Check environment variables
   - Verify Supabase project URL and keys

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Supabase** - For the excellent backend-as-a-service
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the fast build tool

---



**Made with ❤️ for farmers everywhere**

[🔝 Back to Top](#-krishilink)




  
    





