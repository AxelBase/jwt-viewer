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
  <title>Understanding JWT Structure: Header, Payload, and Signature | AxelBase Blog</title>
  <meta
    name="description"
    content="Deep dive into the three parts of a JSON Web Token and why inspecting header and payload is critical for developers."
  />
  <meta property="og:title" content="Understanding JWT Structure: Header, Payload, and Signature | AxelBase Blog" />
  <meta
    property="og:description"
    content="Deep dive into the three parts of a JSON Web Token and why inspecting header and payload is critical for developers."
  />
  <meta property="og:url" content={`${base}/blog/posts/post2`} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href={`${base}/blog`}>Blog</a>
    <span>/</span>
    <p>Understanding JWT Structure</p>
  </div>

  <article class="prose">
    <h1>Understanding JWT Structure: Header, Payload, and Signature</h1>
    <p class="post-meta">Published: November 6, 2025</p>

    <p>
      A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties.
      It’s widely used in modern authentication systems like OAuth 2.0 and OpenID Connect. But to use JWTs effectively,
      you must understand their three core components: <strong>Header</strong>, <strong>Payload</strong>, and
      <strong>Signature</strong>.
    </p>

    <p>Let’s break down each part and see why the <em>JWT Header & Payload Viewer</em> focuses on the first two.</p>

    <h2>The Header: Metadata About the Token</h2>
    <p>The header typically contains two fields:</p>
    <ul>
      <li><code>alg</code> – The signing algorithm (e.g., <code>HS256</code>, <code>RS256</code>)</li>
      <li><code>typ</code> – The token type, usually <code>"JWT"</code></li>
    </ul>
    <p>
      Advanced headers may include <code>kid</code> (key ID) or <code>cty</code> (content type). The header is
      Base64Url-encoded and forms the first segment of the token.
    </p>

    <h3>Example Header</h3>
    <pre><code>{`{ "alg": "HS256", "typ": "JWT" }`}</code></pre>

    <h2>The Payload: The Claims (Data)</h2>
    <p>The payload holds the actual claims — statements about the user and additional data. There are three types:</p>
    <ul>
      <li>
        <strong>Registered</strong>: <code>iss</code> (issuer), <code>sub</code> (subject), <code>aud</code> (audience),
        <code>exp</code> (expiration), <code>nbf</code> (not before), <code>iat</code> (issued at), <code>jti</code>
        (JWT ID)
      </li>
      <li><strong>Public</strong>: Defined by application (e.g., <code>role</code>, <code>permissions</code>)</li>
      <li><strong>Private</strong>: Custom bilateral claims</li>
    </ul>

    <h3>Why View the Payload?</h3>
    <p>Inspecting the payload reveals who the token is for, when it expires, and what permissions it grants — all without needing the secret key.</p>

    <h2>The Signature: Tamper Protection</h2>
    <p>
      The signature is created by hashing the encoded header and payload with a secret (HMAC) or private key (RSA/ECDSA).
      It ensures the token hasn’t been altered.
    </p>

    <p>
      <strong>Important</strong>: The viewer <em>does not</em> verify signatures. That requires the key and is outside the scope of
      safe client-side inspection.
    </p>

    <h3>Full JWT Example</h3>
    <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>

    <h2>Why This Matters for Developers</h2>
    <p>Understanding JWT structure helps you:</p>
    <ul>
      <li>Debug login failures</li>
      <li>Verify token lifetime</li>
      <li>Ensure correct claims are sent</li>
      <li>Teach authentication concepts</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Can I edit a JWT and re-sign it?</summary>
      <p>Not without the signing key. Any change invalidates the signature.</p>
    </details>

    <details>
      <summary>Are all claims required?</summary>
      <p>No. Only <code>exp</code> is strongly recommended for security.</p>
    </details>

    <details>
      <summary>Should I log JWTs?</summary>
      <p>Never in production. They may contain PII or access rights.</p>
    </details>

    <p class="italic-note">Master JWT structure — master modern auth.</p>
  </article>
</div>
