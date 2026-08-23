# 🎓 Ask Your College

A web-based college FAQ chatbot that helps students get instant answers to common questions about college timings, admissions, courses, deadlines, and campus information.

## ✨ Features

- 💬 Interactive FAQ chatbot
- 🔎 Keyword-based FAQ matching
- 🗄️ MongoDB-based FAQ storage
- 💾 Chat history storage
- ⚡ Real-time responses
- 📱 Responsive chat interface

## 🛠️ Tech Stack

**Frontend:** React, Vite, JavaScript, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose

## 🏗️ Architecture

```text
Student
   ↓
React Frontend
   ↓
Express REST API
   ↓
FAQ Matching
   ↓
MongoDB
   ↓
Answer
🚀 Run Locally
Backend
cd backend
npm install
npm run dev

Runs on http://localhost:5000

Frontend
cd frontend
npm install
npm run dev

Runs on http://localhost:5173

🔐 Environment Variables

Create backend/.env:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Never commit .env or other sensitive credentials.

🔮 Future Improvements
Natural-language/semantic FAQ matching
Admin dashboard
Multi-language support
Authentication
Cloud deployment