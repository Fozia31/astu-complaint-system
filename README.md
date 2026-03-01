# 🎓 ASTU Complaint Management System

A full-stack, role-based Complaint Management System developed for Adama Science and Technology University (ASTU).

This platform streamlines the complaint submission and resolution process by enabling structured communication between students, staff members, and administrators — now enhanced with an AI-powered assistant using Retrieval-Augmented Generation (RAG).

---

## 🌐 Overview

The ASTU Complaint Management System is designed to:

- Provide a structured and transparent complaint handling process
- Improve communication between students and university staff
- Track complaint status in real-time
- Enable role-based access control
- Deliver a clean institutional user interface
- Assist users with AI-powered complaint writing and guidance

---

## 👥 User Roles & Permissions

### 👨‍🎓 Student
- Register & Login securely
- Submit new complaints
- View personal complaint history
- Track complaint status in real-time
- Chat with assigned staff
- Use AI assistant to improve complaint clarity
- Manage personal profile

### 👨‍🏫 Staff
- View assigned complaints
- Respond to student messages
- Update complaint status
- Access dashboard statistics
- Manage profile

### 👨‍💼 Admin
- View and manage all complaints
- Manage users (Students / Staff / Admins)
- Manage complaint categories
- Access analytics dashboard
- Monitor system-wide activity

---

## 🤖 AI Assistant (RAG-Based)

The system includes an AI Assistant powered by Retrieval-Augmented Generation (RAG).

### 🔎 What It Does
- Helps students write clearer and more structured complaints
- Retrieves relevant university policies or similar past cases
- Provides intelligent suggestions before submission
- Improves complaint quality and processing efficiency

### ⚙️ How It Works
1. Retrieves relevant contextual data (policies, FAQs, previous complaints)
2. Sends context + user input to the LLM
3. Generates accurate, context-aware responses

### 🧠 Benefits
- Reduces incomplete or unclear complaints
- Speeds up complaint resolution
- Improves overall communication quality

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios

### 🖥️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)

### 🤖 AI Integration
- Retrieval-Augmented Generation (RAG)
- Vector-based document retrieval
- LLM-powered response generation

---

## 🔐 API Endpoints

### Complaint Routes
POST   /api/complaints  
GET    /api/complaints/my  
GET    /api/complaints/:id  
PUT    /api/complaints/:id/status  
POST   /api/complaints/:id/message  

### Authentication Routes
POST   /api/auth/register  
POST   /api/auth/login  

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository
git clone https://github.com/Fozia31/astu-complaint-system.git
cd astu-complaint-system  

---

### 2️⃣ Backend Setup
cd backend  
npm install  

Create a .env file:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key  
PORT=5000  

Run backend:
npm run dev  

Backend runs at:
http://localhost:5000  

---

### 3️⃣ Frontend Setup
cd frontend  
npm install  
npm run dev  

Frontend runs at:
http://localhost:5173  

---

## 🎨 Design System

- Institutional Deep Blue & Gold theme
- Shared Navbar & Sidebar layout
- Role-based dashboard interfaces
- Clean academic UI design
- Consistent spacing and typography

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization middleware
- Protected API routes
- Secure environment configuration

---

## 📊 Core Features

- Role-based access control
- Complaint lifecycle tracking
- Staff–student conversation system
- Admin analytics dashboard
- Category management
- User management
- AI-powered complaint assistant (RAG)
- Email notification system
- File upload support

---

## 👩‍💻 Developer

Fozia Damtew  
Computer Science Student  
Adama Science and Technology University
