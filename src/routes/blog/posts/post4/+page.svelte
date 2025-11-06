<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$lib/browser';

  // ---------- Copy block ----------
  let copyHeader = '';
  let copyPayload = '';

  $: if (browser) {
    copyHeader = JSON.stringify({ alg: 'ES256', typ: 'JWT' }, null, 2);
    copyPayload = JSON.stringify({ sub: '789', role: 'admin' }, null, 2);
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
  // --------------------------------
</script>

<svelte:head>
  <title>How to Use the JWT Header & Payload Viewer Effectively | AxelBase Blog</title>
  <meta name="description" content="Learn step-by-step how to safely decode JWTs using the AxelBase JWT Viewer — from input to interpretation of claims." />
  <meta property="og:title" content="How to Use the JWT Header & Payload Viewer Effectively | AxelBase Blog" />
  <meta property="og:description" content="Learn step-by-step how to safely decode JWTs using the AxelBase JWT Viewer — from input to interpretation of claims." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How to Use the JWT Header & Payload Viewer Effectively</p>
  </div>

  <article class="prose">
    <h1>How to Use the JWT Header & Payload Viewer Effectively</h1>
    <p class="post-meta">Published: November 6, 2025</p>

    <p>Using the <strong>JWT Header & Payload Viewer</strong> is simple — but understanding how to interpret what you see is where the tool shines. Below is a quick walkthrough for developers and security testers.</p>

    <h2>1. Paste or Drop Your Token</h2>
    <p>Open the viewer and paste your JWT (e.g. <code>eyJhbGciOi...</code>) into the input box. The token will automatically decode into two JSON panels — one for the header and one for the payload.</p>

    <h2>2. Examine the Header</h2>
    <p>The header reveals the algorithm and type. Check that the algorithm matches your system’s expectations — e.g., <code>RS256</code> for asymmetric signing or <code>HS256</code> for HMAC-based signing.</p>

    <h2>3. Review the Payload</h2>
    <p>The payload lists claims such as <code>sub</code> (subject), <code>exp</code> (expiration), and custom data. Expiration times are auto-converted into UTC for readability.</p>

    <h2>4. Copy What You Need</h2>
    <p>Use the copy buttons to export header or payload JSON to your clipboard. This is especially useful for debugging, documenting API responses, or validating tokens in Postman.</p>

    <h2>5. Keep It Private</h2>
    <p>Remember — no data is ever sent out. All decoding happens locally. You can safely use this tool in corporate environments or offline workflows.</p>

    <h2>Example Session</h2>
    <pre><code>{`Header:
{ "alg": "RS256", "typ": "JWT" }

Payload:
{ "sub": "42", "role": "developer", "exp": 1738867200 }`}</code></pre>

    <p class="italic-note">Fast, private, transparent — that’s what modern JWT debugging should be.</p>
  </article>
</div>
