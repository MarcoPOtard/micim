import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pages-container">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Page non trouvée</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="button-secondary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}