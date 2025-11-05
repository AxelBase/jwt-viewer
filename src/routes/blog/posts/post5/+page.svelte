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
  <title>Handling JWT Expiration and Timestamps | AxelBase Blog</title>
  <meta
    name="description"
    content="Learn how the viewer converts exp, iat, nbf to readable UTC dates and warns about expired tokens."
  />
  <meta property="og:title" content="Handling JWT Expiration and Timestamps | AxelBase Blog" />
  <meta
    property="og:description"
    content="Learn how the viewer converts exp, iat, nbf to readable UTC dates and warns about expired tokens."
  />
  <meta property="og:url" content={`${base}/blog/posts/post5`} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href={`${base}/blog`}>Blog</a>
    <span>/</span>
    <p>JWT Expiration & Timestamps</p>
  </div>

  <article class="prose">
    <h1>Handling JWT Expiration and Timestamps</h1>
    <p class="post-meta">Published: November 9, 2025</p>

    <p>
      Time-based claims like <code>exp</code>, <code>iat</code>, and <code>nbf</code> are the backbone of JWT security.
      Misconfigured timestamps lead to 401 errors, infinite sessions, or premature access. The <strong>JWT Header & Payload Viewer</strong>
      makes these Unix timestamps human-readable — instantly.
    </p>

    <h2>Understanding the Claims</h2>

    <h3><code>exp</code> – Expiration</h3>
    <p>After this Unix timestamp, the token is invalid. Example: <code>1736299200</code> → <strong>01 Dec 2025 00:00:00 UTC</strong></p>

    <h3><code>iat</code> – Issued At</h3>
    <p>When the token was created. Helps detect clock skew.</p>

    <h3><code>nbf</code> – Not Before</h3>
    <p>Token is rejected before this time. Useful for scheduled access.</p>

    <h2>How the Viewer Helps</h2>
    <p>Paste a JWT → see:</p>
    <ul>
      <li><strong>Formatted UTC Dates</strong>: <code>05 Nov 2025 14:30:22 UTC</code></li>
      <li><strong>Live Validity Check</strong>: Green “Valid” or red “Expired” badge</li>
      <li><strong>Issued/Not Before</strong>: Full context in summary</li>
    </ul>

    <h3>Real-World Example</h3>
    <p>Token with <code>exp: 1736299200</code> → Viewer shows:</p>
    <pre><code>Expires: 01 Dec 2025 00:00:00 UTC (Valid)</code></pre>

    <h2>Common Issues & Fixes</h2>
    <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
      <thead>
        <tr>
          <th style="text-align:left; border-bottom:2px solid var(--accent-primary); padding:0.5rem;">Issue</th>
          <th style="text-align:left; border-bottom:2px solid var(--accent-primary); padding:0.5rem;">Fix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:0.5rem;">Token expired but still accepted</td>
          <td style="padding:0.5rem;">Enforce <code>exp</code> server-side</td>
        </tr>
        <tr>
          <td style="padding:0.5rem;">Clock skew causes rejection</td>
          <td style="padding:0.5rem;">Allow ±5 min leeway</td>
        </tr>
        <tr>
          <td style="padding:0.5rem;">No <code>exp</code> set</td>
          <td style="padding:0.5rem;">Always set expiration (e.g., 1 hour)</td>
        </tr>
      </tbody>
    </table>

    <h2>Best Practices</h2>
    <ul>
      <li>Set short-lived access tokens (15–60 mins)</li>
      <li>Use refresh tokens for long sessions</li>
      <li>Include <code>iat</code> to prevent replay</li>
      <li>Test with the viewer before deploy</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>What if <code>exp</code> is in milliseconds?</summary>
      <p>JWT spec uses seconds. If you see large numbers (e.g., 1736299200000), divide by 1000.</p>
    </details>
    <details>
      <summary>Can I extend expiration client-side?</summary>
      <p>No. Only the issuer can issue new tokens.</p>
    </details>
    <details>
      <summary>Should I include time zone?</summary>
      <p>No. JWT uses Unix time (UTC). Always convert locally.</p>
    </details>

    <p class="italic-note">Control time. Control security.</p>
  </article>
</div>
