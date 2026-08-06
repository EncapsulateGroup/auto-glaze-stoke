# AutoGlaze Stoke Handover

## Current Status

The static rebuild is ready for Cloudflare Pages staging review. Public pages, navigation, footer, contact bands, sitemap, robots, 404, headers, redirects and form endpoint scaffolding are in place.

## Cloudflare Pages Project

```text
autoglaze-stoke-static
```

## Build Settings

```text
Build command: npm run build
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
TURNSTILE_SECRET_KEY
```

Required Cloudflare variables:

```text
TURNSTILE_SITE_KEY
BREVO_FROM_EMAIL=yourwebsite@autoglaze-stoke.co.uk
ENQUIRY_NOTIFICATION_TO=lee@autoglaze-stoke.co.uk
ENQUIRY_SITE_NAME="AutoGlaze Stoke"
```

## Turnstile

The server-side Turnstile validation fails closed until this Cloudflare secret is added:

```text
TURNSTILE_SECRET_KEY
```

The live Turnstile widget/site key still needs to be added once the Cloudflare Pages staging URL exists.

## Validation Run

Run before deployment from the project root:

```sh
npm run check
node --check public/assets/js/main.js
node --check functions/api/enquiry.js
node --check functions/api/form-config.js
```

## Policy And Cookie Notes

The site currently embeds Google Maps directly. Before final live sign-off, add client-approved Privacy Policy and Cookie Policy wording, then either add cookie consent for optional embeds or replace embedded maps with direct map links.

## Deployment Notes

- Keep secrets in Cloudflare only.
- Do not commit `.env`, `.dev.vars`, API keys, Turnstile secrets or WordPress backups.
- Confirm a live test enquiry reaches `lee@autoglaze-stoke.co.uk` after `BREVO_API_KEY` and Turnstile are configured.
- Confirm Turnstile behaviour after the widget/site key and `TURNSTILE_SECRET_KEY` are configured.
