'use client';
import { useTranslations } from 'next-intl';

export default function PricingSection() {
  const t = useTranslations('pricing');
  const plans = t.raw('plans') as {
    tag: string;
    name: string;
    price: string;
    period: string;
    desc: string;
    features: string[];
    cta: string;
    url: string;
    highlight: boolean;
  }[];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-[#f47c5a] text-sm uppercase tracking-widest mb-3">{t('badge')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all flex flex-col ${
                plan.highlight
                  ? 'bg-[#f47c5a]/10 border-[#f47c5a]/60 shadow-lg shadow-[#f47c5a]/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#f47c5a] text-white text-xs font-bold px-4 py-1 rounded-full">
                    {t('popular')}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-[#4ecdc4] text-xs uppercase tracking-widest mb-2">{plan.tag}</p>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/50 text-sm mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-[#4ecdc4] mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-full font-medium text-sm transition-all ${
                  plan.highlight
                    ? 'bg-[#f47c5a] hover:bg-[#e06b49] text-white'
                    : 'border border-white/20 hover:border-white/40 text-white'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-sm mt-8">{t('note')}</p>
      </div>
    </section>
  );
}
