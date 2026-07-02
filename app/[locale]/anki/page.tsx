'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const DECKS = [
  { slug: 'microbiology', color: '#f47c5a', cards: 320 },
  { slug: 'pharmacology', color: '#4ecdc4', cards: 280 },
  { slug: 'cardiology', color: '#a78bfa', cards: 240 },
  { slug: 'pathology', color: '#f59e0b', cards: 260 },
  { slug: 'gi-hepatology', color: '#34d399', cards: 200 },
  { slug: 'immunology', color: '#60a5fa', cards: 180 },
  { slug: 'nephrology-pulmonology', color: '#f472b6', cards: 220 },
  { slug: 'neurology-psychiatry', color: '#fb923c', cards: 200 },
];

export default function AnkiPage() {
  const locale = useLocale();
  const router = useRouter();

  const names: Record<string, { en: string; ru: string }> = {
    'microbiology':            { en: 'Microbiology',             ru: 'Микробиология' },
    'pharmacology':            { en: 'Pharmacology',             ru: 'Фармакология' },
    'cardiology':              { en: 'Cardiology',               ru: 'Кардиология' },
    'pathology':               { en: 'Pathology',                ru: 'Патология' },
    'gi-hepatology':           { en: 'GI & Hepatology',          ru: 'ЖКТ и Гепатология' },
    'immunology':              { en: 'Immunology',               ru: 'Иммунология' },
    'nephrology-pulmonology':  { en: 'Nephrology & Pulmonology', ru: 'Нефрология и Пульмонология' },
    'neurology-psychiatry':    { en: 'Neurology & Psychiatry',   ru: 'Неврология и психиатрия' },
  };

  const isRu = locale === 'ru';
  const totalCards = DECKS.reduce((sum, d) => sum + d.cards, 0);

  return (
    <main className="bg-[#0a0f1e] text-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* Back */}
        <button onClick={() => router.back()} className="text-white/40 hover:text-white text-sm mb-12 transition-colors">
          ← {isRu ? 'Назад' : 'Back'}
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">
            {isRu ? 'Бесплатно' : 'Free'}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {isRu ? 'Anki-карточки' : 'Anki Decks'}
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            {isRu
              ? `${totalCards}+ карточек по всем разделам USMLE Step 1 — на русском языке. Бесплатно.`
              : `${totalCards}+ cards covering all USMLE Step 1 disciplines — in Russian. Free.`}
          </p>
        </div>

        {/* Unique advantage */}
        <div className="bg-[#f47c5a]/10 border border-[#f47c5a]/30 rounded-2xl p-6 mb-12">
          <p className="text-[#f47c5a] font-semibold mb-1">
            {isRu ? 'Уникальное преимущество' : 'Unique advantage'}
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            {isRu
              ? 'Anki-колоды на русском языке для USMLE — таких нет больше нигде. Учи медицинскую терминологию в контексте экзамена, не теряя время на перевод.'
              : 'Anki decks in Russian for USMLE — available nowhere else. Learn medical terminology in exam context without wasting time on translation.'}
          </p>
        </div>

        {/* Decks grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {DECKS.map((deck) => {
            const name = names[deck.slug][isRu ? 'ru' : 'en'];
            return (
              <div
                key={deck.slug}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between"
                style={{ borderLeftWidth: '3px', borderLeftColor: deck.color + '90' }}
              >
                <div>
                  <div className="font-semibold mb-1" style={{ color: deck.color }}>{name}</div>
                  <div className="text-white/40 text-sm">{deck.cards} {isRu ? 'карточек' : 'cards'}</div>
                </div>
                <a
                  href="https://patreon.com/drasiiavinograd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-4 py-2 rounded-full border transition-colors"
                  style={{ borderColor: deck.color + '60', color: deck.color }}
                >
                  {isRu ? 'Скачать' : 'Download'}
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isRu ? 'Все колоды — бесплатно' : 'All decks — free'}
          </h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            {isRu
              ? 'Подпишитесь на Patreon или Tribute и скачайте все Anki-колоды сразу'
              : 'Subscribe on Patreon and download all Anki decks at once'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://patreon.com/drasiiavinograd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f47c5a] hover:bg-[#e06b49] text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Patreon — $30/мес
            </a>
            <a
              href="https://t.me/usmle_vinograd"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              {isRu ? 'Telegram-канал' : 'Telegram channel'}
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
