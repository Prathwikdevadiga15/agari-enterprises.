'use client';

import { useEffect, useRef, useState } from 'react';
import { CONFIG, telHref } from '@/lib/config';
import { MessageCircle, X, Send } from './icons';

const GREETING = `Hi! I'm the Agari Enterprises assistant. Ask me about repairs, our products, hours, or branches — I'm happy to help.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `Sorry, I couldn't connect. Please call ${CONFIG.displayPhone} for help.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        className="fixed bottom-5 right-5 z-[95] w-14 h-14 rounded-full bg-grad-copper text-white shadow-glow-copper flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-[95] w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[520px] bg-panel border border-line rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-grad-ink text-[#F5F1E6] px-4 py-3.5 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#E8A657]/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4" />
            </span>
            <span>
              <span className="block font-display font-semibold text-sm">Agari AI Assistant</span>
              <span className="block text-[11px] opacity-70">Usually replies in seconds</span>
            </span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] text-sm leading-relaxed rounded-lg px-3.5 py-2.5 whitespace-pre-wrap ${
                    m.role === 'user' ? 'bg-ink text-panel rounded-br-sm' : 'bg-panel-2 text-ink rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <p className="bg-panel-2 rounded-lg rounded-bl-sm px-3.5 py-2.5 text-sm text-ink-faint">Typing…</p>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="border-t border-line p-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about repairs, hours, products…"
              aria-label="Chat message"
              className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm bg-paper"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-10 h-10 rounded-full bg-grad-copper text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <a href={telHref()} className="block text-center text-[11px] text-ink-faint py-2 border-t border-line hover:text-ink">
            Prefer to talk? Call {CONFIG.displayPhone}
          </a>
        </div>
      )}
    </>
  );
}
