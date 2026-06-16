# Website Project Working Standards

Use this document at the start of any website project to set expectations for how the build should be approached, reviewed and handed over.

## Core Working Principles

- Build clean, developer-friendly code that another developer can understand, maintain and extend.
- Follow the patterns already present in the project before introducing new approaches.
- Fix issues at the source wherever possible instead of layering quick overrides or fragile patches on top.
- Keep changes intentional and scoped; avoid unrelated refactors unless they directly improve the requested outcome.
- Prefer simple, reliable solutions over clever code that is harder to maintain.
- Remove unused, duplicated or retired code once a replacement is complete.
- Comment code only where it helps explain a non-obvious decision or behaviour.

## Design And UX Standards

- Design for the real audience, business position and budget of the website, not just for visual trendiness.
- Consider the user journey on every page: what the visitor needs to understand, trust and do next.
- Make primary actions clear and consistent, especially contact, enquiry, booking or purchase routes.
- Keep approved written content intact unless the user explicitly asks for copy changes.
- Use imagery intentionally, especially where client photography can build trust or show the real product/service.
- Avoid dated layouts, weak hierarchy, cramped spacing and inconsistent typography.
- Make pages feel complete and usable, not like disconnected sections.
- Ensure navigation, footer and repeated components are consistent across the full site.

## Responsive And Accessibility Standards

- Build responsively from the start, covering mobile, tablet and desktop.
- Check that text, buttons, forms, menus, cards and images do not overflow or overlap at common viewport sizes.
- Use semantic HTML wherever possible.
- Maintain readable font sizes, sensible line heights and strong contrast.
- Ensure buttons and links have clear labels and usable touch targets.
- Avoid relying on hover-only behaviour for important functionality.
- Respect reduced-motion preferences where animation is used.

## Code Quality Standards

- Keep HTML structured and readable.
- Keep CSS organised by component or section, with global tokens for colours, spacing and typography where useful.
- Avoid unnecessary specificity wars, repeated overrides and one-off styling hacks.
- Use JavaScript progressively: the site should remain understandable and stable if a script fails.
- Keep global JavaScript careful and predictable, especially for shared header, footer, forms and cookie logic.
- Use meaningful class names that describe purpose rather than appearance only.
- Optimise assets sensibly: use appropriate image formats, dimensions and compression.
- Do not commit local caches, secrets, generated junk files, `node_modules`, `.env`, `.dev.vars` or platform cache folders.

## Security And Privacy Standards

- Treat security as part of the build, not as a final afterthought.
- Never commit real API keys, tokens, passwords or private credentials.
- Use environment variables or platform secrets for sensitive values.
- Validate and sanitise server-side form input.
- Add spam protection for public forms where appropriate.
- Escape user-submitted content before including it in emails or rendered output.
- Avoid exposing raw API errors to users.
- Consider privacy before loading third-party embeds such as maps, videos, trackers or analytics.
- Gate optional third-party embeds behind cookie consent when required.
- Add sensible security headers for production hosting, while avoiding strict rules that could break untested integrations.

## Forms And Integrations

- Forms should have clear required fields, useful labels/placeholders, and visible success/error states.
- Form submissions should fail gracefully with a helpful message.
- Include source/page metadata where it helps the client understand enquiries.
- Include honeypot and bot protection on public forms.
- Use the agreed sender email convention for Brevo: `yourwebsite@{client-domain}`.
- Add Turnstile keys directly in Cloudflare Pages settings rather than locking them into `wrangler.toml`.
- Keep local placeholder config files safe and clearly marked as placeholders.

## SEO And Go-Live Readiness

- Use clear page titles and meta descriptions.
- Include only public, useful pages in the sitemap.
- Exclude thank-you pages, API routes, 404 pages and private preview pages from indexing.
- Add redirects for old live URLs when replacing an existing site.
- Add a branded 404 page.
- Add `robots.txt`, `sitemap.xml`, `_headers` and `_redirects` where the hosting platform supports them.
- Run a local link and asset crawl before handover.
- Check for placeholder text, broken links, missing images and accidental secrets.

## Review And Validation

- Review the site from a UX perspective before calling a page complete.
- Review the code from a maintainability perspective before handover.
- Test important pages in the browser, not only by reading files.
- Validate forms, navigation, cookie controls, sticky headers and mobile layouts where relevant.
- Run syntax checks and available validation commands before committing.
- Keep a short record of what was changed, what was tested and what still needs deployment-only setup.

## Collaboration Expectations

- Work one step at a time when the project is in a structured prep or launch process.
- Summarise the expected outcome before each major step.
- Ask questions when a decision affects business positioning, approved content, legal wording, live domains or third-party services.
- Make reasonable implementation decisions when the answer is clear from the project context.
- Keep the user updated during longer work, especially before file edits and after validation.
- Do not treat a visual change as finished until it has been checked in the browser.
- Preserve user changes and never revert unrelated work without explicit permission.

## Definition Of Done

A website task is only done when:

- The requested change is implemented.
- The design works across relevant screen sizes.
- The user journey remains clear.
- The code is clean, scoped and maintainable.
- Security and privacy implications have been considered.
- Obvious old or unnecessary code has been removed.
- The page or feature has been visually checked where appropriate.
- Relevant validation or tests have passed, or any skipped checks are clearly explained.
