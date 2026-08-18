export const formConfig = {
  recipient: "lee@autoglaze-stoke.co.uk",
  sender: "yourwebsite@autoglaze-stoke.co.uk",
  senderName: "AutoGlaze Stoke Website",
  siteName: "AutoGlaze Stoke",
  subject: "New message from AutoGlaze Stoke",
};

export async function onRequestGet({ env }) {
  return Response.json(
    {
      turnstileSiteKey: env.TURNSTILE_SITE_KEY || "",
      siteName: env.ENQUIRY_SITE_NAME || formConfig.siteName,
      formEnabled: true,
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
}
