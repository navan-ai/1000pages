# 1000pages

A website entirely developed by SAM Agents.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** CSS (custom properties for theming)

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Development

```bash
cd webhook-server
npm install
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
cd webhook-server
npm run build
```

This generates a static export in the `out/` directory, ready for deployment to:

- Cloudflare Pages
- AWS S3 + CloudFront
- Vercel
- Any static hosting provider

### Project Structure

```
webhook-server/
├── app/
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Homepage
│   ├── globals.css     # Global styles
│   ├── robots.ts       # SEO: robots.txt generation
│   └── sitemap.ts      # SEO: sitemap.xml generation
├── components/
│   ├── Header.tsx      # Navigation with theme toggle
│   └── Footer.tsx      # Footer component
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Features

- Dark/Light theme toggle with system preference detection
- SEO-optimized with Open Graph and Twitter cards
- Fully static export for edge deployment
- Responsive design

## License

MIT
