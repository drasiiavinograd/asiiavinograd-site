'use client';
import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function NavBar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === 'en') {
      const path = window.location.pathname;
      window.location.href = path.startsWith('/ru') ? (path.slice(3) || '/') : path;
    } else {
      const path = window.location.pathname;
      if (!path.startsWith('/ru')) window.location.href = '/ru' + path;
    }
  };

  const homeUrl = locale === 'ru' ? '/ru' : '/';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href={homeUrl} className="font-bold text-lg tracking-tight text-white hover:text-white/80 transition-colors">
          {t('siteTitle')}
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href={homeUrl + '#curriculum'} className="text-sm text-white/70 hover:text-white transition-colors">{t('curriculum')}</a>
          <a href={homeUrl + '#lectures'} className="text-sm text-white/70 hover:text-white transition-colors">{t('lectures')}</a>
          <a href={homeUrl + '#pricing'} className="text-sm text-white/70 hover:text-white transition-colors">{t('pricing')}</a>
          <a href={homeUrl + '#connect'} className="text-sm text-white/70 hover:text-white transition-colors">{t('connect')}</a>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-1">
            <button onClick={() => switchLocale('en')} className={`px-3 py-1 rounded-full text-sm transition-all ${locale === 'en' ? 'bg-white text-[#0a0f1e] font-medium' : 'text-white/60 hover:text-white'}`}>EN</button>
            <button onClick={() => switchLocale('ru')} className={`px-3 py-1 rounded-full text-sm transition-all ${locale === 'ru' ? 'bg-white text-[#0a0f1e] font-medium' : 'text-white/60 hover:text-white'}`}>RU</button>
          </div>
          <a href={locale === 'ru' ? '/ru/auth' : '/auth'} className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full transition-colors">
            {locale === 'ru' ? 'Войти' : 'Sign In'}
          </a>
        </div>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0a0f1e] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <a href={homeUrl} className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('siteTitle')}</a>
          <a href={homeUrl + '#curriculum'} className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('curriculum')}</a>
          <a href={homeUrl + '#lectures'} className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('lectures')}</a>
          <div className="flex gap-2 mt-2">
            <button onClick={() => switchLocale('en')} className={`px-3 py-1 rounded-full text-sm ${locale === 'en' ? 'bg-white text-[#0a0f1e]' : 'text-white/60'}`}>EN</button>
            <button onClick={() => switchLocale('ru')} className={`px-3 py-1 rounded-full text-sm ${locale === 'ru' ? 'bg-white text-[#0a0f1e]' : 'text-white/60'}`}>RU</button>
          </div>
        </div>
      )}
    </nav>
  );
}
