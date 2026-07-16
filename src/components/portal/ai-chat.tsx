"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const EXPERT_KNOWLEDGE: Record<string, string> = {
  tax: `Tanzania tax regulations are governed by the Tanzania Revenue Authority (TRA). Here are the key compliance points:
- **Corporate Tax:** Standard rate is 30% for both resident and non-resident companies.
- **VAT:** Standard rate is 18%. Registration is mandatory if annual taxable turnover exceeds TZS 100 million.
- **TIN & VRN:** You must apply for a Taxpayer Identification Number (TIN) within 15 days of incorporation.
- **Withholding Tax:** 15% on dividends for non-residents, 10% for residents.
Ensure you file tax returns monthly via the TRA online portal.`,

  land: `Foreign entities cannot own land outright. Under the Land Act, investment land is managed via:
- **Derivative Rights:** Issued by the Tanzania Investment Centre (TIC).
- **Leaseholds:** Typically granted for 33, 66, or 99 years.
- **Minimum capital requirement:** Foreign investors must register with TIC with a minimum capital of $500,000 to access the land bank.
All transactions must go through the Ministry of Lands and TIC facilitation.`,

  company: `Company registration is handled by the Business Registrations and Licensing Agency (BRELA):
- **ORS Portal:** Registrations are done online via the BRELA Online Registration System.
- **Incorporation Requirements:** Minimum of 2 directors and shareholders. Non-resident directors must upload certified passport copies.
- **Timeline:** Company incorporation typically takes 3 to 5 business days after document clearance.
- **Post-Incorporation:** Apply for a business license from municipal authorities or the Ministry of Industry.`,

  visa: `Immigration and work authorization details under the Immigration Department:
- **Business Visa:** Single-entry visa valid for up to 90 days for business talks or feasibility studies.
- **Class A Residence Permit:** For foreign investors/shareholders (minimum capital $500,000).
- **Class B Residence Permit:** For foreign employees with rare skills not available locally.
- **Class C Residence Permit:** For researchers, students, and missionaries.
Ensure all applications are submitted through the e-Immigration portal.`,
};

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask a question about Tanzania's investment, incorporation, or tax regulations. I provide direct facts from official sources.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpenAI = () => setOpen(true);
    window.addEventListener("open-ai-chat", handleOpenAI);
    return () => window.removeEventListener("open-ai-chat", handleOpenAI);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("ai-chat-state", { detail: { open } }));
  }, [open]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Analyze keywords
    const lower = userMessage.toLowerCase();
    let response = "I do not have specific details for that query. Please ask about tax, land tenure, company registration, or visa permits.";
    
    if (lower.includes("tax") || lower.includes("revenue") || lower.includes("tra")) {
      response = EXPERT_KNOWLEDGE.tax;
    } else if (lower.includes("land") || lower.includes("tenure") || lower.includes("derivative")) {
      response = EXPERT_KNOWLEDGE.land;
    } else if (lower.includes("company") || lower.includes("incorporat") || lower.includes("brela")) {
      response = EXPERT_KNOWLEDGE.company;
    } else if (lower.includes("visa") || lower.includes("permit") || lower.includes("residence") || lower.includes("work")) {
      response = EXPERT_KNOWLEDGE.visa;
    }

    // Stream simulator
    let currentText = "";
    const words = response.split(" ");
    let i = 0;

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: currentText };
          return next;
        });
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 45);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full gradient-tanzania text-white shadow-2xl flex items-center justify-center border border-primary/20 hover:scale-105 active:scale-95 transition-transform"
        >
          {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Box Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[500px] rounded-[2rem] bg-kilimanjaro-950/90 border border-tanzania-500/20 shadow-2xl backdrop-blur-lg z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-tanzania-500/10 flex items-center justify-between bg-kilimanjaro-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-tanzania-500/10 flex items-center justify-center text-tanzania-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold tracking-tight text-white flex items-center gap-2">
                    Regulatory Advisor
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-tanzania-500/10 text-tanzania-400 font-bold uppercase tracking-wider">Fact-based</span>
                  </h3>
                  <p className="text-[10px] text-tanzania-300/60 font-mono">BRELA · TRA · TIC · IMMIGRATION</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full text-tanzania-400 hover:text-white hover:bg-tanzania-500/10">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages body */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-tanzania-500/10 flex items-center justify-center text-tanzania-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-4 rounded-3xl leading-relaxed ${
                      m.role === "user"
                        ? "bg-tanzania-500 text-white rounded-br-none"
                        : "bg-kilimanjaro-900/40 border border-tanzania-500/10 text-tanzania-100 rounded-bl-none whitespace-pre-line"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-tanzania-500 flex items-center justify-center text-white shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && messages[messages.length - 1].content === "" && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-tanzania-500/10 flex items-center justify-center text-tanzania-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="bg-kilimanjaro-900/40 border border-tanzania-500/10 text-tanzania-100 p-4 rounded-3xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tanzania-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-tanzania-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-tanzania-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-tanzania-500/10 bg-kilimanjaro-900/30 flex gap-2">
              <Input
                placeholder="Ask about tax, land, company incorporation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-2xl border-tanzania-500/20 bg-kilimanjaro-950 text-white placeholder:text-tanzania-300/40 focus:ring-tanzania-500/30"
              />
              <Button onClick={handleSend} className="rounded-2xl bg-tanzania-500 hover:bg-tanzania-600 text-white shadow-lg">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
