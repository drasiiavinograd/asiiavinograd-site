'use client';
import { useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function ConfirmPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push(locale === 'ru' ? '/ru/dashboard' : '/dashboard');
      } else {
        router.push(locale === 'ru' ? '/ru/auth' : '/auth');
      }
    });
  }, []);

  return (
    <main className="bg-[#0a0f1e] min-h-screen flex items-center justify-center">
      <div className="text-white/50 text-lg">Confirming your email...</div>
    </main>
  );
}
