'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="pages-container">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Oups ! Une erreur est survenue</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Nous nous excusons pour ce désagrément. Une erreur inattendue s&apos;est produite.
        </p>
        <button
          className="button-secondary"
          onClick={reset}
          style={{ marginRight: '1rem' }}
        >
          Réessayer
        </button>
        <Link href="/" className="button-secondary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}