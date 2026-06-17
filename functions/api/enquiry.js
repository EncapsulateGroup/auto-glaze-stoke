import { formConfig } from "./form-config.js";

const text = (value) => String(value || "").trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeHtml(value) {
  return text(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function verifyTurnstile(token, env, request) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const ip = request.headers.get("CF-Connecting-IP") || "";
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = await response.json();
  return Boolean(result.success);
}

async function sendEmail(fields, env, request) {
  if (!env.BREVO_API_KEY) {
    throw new Error("Missing BREVO_API_KEY");
  }

  const submittedFrom = request.headers.get("Referer") || "Unknown page";
  const messageHtml = `
    <h2>New AutoGlaze website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(fields.company || "Not provided")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(fields.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Message:</strong><br>${escapeHtml(fields.message).replaceAll("\n", "<br>")}</p>
    <hr>
    <p><strong>Source page:</strong> ${escapeHtml(fields.source || submittedFrom)}</p>
  `;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: formConfig.sender, name: formConfig.senderName },
      to: [{ email: formConfig.recipient }],
      replyTo: { email: fields.email, name: fields.name },
      subject: formConfig.subject,
      htmlContent: messageHtml,
    }),
  });

  if (!response.ok) {
    throw new Error(`Brevo send failed: ${response.status}`);
  }
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, message: "We could not read the form. Please try again." }, 400);
  }

  if (text(data.get("website"))) {
    return json({ ok: true, redirect: "/thank-you/" });
  }

  const fields = {
    name: text(data.get("name")),
    company: text(data.get("company")),
    phone: text(data.get("phone")),
    email: text(data.get("email")),
    message: text(data.get("message")),
    source: text(data.get("source")),
  };

  if (!fields.name || !fields.phone || !fields.email || !fields.message) {
    return json({ ok: false, message: "Please complete your name, phone number, email and message." }, 400);
  }

  if (!emailPattern.test(fields.email)) {
    return json({ ok: false, message: "Please enter a valid email address." }, 400);
  }

  const turnstileOk = await verifyTurnstile(text(data.get("cf-turnstile-response")), env, request);
  if (!turnstileOk) {
    return json({ ok: false, message: "The spam check did not complete. Please refresh and try again." }, 400);
  }

  try {
    await sendEmail(fields, env, request);
    return json({ ok: true, redirect: "/thank-you/" });
  } catch (error) {
    console.error(error);
    return json({ ok: false, message: "Sorry, your message could not be sent. Please call 01782 281884." }, 500);
  }
}
