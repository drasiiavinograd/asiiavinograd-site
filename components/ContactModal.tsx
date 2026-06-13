'use client';
import { useState, useEffect } from 'react';

const countries = [
  { code: '+1', flag: '🇺🇸', name: 'US', digits: 10 },
  { code: '+44', flag: '🇬🇧', name: 'UK', digits: 10 },
  { code: '+7', flag: '🇷🇺', name: 'RU', digits: 10 },
  { code: '+66', flag: '🇹🇭', name: 'TH', digits: 9 },
  { code: '+49', flag: '🇩🇪', name: 'DE', digits: 10 },
  { code: '+33', flag: '🇫🇷', name: 'FR', digits: 9 },
  { code: '+91', flag: '🇮🇳', name: 'IN', digits: 10 },
  { code: '+92', flag: '🇵🇰', name: 'PK', digits: 10 },
  { code: '+55', flag: '🇧🇷', name: 'BR', digits: 11 },
  { code: '+971', flag: '🇦🇪', name: 'AE', digits: 9 },
  { code: '+65', flag: '🇸🇬', name: 'SG', digits: 8 },
  { code: '+61', flag: '🇦🇺', name: 'AU', digits: 9 },
  { code: '+380', flag: '🇺🇦', name: 'UA', digits: 9 },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function ContactModal({ isOpen, onClose, locale }: Props) {
  const [countryCode, setCountryCode] = useState('+1');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '', telegram: '', message: '' });

  const isRu = locale === 'ru';
  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = isRu ? 'Обязательное поле' : 'Required';
    if (!form.whatsapp.trim()) e.whatsapp = isRu ? 'Обязательное поле' : 'Required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, countryCode }),
      });
      if (res.ok) setSent(true);
      else alert(isRu ? 'Что-то пошло не так.' : 'Something went wrong.');
    } catch {
      alert(isRu ? 'Что-то пошло не так.' : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inp = (field: string) =>
    `w-full bg-white/5 border ${errors[field] ? 'border-red-400' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#f47c5a] transition-colors text-sm`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0d1426] border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#0d1426] rounded-t-3xl px-8 pt-8 pb-4 flex items-center justify-between border-b border-white/10 z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isRu ? 'Написать доктору' : 'Get in Touch'}
            </h2>
            <p className="text-white/50 text-sm mt-1">
              {isRu ? 'Оставьте контакт — ответим в течение 5 минут' : 'Leave your contact — we\'ll reply within 5 minutes'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white text-xl">✕</button>
        </div>

        {sent ? (
          <div className="px-8 py-12 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isRu ? 'Сообщение отправлено!' : 'Message sent!'}
            </h3>
            <p className="text-white/50 text-sm">
              {isRu ? 'Мы свяжемся с вами в течение 5 минут.' : 'We\'ll get back to you within 5 minutes.'}
            </p>
            <button onClick={onClose} className="mt-6 bg-[#f47c5a] text-white px-8 py-3 rounded-full font-medium">
              {isRu ? 'Закрыть' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            <div>
              <input type="text" placeholder={isRu ? 'Ваше имя *' : 'Your name *'}
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className={inp('name')} />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>
            <div>
              <div className="flex gap-2">
                <select value={countryCode} onChange={e => setCountryCode(e.target.value)}
                  className="bg-white/5 border border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-[#f47c5a] text-sm cursor-pointer min-w-[105px]">
                  {countries.map(c => (
                    <option key={c.code + c.name} value={c.code} className="bg-[#0d1426]">{c.flag} {c.code}</option>
                  ))}
                </select>
                <input type="tel" placeholder={isRu ? 'WhatsApp *' : 'WhatsApp *'}
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value.replace(/\D/g, '') })}
                  maxLength={selectedCountry.digits} className={`flex-1 ${inp('whatsapp')}`} />
              </div>
              {errors.whatsapp && <p className="text-red-400 text-xs mt-1 ml-1">{errors.whatsapp}</p>}
            </div>
            <input type="text" placeholder={isRu ? 'Telegram (@username)' : 'Telegram (@username)'}
              value={form.telegram} onChange={e => setForm({ ...form, telegram: e.target.value })}
              className={inp('telegram')} />
            <input type="email" placeholder={isRu ? 'Email (необязательно)' : 'Email (optional)'}
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className={inp('email')} />
            <textarea placeholder={isRu ? 'Ваш вопрос (необязательно)' : 'Your question (optional)'}
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              rows={3} className={`${inp('message')} resize-none`} />
            <button type="submit" disabled={loading}
              className="w-full bg-[#f47c5a] hover:bg-[#e06b49] text-white py-4 rounded-xl text-base font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? (isRu ? 'Отправка...' : 'Sending...') : (isRu ? 'Отправить' : 'Send Message')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
