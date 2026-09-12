import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const owner = (body.owner || "").trim();
    const repo = (body.repo || "").trim();
    const perPage = Math.min(Math.max(parseInt(body.per_page, 10) || 20, 1), 100);
    const branch = (body.branch || "").trim();

    if (!owner || !repo) {
      return Response.json({ error: "owner and repo are required" }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("github");

    const params = new URLSearchParams({ per_page: String(perPage) });
    if (branch) params.set("sha", branch);

    const apiUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?${params}`;

    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "base44-app",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return Response.json({ error: `GitHub API error (${response.status})`, details: errText }, { status: response.status });
    }

    const commits = await response.json();

    const result = commits.map((c) => ({
      sha: c.sha,
      shortSha: c.sha ? c.sha.slice(0, 7) : "",
      message: c.commit?.message || "",
      author: c.commit?.author?.name || c.author?.login || "",
      authorAvatar: c.author?.avatar_url || null,
      date: c.commit?.author?.date || c.commit?.committer?.date || "",
      url: c.html_url || "",
    }));

    return Response.json({ owner, repo, commits: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}