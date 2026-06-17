# AutoGlaze Stoke Handover

## Current Status

The static rebuild is ready for Cloudflare Pages staging review. Public pages, navigation, footer, contact bands, sitemap, robots, 404, headers, redirects and form endpoint scaffolding are in place.

## Cloudflare Pages Project

```text
autoglaze-stoke-static
```

## Build Settings

```text
Build command: none
Build output directory: public
Functions directory: functions
```

## Form Endpoint

```text
/api/enquiry
```

## Brevo

```text
Sender email: yourwebsite@autoglaze-stoke.co.uk
Recipient email: lee@autoglaze-stoke.co.uk
```

Required Cloudflare secret:

```text
BREVO_API_KEY
```

## Turnstile

The server-side Turnstile validation is supported when this Cloudflare secret is added:

```text
TURNSTILE_SECRET_KEY
```

The live Turnstile widget/site key still needs to be added once the Cloudflare Pages staging URL exists.

## Validation Run

Run before deployment:

```sh
/Users/danni/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-site.mjs
/Users/danni/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check public/assets/js/main.js
/Users/danni/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check public/assets/js/form-placeholder.js
/Users/danni/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check functions/api/enquiry.js
```

## Deployment Notes

- Keep secrets in Cloudflare only.
- Do not commit `.env`, `.dev.vars`, API keys, Turnstile secrets or WordPress backups.
- Confirm a live test enquiry reaches `lee@autoglaze-stoke.co.uk` after `BREVO_API_KEY` is configured.
- Confirm Turnstile behaviour after the widget/site key and `TURNSTILE_SECRET_KEY` are configured.
