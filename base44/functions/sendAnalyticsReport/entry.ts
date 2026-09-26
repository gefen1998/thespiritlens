import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';
import { secrets } from 'base44:runtime';

const RECIPIENT = 'ma.vered@gmail.com';
const DAYS = 5;

const TOOL_LABELS = {
  tool_opened_write_guide: 'מדריך הכתיבה',
  tool_opened_thought_meeting: 'מפגש עם מחשבה',
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const appId = secrets.get('BASE44_APP_ID');
    const token = secrets.get('BASE44_ANALYTICS_TOKEN');
    const api = `https://app.base44.com/api/apps/${appId}/analytics`;
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const end = new Date();
    const start = new Date(end.getTime() - DAYS * 24 * 60 * 60 * 1000);

    const namesRes = await fetch(`${api}/names`, { headers });
    if (!namesRes.ok) throw new Error(`names ${namesRes.status}: ${await namesRes.text()}`);
    const { event_names = [] } = await namesRes.json();

    const wanted = event_names
      .map((e) => e.name)
      .filter((n) => n === 'real_visit' || n.startsWith('tool_opened_'));

    const counts = {};
    for (const name of wanted) {
      const r = await fetch(`${api}/timeseries`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          event_name: name,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          bucket_size_ms: 86400000,
          metrics: [{ function: 'count', name: 'event_count' }],
        }),
      });
      if (!r.ok) throw new Error(`timeseries ${name} ${r.status}: ${await r.text()}`);
      const data = await r.json();
      counts[name] = data.totals?.event_count || 0;
    }

    const realVisits = counts.real_visit || 0;
    const writeGuide = counts.tool_opened_write_guide || 0;
    const tools = Object.entries(counts)
      .filter(([n, c]) => n.startsWith('tool_opened_') && c > 0)
      .sort((a, b) => b[1] - a[1]);

    const fmt = (d) => d.toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' });
    const toolRows = tools.length
      ? tools
          .map(([n, c]) => {
            const label = TOOL_LABELS[n] || n.replace('tool_opened_', '').replace(/_/g, ' ');
            return `<tr><td style="padding:6px 10px;border-bottom:1px solid #e5e1d8">${label}</td><td style="padding:6px 10px;border-bottom:1px solid #e5e1d8;text-align:center">${c}</td></tr>`;
          })
          .join('')
      : '<tr><td colspan="2" style="padding:6px 10px">לא נפתחו כלים בתקופה זו</td></tr>';

    const html = `
<div dir="rtl" style="font-family:Arial,sans-serif;color:#16161A;max-width:560px">
  <h2 style="margin:0 0 4px">דוח כניסות — עדשת הרוח</h2>
  <p style="color:#6B6A63;margin:0 0 20px">${fmt(start)} – ${fmt(end)} (${DAYS} ימים אחרונים)</p>
  <p style="font-size:18px;margin:0 0 8px"><b>כניסות אמיתיות (real visits):</b> ${realVisits}</p>
  <p style="font-size:18px;margin:0 0 20px"><b>שימוש במדריך הכתיבה:</b> ${writeGuide > 0 ? `כן — ${writeGuide} פתיחות` : 'לא היה שימוש'}</p>
  <h3 style="margin:0 0 8px">כלים שנפתחו</h3>
  <table style="border-collapse:collapse;width:100%;background:#F4F1EA;border-radius:8px">
    <tr><th style="padding:6px 10px;text-align:right">כלי</th><th style="padding:6px 10px">פתיחות</th></tr>
    ${toolRows}
  </table>
</div>`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: RECIPIENT,
      subject: `דוח כניסות עדשת הרוח — ${fmt(end)}`,
      body: html,
      from_name: 'עדשת הרוח',
    });

    return Response.json({ sent: true, realVisits, writeGuide, tools: Object.fromEntries(tools) });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}