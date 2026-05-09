import { useState } from "react";
import { sendMessage } from "../../services/chatService";
import { addHistoryItem } from "../../utils/history";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I am your Farmer AI Assistant. Ask me about crops, irrigation, soil, weather, or farming practices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const currentMessage = input;
    const userMsg = { type: "user", text: currentMessage };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(currentMessage);

      const botMsg = {
        type: "bot",
        text: res.reply || "No response from server.",
      };
      setMessages((prev) => [...prev, botMsg]);

      addHistoryItem({
      type: "AI Chat",
      detail: currentMessage,
     time: new Date().toLocaleString(),
     });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Server error. Please check backend connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>AI Farming Assistant 🌱</h1>
        <p>Ask practical farming questions and get quick guidance.</p>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.type}`}>
            {msg.text}
          </div>
        ))}

        {loading && <div className="chat-msg bot">Typing...</div>}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about crops, fertilizer, weather..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatPage;