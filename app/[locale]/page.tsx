'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import ContactModal from '../../components/ContactModal';
import ProblemSection from '../../components/ProblemSection';
import PricingSection from '../../components/PricingSection';
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const path = window.location.pathname;
    if (newLocale === 'en') {
      window.location.href = path.startsWith('/ru') ? (path.slice(3) || '/') : path;
      return;
    }
    if (!path.startsWith('/ru')) {
      window.location.href = '/ru' + path;
    }
  };

  const navLinks = [
    { key: 'about', label: t('nav.about') },
    { key: 'curriculum', label: t('nav.curriculum') },
    { key: 'lectures', label: t('nav.lectures') },
    { key: 'pricing', label: t('nav.pricing') },
    { key: 'connect', label: t('nav.connect') },
  ];

  const aboutItems = t.raw('about.items') as {label: string, sub: string}[];
  const curriculumItems = t.raw('curriculum.items') as {title: string, topics: string}[];
  const lectureItems = t.raw('lectures.items') as {tag: string, title: string, desc: string, url: string, soon: boolean}[];
  const platforms = t.raw('connect.platforms') as {name: string, sub: string, url: string}[];

  return (
    <main className="bg-[#0a0f1e] text-white min-h-screen font-sans">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Dr. Vinograd</span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.key} href={`#${link.key}`} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</a>
            ))}
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-1">
              <button onClick={() => switchLocale('en')} className={`px-3 py-1 rounded-full text-sm transition-all ${locale === 'en' ? 'bg-white text-[#0a0f1e] font-medium' : 'text-white/60 hover:text-white'}`}>EN</button>
              <button onClick={() => switchLocale('ru')} className={`px-3 py-1 rounded-full text-sm transition-all ${locale === 'ru' ? 'bg-white text-[#0a0f1e] font-medium' : 'text-white/60 hover:text-white'}`}>RU</button>
            </div>
            <a href={locale === 'ru' ? '/ru/auth' : '/auth'} className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full transition-colors">
              {locale === 'ru' ? 'Войти' : 'Sign In'}
            </a>
            <button onClick={() => setModalOpen(true)} className="bg-[#f47c5a] hover:bg-[#e06b49] text-white text-sm px-4 py-2 rounded-full transition-colors">{t('nav.cta')}</button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0a0f1e] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <a key={link.key} href={`#${link.key}`} className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
            <div className="flex gap-2">
              <button onClick={() => switchLocale('en')} className={`px-3 py-1 rounded-full text-sm ${locale === 'en' ? 'bg-white text-[#0a0f1e]' : 'text-white/60'}`}>EN</button>
              <button onClick={() => switchLocale('ru')} className={`px-3 py-1 rounded-full text-sm ${locale === 'ru' ? 'bg-white text-[#0a0f1e]' : 'text-white/60'}`}>RU</button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
          <span className="w-2 h-2 bg-[#4ecdc4] rounded-full animate-pulse"></span>
          {t('hero.badge')}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{t('hero.title')}</h1>
        <p className="text-3xl md:text-4xl font-light mb-6">
          <span className="text-[#f47c5a]">MD</span>, <span className="text-[#4ecdc4]">PhD</span>
        </p>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">{t('hero.desc')}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="https://youtube.com/@USMLEforIMG" target="_blank" rel="noopener noreferrer" className="bg-[#f47c5a] hover:bg-[#e06b49] text-white px-8 py-3 rounded-full font-medium transition-colors">{t('hero.btn1')}</a>
          <a href="#about" className="border border-white/30 hover:border-white/60 text-white px-8 py-3 rounded-full font-medium transition-colors">{t('hero.btn2')}</a>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl w-full">
          {['1','2','3','4'].map(n => (
            <div key={n} className="text-center">
              <div className="text-3xl font-bold text-[#4ecdc4]">{t(`hero.stat${n}value`)}</div>
              <div className="text-white/50 text-sm mt-1">{t(`hero.stat${n}label`)}</div>
            </div>
          ))}
        </div>
      </section>

      <ProblemSection />

      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('about.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('about.title')}</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <Image src="/asiia.jpg" alt="Dr. Asiia Vinograd" width={320} height={420} className="rounded-3xl object-cover object-top shadow-2xl" priority />
            </div>
            <div>
              <p className="text-white/70 text-lg leading-relaxed mb-6">{t('about.p1')}</p>
              <p className="text-white/70 text-lg leading-relaxed mb-10">{t('about.p2')}</p>
              <div className="space-y-4">
                {aboutItems.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#4ecdc4] rounded-full mt-2.5 shrink-0"></div>
                    <div>
                      <span className="font-medium">{item.label}</span>
                      <span className="text-white/50 text-sm ml-2">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="trending" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('trending.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('trending.title')}</h2>
          <p className="text-white/50 text-lg mb-16 max-w-2xl">{t('trending.desc')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t.raw('trending.items') as {title: string, desc: string, tag: string}[]).map(item => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f47c5a]/40 transition-all">
                <div className="text-[#4ecdc4] text-xs mb-3">{item.tag}</div>
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('curriculum.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('curriculum.title')}</h2>
          <p className="text-white/50 text-lg mb-16 max-w-2xl">{t('curriculum.desc')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculumItems.map((item, i) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#4ecdc4]/40 transition-all">
                <div className="text-[#4ecdc4] text-xs font-mono mb-3">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-semibold mb-2">{item.title}</div>
                <div className="text-white/40 text-sm leading-relaxed">{item.topics}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lectures" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('lectures.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('lectures.title')}</h2>
          <p className="text-white/50 text-lg mb-16 max-w-2xl">{t('lectures.desc')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectureItems.map(lecture => (
              <a key={lecture.title} href={lecture.url} target="_blank" rel="noopener noreferrer" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f47c5a]/40 transition-all block">
                <div className="text-[#4ecdc4] text-xs mb-3">{lecture.tag}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#f47c5a] transition-colors">{lecture.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{lecture.desc}</p>
                <span className="text-[#f47c5a] text-sm">{lecture.soon ? t('lectures.joinBtn') : t('lectures.watchBtn')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section id="connect" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('connect.tag')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('connect.title')}</h2>
          <p className="text-white/50 text-lg mb-16 max-w-2xl mx-auto">{t('connect.desc')}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map(platform => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="font-semibold mb-1">{platform.name}</div>
                <div className="text-white/40 text-xs">{platform.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/50 text-sm">{t('footer.copy')}</div>
          <div className="flex gap-6">
            {[
              { name: 'YouTube', url: 'https://youtube.com/@USMLEforIMG' },
              { name: 'Patreon', url: 'https://patreon.com/drasiiavinograd' },
              { name: 'Discord', url: 'https://discord.gg/Yn4hrf5nH' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/asiia-vinograd' },
            ].map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">{link.name}</a>
            ))}
          </div>
        </div>
      </footer>
          <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} locale={locale} />
    </main>
  );
}
