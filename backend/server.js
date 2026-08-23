const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const FAQ = require("./models/FAQ");
const Chat = require("./models/Chat");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;



// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Ask Your College backend is running"
  });
});

// Ask question
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        answer_text: "Please enter a question."
      });
    }

    const userQuestion = question.trim();

    // Convert question into searchable words
    const words = userQuestion
      .toLowerCase()
      .replace(/[?.,!]/g, "")
      .split(/\s+/);

    // Find FAQs
    const faqs = await FAQ.find();

    let bestMatch = null;
    let bestScore = 0;

    for (const faq of faqs) {
      let score = 0;

      for (const keyword of faq.keywords) {
        if (words.includes(keyword.toLowerCase())) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    let answer;

    if (bestMatch && bestScore > 0) {
      answer = bestMatch.answer;
    } else {
      answer =
        "I'm sorry, I don't have information about that yet. Please contact your college administration for more details.";
    }

    // Save conversation
    await Chat.create({
      question: userQuestion,
      answer: answer
    });

    res.json({
      answer_text: answer
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer_text: "Something went wrong on the server."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});