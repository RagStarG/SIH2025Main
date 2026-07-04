# HRMS — AI Chatbot & UI Polish

A minimal preview shell plus a floating AI assistant widget ("Ember") for the
HR Officer, styled with your existing `styles.css` design system (dark theme,
indigo accent). Ember answers canned, keyword-matched responses — ready to be
swapped for a real API call later.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## What's inside

- `src/styles.css` — your existing design system, used as-is (colors, `.card`,
  `.btn`, `.chip`, `.badge`, `.avatar`, `.form-control`, `.bar-wrap`, etc.)
- `src/components/Topbar.jsx` — greeting + workday-progress bar, built with
  your `.hdr` / `.bar-wrap` / `.bar-fill` classes
- `src/components/Chatbot.jsx` + `Chatbot.css` — the floating AI chatbot
  widget, reusing `.card`, `.avatar av-a`, `.chip`, `.form-control`, and
  `.btn-primary` from your stylesheet; `Chatbot.css` only adds the
  positioning, panel-open animation, and typing-dots that your stylesheet
  doesn't already define
- `src/data/cannedResponses.js` — keyword → reply rules for the HR Officer
  (pending approvals, team attendance, payroll status, onboarding, holidays).
  Replace `getReply()` with a real API call when ready.

Font Awesome is loaded via CDN in `index.html` since the stylesheet's
`.brand i` / icon usage expects it.

## Branding

- `public/vibeforge-mark.png` — a square crop of the VF emblem from your
  VibeForge logo, used for the topbar badge and Ember's avatar/launcher
- `public/vibeforge-logo.png` — the full logo with wordmark, kept in
  `public/` if you want to use it somewhere larger (e.g. a footer or an
  about/splash section)

## Going live with a real AI

In `src/data/cannedResponses.js`, replace the body of `getReply` with a call
to your chat completion endpoint (e.g. the Anthropic API), and make the
caller in `Chatbot.jsx` `async`/await the result instead of using the canned
lookup.
