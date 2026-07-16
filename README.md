<div align="center">

# Raheem Burgess AI Portfolio

An interactive AI-powered resume portfolio that lets visitors ask questions about Raheem Burgess' background, projects, skills, and contact details.

[Live Site](https://www.aaabadcode.com/) · [GitHub](https://github.com/sheathx) · [LinkedIn](https://www.linkedin.com/in/raheemkhalidburgess/)

</div>

---

## Overview

This project is a single-page portfolio experience built around a conversational interface. Instead of asking visitors to scroll through a traditional resume, the site lets them explore profile details through quick prompts or custom questions.

The assistant can answer from a built-in CV knowledge base by default, and it also includes an optional Google Gemini API key drawer for live AI responses in the browser.

## Highlights

- Interactive AI resume assistant with custom question support
- Quick prompt views for profile, projects, skills, work style, and contact details
- Rich response layouts with animated profile, project, skill, and contact cards
- Built-in fallback answer engine, so the portfolio works without an API key
- Optional Gemini API key support stored locally in the browser
- Responsive layout designed for desktop and mobile
- Lightweight static frontend with no build step required
- Canvas-based ambient background effect

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Local server | Python `http.server` |
| Optional AI | Google Gemini API |
| Assets | Static image assets in `assets/` |

## Project Structure

```text
AIPortfolio/
├── assets/
│   └── portfolio-avatar.png
├── app.js
├── index.html
├── package.json
├── serve.py
├── styles.css
└── README.md
```

## Getting Started

Clone the repository and start the local server:

```bash
git clone https://github.com/sheathx/AIPortfolio.git
cd AIPortfolio
npm run start
```

The server prints a local URL, usually similar to:

```text
http://127.0.0.1:4173
```

Open that URL in your browser.

## AI Behavior

The portfolio works in two modes:

| Mode | Description |
| --- | --- |
| Built-in CV engine | Uses local resume context and predefined answer routing. No setup required. |
| Gemini mode | Lets the visitor add a Gemini API key in the settings drawer for live AI-generated answers. |

The Gemini key is saved only in the visitor's browser local storage. It is not stored on a server by this project.

## Featured Sections

### Profile

Introduces Raheem Burgess as an IT Support and Systems Engineering professional based in Kingston, Jamaica.

### Projects

Highlights work including:

- Medi-Link NFC medical band concept
- Begoogable AI website builder
- Internal software rollout and deployment support
- Work-at-home readiness tracking
- Java, C, and systems analysis coursework

### Skills

Groups experience across service desk support, endpoint compliance, remote work systems, development, documentation, and stakeholder coordination.

### Contact

Provides direct email, phone, LinkedIn, GitHub, X, and Instagram links.

## Development Notes

This app intentionally stays simple:

- No frontend framework
- No bundler
- No dependency install required for the site itself
- Static files can be hosted on any basic web server

The included `serve.py` adds no-cache headers during local development so CSS and JavaScript edits refresh cleanly.

## Scripts

```bash
npm run start
```

Starts the local Python development server.

## Deployment

Because this is a static site, it can be deployed to platforms such as:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static file host

Deploy the repository root, making sure `index.html`, `styles.css`, `app.js`, and `assets/` are included.

## License

This project is currently private/personal portfolio work. Add a license before reusing or distributing the code publicly.

---

<div align="center">

Built by [Raheem Burgess](https://github.com/sheathx)

</div>
