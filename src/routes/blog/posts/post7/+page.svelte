<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Tips for Inspecting JWT Payloads | AxelBase Blog</title>
  <meta name="description" content="Learn practical tips for inspecting JWT payloads, understanding claims, timestamps, and ensuring data privacy during debugging." />
  <meta property="og:title" content="Tips for Inspecting JWT Payloads | AxelBase Blog" />
  <meta property="og:description" content="Learn practical tips for inspecting JWT payloads, understanding claims, timestamps, and ensuring data privacy during debugging." />
  <meta property="og:url" content={`${base}/blog/posts/post7`} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="https://axelbase.github.io/jwt-viewer/blog/posts/post7.html" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href={`${base}/`}>Home</a>
    <span>/</span>
    <a href={`${base}/blog`}>Blog</a>
    <span>/</span>
    <p>Tips for Inspecting JWT Payloads</p>
  </div>

  <article class="prose">
    <h1>Tips for Inspecting JWT Payloads</h1>
    <p class="post-meta">Published: November 6, 2025</p>

    <p>Inspecting JWT payloads is an essential skill for developers, security engineers, and educators. Properly understanding claims and timestamps ensures accurate debugging and secure practices.</p>

    <h2>1. Understand Standard Claims</h2>
    <ul>
      <li><strong>sub:</strong> Subject or user ID.</li>
      <li><strong>iss:</strong> Issuer of the token.</li>
      <li><strong>aud:</strong> Intended audience.</li>
      <li><strong>exp:</strong> Expiration time.</li>
      <li><strong>iat:</strong> Issued at timestamp.</li>
      <li><strong>nbf:</strong> Not before timestamp.</li>
    </ul>

    <h2>2. Use Human-Readable Timestamps</h2>
    <p>Convert UNIX timestamps to UTC dates for easier interpretation. This helps identify expired tokens or tokens not yet valid.</p>

    <h2>3. Explore Custom Claims</h2>
    <p>Custom claims, like <code>role</code> or <code>tenant_id</code>, often carry application-specific data. Always inspect these carefully to understand access permissions.</p>

    <h2>4. Privacy Tips</h2>
    <ul>
      <li>Never expose production tokens in public tools or shared devices.</li>
      <li>Clear tokens from memory after inspection.</li>
      <li>Use local client-side viewers to ensure zero server exposure.</li>
    </ul>

    <h2>5. Final Thoughts</h2>
    <p>By following these best practices, developers can confidently decode, inspect, and debug JWTs while maintaining full privacy and security.</p>
  </article>
</div>
