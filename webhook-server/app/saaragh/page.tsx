import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Saaragh - Spec Coding Consulting',
  description: 'Saaragh provides Spec Coding Consulting services. Visit saaragh.com to learn more.',
  openGraph: {
    title: 'Saaragh - Spec Coding Consulting',
    description: 'Saaragh provides Spec Coding Consulting services.',
    url: 'https://1000pages.navan.ai/saaragh',
  },
};

export default function SaaraghPage() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Saaragh</h1>
            <p className="hero-subtitle">
              Saaragh provides Spec Coding Consulting
            </p>
            <p className="hero-subtitle">
              <a
                href="https://saaragh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                Visit saaragh.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
