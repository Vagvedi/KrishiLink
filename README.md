# 🌾 KrishiLink

<div align="center">

# 🌱 Connecting Farmers to Markets, Digitally

### Empowering Farmers • Enabling Buyers • Transforming Agriculture

<img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite" />
<img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css" />

### 🚀 A Modern Agricultural Marketplace Platform Bridging the Gap Between Farmers and Buyers

**Direct Market Access • Transparent Pricing • Secure Transactions • Digital Agriculture**

</div>

---

# 📖 Table of Contents

* About KrishiLink
* Problem Statement
* Solution
* Key Features
* Technology Stack
* System Architecture
* User Roles
* Farmer Workflow
* Buyer Workflow
* Project Structure
* Database Design
* Security Features
* Dashboard Analytics
* Multi-Language Support
* Installation Guide
* Environment Setup
* Usage
* Performance Optimizations
* Deployment
* Future Roadmap
* Social Impact
* Contributing
* Developer
* License

---

# 🌟 About KrishiLink

KrishiLink is a modern agricultural marketplace platform developed to digitally connect farmers and buyers through a secure, scalable, and user-friendly ecosystem.

The platform removes unnecessary intermediaries and enables farmers to directly showcase their products, manage inventory, receive orders, and increase profitability while giving buyers access to fresh agricultural produce at transparent prices.

KrishiLink leverages modern web technologies including React, Supabase, PostgreSQL, and Tailwind CSS to deliver a fast, responsive, and reliable experience across devices.

---

# 🚨 Problem Statement

Agriculture remains one of the most important sectors worldwide, yet farmers continue to face multiple challenges in accessing fair markets.

### Current Challenges

* Dependence on middlemen reduces farmer profits.
* Limited market exposure for small farmers.
* Inefficient communication between buyers and sellers.
* Lack of transparent pricing mechanisms.
* Difficult inventory and order management.
* Language barriers in technology adoption.
* Limited access to digital marketplaces.

These challenges create inefficiencies in the agricultural supply chain, ultimately affecting both farmers and consumers.

---

# 💡 Our Solution

KrishiLink provides a digital marketplace where farmers can directly connect with buyers and manage their agricultural products efficiently.

### Benefits

✅ Direct Farmer-to-Buyer Communication

✅ Increased Farmer Profitability

✅ Transparent Pricing

✅ Digital Product Management

✅ Secure Authentication

✅ Mobile-Friendly Platform

✅ Real-Time Order Tracking

✅ Multi-Language Accessibility

✅ Modern User Experience

---

# ✨ Core Features

## 🔐 Authentication & Authorization

* Secure User Registration
* Login & Logout Functionality
* Role-Based Access Control
* Session Persistence
* Protected Routes
* Email Verification

### Supported Roles

| Role         | Permissions                                      |
| ------------ | ------------------------------------------------ |
| 👨‍🌾 Farmer | Add Products, Manage Inventory, View Orders      |
| 🛒 Buyer     | Browse Products, Purchase Products, Track Orders |
| 👑 Admin     | Manage Users, Orders and Platform Operations     |

---

## 📦 Product Management

### Farmers Can

* Add New Products
* Upload Product Images
* Set Pricing
* Update Inventory
* Edit Product Details
* Remove Products
* Monitor Product Performance

---

## 🛒 Marketplace

### Buyers Can

* Browse Products
* Search Agricultural Goods
* View Product Information
* Compare Products
* Place Orders
* Track Order Status

---

## 📊 Dashboard Analytics

Real-time analytics provide insights into:

* Total Products
* Active Listings
* Order Statistics
* Revenue Tracking
* Product Performance
* Inventory Status

---

## 🌐 Multi-Language Support

Supported Languages:

* 🇬🇧 English
* 🇮🇳 Hindi

Planned Languages:

* Telugu
* Tamil
* Kannada
* Marathi
* Bengali

---

## 🌙 Theme System

KrishiLink includes:

* Light Mode
* Dark Mode
* Local Storage Persistence
* Smooth Theme Switching

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose        |
| ------------ | -------------- |
| React.js     | UI Development |
| React Router | Routing        |
| Tailwind CSS | Styling        |
| Vite         | Build Tool     |

## Backend

| Technology    | Purpose          |
| ------------- | ---------------- |
| Supabase      | Backend Services |
| PostgreSQL    | Database         |
| Supabase Auth | Authentication   |

## Development Tools

| Tool         | Purpose               |
| ------------ | --------------------- |
| ESLint       | Code Quality          |
| PostCSS      | CSS Processing        |
| Autoprefixer | Browser Compatibility |

---

# 🏗️ System Architecture

```text
┌────────────────────────────┐
│        React Frontend      │
│  UI Components & Routing   │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│         Supabase           │
│ Authentication + APIs      │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      PostgreSQL DB         │
│ Products • Users • Orders  │
└────────────────────────────┘
```

---

# 👨‍🌾 Farmer Workflow

```text
Register/Login
      │
      ▼
Access Dashboard
      │
      ▼
Add Agricultural Products
      │
      ▼
Manage Inventory
      │
      ▼
Receive Orders
      │
      ▼
Track Sales
      │
      ▼
Generate Revenue
```

---

# 🛒 Buyer Workflow

```text
Register/Login
      │
      ▼
Browse Marketplace
      │
      ▼
Search Products
      │
      ▼
View Product Details
      │
      ▼
Place Orders
      │
      ▼
Track Order Status
      │
      ▼
Receive Products
```

