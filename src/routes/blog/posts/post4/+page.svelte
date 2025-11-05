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
  <title>Common JWT Claims and Their Meanings | AxelBase Blog</title>
  <meta name="description" content="A complete guide to standard JWT claims like iss, sub, exp, iat, and how the viewer helps you understand them." />
  <meta property="og:title" content="Common JWT Claims and Their Meanings | AxelBase Blog" />
  <meta property="og:description" content="A complete guide to standard JWT claims like iss, sub, exp, iat, and how the viewer helps you understand them." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Common JWT Claims</p>
  </div>

  <article class="prose">
    <h1>Common JWT Claims and Their Meanings</h1>
    <p class="post-meta">Published: November 8, 2025</p>

    <p>JSON Web Tokens (JWTs) carry information in the form of <strong>claims</strong> — key-value pairs in the payload. Understanding these claims is essential for debugging authentication, enforcing access control, and ensuring token validity. The <strong>JWT Header & Payload Viewer</strong> highlights all standard claims with human-readable formatting.</p>

    <h2>Registered Claims (Standard)</h2>
    <p>These are defined in the <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1" target="_blank" rel="noopener">JWT specification</a> and have reserved names:</p>

    <h3><code>iss</code> – Issuer</h3>
    <p>Identifies the principal that issued the JWT. Usually a URL or unique identifier.</p>
    <pre><code>"iss": "https://auth.axelbase.com"</code></pre>

    <h3><code>sub</code> – Subject</h3>
    <p>The user or entity the token represents. Often a user ID or email.</p>
    <pre><code>"sub": "user_12345"</code></pre>

    <h3><code>aud</code> – Audience</h3>
    <p>Defines intended recipients. Can be a string or array. Your API should validate this.</p>
    <pre><code>"aud": ["api:read", "api:write"]</code></pre>

    <h3><code>exp</code> – Expiration Time</h3>
    <p>Unix timestamp when the token expires. Critical for security.</p>
    <p><strong>Viewer Feature</strong>: Converted to UTC date + “Valid/Expired” badge.</p>

    <h3><code>nbf</code> – Not Before</h3>
    <p>Token is not valid before this time. Useful for delayed activation.</p>

    <h3><code>iat</code> – Issued At</h3>
    <p>When the token was created. Helps calculate age.</p>

    <h3><code>jti</code> – JWT ID</h3>
    <p>Unique identifier to prevent replay attacks.</p>

    <h2>Public & Private Claims</h2>
    <p>Beyond standards, you can add:</p>
    <ul>
      <li><code>role</code>: <code>"admin"</code></li>
      <li><code>permissions</code>: <code>["dashboard:view"]</code></li>
      <li><code>tenant_id</code>: <code>"org_789"</code></li>
    </ul>

    <h3>Best Practices</h3>
    <ul>
      <li>Keep payload small (&lt; 4KB)</li>
      <li>Avoid sensitive data (e.g., passwords)</li>
      <li>Use <code>jti</code> + revocation list</li>
      <li>Validate <code>iss</code> and <code>aud</code> server-side</li>
    </ul>

    <h2>How the Viewer Helps</h2>
    <p>Paste any JWT → instantly see:</p>
    <ul>
      <li>All claims in pretty-printed JSON</li>
      <li>Timestamps in UTC</li>
      <li>Expiration status</li>
      <li>Copy-ready output</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Should I trust <code>sub</code> for authorization?</summary>
      <p>No. Always verify identity server-side using signature and <code>iss</code>.</p>
    </details>
    <details>
      <summary>Can <code>aud</code> be multiple values?</summary>
      <p>Yes. Use an array. Your API must check membership.</p>
    </details>
    <details>
      <summary>What if <code>exp</code> is missing?</summary>
      <p>Token never expires — a security risk. Always set it.</p>
    </details>

    <p class="italic-note">Know your claims. Secure your tokens.</p>
  </article>
</div>