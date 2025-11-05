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
  <title>Raw vs. Decoded Views: Customizing Your JWT Inspection | AxelBase Blog</title>
  <meta
    name="description"
    content="Learn how to toggle between pretty-printed JSON and raw Base64Url strings for advanced JWT analysis."
  />
  <meta property="og:title" content="Raw vs. Decoded Views: Customizing Your JWT Inspection | AxelBase Blog" />
  <meta
    property="og:description"
    content="Learn how to toggle between pretty-printed JSON and raw Base64Url strings for advanced JWT analysis."
  />
  <meta property="og:url" content={`${base}/blog/posts/post6`} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href={`${base}/blog`}>Blog</a>
    <span>/</span>
    <p>Raw vs. Decoded Views</p>
  </div>

  <article class="prose">
    <h1>Raw vs. Decoded Views: Customizing Your JWT Inspection</h1>
    <p class="post-meta">Published: November 10, 2025</p>

    <p>
      Sometimes you need the full picture. The <strong>JWT Header & Payload Viewer</strong> lets you toggle between
      <strong>pretty-printed JSON</strong> and <strong>raw Base64Url strings</strong> — giving you flexibility for debugging,
      teaching, or reverse-engineering.
    </p>

    <h2>Pretty-Printed JSON (Default)</h2>
    <p>Ideal for:</p>
    <ul>
      <li>Reading claims quickly</li>
      <li>Copying structured data</li>
      <li>Sharing with team members</li>
    </ul>

    <pre><code>{`{
  "sub": "123",
  "name": "Alice",
  "exp": 1736299200
}`}</code></pre>

    <h2>Raw Base64Url (Toggle On)</h2>
    <p>Shows the exact encoded string before decoding. Useful for:</p>
    <ul>
      <li>Verifying encoding manually</li>
      <li>Teaching Base64Url rules</li>
      <li>Comparing with logs or APIs</li>
    </ul>
    <pre><code>eyJzdWIiOiIxMjMiLCJuYW1lIjoiQWxpY2UiLCJleHAiOjE3MzYyOTkyMDB9</code></pre>

    <h3>How to Toggle</h3>
    <p>Check the box: <strong>“Show Raw Base64Url”</strong> → both tabs update instantly.</p>

    <h2>Advanced Use Cases</h2>

    <h3>1. Debugging Encoding Issues</h3>
    <p>Copy raw segment → paste into online Base64Url decoder → compare output.</p>

    <h3>2. Teaching JWT Internals</h3>
    <p>Show students:</p>
    <ol>
      <li>Raw → <code>eyJhbGciOi...</code></li>
      <li>Decode → <code>{`{"alg": "HS256"}`}</code></li>
      <li>Explain padding, <code>-</code> → <code>+</code>, <code>_</code> → <code>/</code></li>
    </ol>

    <h3>3. API Contract Validation</h3>
    <p>Compare raw payload from frontend vs. backend logs to catch serialization bugs.</p>

    <h2>Copy Options</h2>
    <p>With toggle on, “Copy” button exports the <strong>raw string</strong>. Off → exports <strong>JSON</strong>.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Why is padding (<code>=</code>) sometimes missing?</summary>
      <p>Base64Url omits padding. The viewer adds it internally before <code>atob()</code>.</p>
    </details>
    <details>
      <summary>Can I edit raw and re-encode?</summary>
      <p>Not in-app. Use external tools or code.</p>
    </details>
    <details>
      <summary>Is raw view safe?</summary>
      <p>Yes. Still 100% client-side. No data sent.</p>
    </details>

    <p class="italic-note">See it your way — raw or refined.</p>
  </article>
</div>
