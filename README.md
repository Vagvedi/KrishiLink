# KrishiLink - Agricultural Marketplace Platform

A modern React-based agricultural marketplace platform connecting farmers with buyers and distributors.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure login/signup with role-based access (Farmer, Buyer, Distributor)
- **Product Management**: Add, view, and manage agricultural products
- **State Management**: Global state management using React Context API
- **Theme System**: Dark/Light mode with localStorage persistence
- **Multi-language Support**: English and Hindi language toggle
- **Responsive Design**: Mobile-first responsive UI using Tailwind CSS

### Key Pages
- **Dashboard**: Real-time analytics and product overview
- **Add Product**: Form to add new agricultural products
- **Orders**: View and manage customer orders
- **Buyers**: Connect with verified buyers and distributors
- **Profile & Settings**: User preferences and theme management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KrishiLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LanguageToggle.jsx
│   ├── ProtectedRoute.jsx
│   ├── SettingsModal.jsx
│   └── BuyerProfileModal.jsx
├── contexts/           # React Context providers
│   ├── AuthContext.jsx
│   ├── LanguageContext.jsx
│   ├── ThemeContext.jsx
│   ├── ProductContext.jsx
│   └── AppDataContext.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── AddProduct.jsx
│   ├── Orders.jsx
│   └── Buyers.jsx
├── utils/              # Utility functions
│   └── translations.js
├── data/               # Static data
│   └── dummyData.js
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework with hooks
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context API** - State management

### Backend/Services
- **Supabase** - Authentication and database services
- **localStorage** - Client-side persistence for theme/language

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tailwind Configuration
- Dark mode configured with `darkMode: 'class'`
- Custom theme extensions in `tailwind.config.js`

## 📱 State Management

### Context Architecture
```
LanguageProvider
├── ThemeProvider
│   ├── AppDataProvider
│   │   ├── ProductProvider
│   │   │   └── AuthProvider
│   │   │       └── App Components
```

### Available Contexts
- **AuthContext**: User authentication and authorization
- **LanguageContext**: Multi-language support (EN/HI)
- **ThemeContext**: Dark/light mode management
- **ProductContext**: Global product state
- **AppDataContext**: Additional app-wide state

## 🎯 User Roles

### Farmer
- Add and manage products
- View orders and analytics
- Connect with buyers

### Buyer
- Browse agricultural products
- Place orders
- View order history

### Distributor
- Bulk purchasing capabilities
- Logistics management
- Supply chain coordination

## 🌐 Features Deep Dive

### Theme System
- **Toggle**: Instant dark/light mode switching
- **Persistence**: Theme preference saved in localStorage
- **Global**: Applied across all components via Context API
- **Tailwind**: Uses `dark:` prefix for dark mode styles

### Product Management
- **CRUD Operations**: Create, Read, Update, Delete products
- **Categories**: Grains, Vegetables, Fruits, Dairy, Others
- **Fields**: Name, Category, Price, Quantity, Description
- **State Persistence**: Products stored in global context

### Authentication Flow
1. **Login**: Email/password with Supabase auth
2. **Signup**: Role selection with email verification
3. **Protected Routes**: Authenticated access only
4. **Logout**: Clean session clearing and redirect

### Language Support
- **English**: Default language
- **Hindi**: Complete Hindi translations
- **Toggle**: Instant language switching
- **Persistence**: Language preference saved

## 🛠️ Development

### Available Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
}
```

### Development Workflow
1. **Start**: `npm run dev` for hot reload development
2. **Build**: `npm run build` for production bundle
3. **Preview**: `npm run preview` to test production build

## 📊 State Management Examples

### Using ProductContext
```jsx
import { useProductContext } from '../contexts/ProductContext'

function MyComponent() {
  const { products, addProduct, getProductsCount } = useProductContext()
  
  const handleAddProduct = (product) => {
    addProduct(product)
  }
  
  return <div>Total Products: {getProductsCount()}</div>
}
```

### Using ThemeContext
```jsx
import { useTheme } from '../contexts/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
```

## 🔒 Security Considerations

### Authentication
- Supabase handles password hashing
- JWT tokens for session management
- Protected routes prevent unauthorized access
- Input validation on all forms

### Data Protection
- No sensitive data in localStorage (except preferences)
- Environment variables for API keys
- HTTPS required for production

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Setup
- Set production environment variables
- Configure Supabase for production
- Update API endpoints if needed

### Hosting Options
- **Vercel**: Recommended for React apps
- **Netlify**: Static site hosting
- **AWS S3**: Custom hosting with CloudFront

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create** feature branch
3. **Follow** existing code style
4. **Test** thoroughly
5. **Submit** pull request

### Code Style
- **ESLint** configuration included
- **Prettier** for formatting
- **Component-based** architecture
- **Context** for shared state

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
- **White Screen**: Check console for JavaScript errors
- **Auth Issues**: Verify Supabase configuration
- **Theme Not Working**: Ensure Tailwind dark mode is configured
- **State Not Persisting**: Check Context provider hierarchy

### Debug Mode
Enable console logging for development:
- Theme changes: `ThemeContext - Applying theme`
- Product updates: `Adding product to global state`
- Auth events: `Auth - Login/Logout events`

## 📈 Future Enhancements

### Planned Features
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Multi-currency support
- [ ] Advanced user profiles

### Performance Optimizations
- [ ] Code splitting
- [ ] Image optimization
- [ ] Service workers
- [ ] Caching strategy

---

**KrishiLink** - Connecting Farmers to Markets, Digitally 🌾

Built with ❤️ using React, Tailwind CSS, and modern web technologies.
