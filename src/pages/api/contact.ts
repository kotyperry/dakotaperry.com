import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const CONTACT_EMAIL = "me@dakotaperry.com";
const FROM_ADDRESS = "Portfolio Contact <contact@dakotaperry.com>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
      status: 400,
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
  }
  if (name.length > 200 || company.length > 200 || message.length > 5000) {
    return new Response(JSON.stringify({ error: "Field too long" }), { status: 400 });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Portfolio contact from ${name}${company ? ` (${company})` : ""}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
