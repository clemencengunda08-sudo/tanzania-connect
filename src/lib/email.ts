/**
 * @fileOverview Tanzania Reach — Resend email client.
 *
 * SERVER ONLY. Never import from a client component.
 *
 * Free tier: 3,000 emails / month at resend.com
 * Required env var: RESEND_API_KEY
 *
 * If RESEND_API_KEY is not set, all send functions resolve silently
 * (no errors thrown) — safe for local development without a key.
 */

import { Resend } from 'resend';

// ─── Client (lazily initialised so import doesn't throw without the key) ───
let _client: Resend | null = null;

function getClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[email] RESEND_API_KEY is not set — emails are disabled in this environment.');
    }
    return null;
  }
  if (!_client) _client = new Resend(process.env.RESEND_API_KEY);
  return _client;
}

// ─── Shared sender address ──────────────────────────────────────────────────
const FROM = process.env.RESEND_FROM_EMAIL ?? 'Tanzania Reach <hello@tanzaniareach.com>';

// ─── Email Templates ────────────────────────────────────────────────────────

/**
 * Send a welcome email to a newly registered user.
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM,
    to,
    subject: 'Welcome to Tanzania Reach',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: 'Inter', sans-serif; background: #f9fafb; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
            <div style="background: #006FCF; padding: 32px 40px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">🇹🇿 Tanzania Reach</h1>
              <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Your guide to East Africa's most dynamic economy</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Welcome, ${name}!</h2>
              <p style="color: #475569; line-height: 1.7;">
                Your Tanzania Reach account is ready. You now have access to 18 sector guides covering
                everything from mining licences to immigration procedures.
              </p>
              <a href="https://www.tanzaniareach.com/guides"
                style="display: inline-block; margin-top: 20px; padding: 12px 28px; background: #006FCF; color: #ffffff;
                       border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Browse all 18 sector guides →
              </a>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Tanzania Reach · Independent intelligence portal<br>
                <a href="https://www.tanzaniareach.com/privacy" style="color: #006FCF;">Privacy Policy</a> ·
                <a href="https://www.tanzaniareach.com/terms" style="color: #006FCF;">Terms</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send a password reset email.
 */
export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM,
    to,
    subject: 'Reset your Tanzania Reach password',
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: sans-serif; background: #f9fafb; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; padding: 40px;">
            <h2 style="color: #0f172a;">Password reset</h2>
            <p style="color: #475569; line-height: 1.7;">
              We received a request to reset your Tanzania Reach password. Click the button below.
              This link expires in 1 hour.
            </p>
            <a href="${resetLink}"
              style="display: inline-block; margin-top: 16px; padding: 12px 28px; background: #006FCF; color: #fff;
                     border-radius: 8px; text-decoration: none; font-weight: 600;">
              Reset password
            </a>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">
              If you did not request this, you can safely ignore this email.
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send a weekly Tanzania briefing newsletter.
 */
export async function sendWeeklyBriefing(
  to: string | string[],
  headlines: Array<{ title: string; url: string; summary: string }>
): Promise<void> {
  const client = getClient();
  if (!client) return;

  const headlineHtml = headlines
    .slice(0, 5)
    .map(
      (h) => `
        <div style="border-left: 3px solid #006FCF; padding-left: 16px; margin-bottom: 20px;">
          <a href="${h.url}" style="color: #006FCF; font-weight: 600; text-decoration: none; font-size: 15px;">${h.title}</a>
          <p style="color: #475569; font-size: 13px; margin: 6px 0 0; line-height: 1.6;">${h.summary}</p>
        </div>
      `
    )
    .join('');

  await client.emails.send({
    from: FROM,
    to: Array.isArray(to) ? to : [to],
    subject: `Tanzania Reach Weekly Briefing — ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: sans-serif; background: #f9fafb; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; padding: 40px;">
            <h1 style="color: #006FCF; font-size: 20px; margin-top: 0;">🇹🇿 Tanzania Weekly Briefing</h1>
            <p style="color: #475569;">This week's top headlines from Tanzania's leading newsrooms.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            ${headlineHtml}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #94a3b8; font-size: 12px;">
              You are receiving this because you subscribed to Tanzania Reach updates.<br>
              <a href="https://www.tanzaniareach.com/account" style="color: #006FCF;">Manage preferences</a>
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send a contact form submission notification to the admin.
 */
export async function sendContactNotification(
  adminEmail: string,
  from: { name: string; email: string; message: string }
): Promise<void> {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New contact form submission from ${from.name}`,
    html: `
      <div style="font-family: sans-serif; padding: 32px;">
        <h2>New contact submission</h2>
        <p><strong>From:</strong> ${from.name} (${from.email})</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #006FCF; padding-left: 16px; color: #475569;">
          ${from.message}
        </blockquote>
      </div>
    `,
  });
}
