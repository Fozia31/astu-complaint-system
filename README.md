# 🎓 ASTU Complaint Management System

A full-stack web-based Complaint Management System developed for **Adama Science and Technology University (ASTU)**.

This platform enables students to submit complaints, staff members to manage assigned cases, and administrators to monitor and control the entire system efficiently.

---

## 🌐 Overview

The ASTU Complaint Management System is designed to:

- Provide a structured and transparent complaint process
- Improve communication between students and staff
- Track complaint status in real-time
- Enable role-based system management
- Deliver a clean institutional user interface

---

## 👥 System Roles

### 👨‍🎓 Student
- Register & Login
- Submit new complaints
- View personal complaint history
- Track complaint status
- Chat with assigned staff
- Manage profile

### 👨‍🏫 Staff
- View assigned complaints
- Respond to student messages
- Update complaint status
- Access dashboard statistics
- Manage profile

### 👨‍💼 Admin
- View all system complaints
- Manage users (Student / Staff / Admin)
- Manage complaint categories
- Access analytics dashboard
- Monitor system activity

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (password hashing)

---

---

## 🔐 API Endpoints

### Complaint Routes


POST /api/complaints
GET /api/complaints/my
GET /api/complaints/:id
PUT /api/complaints/:id/status
POST /api/complaints/:id/message

### Authentication Routes
POST /api/auth/register
POST /api/auth/login


---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/astu-complaint-system.git
cd astu-complaint-system

### 2️⃣ Backend Setup

cd backend
npm install

create a .env file with the following content:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
port=5000
npm run dev
backend server should now be running on http://localhost:5000

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
frontend should now be running on http://localhost:5173

Design System

Institutional Deep Blue & Gold theme
Shared Navbar & Sidebar layout
Role-based dashboard interface
Consistent spacing and typography
Clean academic UI design

🔒 Security Features

Password hashing with bcrypt

JWT-based authentication

Role-based authorization middleware

Protected API routes

📊 Core Features

Role-based access control
Complaint status tracking
Staff-student conversation system
Admin analytics dashboard
Category management
User management

🚀 Future Improvements
Email notification system
File upload support
Real-time chat (WebSocket)
AI-assisted complaint writing
Advanced reporting system

👩‍💻 Developer

Fozia Damtew
Computer Science Student
Adama Science and Technology University

