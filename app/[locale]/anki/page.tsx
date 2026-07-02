'use client';
import { useLocale } from 'next-intl';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

const DECKS = [
  { slug: 'microbiology',           cards: 320 },
  { slug: 'pharmacology',           cards: 280 },
  { slug: 'cardiology',             cards: 240 },
  { slug: 'pathology',              cards: 260 },
  { slug: 'gi-hepatology',          cards: 200 },
  { slug: 'immunology',             cards: 180 },
  { slug: 'nephrology-pulmonology', cards: 220 },
  { slug: 'neurology-psychiatry',   cards: 200 },
  { slug: 'gastroenterology',       cards: 190 },
];

const NAMES: Record<string, { en: string; ru: string }> = {
  'microbiology':            { en: 'Microbiology',             ru: 'Микробиология' },
  'pharmacology':            { en: 'Pharmacology',             ru: 'Фармакология' },
  'cardiology':              { en: 'Cardiology',               ru: 'Кардиология' },
  'pathology':               { en: 'Pathology',                ru: 'Патология' },
  'gi-hepatology':           { en: 'GI & Hepatology',          ru: 'ЖКТ и Гепатология' },
  'immunology':              { en: 'Immunology',               ru: 'Иммунология' },
  'nephrology-pulmonology':  { en: 'Nephrology & Pulmonology', ru: 'Нефрология и Пульмонология' },
  'neurology-psychiatry':    { en: 'Neurology & Psychiatry',   ru: 'Неврология и психиатрия' },
  'gastroenterology':        { en: 'Gastroenterology',         ru: 'Гастроэнтерология' },
};

const COLOR = '#f47c5a';
const totalCards = DECKS.reduce((sum, d) => sum + d.cards, 0);

export default function AnkiPage() {
  const locale = useLocale();
  const isRu = locale === 'ru';

  return (
    <>
      <NavBar />
      <main className="bg-[#0a0f1e] text-white min-h-screen font-sans">
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">

          {/* Back */}
          <a href={isRu ? '/ru' : '/'} className="text-white/40 hover:text-white text-sm mb-12 transition-colors inline-block">
            ← {isRu ? 'Назад' : 'Back'}
          </a>

          {/* Header */}
          <div className="mb-4">
            <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">
              {isRu ? 'Бесплатно по подписке' : 'Free with subscription'}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {isRu ? 'Anki-карточки' : 'Anki Decks'}
            </h1>
            <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
              {isRu
                ? `${totalCards}+ карточек по всем разделам USMLE Step 1 на русском языке. Внутри каждой колоды — подразделения по темам.`
                : `${totalCards}+ cards covering all USMLE Step 1 disciplines. Each deck contains topic subdivisions.`}
            </p>
          </div>

          {/* Unique advantage */}
          <div className="bg-[#f47c5a]/10 border border-[#f47c5a]/30 rounded-2xl p-6 mb-16">
            <p className="text-[#f47c5a] font-semibold mb-1">
              {isRu ? 'Уникальное преимущество' : 'Unique advantage'}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              {isRu
                ? 'Anki-колоды на русском языке для USMLE — таких нет больше нигде. Учи медицинскую терминологию в контексте экзамена, не теряя время на перевод.'
                : 'Anki decks in Russian for USMLE — available nowhere else. Learn medical terminology in exam context.'}
            </p>
          </div>

          {/* Decks grid — все оранжевые */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {DECKS.map((deck) => {
              const name = NAMES[deck.slug][isRu ? 'ru' : 'en'];
              return (
                <div
                  key={deck.slug}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-[#f47c5a]/5 hover:border-[#f47c5a]/30 transition-all"
                  style={{ borderLeftWidth: '3px', borderLeftColor: COLOR + '80' }}
                >
                  <div className="font-semibold text-[#f47c5a] mb-1">{name}</div>
                  <div className="text-white/40 text-sm mb-4">{deck.cards} {isRu ? 'карточек' : 'cards'}</div>
                  <a
                    href="https://patreon.com/drasiiavinograd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-white/50 hover:text-[#f47c5a] transition-colors"
                  >
                    {isRu ? 'Скачать отдельно →' : 'Download separately →'}
                  </a>
                </div>
              );
            })}
          </div>

          {/* CTA — скачать всё */}
          <div className="bg-[#f47c5a]/10 border border-[#f47c5a]/30 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-3">
              {isRu ? 'Скачать все колоды сразу' : 'Download all decks at once'}
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              {isRu
                ? 'Удобнее всего скачать одну общую колоду — внутри уже всё разделено по темам и разделам.'
                : 'The easiest way is to download one complete deck — topics and sections are already organized inside.'}
            </p>
            {isRu ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://patreon.com/drasiiavinograd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f47c5a] hover:bg-[#e06b49] text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Скачать все на русском
                </a>
                <a
                  href="https://patreon.com/drasiiavinograd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#f47c5a]/40 hover:border-[#f47c5a] text-[#f47c5a] px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Скачать все на английском
                </a>
              </div>
            ) : (
              <a
                href="https://patreon.com/drasiiavinograd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#f47c5a] hover:bg-[#e06b49] text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Download All Decks
              </a>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
