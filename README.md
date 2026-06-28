# Ryklo Technologies Website

A modern, single-page marketing site for [ryklotechnologies.com](https://ryklotechnologies.com), inspired by enterprise asset management consultancies and styled with IBM Carbon Design System colors and IBM Plex typography.

## Features

- Responsive layout (desktop, tablet, mobile)
- IBM Maximo / Carbon-inspired palette (`#0f62fe` blue, gray scale, dark header)
- IBM Plex Sans via Google Fonts
- Sections: hero, partners, stats, services, solutions, clients, case studies, industries, about, contact

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Structure

```
├── index.html      # Main page (SEO meta, JSON-LD schema)
├── styles.css      # Carbon-inspired styles
├── script.js       # Navigation & form handling
├── robots.txt      # Crawler directives
├── sitemap.xml     # URL sitemap for search engines
├── og-image.svg    # Social sharing preview image
└── README.md
```

## SEO

The site includes:

- Optimized title and meta description with target keywords (IBM Maximo, EAM, TRIRIGA)
- Canonical URL, Open Graph, and Twitter Card tags
- JSON-LD structured data (Organization, WebSite, ProfessionalService)
- Semantic headings, ARIA labels, and skip navigation link
- `robots.txt` and `sitemap.xml` for crawlers

After deploying, submit `https://ryklotechnologies.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Deployment

Deploy the static files to any host (GitHub Pages, Netlify, Vercel, S3, etc.). No build step required.

## License

© 2026 Ryklo Technologies. All rights reserved.
