"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{from: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (value) {
      setMessages((msgs) => [...msgs, {from: "user", text: value}]);
      if (inputRef.current) inputRef.current.value = "";
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: value }),
        });
        const data = await res.json();
        setMessages((msgs) => [...msgs, {from: "gpt", text: data.reply}]);
      } catch {
        setMessages((msgs) => [...msgs, {from: "gpt", text: "Error al conectar con la API."}]);
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Hola</h1>
      <button id="btn-hola-mundo" onClick={() => setShowChat(true)} style={{ padding: "10px 20px", fontSize: "18px", borderRadius: "8px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
        Hola Mundo
      </button>
      {showChat && (
        <div style={{ position: "fixed", bottom: 20, right: 20, width: 300, background: "#fff", border: "1px solid #ccc", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.2)", zIndex: 1000 }}>
          <div style={{ background: "#007bff", color: "#fff", padding: 10, borderRadius: "8px 8px 0 0" }}>Chat</div>
          <div id="chat-messages" style={{ height: 200, overflowY: "auto", padding: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ color: msg.from === "user" ? "#222" : "#007bff" }}>
                {msg.from === "user" ? "Tú: " : "GPT: "}{msg.text}
              </div>
            ))}
            {loading && <div style={{ color: "#aaa" }}>GPT está escribiendo...</div>}
          </div>
          <form id="chat-form" style={{ display: "flex", borderTop: "1px solid #eee" }} onSubmit={handleSend}>
            <input
              id="chat-input"
              type="text"
              placeholder="Escribe un mensaje..."
              ref={inputRef}
              style={{ flex: 1, padding: 8, border: "none", borderRadius: "0 0 0 8px", outline: "none" }}
              disabled={loading}
            />
            <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "0 0 8px 0", cursor: "pointer" }} disabled={loading}>
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
