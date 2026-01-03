<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import '../app.css';

  // === SEO Structured Data (Organization) ===
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AxelBase",
    "url": "https://axelbase.github.io/jwt-viewer/",
    "logo": "https://axelbase.github.io/jwt-viewer/AxelLab-Logo.ico",
    "sameAs": [
      "https://github.com/axelbase",
      "https://x.com/axelbase"
    ]
  };

  // === State for "Buy me a coffee" ===
  let isDropdownOpen = false;
  function toggleDropdown() { isDropdownOpen = !isDropdownOpen; }
  function closeDropdown() { isDropdownOpen = false; }

  // === Footer State ===
  const currentYear = new Date().getFullYear();

  // === Click Outside Directive ===
  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return { destroy() { document.removeEventListener('click', handleClick, true); } };
  }
</script>

<svelte:head>
  <!-- Canonical Base -->
  <link rel="canonical" href="https://axelbase.github.io{base}" />

  <!-- Robots Meta -->
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />

  <!-- Default Title & Description Fallback -->
  <title>AxelBase JWT Viewer | Decode JWT Header & Payload Instantly</title>
  <meta name="description" content="Free client-side JWT Header & Payload Viewer. Decode JSON Web Tokens safely in your browser with zero data sent to servers." />

  <!-- Structured Data (Organization Schema) -->
  <script type="application/ld+json">
    {JSON.stringify(organizationSchema)}
  </script>
</svelte:head>

<div class="app-container">
  <header class="sticky-nav">
    <div class="navbar-container">
      <div class="navbar-left">
        <a href="{base}/" class="navbar-logo" aria-label="Home">
          <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" />
          <span class="navbar-brand-text">AxelBase</span>
        </a>

        <!-- Buy Me a Coffee Dropdown (from File 1) -->
        <div class="bmac-wrapper" use:clickOutside on:click_outside={closeDropdown}>
          <button
            class="bmac-button d-flex align-items-center gap-2 text-white border-0 px-4 py-2 rounded-pill shadow-sm"
            on:click={toggleDropdown}
            aria-label="Support options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
            </svg>
            <span class="d-none d-sm-inline fw-semibold">Buy me a Coffee</span>
            <span class="d-sm-none fw-semibold">Coffee</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown mt-2" transition:fly={{ y: -10, duration: 250 }}>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$3</span> One Coffee
              </a>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$5</span> Two Coffees
              </a>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$10</span> Three Coffees
              </a>

              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown} class="custom-amount">
                Custom Amount
              </a>

              <a
                href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                on:click={closeDropdown}
                class="custom-amount"
              >
                Buy via Crypto (Bitcoin)
              </a>
            </div>
          {/if}
        </div>
      </div>

      <nav class="navbar-right">
        <ul>
          <li><a href="{base}/">Home</a></li>
          <li><a href="{base}/#about">About</a></li>
          <li><a href="{base}/#how-to-use">How to use</a></li>
          <li><a href="{base}/#faq">FAQ</a></li>
          <li><a href="{base}/blog">Blog</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <slot />
  </main>

  <footer class="sticky-footer">
    <span>© {currentYear} AxelBase JWT Viewer</span>
    <div class="footer-links">
      <a href="{base}/privacy">Privacy Policy</a>
      <a href="{base}/terms">Terms and Conditions</a>
    </div>
  </footer>
</div>

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .main-content {
    flex: 1;
    padding-top: 70px;
    padding-bottom: 70px;
  }

  .sticky-nav {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: var(--bg-surface-darker);
    border-bottom: 2px solid var(--primary-color);
    padding: 0.75rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }
  .navbar-logo img {
    height: 32px;
    width: 32px;
    transition: transform 0.4s ease-in-out;
  }
  .navbar-logo:hover img {
    transform: rotate(360deg);
  }
  .navbar-brand-text {
    color: var(--text-primary);
    font-size: 1.3rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .navbar-logo:hover .navbar-brand-text {
    color: var(--primary-color);
  }

  .navbar-right ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  .navbar-right a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    position: relative;
    padding-bottom: 5px;
    transition: color 0.3s ease;
  }
  .navbar-right a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease-in-out;
  }
  .navbar-right a:hover {
    color: var(--text-primary);
  }
  .navbar-right a:hover::after {
    width: 100%;
  }

  /* === Buy Me a Coffee Button & Dropdown - Styles from File 1, adapted to File 2 theme === */
  .bmac-wrapper {
    position: relative;
  }

  .bmac-button {
    background: var(--primary-color);
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }
  .bmac-button:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    margin-top: 0.5rem;
    background: var(--bg-surface);
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(220, 53, 69, 0.25);
    overflow: hidden;
    border: 1px solid rgba(220, 53, 69, 0.2);
    z-index: 1001;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: var(--primary-color);
    color: white;
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--primary-color);
    font-size: 1.1rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--primary-color);
    border-top: 1px solid var(--border-color);
    justify-content: center !important;
  }
  .bmac-dropdown .custom-amount:hover {
    color: white;
  }

  .sticky-footer {
    position: relative;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    background-color: var(--bg-surface-darker);
    color: var(--text-secondary);
    padding: 1rem 2rem;
    border-top: 2px solid var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  .footer-links a {
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
  .footer-links a:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
</style>