"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (value) {
      setMessages((msgs) => [...msgs, value]);
      if (inputRef.current) inputRef.current.value = "";
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
              <div key={i}>Tú: {msg}</div>
            ))}
          </div>
          <form id="chat-form" style={{ display: "flex", borderTop: "1px solid #eee" }} onSubmit={handleSend}>
            <input
              id="chat-input"
              type="text"
              placeholder="Escribe un mensaje..."
              ref={inputRef}
              style={{ flex: 1, padding: 8, border: "none", borderRadius: "0 0 0 8px", outline: "none" }}
            />
            <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "0 0 8px 0", cursor: "pointer" }}>
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
