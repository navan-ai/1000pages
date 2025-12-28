export default function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} 1000pages. Built by{' '}
        <a
          href="https://sam.navan.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          SAM Agents
        </a>
      </p>
    </footer>
  );
}
