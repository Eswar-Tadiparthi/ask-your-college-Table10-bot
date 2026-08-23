// ============================================================
// College FAQ Chatbot
// Replace API_URL below with your actual endpoint.
// ============================================================
const API_URL = "PASTE_YOUR_API_URL_HERE/ask";

const { useState, useRef, useEffect } = React;

function Message({ role, text }) {
  const isBot = role === "bot";
  return (
    <div className={`message-row ${isBot ? "bot-row" : "user-row"}`}>
      {isBot && (
        <div className="avatar" aria-hidden="true">🎓</div>
      )}
      <div className={`bubble ${isBot ? "bot-bubble" : "user-bubble"}`}>
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="message-row bot-row">
      <div className="avatar" aria-hidden="true">🎓</div>
      <div className="bubble bot-bubble thinking">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", text: "Hi! I'm your college assistant. Ask me anything about admissions, courses, deadlines, or campus life." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const question = input.trim();
    if (!question || loading) return;

    // Add user bubble
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const answer = data.answer_text ?? "Sorry, I didn't get a response. Please try again.";

      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: answer }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: "Something went wrong. Please check your connection and try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <span className="header-icon">🎓</span>
        <div>
          <h1 className="header-title">Ask Your College</h1>
          <p className="header-sub">Instant answers to your campus questions</p>
        </div>
      </header>

      {/* Chat window */}
      <main className="chat-window" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map(msg => (
          <Message key={msg.id} role={msg.role} text={msg.text} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </main>

      {/* Input bar */}
      <footer className="input-bar">
        <input
          className="input-field"
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={e => setInput(e.target.value)}
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
          Send
        </button>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
