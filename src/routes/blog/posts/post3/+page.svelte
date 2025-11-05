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
  <title>How to Decode JWTs Locally for Privacy | AxelBase Blog</title>
  <meta name="description" content="Step-by-step guide to decoding JWTs in your browser using the AxelBase viewer — no server, no risk." />
  <meta property="og:title" content="How to Decode JWTs Locally for Privacy | AxelBase Blog" />
  <meta property="og:description" content="Step-by-step guide to decoding JWTs in your browser using the AxelBase viewer — no server, no risk." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How to Decode JWTs Locally</p>
  </div>

  <article class="prose">
    <h1>How to Decode JWTs Locally for Privacy</h1>
    <p class="post-meta">Published: November 7, 2025</p>

    <p>Decoding a JWT locally is the safest way to inspect its contents. This guide walks you through using the <strong>AxelBase JWT Header & Payload Viewer</strong> to decode tokens in your browser — with zero data transmission.</p>

    <h2>Step 1: Get Your JWT</h2>
    <p>JWTs appear in:</p>
    <ul>
      <li>Browser dev tools → Application → Local Storage</li>
      <li>Network tab → Authorization header (<code>Bearer ...</code>)</li>
      <li>Cookies (if using cookie-based auth)</li>
      <li>API responses or logs</li>
    </ul>
    <p>Copy the full token string (three parts separated by dots).</p>

    <h2>Step 2: Open the Viewer</h2>
    <p>Navigate to the <a href="{base}/">JWT Viewer</a> or bookmark it for quick access.</p>

    <h3>Paste the Token</h3>
    <p>Click in the large text area and paste your JWT. The app auto-detects and decodes it instantly.</p>

    <h2>Step 3: Explore the Output</h2>
    <p>Two tabs appear:</p>
    <ul>
      <li><strong>Header</strong> – Shows <code>alg</code>, <code>typ</code>, etc.</li>
      <li><strong>Payload</strong> – Shows user claims, expiration, issuer</li>
    </ul>

    <h3>Key Insights</h3>
    <p>Look for:</p>
    <ul>
      <li><code>exp</code> – Is the token expired?</li>
      <li><code>sub</code> – Who is the user?</li>
      <li><code>scope</code> or <code>permissions</code> – What can they do?</li>
    </ul>

    <h2>Step 4: Use Advanced Features</h2>
    <ul>
      <li><strong>Toggle Raw View</strong> – See original Base64Url strings</li>
      <li><strong>Copy JSON</strong> – Paste into notes or tickets</li>
      <li><strong>Check Timestamps</strong> – All dates shown in UTC</li>
    </ul>

    <h3>Pro Tip: Mobile Debugging</h3>
    <p>On mobile, use browser dev tools (via USB) or share the token via secure note. The viewer is fully responsive.</p>

    <h2>Privacy & Security Benefits</h2>
    <p>Because decoding happens client-side:</p>
    <ul>
      <li>No risk of token leakage</li>
      <li>No logging or analytics</li>
      <li>Works offline after first load</li>
      <li>No CORS or network dependency</li>
    </ul>

    <h2>Common Use Cases</h2>
    <ul>
      <li>Debugging 401 errors</li>
      <li>Verifying token refresh logic</li>
      <li>Onboarding new developers</li>
      <li>Security code reviews</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>What if the token is encrypted (JWE)?</summary>
      <p>JWE tokens cannot be decoded client-side without the key. This tool supports JWS only.</p>
    </details>
    <details>
      <summary>Can I save tokens?</summary>
      <p>No persistence. Everything clears on refresh or “Clear” button.</p>
    </details>
    <details>
      <summary>Is it safe for production tokens?</summary>
      <p>Yes — nothing leaves your browser. Safer than online tools.</p>
    </details>

    <p class="italic-note">Decode with confidence. Keep your tokens private.</p>
  </article>
</div>