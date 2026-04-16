import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Instagram,
  Youtube,
  Facebook,
  Phone,
  Code2,
  Terminal,
  Cpu,
  ExternalLink,
  MessageSquare,
  X,
  User,
  Bot,
  Loader2
} from "lucide-react";
import { Background } from "./components/Background";
import { LinkCard } from "./components/LinkCard";
import { SkillBar } from "./components/SkillBar";
import profileImg from "./profile_img.avif";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Assalomu alaykum! Men Asan Tolepovning virtual yordamchisiman. Asan — Fullstack dasturchi, UI/UX dizayner va o'z jamoasiga ega bo'lgan tajribali mutaxassis. U hozirda bir nechta yirik loyihalar, xususan, Frontend, Backend, Android ilovalar va murakkab Telegram botlar ustida ishlamoqda. Sizda qanday savollar bor?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `Sizning Ismingiz: Asan AI (Asan Tolepovning virtual yordamchisi). 
              Asosiy vazifangiz: Foydalanuvchilarga Asan haqida umumiy professional ma’lumot berish va ularni kerakli aloqa kanaliga yo‘naltirish. Shaxsiy hayot haqida chuqur ma'lumot bermaslik, faqat professional yutuqlarga e'tibor qaratish.
              
              Asan haqida ma'lumotlar:
              - Ko‘p qirrali mutaxassis: Bir vaqtning o‘zida bir nechta murakkab loyihalar ustida ishlaydi.
              - Texnologik ko‘nikmalar: Frontend (interaktiv interfeyslar), Backend (barqaror tizimlar), Android Studio (mobil ilovalar), Telegram Bot (katta tajriba).
              - Jamoa va Loyihalar: O‘z jamoasi bor. Hozirda tibbiy sun'iy intellekt va boshqaruv tizimlari (Softwash kabi) ustida ishlamoqda.
              - Bog‘lanish: Asan bilan shaxsan gaplashish uchun Telegram (@Asan_Tolepov) orqali yozish kerak. U vaqtining asosiy qismini Telegramda o‘tkazadi.
              
              Har doim o'zbek tilida, muloyim va professional javob bering.`
            },
            ...messages,
            userMessage
          ],
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Groq API error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Kechirasiz, xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const socialLinks = [
    {
      id: "tg1",
      icon: Send,
      title: "Telegram",
      subtitle: "@Asan_Tolepov",
      href: "https://t.me/Asan_Tolepov",
      color: "telegram" as const,
    },
    {
      id: "tg2",
      icon: Send,
      title: "Telegram",
      subtitle: "@Tolepov_Asan",
      href: "https://t.me/Tolepov_Asan",
      color: "telegram" as const,
    },
    {
      id: "ig",
      icon: Instagram,
      title: "Instagram",
      subtitle: "@asantolepov",
      href: "https://www.instagram.com/asantolepov?igsh=MWtqMGx0emt0bDky",
      color: "instagram" as const,
    },
    {
      id: "yt",
      icon: Youtube,
      title: "YouTube",
      subtitle: "@asantolepov7248",
      href: "https://youtube.com/@asantolepov7248?si=iCXo6i8B41PtEcDG",
      color: "youtube" as const,
    },
    {
      id: "fb",
      icon: Facebook,
      title: "Facebook",
      subtitle: "Asan Tolepov",
      href: "https://www.facebook.com/profile.php?id=100085784842146",
      color: "facebook" as const,
    },
  ];

  return (
    <div className="min-h-screen selection:bg-neon-blue/30">
      <Background />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              animate={{
                rotate: 360,
                borderTopColor: ["#00f2ff", "#bc13fe", "#00f2ff"],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white/10 rounded-full border-t-neon-blue"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-4 font-mono text-neon-blue text-sm tracking-widest uppercase"
            >
              Initializing System...
            </motion.p>
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-md mx-auto px-6 pt-12 pb-24"
          >
            {/* Header Section */}
            <header className="flex flex-col items-center text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 bg-neon-blue/20 blur-2xl rounded-full" />
                <img
                  src={profileImg}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 rounded-full border-2 border-neon-blue/50 p-1 glass relative z-10 object-cover"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border border-dashed border-neon-purple/30 rounded-full"
                />
              </motion.div>

              <motion.h1
                className="text-3xl font-bold tracking-tight mb-2 text-glow-blue"
              >
                Asan Tolepov
              </motion.h1>

              <div className="flex items-center gap-2 text-gray-400 text-sm font-mono mb-4">
                <Terminal size={14} className="text-neon-purple" />
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  className="overflow-hidden whitespace-nowrap border-r-2 border-neon-blue pr-1"
                >
                  Creative Developer | Tech Lead
                </motion.span>
              </div>

              <div className="flex gap-3">
                <span className="px-3 py-1 rounded-full glass text-[10px] font-mono text-neon-green border-neon-green/30">
                  {"</>"} Fullstack
                </span>
                <span className="px-3 py-1 rounded-full glass text-[10px] font-mono text-neon-blue border-neon-blue/30">
                  {"{ }"} UI/UX
                </span>
                <span className="px-3 py-1 rounded-full glass text-[10px] font-mono text-neon-purple border-neon-purple/30">
                  {"[ ]"} Mobile Developer
                </span>
              </div>
            </header>

            {/* Links Section */}
            <section className="space-y-4 mb-12">
              <div className="flex items-center gap-2 mb-6 px-2">
                <Code2 size={18} className="text-neon-blue" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Baylanıs ushın</h2>
              </div>
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LinkCard
                    icon={link.icon}
                    title={link.title}
                    subtitle={link.subtitle}
                    href={link.href}
                    color={link.color}
                  />
                </motion.div>
              ))}
            </section>

            {/* Footer */}
            <footer className="text-center">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                © 2026 CyberLink Protocol v2.0
              </p>
            </footer>

            {/* Floating Action Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 w-14 h-14 rounded-full glass border-neon-blue/50 flex items-center justify-center text-neon-blue shadow-[0_0_20px_rgba(0,242,255,0.2)] z-50 group"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-12 right-0 glass px-3 py-1 rounded-lg text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                AI Assistant
              </div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 100, scale: 0.9 }}
                  className="fixed bottom-24 right-6 w-[90vw] max-w-[400px] h-[500px] glass rounded-3xl z-50 flex flex-col overflow-hidden shadow-2xl border-white/10"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                        <Bot size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                        <p className="text-[10px] text-neon-green flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> Online
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user"
                          ? "bg-neon-blue/20 text-white rounded-tr-none border border-neon-blue/20"
                          : "bg-white/5 text-gray-200 rounded-tl-none border border-white/10"
                          }`}>
                          <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase tracking-wider font-bold">
                            {msg.role === "user" ? <><User size={10} /> Siz</> : <><Bot size={10} /> AI Agent</>}
                          </div>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10">
                          <Loader2 size={18} className="animate-spin text-neon-blue" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input form */}
                  <div className="p-4 border-t border-white/10 bg-white/5">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Xabarni yozing..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-neon-blue/50 transition-colors text-white placeholder:text-gray-600"
                      />
                      <button
                        type="submit"
                        disabled={isTyping}
                        className="w-10 h-10 rounded-xl bg-neon-blue text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
