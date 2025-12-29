import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Navan AI - Spec Coding Consulting',
  description: 'Navan AI provides Spec Coding Consulting services. Visit navan.ai to learn more.',
  openGraph: {
    title: 'Navan AI - Spec Coding Consulting',
    description: 'Navan AI provides Spec Coding Consulting services.',
    url: 'https://1000pages.navan.ai/navan-ai',
  },
};

export default function NavanAIPage() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Navan AI</h1>
            <p className="hero-subtitle">
              Navan AI provides Spec Coding Consulting
            </p>
            <p className="hero-subtitle">
              <a
                href="https://navan.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                Visit navan.ai
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
