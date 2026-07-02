'use client';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  return (
    <footer className="border-t border-white/10 py-8 px-6 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">© 2026 Dr. Asiia Vinograd · drasiiavinograd.com</p>
        <div className="flex items-center gap-6 text-sm text-white/40">
          <a href="https://youtube.com/@USMLEforIMG" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
          <a href="https://t.me/usmle_vinograd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a>
          <a href="https://patreon.com/drasiiavinograd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Patreon</a>
        </div>
      </div>
    </footer>
  );
}
