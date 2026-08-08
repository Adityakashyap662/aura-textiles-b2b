# 🏭 Aura Textiles B2B Wholesale Platform

India's Premier B2B Manufacturing & Export Hub Web Application, Admin Portal, and Backend Server for Silk Sarees, Lehenga Cholis, and Ethnic Wear.

---

## 📁 Repository Structure & Developer Guide

The codebase is organized cleanly into decoupled modules for easy understanding, development, and deployment:

```
├── web/                    # 🌐 FRONTEND WEB APPLICATION (Vite + React)
│   ├── src/
│   │   ├── App.jsx         # 🛍️ Storefront Web App (Catalogs, Noida Hub, Cart, Checkout)
│   │   ├── AdminApp.jsx    # 🔐 Admin Control Center (Products, Orders, Noida Hub Editor, Analysis, Revenue)
│   │   ├── admin.jsx       # Admin React Entry Point
│   │   ├── main.jsx        # Storefront React Entry Point
│   │   └── utils/
│   │       └── api.js      # Centralized REST API Service Client
│   ├── index.html          # Storefront HTML Shell
│   ├── admin.html          # Admin Panel HTML Shell
│   ├── vite.config.js      # Vite Multi-Page Build Configuration
│   └── package.json        # Frontend Dependencies
│
├── server/                 # ⚙️ BACKEND REST API SERVER (Node.js + Express)
│   ├── index.js            # Main REST API Express Application & Endpoints
│   ├── memoryDb.js         # Hybrid In-Memory & File Store Fallback Engine
│   ├── models.js           # Mongoose Data Schemas (Catalogs, Orders, Users, Content)
│   ├── seed.js             # Initial Database Seeder
│   └── package.json        # Backend Dependencies
│
├── app.js                  # 🚀 CloudPanel / Hostinger Production Server Entry Point
├── deploy.sh               # 📦 Automated Production Build & Deployment Script
└── README.md               # 📖 Developer Documentation
```

---

## 🛠️ Environment Configuration (.env)

Create a `.env` file in the `server/` directory:

```env
PORT=5050
MONGODB_URI=mongodb://127.0.0.1:27017/aura_textiles_b2b
NODE_ENV=production
JWT_SECRET=aura_textiles_secret_key_2026
```

---

## 💻 Local Development Setup

### 1. Start Backend API Server
```bash
cd server
npm install
node index.js
# Backend API runs live on http://localhost:5050 (or port 3000)
```

### 2. Start Frontend Web Application
```bash
cd web
npm install
npm run dev
# Frontend runs live on http://localhost:5173
```

- **Storefront Website**: `http://localhost:5173/`
- **Admin Management Portal**: `http://localhost:5173/admin.html`

---

## 🚀 Building & Deploying for Hostinger / CloudPanel

### Step 1: Build Production Assets
```bash
cd web
npm run build
```

### Step 2: CloudPanel / Hostinger Web App Settings
- **App Port**: `3000` (or `5050`)
- **Entry Point / Script**: `app.js`
- **Root Directory**: `htdocs/wholesaletshirt.org`

---

## 👨‍💻 Developer Credentials & Contacts
- **Main Developer Account**: `rajnikant.suman07@gmail.com`
- **Admin Panel Default Credentials**: Username: `admin` | Password: `password`
