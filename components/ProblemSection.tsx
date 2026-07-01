'use client';
import { useTranslations } from 'next-intl';

const icons = ['📚', '🌐', '🗺️', '📊', '❓', '👤'];
const keys = ['chaos', 'language', 'noSystem', 'noProgress', 'format', 'alone'];

export default function ProblemSection() {
  const t = useTranslations('problem');

  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('badge')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keys.map((key, index) => (
            <div
              key={key}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f47c5a]/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-0.5">{icons[index]}</div>
                <div>
                  <p className="text-[#4ecdc4] text-xs font-mono mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-semibold text-white text-base mb-2">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 text-base">
            {t('cta')}
          </p>
        </div>

      </div>
    </section>
  );
}
