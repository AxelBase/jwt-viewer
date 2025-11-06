<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$lib/browser';

  // ---------- ONLY THIS PART CHANGES ----------
  let copyHeader = '';
  let copyPayload = '';

  // Fill the variables with the JSON you want to copy
  $: if (browser) {
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
  <title>What is the JWT Header & Payload Viewer? | AxelBase Blog</title>
  <meta name="description" content="A privacy-first, client-side tool to decode and inspect JWT header and payload without sending data to any server." />
  <meta property="og:title" content="What is the JWT Header & Payload Viewer? | AxelBase Blog" />
  <meta property="og:description" content="A privacy-first, client-side tool to decode and inspect JWT header and payload without sending data to any server." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>What is the JWT Header & Payload Viewer?</p>
  </div>

  <article class="prose">
    <h1>What is the JWT Header & Payload Viewer?</h1>
    <p class="post-meta">Published: November 5, 2025</p>

    <p>The <strong>JWT Header & Payload Viewer</strong> is a lightweight, open-source, client-side web utility built with SvelteKit and Bootstrap. It lets developers instantly decode and read the <code>header</code> and <code>payload</code> of any JSON Web Token (JWT) directly in the browser — <em>without ever sending the token to a server</em>.</p>

    <p>Unlike online JWT debuggers that require you to paste tokens into third-party services, this tool runs 100% locally. Your sensitive tokens never leave your device, making it ideal for debugging authentication flows, inspecting access tokens, or teaching JWT concepts in a safe environment.</p>

    <h2>Why It Was Built</h2>
    <p>Most JWT tools on the web are convenient but risky. They transmit your token to remote servers, which can log, store, or even misuse it. For security-conscious developers, this is unacceptable — especially when working with production credentials or internal APIs.</p>

    <p>This viewer eliminates that risk by using only native browser APIs (<code>atob</code>, <code>JSON.parse</code>) to decode Base64Url segments. The signature is ignored (as intended for inspection), and no network requests are made after the initial page load.</p>

    <h3>Key Features</h3>
    <ul>
      <li><strong>Instant Decoding</strong> – Paste any JWT, see header and payload instantly</li>
      <li><strong>Human-Readable Timestamps</strong> – <code>exp</code>, <code>iat</code>, <code>nbf</code> converted to UTC dates</li>
      <li><strong>Raw vs. Pretty View</strong> – Toggle between decoded JSON and original Base64Url</li>
      <li><strong>Copy to Clipboard</strong> – Export header or payload with one click</li>
      <li><strong>Responsive Design</strong> – Works on mobile, tablet, and desktop</li>
    </ul>

    <h3>How It Works</h3>
    <p>When you paste a JWT like <code>eyJhbGciOiJIUzI1NiIs... </code>, the app:</p>
    <ol>
      <li>Splits the token by <code>.</code></li>
      <li>Decodes the first two segments using Base64Url rules</li>
      <li>Parses them as JSON</li>
      <li>Displays them with syntax-aware formatting</li>
    </ol>

    <h2>Who Should Use It?</h2>
    <p>Frontend engineers verifying auth tokens, backend developers debugging OAuth flows, security auditors reviewing token claims, and educators teaching JWT structure — all benefit from a safe, offline-capable viewer.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Does it verify signatures?</summary>
      <p>No. Signature verification requires the secret key and is intentionally omitted for privacy and simplicity.</p>
    </details>
    <details>
      <summary>Can I use it offline?</summary>
      <p>Yes! After the first load, all assets can be cached. Add it as a PWA for full offline access.</p>
    </details>
    <details>
      <summary>Is the source code open?</summary>
      <p>Absolutely. Available on <a href="https://github.com/axelbase/jwt-viewer" target="_blank" rel="noopener">GitHub</a> under MIT license.</p>
    </details>

    <p class="italic-note">Start decoding JWTs securely today — no servers, no logs, no risk.</p>
  </article>
</div>

<style>
  /* Inherits from global .prose styles */
</style>
