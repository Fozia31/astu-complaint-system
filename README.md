🎓 ASTU Complaint Management System
<p align="center"> 🏫 Developed for <b>Adama Science and Technology University (ASTU)</b><br> 💬 A Modern Web-Based Complaint Handling Platform </p>
📌 About The Project

The ASTU Complaint Management System is a secure, role-based web application that allows students and staff to submit, track, and manage complaints efficiently.

It enhances:

🔍 Transparency

⚡ Efficiency

📢 Communication

🛡 Accountability

✨ Key Features
👤 User Features

📝 Submit complaints online

📊 Track complaint status

🔐 Secure login & registration

📂 View complaint history

🛠 Admin Features

📋 View all submitted complaints

🔄 Update complaint status

👥 Manage users

📈 Dashboard overview

🧰 Tech Stack
🎨 Frontend

⚛ React.js

📡 Axios

🎨 Bootstrap / Tailwind CSS

🖥 Backend

🟢 Node.js

🚀 Express.js

🍃 MongoDB

🗄 Mongoose

🔑 JWT Authentication

🌱 dotenv

📁 Project Structure
astu-complaint-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   └── public/
│
└── README.md
⚙️ Installation & Setup Guide
🔹 1️⃣ Clone the Repository
git clone <your-repository-url>
cd astu-complaint-system
🔹 2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/astu-complaint
JWT_SECRET=your_secret_key

Start backend server:

npm start

Backend runs on:

http://localhost:5000
🔹 3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔐 Environment Variables
Variable	Description
PORT	Server port number
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for authentication
👥 User Roles
Role	Permissions
👨‍🎓 Student	Submit & track complaints
🛡 Admin	Manage & resolve complaints
📡 Sample API Endpoints
🔑 Authentication

POST /api/auth/register

POST /api/auth/login

📩 Complaints

POST /api/complaints

GET /api/complaints

PUT /api/complaints/:id

🚀 Future Enhancements

📎 File Attachments

📧 Email Notifications

📊 Analytics Dashboard

🌍 Cloud Deployment

🏷 Complaint Categories
