# 🎓 ASTU Complaint Management System

<p align="center">
  <b>A Full-Stack Role-Based Complaint Management Platform</b><br>
  Developed for <b>Adama Science and Technology University (ASTU)</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-RAG-purple?style=for-the-badge" />
</p>

---

## 🌟 Project Overview

The **ASTU Complaint Management System** is a modern web-based platform designed to optimize the complaint handling process within the university.  

It ensures transparency, structured communication, and efficient case resolution — enhanced with an **AI-powered Assistant using Retrieval-Augmented Generation (RAG)**.

---

# ✨ Why This Project?

✅ Structured & transparent complaint workflow  
✅ Real-time status tracking  
✅ Secure role-based access control  
✅ Smart AI-assisted complaint writing  
✅ Clean institutional UI design  

---

# 👥 User Roles

### 👨‍🎓 Student
- Secure registration & login  
- Submit complaints  
- Track complaint status  
- View complaint history  
- Chat with assigned staff  
- AI-powered complaint improvement  
- Profile management  

### 👨‍🏫 Staff
- View assigned complaints  
- Respond to students  
- Update complaint status  
- Access dashboard analytics  
- Profile management  

### 👨‍💼 Admin
- Monitor all system complaints  
- Manage users (Student / Staff / Admin)  
- Manage complaint categories  
- Access system analytics  
- Monitor platform activity  

---

# 🤖 AI Assistant (RAG-Based)

### 🧠 Intelligent Complaint Support
The system integrates an AI assistant built with **Retrieval-Augmented Generation (RAG)**.

### 🔎 Capabilities
- Improves complaint clarity and structure  
- Retrieves relevant university policies  
- Suggests better wording before submission  
- Reduces incomplete or unclear cases  

### ⚙️ How It Works
1. Retrieves relevant documents (policies, FAQs, similar complaints)  
2. Combines retrieved context with user input  
3. Generates context-aware responses using an LLM  

---

# 🛠️ Technology Stack

## 🎨 Frontend
- React.js (Vite)  
- Tailwind CSS  
- React Router  
- Axios  

## 🖥️ Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- bcrypt (Password Hashing)  

## 🤖 AI Layer
- Retrieval-Augmented Generation (RAG)  
- Vector-based document retrieval  
- LLM-powered response generation  

---

# 🔐 Security Features

- 🔒 Password hashing with bcrypt  
- 🔑 JWT-based authentication  
- 🛡️ Role-based authorization middleware  
- 🚫 Protected API routes  
- 🔐 Secure environment configuration  

---

# 📊 Core Features

- Complaint lifecycle tracking  
- Staff–student messaging system  
- Admin analytics dashboard  
- Category management  
- User management  
- AI-powered complaint assistant  
- Email notification system  
- File upload support  

---

# ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Fozia31/astu-complaint-system.git
cd astu-complaint-system

2️⃣ Backend Setup
cd backend
npm install

Create .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

Run backend:
npm run dev
Backend → http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend → http://localhost:5173

🎨 Design System

🎓 Institutional Deep Blue & Gold theme
📐 Shared Navbar & Sidebar layout
📊 Role-based dashboards
✨ Clean academic interface
📏 Consistent spacing & typography

