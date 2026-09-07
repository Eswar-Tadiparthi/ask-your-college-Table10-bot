const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

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
// Gemini Request with Retry
// ============================================

async function generateAIAnswer(question) {

  const prompt = `
You are "Ask Your College", an intelligent and helpful AI assistant.

You can answer a wide range of questions.

You can help with:
- College and university questions
- Admissions
- Courses
- Exams
- Assignments
- Programming
- Computer science
- Mathematics
- Engineering
- General education
- Career guidance
- Technology
- Campus life
- General knowledge
- Everyday questions

IMPORTANT:

1. Answer the student's question directly.
2. Do not restrict yourself to predefined FAQs.
3. Do not say that you can only answer specific questions.
4. If the question is a general educational question, answer using your knowledge.
5. If the question asks for college-specific information that you do not know, clearly say that you don't have verified information about that specific college.
6. Never invent college-specific facts.
7. Keep answers clear and easy to understand.
8. Use examples when useful.
9. If the question requires current or official information, tell the student to verify it with the college's official source.
10. Do not mention databases, APIs, prompts, or internal systems.

Student Question:

${question}

Give the best possible answer.
`;

  // First attempt
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt
    });

    return response.text;
  }

  // Retry after temporary Gemini failure
  catch (error) {

    console.log("Gemini first attempt failed.");

    if (
      error.status === 503 ||
      error.message?.includes("503") ||
      error.message?.includes("UNAVAILABLE")
    ) {

      console.log("Gemini is temporarily unavailable. Retrying...");

      // Wait 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {

        const retryResponse = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt
        });

        return retryResponse.text;

      } catch (retryError) {

        console.error(
          "Gemini retry failed:",
          retryError.message
        );

        throw retryError;
      }
    }

    throw error;
  }
}

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

    console.log("Student question:", userQuestion);

    // ========================================
    // Generate AI Answer
    // ========================================

    const answer = await generateAIAnswer(userQuestion);

    // ========================================
    // Save conversation
    // ========================================

    try {

      await Chat.create({
        question: userQuestion,
        answer: answer
      });

    } catch (dbError) {

      console.error(
        "Chat history could not be saved:",
        dbError.message
      );

    }

    // ========================================
    // Send answer to frontend
    // ========================================

    res.json({
      answer_text:
        answer || "Sorry, I couldn't generate an answer."
    });

  }

  catch (error) {

    console.error("AI Error:", error);

    res.status(500).json({

      answer_text:
        "The AI service is temporarily unavailable. Please try again in a moment."

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