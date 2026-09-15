'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MessageCircle } from 'lucide-react';

const DESK_EMAIL = 'info@tanzaniareach.com';
const DESK_WHATSAPP = '255792867427';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Business & FDI Registration',
    message: '',
  });

  // Pre-filled handoff links — used when the automated relay is unavailable
  const fallbackSubject = `[Tanzania Reach Inquiry] ${formData.topic}: ${formData.name}`;
  const fallbackBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone/WhatsApp: ${formData.phone || 'N/A'}\nTopic: ${formData.topic}\n\n${formData.message}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${DESK_EMAIL}&su=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(fallbackBody)}`;
  const mailtoUrl = `mailto:${DESK_EMAIL}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(fallbackBody)}`;
  const whatsappUrl = `https://wa.me/${DESK_WHATSAPP}?text=${encodeURIComponent(fallbackBody)}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowFallback(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data?.error || 'Failed to dispatch message. Please use the direct channels below.');
        setShowFallback(true);
      }
    } catch {
      // Network failure — surface direct channels instead of a fake success
      setError('Network error while dispatching. Please use the direct channels below.');
      setShowFallback(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
        <h4 className="text-lg font-bold text-kilimanjaro-950 dark:text-white">
          Message Dispatched Successfully
        </h4>
        <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-200 max-w-sm mx-auto leading-relaxed">
          Thank you, <strong className="font-semibold text-kilimanjaro-900 dark:text-white">{formData.name}</strong>. 
          Your message has been dispatched securely to our desk at{' '}
          <strong className="text-tanzania-600 dark:text-tanzania-400">info@tanzaniareach.com</strong>.
          We typically respond within 2 to 4 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', topic: 'Business & FDI Registration', message: '' });
          }}
          className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-tanzania-600 dark:text-tanzania-400 bg-white dark:bg-kilimanjaro-800 shadow-sm hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 space-y-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>

          {showFallback && (
            <div className="space-y-2 pt-1">
              <p className="font-bold uppercase tracking-wider text-[10px] text-kilimanjaro-600 dark:text-tanzania-300">
                Send directly via:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white dark:bg-kilimanjaro-800 border border-kilimanjaro-200 dark:border-kilimanjaro-600 text-[11px] font-bold text-kilimanjaro-800 dark:text-white hover:border-tanzania-500 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-red-500" /> Gmail
                </a>
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white dark:bg-kilimanjaro-800 border border-kilimanjaro-200 dark:border-kilimanjaro-600 text-[11px] font-bold text-kilimanjaro-800 dark:text-white hover:border-tanzania-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-tanzania-500" /> Email App
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white dark:bg-kilimanjaro-800 border border-kilimanjaro-200 dark:border-kilimanjaro-600 text-[11px] font-bold text-kilimanjaro-800 dark:text-white hover:border-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:text-tanzania-200 mb-1.5">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Doe"
            className="w-full px-4 py-3 rounded-xl border border-kilimanjaro-200 dark:border-kilimanjaro-700 bg-kilimanjaro-50/50 dark:bg-kilimanjaro-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-tanzania-500 transition-all text-kilimanjaro-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:text-tanzania-200 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. john@example.com"
            className="w-full px-4 py-3 rounded-xl border border-kilimanjaro-200 dark:border-kilimanjaro-700 bg-kilimanjaro-50/50 dark:bg-kilimanjaro-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-tanzania-500 transition-all text-kilimanjaro-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:text-tanzania-200 mb-1.5">
            Phone / WhatsApp (Optional)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +255 700 000 000"
            className="w-full px-4 py-3 rounded-xl border border-kilimanjaro-200 dark:border-kilimanjaro-700 bg-kilimanjaro-50/50 dark:bg-kilimanjaro-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-tanzania-500 transition-all text-kilimanjaro-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:text-tanzania-200 mb-1.5">
            Inquiry Topic
          </label>
          <select
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-kilimanjaro-200 dark:border-kilimanjaro-700 bg-kilimanjaro-50/50 dark:bg-kilimanjaro-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-tanzania-500 transition-all text-kilimanjaro-900 dark:text-tanzania-50"
          >
            <option>Business & FDI Registration</option>
            <option>Visas & Residence Compliance</option>
            <option>Agriculture, Mining & Land</option>
            <option>Editorial Correction or Suggestion</option>
            <option>Partnerships & Intelligence</option>
            <option>Higher Education & Admissions</option>
            <option>Other General Question</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:text-tanzania-200 mb-1.5">
          Your Message *
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your inquiry or question in detail..."
          className="w-full px-4 py-3 rounded-xl border border-kilimanjaro-200 dark:border-kilimanjaro-700 bg-kilimanjaro-50/50 dark:bg-kilimanjaro-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-tanzania-500 transition-all resize-none text-kilimanjaro-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-tanzania-500 hover:bg-tanzania-600 text-white text-sm font-bold shadow-lg shadow-tanzania-500/25 transition-all active:scale-98 disabled:opacity-50"
      >
        <Send className="w-4 h-4" /> {loading ? 'Dispatching to info@tanzaniareach.com...' : 'Send Dispatch to info@tanzaniareach.com'}
      </button>
    </form>
  );
}
