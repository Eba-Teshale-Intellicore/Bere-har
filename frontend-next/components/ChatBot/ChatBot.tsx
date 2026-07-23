"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/src/scss/splash.module.scss";
import { ArrowUp, Bot, X } from "lucide-react";
import { motion } from "framer-motion";
import { sendMessage } from "@/src/api/chatbot";

export default function ChatBot() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await sendMessage(message);

      const botMessage = {
        role: "assistant",
        content: res.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        role: "assistant",
        content: "Sorry, something went wrong.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
    setMessage("");
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className={styles.chatbot}>
      {!active && (
        <>
          <div className={styles.center}>
            <Bot onClick={() => setActive(true)} />
          </div>
        </>
      )}

      {active && (
        <>
          <motion.div className={styles.content}>
            <div className={styles.title}>Bere-har Assistant </div>
            <div className={styles.message}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.chatBubble} ${
                    msg.role === "user" ? styles.user : styles.assistant
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className={styles.input} onSubmit={handleSend}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Bere-har Assistant..."
              />
              <button onClick={handleSend}>
                <ArrowUp />
              </button>
            </form>
          </motion.div>
          <div className={styles.center}>
            <X onClick={() => setActive(false)} />
          </div>
        </>
      )}
    </div>
  );
}
