<script lang="ts">
  import { base64UrlDecode, safeJsonParse, formatTimestamp } from '$lib/utils';
  import type { JwtHeader, JwtPayload } from '$lib/types';

  // State
  let jwt: string = '';
  let header: JwtHeader | null = null;
  let payload: JwtPayload | null = null;
  let error: string = '';
  let activeTab: 'header' | 'payload' = 'header';
  let rawHeader: string = '';
  let rawPayload: string = '';
  let showRaw: boolean = false;

  // Reactive decoding
  $: {
    error = '';
    header = null;
    payload = null;
    rawHeader = '';
    rawPayload = '';

    const trimmed = jwt.trim();
    if (trimmed) {
      const parts = trimmed.split('.');
      if (parts.length !== 3 || parts.some(p => !p)) {
        error = 'Invalid JWT: Must have exactly 3 non-empty parts separated by dots.';
      } else {
        try {
          rawHeader = parts[0];
          rawPayload = parts[1];

          const decodedHeader = base64UrlDecode(rawHeader);
          const decodedPayload = base64UrlDecode(rawPayload);

          header = safeJsonParse(decodedHeader);
          payload = safeJsonParse(decodedPayload);

          if (!header) error = 'Header is not valid JSON.';
          if (!payload) error = 'Payload is not valid JSON.';
        } catch (e) {
          error = 'Failed to decode token. Check Base64Url format.';
        }
      }
    }
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(`${showRaw ? 'Raw ' : ''}${activeTab === 'header' ? 'Header' : 'Payload'} copied!`);
      })
      .catch(() => {
        alert('Copy failed. Please select and copy manually.');
      });
  }

  function clear() {
    jwt = '';
  }
</script>

<svelte:head>
  <title>JWT Header & Payload Viewer | AxelBase</title>
  <meta name="description" content="Decode JWT headers and payloads locally in your browser. 100% client-side, no tracking, no logs. Free open-source tool." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://axelbase.github.io/jwt-viewer/" />

  <!-- Open Graph -->
  <meta property="og:title" content="JWT Header & Payload Viewer | AxelBase" />
  <meta property="og:description" content="Decode JWT headers and payloads locally in your browser. 100% client-side, no tracking, no logs." />
  <meta property="og:url" content="https://axelbase.github.io/jwt-viewer/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://axelbase.github.io/jwt-viewer/assets/og-image.png" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="JWT Header & Payload Viewer | AxelBase" />
  <meta name="twitter:description" content="Decode JWT headers and payloads locally in your browser. 100% client-side, no tracking, no logs." />
  <meta name="twitter:image" content="https://axelbase.github.io/jwt-viewer/assets/og-image.png" />

  <!-- JSON-LD structured data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JWT Header & Payload Viewer",
      "url": "https://axelbase.github.io/jwt-viewer/",
      "applicationCategory": "DeveloperTool",
      "operatingSystem": "Web",
      "description": "Decode JWT headers and payloads locally in your browser. 100% client-side, no tracking, no logs.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  </script>
</svelte:head>

