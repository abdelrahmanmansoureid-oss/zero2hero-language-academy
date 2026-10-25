import React, { useState, useEffect } from 'react';
import { translations } from './translations';

const WHATSAPP_NUMBER = '201041161062';
const WHATSAPP_DISPLAY = '+20 104 116 1062';
const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=61595698253351&sk=directory_contact_info';
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=696+El+Horreya+Rd,+El+Fairouza+Bldg,+Loran,+Alexandria+21532';

// 6 days, 11 hours, 23 minutes in seconds
const INITIAL_COUNTDOWN_SECONDS = 6 * 86400 + 11 * 3600 + 23 * 60;
const SESSION_STORAGE_KEY = 'z2h_session_offer_end_v1';

function getSessionRemainingSeconds() {
  try {
    let endTimestamp = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!endTimestamp) {
      endTimestamp = String(Date.now() + INITIAL_COUNTDOWN_SECONDS * 1000);
      sessionStorage.setItem(SESSION_STORAGE_KEY, endTimestamp);
    }
    const diffSeconds = Math.max(0, Math.floor((Number(endTimestamp) - Date.now()) / 1000));
    return diffSeconds;
  } catch {
    return INITIAL_COUNTDOWN_SECONDS;
  }
}

function formatTimeLeft(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.56 13.99C16.31 13.87 15.09 13.27 14.87 13.18C14.64 13.1 14.48 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 12.99 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.48 11.15 9.6 11.01 9.73 10.89C9.84 10.78 9.98 10.6 10.1 10.46C10.22 10.31 10.27 10.21 10.35 10.04C10.43 9.88 10.39 9.73 10.33 9.61C10.27 9.49 9.77 8.26 9.57 7.77C9.37 7.29 9.16 7.35 9.01 7.34C8.86 7.33 8.7 7.33 8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.01 8.49 7.01 9.71C7.01 10.94 7.9 12.13 8.02 12.3C8.14 12.46 9.77 14.98 12.27 16.06C12.86 16.32 13.33 16.47 13.69 16.58C14.29 16.77 14.83 16.74 15.26 16.68C15.74 16.61 16.73 16.08 16.93 15.51C17.14 14.93 17.14 14.44 17.08 14.34C17.01 14.24 16.81 14.11 16.56 13.99Z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('z2h_lang_v2') || 'ar';
    } catch {
      return 'ar';
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(() => getSessionRemainingSeconds());

  // Study Plan Matcher state
  const [studentName, setStudentName] = useState('');
  const [selectedModeIdx, setSelectedModeIdx] = useState(0);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState(0);

  const t = translations[lang];
  const timeLeft = formatTimeLeft(remainingSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(getSessionRemainingSeconds());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    try {
      localStorage.setItem('z2h_lang_v2', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang, t.dir]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleMatcherSubmit = (e) => {
    e.preventDefault();
    const chosenMode = t.matcher.modes[selectedModeIdx] || t.matcher.modes[0];
    const chosenCourse =
      t.courses.items[selectedCourseIdx]?.title || t.courses.items[0].title;
    const chosenLevel = t.matcher.levels[selectedLevelIdx] || t.matcher.levels[0];

    const message =
      lang === 'ar'
        ? `مرحباً أكاديمية ZERO2HERO للغات!\nالاسم: ${studentName}\nنظام الدراسة المفضل: ${chosenMode}\nالكورس المطلوب: ${chosenCourse}\nالمستوى الحالي: ${chosenLevel}\nأرغب في معرفة المواعيد المتاحة والتفاصيل.`
        : `Hello ZERO2HERO Language Academy!\nName: ${studentName}\nPreferred Mode: ${chosenMode}\nTarget Course: ${chosenCourse}\nCurrent Level: ${chosenLevel}\nI would like to know the available schedules and details.`;

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-[#0B2239] selection:bg-[#D89F26]/20 selection:text-[#0B2239]">
      {/* Sticky Light Mode Navbar */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md shadow-[#0B2239]/10' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <img
              src="./logo.png"
              alt="ZERO2HERO Language Academy"
              className="w-14 h-14 object-contain rounded-xl bg-white p-0.5 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B2239] leading-none">
                ZERO<span className="text-[#D89F26]">2</span>HERO
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-slate-500 mt-1">
                {t.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#home" className="hover:text-[#D89F26] transition-colors">
              {t.nav.home}
            </a>
            <a href="#modes" className="hover:text-[#D89F26] transition-colors">
              {t.nav.modes}
            </a>
            <a href="#courses" className="hover:text-[#D89F26] transition-colors">
              {t.nav.courses}
            </a>
            <a href="#matcher" className="hover:text-[#D89F26] transition-colors">
              {t.nav.matcher}
            </a>
            <a href="#why-us" className="hover:text-[#D89F26] transition-colors">
              {t.nav.whyUs}
            </a>
            <a href="#location" className="hover:text-[#D89F26] transition-colors">
              {t.nav.location}
            </a>
          </nav>

          {/* Actions: Language Toggle & WhatsApp Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-[#FDF6E7] hover:border-[#D89F26] text-[#0B2239] font-bold text-sm transition-all cursor-pointer"
              aria-label="Toggle Language"
            >
              <svg className="w-4 h-4 text-[#D89F26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{t.langToggleLabel}</span>
            </button>

            <a
              href={buildWhatsAppUrl(
                lang === 'ar'
                  ? 'مرحباً أكاديمية ZERO2HERO! أرغب في الاستفسار عن كورسات اللغة الإنجليزية.'
                  : 'Hello ZERO2HERO Language Academy! I would like to inquire about your English courses.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm shadow-md shadow-[#25D366]/25 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.nav.joinWhatsapp}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-[#0B2239] hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-2 shadow-lg">
            {[
              { href: '#home', label: t.nav.home },
              { href: '#modes', label: t.nav.modes },
              { href: '#courses', label: t.nav.courses },
              { href: '#matcher', label: t.nav.matcher },
              { href: '#why-us', label: t.nav.whyUs },
              { href: '#location', label: t.nav.location },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-[#0B2239] hover:bg-slate-50 hover:text-[#D89F26]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={buildWhatsAppUrl(
                lang === 'ar'
                  ? 'مرحباً أكاديمية ZERO2HERO! أرغب في الاستفسار عن كورسات اللغة الإنجليزية.'
                  : 'Hello ZERO2HERO Language Academy! I would like to inquire about your English courses.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{t.nav.joinWhatsapp}</span>
            </a>
          </div>
        )}
      </header>

      {/* Limited-Time Session Countdown Bar Under Navbar (Dark Mode Banner) */}
      <div className="bg-[#0B2239] text-white border-b border-[#D89F26]/40 py-4 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-4 text-center lg:text-start">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D89F26] text-[#0B2239] text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-sm">
              <span className="text-lg sm:text-xl leading-none">🔥</span>
              <span>{t.offerBanner.badge}</span>
            </span>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-white">
              {t.offerBanner.textBeforeAmount}{' '}
              <span className="text-red-500 font-extrabold">{t.offerBanner.amount}</span>{' '}
              {t.offerBanner.textAfterAmount}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Bigger Countdown Boxes */}
            <div dir="ltr" className="inline-flex items-center gap-2 sm:gap-2.5">
              {[
                { value: timeLeft.days, label: t.offerBanner.days },
                { value: timeLeft.hours, label: t.offerBanner.hours },
                { value: timeLeft.minutes, label: t.offerBanner.minutes },
                { value: timeLeft.seconds, label: t.offerBanner.seconds },
              ].map((unit, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-[#133454] border-2 border-[#D89F26] rounded-2xl px-3.5 py-2 min-w-[64px] sm:min-w-[74px] text-center shadow-md">
                    <span className="block text-xl sm:text-2xl font-extrabold text-[#D89F26] leading-none">
                      {unit.value}
                    </span>
                    <span className="block text-[11px] sm:text-xs font-bold text-slate-200 uppercase leading-none mt-1.5">
                      {unit.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="font-extrabold text-[#D89F26] text-xl sm:text-2xl">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <a
              href="#courses"
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#D89F26] hover:bg-[#B98519] text-[#0B2239] text-xs sm:text-sm font-extrabold transition-colors shadow-sm"
            >
              {t.offerBanner.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section (Light Mode) */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-white to-slate-50/70 pt-10 pb-20 lg:pt-16 lg:pb-24"
      >
        {/* Decorative light mode background blobs */}
        <div className="pointer-events-none absolute -top-24 -end-24 w-96 h-96 rounded-full bg-[#D89F26]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -start-24 w-80 h-80 rounded-full bg-[#0B2239]/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FDF6E7] border border-[#D89F26]/30 text-[#0B2239] text-xs sm:text-sm font-bold shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D89F26] animate-pulse" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2239] leading-tight tracking-tight">
                <span className="block mb-3">{t.hero.titleStart}</span>
                <span className="inline-flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="inline-block px-3.5 py-1 rounded-xl bg-[#0B2239] text-white">
                    ZERO
                  </span>
                  <span>{t.hero.titleTo}</span>
                  <span className="inline-block px-3.5 py-1 rounded-xl bg-[#D89F26] text-white">
                    HERO
                  </span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={buildWhatsAppUrl(
                    lang === 'ar'
                      ? 'مرحباً أكاديمية ZERO2HERO! أرغب في حجز اختبار تحديد المستوى في اللغة الإنجليزية.'
                      : 'Hello ZERO2HERO Language Academy! I want to book my English placement test.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#0B2239] hover:bg-[#133454] text-white font-bold text-base shadow-lg shadow-[#0B2239]/20 transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  <span>{t.hero.ctaPrimary}</span>
                </a>

                <a
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-[#FDF6E7] text-[#0B2239] border-2 border-[#0B2239]/15 hover:border-[#D89F26] font-bold text-base transition-all"
                >
                  <span>{t.hero.ctaSecondary}</span>
                </a>
              </div>

              {/* Key Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl">
                {t.hero.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-lg sm:text-2xl font-extrabold text-[#D89F26]">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Logo Card Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-100 shadow-2xl shadow-[#0B2239]/10">
                {/* Floating Badge Top */}
                <div className="absolute -top-5 start-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#FDF6E7] flex items-center justify-center text-lg">
                    🎓
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-[#0B2239]">{t.hero.chipTopTitle}</p>
                    <p className="text-[11px] text-slate-500">{t.hero.chipTopSub}</p>
                  </div>
                </div>

                <img
                  src="./logo-full.png"
                  alt="ZERO2HERO Language Academy Official Logo"
                  className="w-full h-auto max-h-80 object-contain mx-auto my-4"
                />

                {/* Floating Badge Bottom */}
                <div className="absolute -bottom-5 end-6 bg-[#0B2239] text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#D89F26] flex items-center justify-center text-lg">
                    🌍
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-white">{t.hero.chipBottomTitle}</p>
                    <p className="text-[11px] text-slate-300">{t.hero.chipBottomSub}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online & Offline Study Modes Section */}
      <section id="modes" className="py-14 bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-3">
              {t.modes.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2239] tracking-tight">
              {t.modes.title}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">{t.modes.subtitle}</p>
          </div>
        </div>
      </section>

      {/* English Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-3">
              {t.courses.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2239] tracking-tight">
              {t.courses.title}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">{t.courses.subtitle}</p>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {t.courses.items.map((course) => (
              <article
                key={course.id}
                className={`relative rounded-3xl p-7 sm:p-8 transition-all flex flex-col justify-between ${
                  course.featured
                    ? 'bg-gradient-to-b from-[#FFFDF8] to-white border-2 border-[#D89F26] shadow-xl shadow-[#D89F26]/10'
                    : 'bg-white border-2 border-slate-200 hover:border-[#D89F26] shadow-md hover:shadow-xl'
                }`}
              >
                {course.featured ? (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="px-4 py-1 rounded-full bg-[#D89F26] text-white font-extrabold text-xs tracking-wide shadow-md">
                      ⭐ {t.courses.bestValueBadge}
                    </span>
                  </div>
                ) : (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="px-3.5 py-1 rounded-full bg-[#0B2239] text-[#D89F26] font-extrabold text-[11px] tracking-wide shadow-sm">
                      {t.courses.limitedDiscountTag}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className="px-3 py-1 rounded-lg bg-[#0B2239]/5 text-[#0B2239] font-extrabold text-xs">
                      {course.badge}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs">
                      ⏱️ {course.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#0B2239] mb-3">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{course.desc}</p>

                  {/* Pricing Box: Offline vs Online */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 text-center">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        {t.courses.offlinePriceLabel}
                      </span>
                      {course.offlineOldPrice && (
                        <span className="block text-xs text-slate-400 line-through font-semibold">
                          {course.offlineOldPrice} {t.courses.currency}
                        </span>
                      )}
                      <span className="text-xl sm:text-2xl font-extrabold text-[#0B2239]">
                        {course.offlinePrice}
                      </span>{' '}
                      <span className="text-xs font-bold text-slate-600">
                        {t.courses.currency}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-[#FDF6E7]/80 border border-[#D89F26]/40 p-3.5 text-center">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#B98519] mb-1">
                        {t.courses.onlinePriceLabel}
                      </span>
                      {course.onlineOldPrice && (
                        <span className="block text-xs text-slate-400 line-through font-semibold">
                          {course.onlineOldPrice} {t.courses.currency}
                        </span>
                      )}
                      <span className="text-xl sm:text-2xl font-extrabold text-[#D89F26]">
                        {course.onlinePrice}
                      </span>{' '}
                      <span className="text-xs font-bold text-[#B98519]">
                        {t.courses.currency}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-7">
                    {course.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#0B2239]/10 text-[#0B2239] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={buildWhatsAppUrl(course.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 px-4 rounded-2xl font-bold text-sm transition-all shadow-md ${
                    course.featured
                      ? 'bg-[#D89F26] hover:bg-[#B98519] text-white'
                      : 'bg-[#0B2239] hover:bg-[#133454] text-white'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>{t.courses.inquireBtn}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Study Plan & Level Matcher */}
      <section id="matcher" className="py-20 bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#D89F26]/40 shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-2">
                {t.matcher.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2239]">
                {t.matcher.title}
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">{t.matcher.subtitle}</p>
            </div>

            <form onSubmit={handleMatcherSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#0B2239] mb-2">
                    {t.matcher.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder={t.matcher.namePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-[#0B2239] focus:outline-none focus:border-[#D89F26] focus:ring-2 focus:ring-[#D89F26]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0B2239] mb-2">
                    {t.matcher.modeLabel}
                  </label>
                  <select
                    value={selectedModeIdx}
                    onChange={(e) => setSelectedModeIdx(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-[#0B2239] focus:outline-none focus:border-[#D89F26] focus:ring-2 focus:ring-[#D89F26]/20"
                  >
                    {t.matcher.modes.map((m, idx) => (
                      <option key={idx} value={idx}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#0B2239] mb-2">
                    {t.matcher.goalLabel}
                  </label>
                  <select
                    value={selectedCourseIdx}
                    onChange={(e) => setSelectedCourseIdx(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-[#0B2239] focus:outline-none focus:border-[#D89F26] focus:ring-2 focus:ring-[#D89F26]/20"
                  >
                    {t.courses.items.map((c, idx) => (
                      <option key={c.id} value={idx}>
                        {c.title} ({c.duration} • {c.offlinePrice} / {c.onlinePrice} {t.courses.currency})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0B2239] mb-2">
                    {t.matcher.levelLabel}
                  </label>
                  <select
                    value={selectedLevelIdx}
                    onChange={(e) => setSelectedLevelIdx(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-[#0B2239] focus:outline-none focus:border-[#D89F26] focus:ring-2 focus:ring-[#D89F26]/20"
                  >
                    {t.matcher.levels.map((lvl, idx) => (
                      <option key={idx} value={idx}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-base shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>{t.matcher.submitBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose ZERO2HERO */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-3">
              {t.whyUs.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2239]">
              {t.whyUs.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyUs.items.map((item, idx) => {
              const icons = ['🗣️', '🏆', '📍', '📈'];
              return (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-[#FDF6E7]/60 rounded-3xl p-7 border border-slate-200/80 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-2xl mb-5">
                    {icons[idx]}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0B2239] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="location" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-3">
              {t.contact.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2239]">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              {/* Address */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0B2239] text-[#D89F26] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B2239]">{t.contact.addressTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {t.contact.addressText}
                  </p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-bold text-[#D89F26] hover:text-[#B98519]"
                  >
                    {t.contact.openMaps}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B2239]">{t.contact.waTitle}</h3>
                  <p dir="ltr" className="text-base font-bold text-slate-700 mt-1">
                    {WHATSAPP_DISPLAY}
                  </p>
                  <a
                    href={buildWhatsAppUrl(
                      lang === 'ar'
                        ? 'مرحباً أكاديمية ZERO2HERO للغات!'
                        : 'Hello ZERO2HERO Language Academy!'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-bold text-[#25D366] hover:underline"
                  >
                    {t.contact.waAction}
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                  <FacebookIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B2239]">{t.contact.fbTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.contact.fbDesc}</p>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-bold text-[#1877F2] hover:underline"
                  >
                    {t.contact.fbAction}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm min-h-[380px]">
              <iframe
                title="ZERO2HERO Language Academy - 696 El Horreya Rd, Loran, Alexandria"
                src="https://www.google.com/maps?q=696+El+Horreya+Rd,+Loran,+Alexandria,+Egypt&output=embed"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Light-Accented Footer */}
      <footer className="bg-white border-t border-slate-200 pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-200">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="./logo.png"
                  alt="ZERO2HERO Language Academy"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="text-xl font-extrabold text-[#0B2239] block leading-none">
                    ZERO<span className="text-[#D89F26]">2</span>HERO
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-slate-500">
                    {t.brandSubtitle}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 max-w-sm leading-relaxed">{t.footer.about}</p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#0B2239]">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 font-medium">
                <li>
                  <a href="#home" className="hover:text-[#D89F26]">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#modes" className="hover:text-[#D89F26]">
                    {t.nav.modes}
                  </a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-[#D89F26]">
                    {t.nav.courses}
                  </a>
                </li>
                <li>
                  <a href="#matcher" className="hover:text-[#D89F26]">
                    {t.nav.matcher}
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-[#D89F26]">
                    {t.nav.location}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#0B2239]">
                {t.footer.contactTitle}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>📍 {t.topbarAddress}</li>
                <li>
                  <a
                    href={buildWhatsAppUrl('Hello ZERO2HERO Language Academy!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="inline-flex items-center gap-2 font-bold text-[#0B2239] hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-[#1877F2] hover:underline"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#1877F2] shrink-0" />
                    <span>{t.topbarFb}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>
              © {new Date().getFullYear()} ZERO2HERO Language Academy. {t.footer.rights}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggleLanguage}
                className="font-bold text-[#0B2239] hover:text-[#D89F26] cursor-pointer"
              >
                🌐 {t.langToggleLabel}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={buildWhatsAppUrl(
          lang === 'ar'
            ? 'مرحباً أكاديمية ZERO2HERO للغات! أرغب في الاستفسار عن كورسات الإنجليزي المتاحة.'
            : 'Hello ZERO2HERO Language Academy! I would like to ask about your English courses.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 end-6 z-50 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-sm shadow-xl whatsapp-pulse transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span>{t.footer.floatingWa}</span>
      </a>
    </div>
  );
}
