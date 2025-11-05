<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$lib/browser';

  // ---------- ONLY THIS PART CHANGES ----------
  let copyHeader = '';
  let copyPayload = '';

  // Fill the variables with the JSON you want to copy
  $: if (browser) {
    // Example – replace with your real header/payload objects
    copyHeader = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2);
    copyPayload = JSON.stringify({ sub: '123', name: 'John' }, null, 2);
  }

  let copyBtnText = 'Copy';

  const copyToClipboard = async (text: string, which: 'header' | 'payload') => {
    if (!browser) return;
    try {
      await navigator.clipboard.writeText(text);
      copyBtnText = which === 'header' ? 'Header copied!' : 'Payload copied!';
      setTimeout(() => (copyBtnText = 'Copy'), 1500);
    } catch {
      alert('Copy failed – use Ctrl+C');
    }
  };
  // -------------------------------------------

</script>
<svelte:head>
  <title>Integrating JWT Viewer into Development Workflows | AxelBase Blog</title>
  <meta name="description" content="Best practices for using the JWT viewer in daily dev, testing, onboarding, and security audits." />
  <meta property="og:title" content="Integrating JWT Viewer into Development Workflows | AxelBase Blog" />
  <meta property="og:description" content="Best practices for using the JWT viewer in daily dev, testing, onboarding, and security audits." />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>JWT Viewer in Workflows</p>
  </div>

  <article class="prose">
    <h1>Integrating JWT Viewer into Development Workflows</h1>
    <p class="post-meta">Published: November 11, 2025</p>

    <p>The <strong>JWT Header & Payload Viewer</strong> isn’t just a tool — it’s a workflow enhancer. From daily debugging to team training, here’s how to embed it into your development lifecycle.</p>

    <h2>1. Daily Development</h2>
    <p>Paste tokens from browser dev tools → verify claims before writing code.</p>
    <ul>
      <li>Check <code>scope</code> matches API expectations</li>
      <li>Confirm <code>exp</code> isn’t too short</li>
      <li>Copy <code>sub</code> for test users</li>
    </ul>

    <h2>2. Testing & QA</h2>
    <p>Include in test scripts:</p>
    <pre><code># Example: Validate token in CI
curl -H "Authorization: Bearer $TOKEN" API_URL
# → Paste response token into viewer</code></pre>

    <h2>3. Onboarding New Developers</h2>
    <p>Pair with auth docs:</p>
    <ol>
      <li>Log in to dev environment</li>
      <li>Open viewer</li>
      <li>Explain each claim live</li>
    </ol>

    <h2>4. Security Audits</h2>
    <p>Use raw view to:</p>
    <ul>
      <li>Verify no PII in payload</li>
      <li>Check <code>iat</code> vs. login time</li>
      <li>Export for compliance reports</li>
    </ul>

    <h2>5. Incident Response</h2>
    <p>Token compromise? Paste into viewer → check <code>jti</code>, <code>iss</code>, <code>exp</code> → revoke if needed.</p>

    <h2>Pro Tips</h2>
    <ul>
      <li><strong>PWA Install</strong>: Add to home screen for 1-click access</li>
      <li><strong>Share Links</strong>: <code>?token=eyJ...</code> (not recommended for prod)</li>
      <li><strong>Dark Mode</strong>: Add CSS toggle in future</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Can I embed it in my app?</summary>
      <p>Yes! Clone the repo and host internally.</p>
    </details>
    <details>
      <summary>Should I log viewer usage?</summary>
      <p>No. Keep it zero-log for privacy.</p>
    </details>
    <details>
      <summary>Works with refresh tokens?</summary>
      <p>Yes — any JWT format.</p>
    </details>

    <p class="italic-note">Make JWT debugging a habit. Ship faster. Stay secure.</p>
  </article>
</div>