---

# 📂 Project Structure

```bash
krishilink/
│
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── database-schema.sql
├── package.json
├── vite.config.js
├── tailwind.config.js
├── README.md
└── .env.local
```

---

# 🗄️ Database Design

## Users Table

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | TEXT      |
| email      | TEXT      |
| role       | TEXT      |
| created_at | TIMESTAMP |

---

## Products Table

| Column       | Type    |
| ------------ | ------- |
| id           | UUID    |
| farmer_id    | UUID    |
| product_name | TEXT    |
| description  | TEXT    |
| price        | NUMERIC |
| quantity     | INTEGER |
| image_url    | TEXT    |

---

## Orders Table

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| buyer_id   | UUID      |
| product_id | UUID      |
| quantity   | INTEGER   |
| status     | TEXT      |
| created_at | TIMESTAMP |

---

# 🔒 Security Features

## Authentication Security

* Supabase Authentication
* Password Encryption
* Secure Sessions
* Email Verification
* Persistent Login State

## Authorization

Role-Based Access Control (RBAC)

```text
Farmer → Product Management

Buyer → Product Purchasing

Admin → Complete System Access
```

## Database Security

* Row Level Security (RLS)
* Protected API Access
* Secure Environment Variables
* Access Restrictions by User Role

---

# 📸 Screenshots

## Landing Page

```markdown
![Landing Page](screenshots/home.png)
```

## Dashboard

```markdown
![Dashboard](screenshots/dashboard.png)
```

## Marketplace

```markdown
![Marketplace](screenshots/marketplace.png)
```

## Orders Page

```markdown
![Orders](screenshots/orders.png)
```

## Mobile View

```markdown
![Mobile](screenshots/mobile.png)
```

---

# 🚀 Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/krishilink.git
cd krishilink
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create:

```bash
.env.local
```

Add:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Start Development Server

```bash
npm run dev
```

Application will run at:

```text
http://localhost:5173
```

---

# ⚙️ Environment Setup

## Supabase Configuration

1. Create Supabase Project
2. Copy Project URL
3. Copy Anon Key
4. Configure Environment Variables
5. Run SQL Schema
6. Enable Row Level Security

---

# 📖 Usage

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Lint Code

```bash
npm run lint
```

---

# ⚡ Performance Optimizations

### Frontend

* Vite Fast Build System
* Optimized Components
* React Context API
* Efficient Routing

### Backend

* PostgreSQL Indexing
* Optimized Database Queries
* Supabase Data Handling

### User Experience

* Responsive Design
* Fast Page Loads
* Lightweight Components
* Smooth Navigation

---

# 📈 Future Roadmap

## Phase 1

* Product Ratings
* Product Reviews
* Advanced Search Filters

## Phase 2

* Real-Time Messaging
* Farmer-Buyer Chat System
* Push Notifications

## Phase 3

* AI Price Prediction
* Smart Crop Recommendations
* Weather Forecast Integration

## Phase 4

* Online Payment Gateway
* Logistics Tracking
* Delivery Management

## Phase 5

* Android Application
* iOS Application
* AI Voice Assistant
* Regional Language Expansion

---

# 🌍 Social Impact

KrishiLink aligns with several Sustainable Development Goals (SDGs):

### 🌱 Zero Hunger

Improving food accessibility through efficient supply chains.

### 💼 Economic Growth

Increasing income opportunities for farmers.

### 🏭 Innovation & Infrastructure

Encouraging agricultural digitalization.

### 🌍 Reduced Inequalities

Providing equal market opportunities for small-scale farmers.

---

# 🎯 Why KrishiLink Stands Out

Unlike generic e-commerce systems, KrishiLink is specifically designed for agriculture.

### Unique Selling Points

✅ Farmer-Centric Design

✅ Direct Market Access

✅ Transparent Pricing

✅ Role-Based Marketplace

✅ Multi-Language Support

✅ Secure Authentication

✅ Mobile-First Architecture

✅ Scalable Backend Infrastructure

✅ Future AI Integration

---

# 🤝 Contributing

Contributions are welcome.

## Steps

```bash
Fork Repository

Create Feature Branch

Commit Changes

Push Branch

Open Pull Request
```

### Contribution Guidelines

* Follow coding standards
* Maintain documentation
* Write meaningful commits
* Test before submitting

---

# 🧪 Testing

Run Linting

```bash
npm run lint
```

Build Test

```bash
npm run build
```

---

# 🚀 Deployment

## Vercel Deployment

```bash
npm i -g vercel

vercel --prod
```

### Required Environment Variables

```env
VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY
```

---

# 👨‍💻 Developer

## Bala Raju

### Full Stack Developer

Passionate About:

* Web Development
* Data Analytics
* Cloud Technologies
* Agricultural Innovation
* Software Engineering

### Connect With Me

```text
GitHub   : https://github.com/yourusername

LinkedIn : https://linkedin.com/in/yourprofile

Email    : yourmail@example.com
```

---

# 📄 License

This project is licensed under the ISC License.

---

# 🙏 Acknowledgements

Special thanks to:

* React Team
* Supabase Team
* Tailwind CSS Team
* Vite Team
* Open Source Community

for building incredible technologies that made this project possible.

---

<div align="center">

## 🌾 KrishiLink

### Empowering Farmers Through Technology

### Connecting Agriculture with Digital Innovation

⭐ If you like this project, don't forget to Star the Repository ⭐

Made with ❤️ for Farmers Everywhere

</div>
