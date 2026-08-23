const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const FAQ = require("./models/FAQ");
const Chat = require("./models/Chat");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================
// Gemini AI
// ============================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// ============================================
// Middleware
// ============================================

app.use(cors());
app.use(express.json());

// ============================================
// MongoDB Connection
// ============================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// ============================================
// Health Check
// ============================================

app.get("/", (req, res) => {
  res.json({
    message: "Ask Your College AI backend is running"
  });
});

// ============================================
// Ask AI
// ============================================

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    // Validate question
    if (!question || !question.trim()) {
      return res.status(400).json({
        answer_text: "Please enter a question."
      });
    }

    const userQuestion = question.trim();

    // ========================================
    // Get college FAQs from MongoDB
    // ========================================

    const faqs = await FAQ.find();

    let collegeContext = "";

    if (faqs.length > 0) {
      collegeContext = faqs
        .map(
          (faq) =>
            `Question: ${faq.question}\nAnswer: ${faq.answer}`
        )
        .join("\n\n");
    }

    // ========================================
    // AI Prompt
    // ========================================

    const prompt = `
You are "Ask Your College", an intelligent college assistant.

Your job is to help students with:
- College information
- Admissions
- Courses
- Timings
- Fees
- Exams
- Campus life
- General academic questions
- Programming and computer science questions
- Other general educational questions

IMPORTANT RULES:

1. If the question is related to the college, use the college information provided below.
2. Do not invent college-specific information.
3. If the college information does not contain the answer, clearly say that the specific college information is not available.
4. For general educational questions, answer normally using your knowledge.
5. Give clear and concise answers.
6. Use simple language suitable for college students.
7. Do not mention that you are using a database.
8. Do not say that you are an FAQ matching system.

COLLEGE INFORMATION:

${collegeContext || "No college-specific information is currently available."}

STUDENT QUESTION:

${userQuestion}

Provide the best possible answer.
`;

    // ========================================
    // Generate AI response
    // ========================================

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt
    });

    const answer =
      response.text ||
      "Sorry, I couldn't generate an answer.";

    // ========================================
    // Save Chat to MongoDB
    // ========================================

    await Chat.create({
      question: userQuestion,
      answer: answer
    });

    // ========================================
    // Send response to frontend
    // ========================================

    res.json({
      answer_text: answer
    });

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      answer_text:
        "Sorry, I couldn't process your question right now. Please try again."
    });
  }
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(
    `AI Backend running on http://localhost:${PORT}`
  );
});