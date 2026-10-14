// Vercel serverless function: emails website form submissions via Resend.
// Set RESEND_API_KEY in Vercel > Project > Settings > Environment Variables.
// Optional: TO_EMAIL (default info@smartlocker.ca), FROM_EMAIL (a sender on a domain verified in Resend).
const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed' }); }
  const d = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (d.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots

  const kind = d.kind === 'quote' ? 'quote' : 'contact';
  const need = kind === 'quote' ? ['name', 'company', 'email', 'phone', 'product'] : ['name', 'email', 'topic', 'message'];
  const missing = need.filter(k => !String(d[k] || '').trim());
  if (missing.length || !emailRe.test(d.email || '') || !d.consent) return res.status(400).json({ error: 'Invalid submission', missing });
  for (const k of Object.keys(d)) if (String(d[k]).length > 5000) return res.status(400).json({ error: 'Field too long' });

  const subject = kind === 'quote' ? `Quote request: ${d.product} (${d.company})` : `Website enquiry: ${d.topic} from ${d.name}`;
  const rows = (kind === 'quote'
    ? [['Name', d.name], ['Company', d.company], ['Email', d.email], ['Phone', d.phone], ['Product', d.product], ['Project details', d.message]]
    : [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Topic', d.topic], ['Message', d.message]])
    .filter(r => r[1]);
  const html = `<h2 style="font-family:Arial,sans-serif">${esc(subject)}</h2><table style="font-family:Arial,sans-serif;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join('') + '</table>';

  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Email not configured' });
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'SmartLocker Website <onboarding@resend.dev>',
      to: [process.env.TO_EMAIL || 'info@smartlocker.ca'],
      reply_to: d.email,
      subject,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n')
    })
  });
  if (!r.ok) return res.status(502).json({ error: 'Email failed' });
  return res.status(200).json({ ok: true });
};
