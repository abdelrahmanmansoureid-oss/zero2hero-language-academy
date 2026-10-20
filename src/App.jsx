import React, { useState, useEffect } from 'react';
import { translations } from './translations';

const WHATSAPP_NUMBER = '201041161062';
const WHATSAPP_DISPLAY = '+20 104 116 1062';
const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=61595698253351&sk=directory_contact_info';
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=696+El+Horreya+Rd,+El+Fairouza+Bldg,+Loran,+Alexandria+21532';

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.556 4.124 1.529 5.856l-1.529 5.584 5.716-1.5c1.682.912 3.606 1.433 5.656 1.433 6.627 0 12-5.373 12-12s-5.373-11.373-11.372-11.373z" />
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
      return localStorage.getItem('z2h_lang') || 'en';
    } catch {
      return 'en';
    }
  });
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Study Plan Matcher state
  const [studentName, setStudentName] = useState('');
  const [selectedModeIdx, setSelectedModeIdx] = useState(0);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState(0);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    try {
      localStorage.setItem('z2h_lang', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang, t.dir]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const filteredCourses =
    activeFilter === 'all'
      ? t.courses.items
      : t.courses.items.filter((course) => course.category === activeFilter);

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
      {/* Top Info Bar */}
      <div className="bg-[#0B2239] text-white text-xs sm:text-sm py-2.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-200 hover:text-[#D89F26] transition-colors"
          >
            <svg className="w-4 h-4 text-[#D89F26] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate max-w-[260px] sm:max-w-none">{t.topbarAddress}</span>
          </a>

          <div className="flex items-center gap-4 ms-auto">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              dir="ltr"
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#D89F26] transition-colors font-medium"
            >
              <svg className="w-3.5 h-3.5 text-[#D89F26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{WHATSAPP_DISPLAY}</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#D89F26] transition-colors font-medium"
            >
              <FacebookIcon className="w-4 h-4 text-[#D89F26]" />
              <span>{t.topbarFb}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Light Mode Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
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

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2239] leading-[1.15] tracking-tight">
                {t.hero.titleStart}{' '}
                <span className="inline-block px-3 py-0.5 rounded-xl bg-[#0B2239] text-white">
                  ZERO
                </span>{' '}
                {t.hero.titleTo}{' '}
                <span className="inline-block px-3 py-0.5 rounded-xl bg-[#D89F26] text-white">
                  HERO
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
                  src="./logo.png"
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
      <section id="modes" className="py-20 bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-3">
              {t.modes.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2239] tracking-tight">
              {t.modes.title}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">{t.modes.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Offline Campus Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0B2239] text-white text-xs font-bold">
                    {t.modes.offline.badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0B2239] flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-[#0B2239] mb-3">
                  {t.modes.offline.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">{t.modes.offline.desc}</p>

                <ul className="space-y-3 mb-8">
                  {t.modes.offline.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#0B2239]/10 text-[#0B2239] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={buildWhatsAppUrl(t.modes.offline.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#0B2239] hover:bg-[#133454] text-white font-bold transition-all shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <span>{t.modes.offline.cta}</span>
              </a>
            </div>

            {/* Live Online Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#D89F26] shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#FDF6E7] text-[#B98519] border border-[#D89F26]/40 text-xs font-bold">
                    {t.modes.online.badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#FDF6E7] text-[#D89F26] flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-[#0B2239] mb-3">
                  {t.modes.online.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">{t.modes.online.desc}</p>

                <ul className="space-y-3 mb-8">
                  {t.modes.online.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#FDF6E7] text-[#B98519] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={buildWhatsAppUrl(t.modes.online.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#D89F26] hover:bg-[#B98519] text-white font-bold transition-all shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>{t.modes.online.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* English Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FDF6E7] text-[#B98519] font-extrabold text-xs tracking-wider uppercase mb-3">
              {t.courses.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2239] tracking-tight">
              {t.courses.title}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">{t.courses.subtitle}</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {[
              { id: 'all', label: t.courses.filters.all },
              { id: 'speaking', label: t.courses.filters.speaking },
              { id: 'career', label: t.courses.filters.career },
              { id: 'youth', label: t.courses.filters.youth },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#0B2239] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-[#FDF6E7] hover:text-[#0B2239]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="bg-white rounded-3xl p-7 border border-slate-200 hover:border-[#D89F26] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-lg bg-[#0B2239]/5 text-[#0B2239] font-extrabold text-xs">
                      {course.level}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#FDF6E7] text-[#B98519] font-bold text-xs">
                      {t.courses.modeBadge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0B2239] group-hover:text-[#D89F26] transition-colors mb-3">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{course.desc}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 py-3 px-4 rounded-xl bg-slate-50 mb-5">
                    <span>⏱️ {course.duration}</span>
                    <span>🎓 {course.highlight}</span>
                  </div>

                  <a
                    href={buildWhatsAppUrl(course.waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 border-[#0B2239] text-[#0B2239] hover:bg-[#0B2239] hover:text-white font-bold text-sm transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>{t.courses.inquireBtn}</span>
                  </a>
                </div>
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
                        {c.title}
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
                    className="font-bold text-[#0B2239] hover:text-[#25D366]"
                  >
                    💬 WhatsApp: {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1877F2] hover:underline"
                  >
                    📘 {t.topbarFb}
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
