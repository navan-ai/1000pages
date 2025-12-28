import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: '1000pages - Built by SAM Agents',
    template: '%s | 1000pages',
  },
  description: '1000pages - A website entirely developed by SAM Agents. Experience the future of AI-powered web development.',
  keywords: ['SAM Agents', 'AI', 'web development', 'automation', 'Navan AI', '1000pages'],
  authors: [{ name: 'SAM Agents', url: 'https://sam.navan.ai' }],
  creator: 'SAM Agents',
  publisher: 'Navan AI',
  metadataBase: new URL('https://1000pages.navan.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1000pages.navan.ai',
    siteName: '1000pages',
    title: '1000pages - Built by SAM Agents',
    description: '1000pages - A website entirely developed by SAM Agents. Experience the future of AI-powered web development.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1000pages - Built by SAM Agents',
    description: '1000pages - A website entirely developed by SAM Agents. Experience the future of AI-powered web development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '1000pages',
  url: 'https://1000pages.navan.ai',
  description: 'A website entirely developed by SAM Agents',
  publisher: {
    '@type': 'Organization',
    name: 'Navan AI',
    url: 'https://sam.navan.ai',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('1000pages-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
