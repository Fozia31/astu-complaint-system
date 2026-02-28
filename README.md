# ASTU Complaint Management System

A full-stack web-based Complaint Management System developed for Adama Science and Technology University (ASTU).

---

## Project Overview

This system allows:
- Students to submit and track complaints
- Staff to manage assigned complaints
- Admin to manage users, categories, and system analytics

---

## System Roles

### Student
- Register / Login
- Create Complaint
- View My Complaints
- View Complaint Details
- Chat with Staff
- Update Profile

### Staff
- View Assigned Complaints
- Respond to Complaints
- Update Complaint Status
- View Dashboard Statistics
- Update Profile

### Admin
- View All Complaints
- Manage Users
- Manage Categories
- View Analytics Dashboard
- Update Profile

---

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Project Structure

astu-complaint-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── routes/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md

---

## API Endpoints

### Complaint Routes
POST   /api/complaints
GET    /api/complaints/my
GET    /api/complaints/:id
PUT    /api/complaints/:id/status
POST   /api/complaints/:id/message

### Auth Routes
POST   /api/auth/register
POST   /api/auth/login

---

## Installation Guide

### Clone Repository
git clone https://github.com/your-username/astu-complaint-system.git
cd astu-complaint-system

---

### Backend Setup
cd backend
npm install

Create .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run dev

---

### Frontend Setup
cd frontend
npm install
npm run dev

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

---

## Features

- Role-based Authentication
- Protected Routes
- Complaint Tracking System
- Admin Dashboard
- Category Management
- User Management
- Clean Institutional UI

---

## Security

- Password hashing (bcrypt)
- JWT Authentication
- Role-based Authorization

---

## Future Improvements

- Email Notifications
- File Upload Support
- Real-time Chat (WebSocket)
- AI-assisted Complaint Writing

---

## Developer

Fozia Damtew  
Software Engineering Student  
Adama Science and Technology University  
