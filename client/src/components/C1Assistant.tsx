import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Sparkles, Send, Loader2, Bot, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  id: string;
}

// Simple markdown renderer
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#8587e3] text-xs">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-2.5">')
    .replace(/\n/g, '<br/>');
}

const SUGGESTIONS = [
  "What is AntimatterAI's valuation?",
  "Explain the ATOM platform",
  "What is the competitive moat?",
  "Tell me about the Series A terms",
];

export default function C1Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId] = useState(() => `thread-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = async (messageText?: string) => {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: text,
      id: `user-${Date.now()}`,
    };

    const responseId = `assistant-${Date.now()}`;
    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: "",
      id: responseId,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { role: "user", content: text },
          threadId,
          responseId,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const responseText = data.content || "I'm processing your request...";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === responseId ? { ...m, content: responseText } : m
        )
      );
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === responseId
            ? { ...m, content: "I'm sorry, I encountered an error. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#8587e3] to-[#6c6eb8] text-white flex items-center justify-center shadow-[0_0_30px_rgba(133,135,227,0.3)] hover:shadow-[0_0_50px_rgba(133,135,227,0.5)] hover:scale-110 transition-all duration-300"
            data-testid="btn-open-ai-assistant"
            aria-label="Open AI Investment Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(133,135,227,0.15)] border border-white/10 flex flex-col"
            style={{ background: "#0a0a0a" }}
            data-testid="panel-ai-assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8587e3] to-[#6c6eb8] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display tracking-wide">
                    ATOM Intelligence
                  </h3>
                  <p className="text-[10px] text-gray-500 tracking-wider uppercase">
                    Powered by Thesys C1
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                data-testid="btn-close-ai-assistant"
                aria-label="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages area */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.1) transparent",
              }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8587e3]/20 to-[#6c6eb8]/10 flex items-center justify-center mb-4 border border-[#8587e3]/20">
                    <Bot className="w-7 h-7 text-[#8587e3]" />
                  </div>
                  <h4 className="text-white text-sm font-semibold mb-1 font-display">
                    ATOM Intelligence Assistant
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 max-w-[280px]">
                    Ask me anything about AntimatterAI — our technology, valuation, competitive advantages, or investment opportunity.
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(s)}
                        className="text-left text-xs text-gray-400 hover:text-white px-3 py-2.5 rounded-xl border border-white/5 hover:border-[#8587e3]/30 hover:bg-[#8587e3]/5 transition-all duration-200"
                        data-testid={`suggestion-${i}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8587e3]/20 to-[#6c6eb8]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#8587e3]/20">
                        <Bot className="w-3.5 h-3.5 text-[#8587e3]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[#8587e3] via-[#4c4dac] to-[#696aac] text-white shadow-[0_0_10px_#696aac] font-medium rounded-br-md"
                          : "bg-white/5 text-gray-200 border border-white/5 rounded-bl-md"
                      }`}
                    >
                      {msg.role === "assistant" && msg.content ? (
                        <div
                          className="c1-response [&_strong]:text-[#8587e3] [&_strong]:font-semibold [&_code]:text-[11px] [&_p]:leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: `<p>${renderMarkdown(msg.content)}</p>`,
                          }}
                        />
                      ) : msg.role === "assistant" && !msg.content ? (
                        <div className="flex items-center gap-2 text-gray-400 py-1">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-[#8587e3] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-[#8587e3] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-[#8587e3] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className="text-xs text-gray-500">Analyzing...</span>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-xl p-3">
              <div className="flex items-end gap-2 bg-white/5 rounded-xl border border-white/10 focus-within:border-[#8587e3]/40 transition-colors px-3 py-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about AntimatterAI..."
                  rows={1}
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 resize-none outline-none min-h-[24px] max-h-[120px] leading-relaxed"
                  data-testid="input-chat-message"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-[#8587e3] to-[#696aac] hover:shadow-[0_0_25px_#696aac] text-white"
                  data-testid="btn-send-message"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[9px] text-gray-600 text-center mt-1.5 tracking-wide">
                ATOM Intelligence · AntimatterAI Investment Portal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
