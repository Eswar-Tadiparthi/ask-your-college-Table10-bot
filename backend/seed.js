const mongoose = require("mongoose");
require("dotenv").config();

const FAQ = require("./models/FAQ");

const faqs = [
  {
    question: "What are the college timings?",
    answer: "The college working hours are from 9:00 AM to 4:00 PM, Monday to Friday.",
    category: "College Timings",
    keywords: ["college", "timings", "time", "hours", "working"]
  },

  {
    question: "What is the attendance requirement?",
    answer: "Students are required to maintain the minimum attendance percentage specified by the college regulations.",
    category: "Attendance",
    keywords: ["attendance", "percentage", "minimum", "classes"]
  },

  {
    question: "How can I apply for a bonafide certificate?",
    answer: "You can apply for a bonafide certificate through the college administration office. Submit the required application and student details.",
    category: "Certificates",
    keywords: ["bonafide", "certificate", "apply", "document"]
  },

  {
    question: "How can I contact the examination section?",
    answer: "You can contact the examination section through the college examination office during working hours.",
    category: "Examinations",
    keywords: ["exam", "examination", "section", "contact"]
  },

  {
    question: "When are semester examinations conducted?",
    answer: "Semester examinations are generally conducted according to the academic calendar published by the college.",
    category: "Examinations",
    keywords: ["semester", "exam", "examinations", "academic", "calendar"]
  },

  {
    question: "How can I pay my college fees?",
    answer: "College fees can be paid through the payment method provided by the college administration.",
    category: "Fees",
    keywords: ["fees", "fee", "payment", "pay", "college"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await FAQ.deleteMany({});

    await FAQ.insertMany(faqs);

    console.log("FAQ data inserted successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

seedDatabase();