<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$lib/browser';

  let copyHeader = '';
  let copyPayload = '';

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
</script>

<svelte:head>
  <title>Understanding JWT Structure: Header, Payload, and Signature | AxelBase Blog</title>
  <meta name="description" content="Deep dive into the three parts of a JSON Web Token and why inspecting header and payload is critical for developers." />
  <meta property="og:title" content="Understanding JWT Structure: Header, Payload, and Signature | AxelBase Blog" />
  <meta property="og:description" content="Deep dive into the three parts of a JSON Web Token and why inspecting header and payload is critical for developers." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Understanding JWT Structure</p>
  </div>

  <article class="prose">
    <h1>Understanding JWT Structure: Header, Payload, and Signature</h1>
    <p class="post-meta">Published: November 6, 2025</p>
    <p>A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties. It’s widely used in modern authentication systems like OAuth 2.0 and OpenID Connect. But to use JWTs effectively, you must understand their three core components: <strong>Header</strong>, <strong>Payload</strong>, and <strong>Signature</strong>.</p>

    <h2>The Header: Metadata About the Token</h2>
    <p>The header typically contains two fields:</p>
    <ul>
      <li><code>alg</code> – The signing algorithm (e.g., <code>HS256</code>, <code>RS256</code>)</li>
      <li><code>typ</code> – The token type, usually <code>"JWT"</code></li>
    </ul>

    <h3>Example Header</h3>
    <pre><code>{`{ "alg": "HS256", "typ": "JWT" }`}</code></pre>

    <h2>The Payload: The Claims (Data)</h2>
    <p>The payload holds the actual claims — statements about the user and additional data. There are three types:</p>
    <ul>
      <li><strong>Registered</strong>: <code>iss</code>, <code>sub</code>, <code>aud</code>, <code>exp</code>, <code>nbf</code>, <code>iat</code>, <code>jti</code></li>
      <li><strong>Public</strong>: Defined by application (e.g., <code>role</code>, <code>permissions</code>)</li>
      <li><strong>Private</strong>: Custom bilateral claims</li>
    </ul>

    <h2>The Signature: Tamper Protection</h2>
    <p>The signature is created by hashing the encoded header and payload with a secret (HMAC) or private key (RSA/ECDSA). It ensures the token hasn’t been altered.</p>

    <p><strong>Important</strong>: The viewer <em>does not</em> verify signatures. That requires the key and is outside the scope of safe client-side inspection.</p>

    <p class="italic-note">Master JWT structure — master modern auth.</p>
  </article>
</div>
