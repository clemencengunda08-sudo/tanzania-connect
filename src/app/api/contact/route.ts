import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('RESEND_API_KEY is not set — contact form dispatch will fail.');
}
const resend = new Resend(resendApiKey);

/**
 * Stateless Contact Form Dispatcher via Resend.
 * Privacy-First: No user data is stored in any database.
 * No user registration or login required — zero data custody risk.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Format safe HTML email dispatch
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <div style="border-bottom: 2px solid #006FCF; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0a1d36; margin: 0; font-size: 20px; font-weight: 800;">Tanzania Reach — Official Inquiry Dispatch</h2>
          <p style="color: #006FCF; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Executive Desk Routing</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 140px; font-weight: 600;">Sender:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 700;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
            <td style="padding: 8px 0; color: #006FCF; font-size: 14px; font-weight: 600;">
              <a href="mailto:${escapeHtml(email)}" style="color: #006FCF; text-decoration: none;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(phone || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Inquiry Topic:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 700;">${escapeHtml(topic || 'General Inquiry')}</td>
          </tr>
        </table>

        <div style="background: #f0f7ff; border-left: 4px solid #006FCF; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0; color: #0a1d36; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
          Sent securely via Tanzania Reach Stateless Mail Relay to <strong>info@tanzaniareach.com</strong> · ${new Date().toUTCString()}
        </div>
      </div>
    `;

    try {
      const response = await resend.emails.send({
        from: 'Tanzania Reach Desk <onboarding@resend.dev>',
        to: ['info@tanzaniareach.com'],
        replyTo: email,
        subject: `[Tanzania Reach Inquiry] ${topic || 'General'}: ${name}`,
        html: emailHtml,
      });

      if (response.error) {
        console.error('Resend delivery error:', response.error);
        return NextResponse.json(
          { error: `Dispatch error: ${response.error.message}` },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Dispatch sent successfully to info@tanzaniareach.com',
        id: response.data?.id,
      });
    } catch (sendErr: any) {
      console.warn('Resend exception:', sendErr?.message || sendErr);
      return NextResponse.json(
        { error: 'Email service temporary outage. Please contact directly via WhatsApp: +255 792 867 427' },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal error handling contact dispatch.' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
