import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  Globe2, 
  Building2, 
  Compass, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us & Direct Desk',
  description:
    'Connect with Tanzania Reach editorial, research, and investor relations desks. Phone: +255 792 867 427, Email: info@tanzaniareach.com. Dar es Salaam, United Republic of Tanzania.',
  alternates: {
    canonical: 'https://www.tanzaniareach.com/contact',
  },
  openGraph: {
    title: 'Contact Us & Direct Desk | Tanzania Reach',
    description:
      'Official contact channels for Tanzania Reach. Phone: +255 792 867 427, Email: info@tanzaniareach.com.',
    url: 'https://www.tanzaniareach.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50">
      <main>
        {/* ——— Hero Section ——— */}
        <section className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-24 max-w-[1400px] mx-auto overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem] z-10">
          <div className="absolute inset-0 -z-20 bg-kilimanjaro-950">
            <Image
              src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201989/tanzania_connect/static/dar-es-salaam.jpg"
              alt="Dar es Salaam Waterfront Cityscape"
              fill
              priority
              className="object-cover opacity-25 select-none pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-tanzania-900/50 via-kilimanjaro-950/70 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tanzania-50/70 to-tanzania-50 dark:via-kilimanjaro-950/80 dark:to-kilimanjaro-950 z-10 pointer-events-none" />

          <div className="relative z-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-tanzania-600 dark:text-tanzania-400 hover:text-tanzania-700 dark:hover:text-tanzania-300 transition-colors mb-6 sm:mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-300 text-[10px] font-black uppercase tracking-[0.2em] border border-tanzania-500/20 mb-4 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Direct Desk · United Republic of Tanzania
              </div>

              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.98] text-kilimanjaro-900 dark:text-tanzania-50 mb-4 sm:mb-6">
                Connect with<br />
                <span className="text-tanzania-500">Tanzania Reach.</span>
              </h1>

              <p className="text-base sm:text-lg text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed font-light">
                Have questions regarding sector guides, regulatory insights, investment facilitation, or platform corrections?
                Reach our team directly via phone, WhatsApp, or official email.
              </p>
            </div>
          </div>
        </section>

        {/* ——— Main Contact Grid ——— */}
        <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-10 sm:py-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Direct Channels Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Direct Card */}
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white to-tanzania-50/50 dark:from-kilimanjaro-900 dark:to-kilimanjaro-950 border border-tanzania-200/80 dark:border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-tanzania-500 text-white flex items-center justify-center shadow-lg shadow-tanzania-500/30">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-kilimanjaro-950 dark:text-white">Direct Phone Desk</h2>
                    <p className="text-xs text-kilimanjaro-500 dark:text-tanzania-300">Voice Calls & WhatsApp Dispatch</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-kilimanjaro-900/5 dark:border-white/5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-kilimanjaro-400">Primary Phone Line</span>
                    <a
                      href="tel:+255792867427"
                      className="text-xl sm:text-2xl font-black text-tanzania-600 dark:text-tanzania-400 hover:underline block mt-0.5 tracking-tight"
                    >
                      +255 792 867 427
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3">
                    <a
                      href="tel:+255792867427"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tanzania-500 hover:bg-tanzania-600 text-white text-xs font-bold transition-all shadow-md shadow-tanzania-500/20 active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Now
                    </a>
                    <a
                      href="https://wa.me/255792867427?text=Hello%20Tanzania%20Reach%20Desk%2C%20I%20am%20inquiring%20about%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Desk
                    </a>
                  </div>
                </div>
              </div>

              {/* Official Email Card */}
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white to-tanzania-50/50 dark:from-kilimanjaro-900 dark:to-kilimanjaro-950 border border-tanzania-200/80 dark:border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zanzibar-500 text-white flex items-center justify-center shadow-lg shadow-zanzibar-500/30">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-kilimanjaro-950 dark:text-white">Editorial & Advisory Desk</h2>
                    <p className="text-xs text-kilimanjaro-500 dark:text-tanzania-300">Official Electronic Mail</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-kilimanjaro-900/5 dark:border-white/5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-kilimanjaro-400">Inquiry & Editorial Email</span>
                    <a
                      href="mailto:info@tanzaniareach.com"
                      className="text-lg sm:text-xl font-black text-zanzibar-600 dark:text-zanzibar-400 hover:underline block mt-0.5"
                    >
                      info@tanzaniareach.com
                    </a>
                  </div>
                  <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-200/80 leading-relaxed font-light">
                    Guaranteed response within 2–4 business hours for investment briefing queries and manual updates.
                  </p>
                </div>
              </div>

              {/* Operating Hours & Locations */}
              <div className="rounded-3xl p-6 sm:p-8 bg-kilimanjaro-950 text-white shadow-xl">
                <h3 className="text-sm font-black uppercase tracking-widest text-tanzania-400 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-tanzania-400" />
                  Operating Hours & Presence
                </h3>
                
                <div className="space-y-3 text-xs text-white/80">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span>Monday – Friday:</span>
                    <span className="font-bold text-white">08:00 – 18:00 EAT (UTC+3)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span>Saturday:</span>
                    <span className="font-bold text-white">09:00 – 13:00 EAT</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Sunday & Public Holidays:</span>
                    <span className="text-white/50">Emergency / Async Email</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-tanzania-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Dar es Salaam Commercial Liaison · Arusha Northern Safari Desk · Dodoma Administrative Hub
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form & Quick Links */}
            <div className="lg:col-span-7 space-y-6">
              {/* Message Dispatch Card */}
              <div className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-kilimanjaro-900/60 border border-kilimanjaro-900/10 dark:border-white/10 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-kilimanjaro-900 dark:text-white">
                    Send a Message to the Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-kilimanjaro-600 dark:text-tanzania-300 mt-1 font-light">
                    Fill out your details below. Your dispatch is securely routed to our domain researchers.
                  </p>
                </div>

                <ContactForm />
              </div>

              {/* Direct Government & Authority Reference Card */}
              <div className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-kilimanjaro-900/30 border border-kilimanjaro-900/10 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-kilimanjaro-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-tanzania-500" />
                    Looking for Official Government Authorities?
                  </h4>
                  <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-300 mt-1">
                    For direct agency hotlines (TIC, BRELA, TRA, Immigration, TANESCO), explore the Directory.
                  </p>
                </div>
                <Link
                  href="/directory"
                  className="shrink-0 px-4 py-2 rounded-xl bg-kilimanjaro-100 dark:bg-kilimanjaro-800 text-kilimanjaro-900 dark:text-tanzania-100 text-xs font-bold hover:bg-kilimanjaro-200 dark:hover:bg-kilimanjaro-700 transition-colors inline-flex items-center gap-1.5"
                >
                  View Directory →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
