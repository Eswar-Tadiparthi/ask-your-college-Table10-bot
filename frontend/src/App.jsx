import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Import Carbon Tracker page
import CarbonTracker from "./pages/CarbonTracker";

// Backend API
const API_URL = "http://localhost:5000/api/ask";

// ============================================================
// Chat Message
// ============================================================

function Message({ role, text }) {
  const isBot = role === "bot";

  return (
    <div className={`message-row ${isBot ? "bot-row" : "user-row"}`}>
      {isBot && (
        <div className="avatar" aria-hidden="true">
          🎓
        </div>
      )}

      <div className={`bubble ${isBot ? "bot-bubble" : "user-bubble"}`}>
        {text}
      </div>
    </div>
  );
}

// ============================================================
// Typing Indicator
// ============================================================

function TypingIndicator() {
  return (
    <div className="message-row bot-row">
      <div className="avatar" aria-hidden="true">
        🎓
      </div>

      <div className="bubble bot-bubble thinking">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

// ============================================================
// College Chat Page
// ============================================================

function CollegeChat() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "bot",
      text:
        "Hi! I'm your college assistant. Ask me anything about admissions, courses, deadlines, or campus life."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // ==========================================================
  // Auto-scroll to latest message
  // ==========================================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  // ==========================================================
  // Send Message
  // ==========================================================

  async function sendMessage() {
    const question = input.trim();

    if (!question || loading) {
      return;
    }

    // Add user's message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        text: question
      }
    ]);

    // Clear input
    setInput("");

    // Show typing indicator
    setLoading(true);

    try {
      console.log("Sending question:", question);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: question
        })
      });

      console.log("Backend status:", response.status);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      console.log("Backend response:", data);

      const answer =
        data.answer_text ||
        "Sorry, I couldn't find an answer to that question.";

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: answer
        }
      ]);
    } catch (error) {
      console.error("API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text:
            "Something went wrong. Please make sure the backend is running on http://localhost:5000."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // Enter Key
  // ==========================================================

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  // ==========================================================
  // Chat UI
  // ==========================================================

  return (
    <div className="app">

      {/* ======================================================
          Header
      ====================================================== */}

      <header className="header">

        <div className="header-icon">
          🎓
        </div>

        <div>
          <h1 className="header-title">
            Ask Your College
          </h1>

          <p className="header-sub">
            Instant answers to your campus questions
          </p>
        </div>

      </header>

      {/* ======================================================
          Navigation
      ====================================================== */}

      <div style={{ padding: "10px 20px" }}>
        <Link
          to="/carbon-tracker"
          style={{
            textDecoration: "none",
            fontWeight: "600"
          }}
        >
          🌱 Carbon Footprint Tracker
        </Link>
      </div>

      {/* ======================================================
          Chat Window
      ====================================================== */}

      <main
        className="chat-window"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >

        {messages.map((message) => (
          <Message
            key={message.id}
            role={message.role}
            text={message.text}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef}></div>

      </main>

      {/* ======================================================
          Input Area
      ====================================================== */}

      <footer className="input-bar">

        <input
          className="input-field"
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label="Your question"
        />

        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          {loading ? "..." : "Send"}
        </button>

      </footer>

    </div>
  );
}

// ============================================================
// Main App + Routing
// ============================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ====================================================
            Home / College Chatbot
        ==================================================== */}

        <Route
          path="/"
          element={<CollegeChat />}
        />

        {/* ====================================================
            Carbon Footprint Tracker
        ==================================================== */}

        <Route
          path="/carbon-tracker"
          element={<CarbonTracker />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;