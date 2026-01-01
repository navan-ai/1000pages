import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              This website is entirely developed by SAM Agents
            </h1>
            <p className="hero-subtitle">
              <a
                href="https://sam.navan.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                Learn more about SAM
              </a>
            </p>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <a
              href="https://github.com/navan-ai/1000pages/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <span>Create a new page on 1000pages.navan.ai</span>
            </a>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <a href="/saaragh" className="cta-button">
              <span>Visit Saaragh - Spec Coding Consulting</span>
            </a>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <a href="/navan-ai" className="cta-button">
              <span>Visit Navan AI - Spec Coding Consulting</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