<div class="container py-4">
  <h1 class="h3 mb-4">JWT Header & Payload Viewer</h1>

  <div class="mb-3">
    <textarea
      class="form-control"
      rows="5"
      placeholder="Paste your JWT here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c)"
      bind:value={jwt}
    ></textarea>
  </div>

  {#if error}
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      {error}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  {/if}

  {#if header && payload}
    <div class="card mb-3">
      <div class="card-body">
        <strong>Algorithm:</strong> {header.alg || 'none'} |
        <strong>Type:</strong> {header.typ || 'JWT'}
        {#if payload.exp}
          | <strong>Expires:</strong> {formatTimestamp(payload.exp)}
          <span class="badge ms-2 {Date.now()/1000 > payload.exp ? 'bg-danger' : 'bg-success'}">
            {Date.now()/1000 > payload.exp ? 'Expired' : 'Valid'}
          </span>
        {/if}
        {#if payload.iat}
          | <strong>Issued:</strong> {formatTimestamp(payload.iat)}
        {/if}
        {#if payload.nbf}
          | <strong>Not Before:</strong> {formatTimestamp(payload.nbf)}
        {/if}
      </div>
    </div>

    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <button class="nav-link {activeTab === 'header' ? 'active' : ''}" on:click={() => (activeTab = 'header')}>Header</button>
      </li>
      <li class="nav-item">
        <button class="nav-link {activeTab === 'payload' ? 'active' : ''}" on:click={() => (activeTab = 'payload')}>Payload</button>
      </li>
    </ul>

    <div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" bind:checked={showRaw} id="showRaw" />
      <label class="form-check-label" for="showRaw">Show Raw Base64Url</label>
    </div>

    <div class="bg-light p-3 rounded mb-3">
      {#if showRaw}
        <pre><code>{activeTab === 'header' ? rawHeader : rawPayload}</code></pre>
      {:else}
        <pre><code>{JSON.stringify(activeTab === 'header' ? header : payload, null, 2)}</code></pre>
      {/if}
      <button
        class="btn btn-sm btn-outline-primary"
        on:click={() => copy(showRaw ? (activeTab === 'header' ? rawHeader : rawPayload) : JSON.stringify(activeTab === 'header' ? header : payload, null, 2))}
      >
        Copy {showRaw ? 'Raw' : 'JSON'} {activeTab === 'header' ? 'Header' : 'Payload'}
      </button>
    </div>
  {/if}

  <div class="mt-3">
    <button class="btn btn-secondary" on:click={clear}>Clear</button>
  </div>
</div>

<section id="about" class="py-5 bg-light">
  <div class="container">
    <h2 class="display-5 mb-4">About the JWT Header & Payload Viewer</h2>

    <p class="lead">A <strong>100% client-side</strong>, open-source web tool that decodes and displays the <code>header</code> and <code>payload</code> of any JSON Web Token (JWT) — <em>without ever sending your data to a server</em>.</p>

    <p>Built for developers, security engineers, and educators, this viewer eliminates the privacy risks of online JWT debuggers. When you paste a token, <strong>all processing happens in your browser</strong> using native JavaScript APIs like <code>atob()</code> and <code>JSON.parse()</code>. No network requests. No logging. No tracking.</p>

    <h3>Why It Was Created</h3>
    <p>Most JWT tools require you to submit tokens to remote servers — a dangerous practice when dealing with production credentials, internal APIs, or sensitive user data. Even “trusted” tools may log inputs, retain history, or be compromised. This viewer solves that by running <strong>entirely locally</strong>, giving you full control and peace of mind.</p>

    <p>Whether you're debugging an OAuth flow, verifying token claims, teaching authentication concepts, or auditing security headers, this tool delivers instant, safe results.</p>

    <h3>Core Features</h3>
    <ul class="list-unstyled">
      <li><strong>Instant Decoding</strong> – Paste any JWT and see header/payload immediately</li>
      <li><strong>Human-Readable Timestamps</strong> – <code>exp</code>, <code>iat</code>, <code>nbf</code> converted to UTC dates</li>
      <li><strong>Expiration Status</strong> – Live badge: <span class="badge bg-success">Valid</span> or <span class="badge bg-danger">Expired</span></li>
      <li><strong>Raw vs. Pretty View</strong> – Toggle between Base64Url strings and formatted JSON</li>
      <li><strong>Copy to Clipboard</strong> – Export header or payload with one click</li>
      <li><strong>Responsive Design</strong> – Works flawlessly on mobile, tablet, and desktop</li>
      <li><strong>Zero Dependencies</strong> – No backend, no database, no analytics</li>
    </ul>

    <h3>Technical Foundation</h3>
    <p>Powered by <strong>SvelteKit</strong> for blazing-fast static generation and <strong>Bootstrap 5</strong> for clean, accessible UI. The entire site is deployed via <strong>GitHub Pages</strong>, ensuring global availability and automatic updates from the <a href="https://github.com/axelbase/jwt-viewer" target="_blank" rel="noopener">open-source repository</a>.</p>

    <p>All code is licensed under the <strong>MIT License</strong>, encouraging contributions, forks, and self-hosting. You can even install it as a PWA for offline use.</p>

    <h3>Who Uses It?</h3>
    <p>Frontend engineers verifying access tokens, backend developers testing refresh logic, DevOps teams auditing auth flows, and instructors demonstrating JWT structure in classrooms — all rely on a tool that respects privacy and delivers accuracy.</p>

    <p class="mt-4"><em>No data leaves your device. No compromises. Just pure, secure JWT inspection.</em></p>

    <div class="text-center mt-5">
      <a href="#how-to-use" class="btn btn-primary btn-lg">Learn How to Use It</a>
    </div>
  </div>
</section>

<section id="how-to-use" class="py-5">
  <div class="container">
    <h2 class="display-5 mb-4">How to Use the JWT Viewer</h2>

    <p class="lead">Decode any JWT in seconds — safely and privately. Follow this step-by-step guide to inspect tokens like a pro.</p>

    <h3>Step 1: Obtain Your JWT</h3>
    <p>JWTs are commonly found in:</p>
    <ul>
      <li><strong>Browser Dev Tools</strong> → <code>Application</code> → <code>Local Storage</code> or <code>Cookies</code></li>
      <li><strong>Network Tab</strong> → Request headers: <code>Authorization: Bearer &lt;token&gt;</code></li>
      <li><strong>API Responses</strong> → Login or token endpoint</li>
      <li><strong>Logs or Debug Output</strong> → From your backend or SDK</li>
    </ul>
    <p><strong>Copy the full token string</strong> (three parts separated by dots: <code>header.payload.signature</code>).</p>

    <h3>Step 2: Paste into the Viewer</h3>
    <p>Click in the large text area at the top of this page and paste your JWT. The tool <strong>auto-decodes instantly</strong> — no "Submit" button needed.</p>

    <h3>Step 3: Explore the Results</h3>
    <p>Two tabs appear:</p>
    <ul>
      <li><strong>Header Tab</strong> – Shows <code>alg</code> (algorithm), <code>typ</code> (usually <code>"JWT"</code>), and <code>kid</code> if present.</li>
      <li><strong>Payload Tab</strong> – Displays user claims: <code>sub</code>, <code>iss</code>, <code>aud</code>, <code>exp</code>, custom fields, etc.</li>
    </ul>

    <h3>Step 4: Use Advanced Features</h3>

    <h4>Check Token Validity</h4>
    <p>Look at the summary bar:</p>
    <ul>
      <li><strong>Expires:</strong> Full UTC date + <span class="badge bg-success">Valid</span> or <span class="badge bg-danger">Expired</span></li>
      <li><strong>Issued / Not Before:</strong> Formatted timestamps for lifecycle analysis</li>
    </ul>

    <h4>Toggle Raw View</h4>
    <p>Check <strong>“Show Raw Base64Url”</strong> to see the original encoded strings. Great for:</p>
    <ul>
      <li>Teaching Base64Url encoding rules</li>
      <li>Comparing with server logs</li>
      <li>Manual verification</li>
    </ul>

    <h4>Copy Output</h4>
    <p>Click <strong>“Copy JSON Header”</strong> or <strong>“Copy Raw Payload”</strong> to export structured data for documentation, tickets, or code reviews.</p>

    <h3>Pro Tips</h3>
    <ul>
      <li><strong>Mobile Debugging:</strong> Use browser remote debugging (USB) or share token via secure note.</li>
      <li><strong>Incognito Mode:</strong> Extra privacy layer — nothing persists.</li>
      <li><strong>PWA Install:</strong> Add to home screen for 1-click access (Chrome/Edge).</li>
      <li><strong>Clear Button:</strong> Instantly reset input and output.</li>
    </ul>

    <h3>Common Use Cases</h3>
    <ul>
      <li>Debugging <code>401 Unauthorized</code> errors</li>
      <li>Verifying token refresh behavior</li>
      <li>Onboarding new developers to your auth system</li>
      <li>Security reviews of token claims and expiration</li>
      <li>Educational demos of JWT structure</li>
    </ul>

    <h3>Safety Reminder</h3>
    <p><strong>Never paste production secrets into public tools.</strong> This viewer is safe because it runs locally — but always treat tokens as sensitive.</p>

    <div class="alert alert-info mt-4">
      <strong>Encrypted Tokens (JWE)?</strong> This tool supports <strong>JWS only</strong>. JWE requires decryption keys and cannot be decoded client-side.
    </div>

    <p class="mt-4"><em>Master JWT inspection in under a minute. Private. Fast. Accurate.</em></p>

    <div class="text-center mt-5">
      <a href="#faq" class="btn btn-outline-primary btn-lg">View FAQ</a>
    </div>
  </div>
</section>

<section id="faq" class="py-5 bg-light">
  <div class="container">
    <h2 class="display-5 mb-4">Frequently Asked Questions</h2>

    <p class="lead">Got questions about the JWT Viewer? We’ve got answers.</p>

    <div class="accordion" id="jwtFAQ" role="tablist" aria-multiselectable="true">
      <!-- FAQ 1 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq1">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
            Does this tool verify JWT signatures?
          </button>
        </h3>
        <div id="faq1" class="accordion-collapse collapse show" aria-labelledby="heading-faq1" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            <strong>No.</strong> Signature verification requires the secret or public key and must be done server-side. This tool <strong>only decodes</strong> the header and payload for inspection. It intentionally skips signature logic to protect privacy and keep processing client-side.
          </div>
        </div>
      </div>

      <!-- FAQ 2 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq2">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
            Is my token data sent to a server?
          </button>
        </h3>
        <div id="faq2" class="accordion-collapse collapse" aria-labelledby="heading-faq2" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            <strong>Absolutely not.</strong> All decoding happens in your browser using JavaScript. No network requests are made after the initial page load (except loading Bootstrap CSS from CDN). Your token <strong>never leaves your device</strong>.
          </div>
        </div>
      </div>

      <!-- FAQ 3 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq3">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
            Can I use this offline?
          </button>
        </h3>
        <div id="faq3" class="accordion-collapse collapse" aria-labelledby="heading-faq3" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            <strong>Yes!</strong> After the first visit, all assets are cached. Install as a <strong>Progressive Web App (PWA)</strong> via your browser’s “Add to Home Screen” option for full offline access.
          </div>
        </div>
      </div>

      <!-- FAQ 4 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq4">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
            What if my token has custom claims?
          </button>
        </h3>
        <div id="faq4" class="accordion-collapse collapse" aria-labelledby="heading-faq4" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            All claims — standard <code>sub</code>, <code>iss</code> or custom <code>role</code>, <code>tenant_id</code> — are displayed in the <strong>Payload</strong> tab in pretty-printed JSON. No filtering or hiding.
          </div>
        </div>
      </div>

      <!-- FAQ 5 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq5">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">
            Why do I see “Invalid JWT” error?
          </button>
        </h3>
        <div id="faq5" class="accordion-collapse collapse" aria-labelledby="heading-faq5" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            <p class="mb-2">Common causes:</p>
            <ul>
              <li>Missing or extra dots (must be exactly 3 parts)</li>
              <li>Empty segments (e.g., <code>..signature</code>)</li>
              <li>Invalid Base64Url characters (use <code>-</code> and <code>_</code>, no <code>+</code>/<code>/</code>)</li>
              <li>Header/payload not valid JSON after decoding</li>
            </ul>
            <p class="mb-0">Double-check your copy-paste.</p>
          </div>
        </div>
      </div>

      <!-- FAQ 6 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq6">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6" aria-expanded="false" aria-controls="faq6">
            Is this tool open source?
          </button>
        </h3>
        <div id="faq6" class="accordion-collapse collapse" aria-labelledby="heading-faq6" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            <strong>Yes!</strong> Fully open source under the <strong>MIT License</strong>. View, fork, or contribute at <a href="https://github.com/axelbase/jwt-viewer" target="_blank" rel="noopener">github.com/axelbase/jwt-viewer</a>.
          </div>
        </div>
      </div>

      <!-- FAQ 7 -->
      <div class="accordion-item">
        <h3 class="accordion-header" id="heading-faq7">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7" aria-expanded="false" aria-controls="faq7">
            Can I host this myself?
          </button>
        </h3>
        <div id="faq7" class="accordion-collapse collapse" aria-labelledby="heading-faq7" data-bs-parent="#jwtFAQ">
          <div class="accordion-body">
            Absolutely. Clone the repo, run <code>npm install && npm run dev</code>, or deploy the built <code>docs/</code> folder to any static host (Netlify, Vercel, AWS S3, etc.).
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
