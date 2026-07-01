'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('badge')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-white pr-4">{item.q}</span>
                <span className={`text-[#f47c5a] text-xl shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
