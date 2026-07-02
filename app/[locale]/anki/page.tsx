'use client';
import { useLocale } from 'next-intl';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

const SECTIONS = [
  { en: 'Biochemistry',                       ru: 'Биохимия' },
  { en: 'Cardiovascular',                     ru: 'Кардиология' },
  { en: 'Endocrine',                          ru: 'Эндокринология' },
  { en: 'Gastrointestinal',                   ru: 'Гастроэнтерология' },
  { en: 'Hematology & Oncology',              ru: 'Гематология и Онкология' },
  { en: 'Immunology',                         ru: 'Иммунология' },
  { en: 'Microbiology',                       ru: 'Микробиология' },
  { en: 'Musculoskeletal, Skin & Connective', ru: 'Опорно-двигательная система' },
  { en: 'Neurology & Special Senses',         ru: 'Неврология' },
  { en: 'Pathology',                          ru: 'Патология' },
  { en: 'Pharmacology',                       ru: 'Фармакология' },
  { en: 'Psychiatry',                         ru: 'Психиатрия' },
  { en: 'Renal',                              ru: 'Нефрология' },
  { en: 'Reproductive',                       ru: 'Репродуктивная система' },
  { en: 'Respiratory',                        ru: 'Пульмонология' },
];

export default function AnkiPage() {
  const locale = useLocale();
  const isRu = locale === 'ru';

  return (
    <>
      <NavBar />
      <main className="bg-[#0a0f1e] text-white min-h-screen font-sans">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

          <a href={isRu ? '/ru' : '/'} className="text-white/40 hover:text-white text-sm mb-12 transition-colors inline-block">
            ← {isRu ? 'Назад' : 'Back'}
          </a>

          {/* Header */}
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">Anki</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {isRu ? 'Anki-карточки' : 'Anki Decks'}
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-4">
            {isRu
              ? 'Одна большая колода охватывает все разделы USMLE Step 1 — внутри уже всё разделено по темам и подтемам, как в Mnemosyne на скриншоте выше.'
              : 'One complete deck covering all USMLE Step 1 disciplines — organized by topics and subtopics inside.'}
          </p>

          {/* Sections list */}
          <div className="flex flex-wrap gap-2 mb-16">
            {SECTIONS.map((s) => (
              <span key={s.en} className="text-xs px-3 py-1 rounded-full bg-[#f47c5a]/10 text-[#f47c5a] border border-[#f47c5a]/20">
                {isRu ? s.ru : s.en}
              </span>
            ))}
          </div>

          {/* 2 кнопки */}
          {isRu ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://patreon.com/drasiiavinograd"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f47c5a] hover:bg-[#e06b49] text-white px-8 py-4 rounded-full font-medium transition-colors text-center"
              >
                Скачать на русском
              </a>
              <a
                href="https://patreon.com/drasiiavinograd"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#f47c5a]/40 hover:border-[#f47c5a] text-[#f47c5a] px-8 py-4 rounded-full font-medium transition-colors text-center"
              >
                Скачать на английском
              </a>
            </div>
          ) : (
            <a
              href="https://patreon.com/drasiiavinograd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#f47c5a] hover:bg-[#e06b49] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Download All Decks
            </a>
          )}

          <p className="text-white/30 text-sm mt-6">
            {isRu
              ? 'Доступно по подписке USMLE Club — $30/мес'
              : 'Available with USMLE Club subscription — $30/month'}
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
