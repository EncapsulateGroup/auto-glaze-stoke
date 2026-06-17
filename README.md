# AutoGlaze Stoke Static Site

Clean static rebuild for local review of the AutoGlaze Stoke WordPress / Elementor site.

Run locally:

```sh
npm start
```

Then open `http://localhost:4173/`.

Forms submit to `/api/enquiry`, a Cloudflare Pages Function that validates required fields, checks the honeypot, optionally validates Turnstile when a secret is configured, and sends the enquiry through the Brevo transactional email API.

## Current Status

The homepage has had the most detailed refinement so far. The image pass was updated from the original WordPress export rather than guessed placeholder images, and the `Why Choose Autoglaze` section has been rebuilt to better match the Elementor layering.

The written content should remain unchanged unless the client specifically asks for copy edits.

## Source Assets

Original WordPress files are in:

```text
../autoglazestokeco-old/public_html/wp-content/uploads/
```

The old database export is in:

```text
../autoglazestokeco-old/mysql/autoglazestokeco_2022a.sql
```

Use the Elementor data in the SQL export as the source of truth for page images and gallery order. This was especially useful for:

- Homepage hero/about/service images
- Windscreen Repair hero and main vehicle image
- Windscreen Replacement hero and before/after images
- Our Work gallery image order
- FAQ and Contact hero backgrounds

## Refinement Process To Continue

The closest match came from treating each complex Elementor section as its own composition, not as a reusable generic two-column block.

For sections with overlapping images, cards, badges, and angled grey bands:

1. Add a section-specific class in the HTML.
2. Use the original screenshot as the visual target.
3. Check the original source image paths from the SQL/export before changing images.
4. Build the section with layered CSS: positioned image, overlay badge/card, background image, dark overlay, and grey diagonal shape.
5. Let important images/cards break outside normal container boundaries where the original Elementor layout does that.
6. Preview at screenshot width and use cropped visual checks for that section.
7. Keep changes scoped to the page/section being refined so the inner pages do not regress.

The `Why Choose Autoglaze` section is the best current example of this approach:

- Dedicated `why-section`, `why-media`, and `why-content` classes.
- The red workshop car image breaks upward in the section.
- The “Established since / 2003” badge overlaps the lower-right of the image.
- The grey diagonal sits behind the lower foreground content.
- The four service cards use fixed dimensions and simple green line icons.

Use that same method for future homepage sections that still look too flat or too generic.

## Cloudflare Pages Setup

Cloudflare Pages project:

```text
autoglaze-stoke-static
```

Build settings:

```text
Build command: none
Build output directory: public
Functions directory: functions
```

Required Cloudflare secret:

```text
BREVO_API_KEY
```

Optional Cloudflare secret, once the Turnstile widget exists:

```text
TURNSTILE_SECRET_KEY
```

Brevo sender email:

```text
yourwebsite@autoglaze-stoke.co.uk
```

Notification recipient:

```text
lee@autoglaze-stoke.co.uk
```

Do not commit Brevo API keys, Turnstile secrets, local `.env` files, `.dev.vars`, WordPress backups, or platform cache folders.

## Form Testing

Without Cloudflare secrets, the function will return a friendly send failure because Brevo cannot be contacted. After `BREVO_API_KEY` is added in Cloudflare, submit a test enquiry and confirm the email arrives at `lee@autoglaze-stoke.co.uk`.

If `TURNSTILE_SECRET_KEY` is added, the form must also include a valid `cf-turnstile-response` token from the live widget before the function will send.

## Go-Live Files

The static site includes:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/_headers`
- `public/_redirects`
- `public/404.html`

The sitemap includes only public pages and excludes `/thank-you/`, API routes and error pages.

## Notes For Next Session

- Continue homepage refinement first before moving page-by-page.
- Compare against the supplied screenshots, not only against browser layout instincts.
- Be careful with background images set via CSS variables: their URL paths resolve relative to the stylesheet, so use `../img/...`.
- The homepage CSS link currently has a cache-busting query string so browser refreshes pick up changes immediately.
- Static verification command:

```sh
/Users/danni/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-site.mjs
```

## GitHub

The project is not committed yet. Danielle has a GitHub repo ready, and the plan is to commit/push next week after the next refinement pass.
