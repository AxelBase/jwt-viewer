<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import '../app.css';

  // === State for "Buy me a coffee" ===
  const paypalUsername = 'YOUR_USERNAME'; // <-- IMPORTANT: Set your PayPal username
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
  function closeDropdown() {
    isDropdownOpen = false;
  }

  // === State for Footer ===
  const currentYear = new Date().getFullYear();

  // === Click Outside Directive ===
  // (From your example, for closing the dropdown)
  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        // Dispatch a custom event
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous"
  />

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"
    defer
  ></script>
</svelte:head>

<div class="app-container">
  <header class="sticky-nav">
    <div class="navbar-container">
      <div class="navbar-left">
        <a href="{base}/" class="navbar-logo" aria-label="Home">
          <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" />
          <span class="navbar-brand-text">AxelBase</span>
        </a>

        <div class="bmac-wrapper" use:clickOutside on:click_outside={closeDropdown}>
          <button class="bmac-button" on:click={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"
              />
            </svg>
            <span>Buy me a coffee</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
              {#each donationAmounts as amount}
                <a
                  href="https://paypal.me/{paypalUsername}/{amount}"
                  target="_blank"
                  rel="noopener noreferrer"
                  on:click={closeDropdown}
                >
                  ${amount}
                </a>
              {/each}
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
  /* === Main Layout === */
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .main-content {
    flex: 1; /* Ensures main content takes up available space */
    /* Add padding to prevent content from hiding under sticky header/footer */
    padding-top: 70px; /* Adjust based on your final nav height */
    padding-bottom: 70px; /* Adjust based on your final footer height */
  }

  /* === Sticky Header === */
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

  /* === Header Left Side === */
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
    transform: rotate(360deg); /* Animation */
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

  /* === Header Right Side (Nav) === */
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
  /* Underline hover effect */
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
    width: 100%; /* Animation */
  }

  /* === Buy Me a Coffee Button === */
  .bmac-wrapper {
    position: relative;
  }
  .bmac-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  .bmac-button svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
  .bmac-button:hover {
    background-color: var(--primary-hover);
    transform: scale(1.05); /* Hover effect */
    box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
  }
  .bmac-dropdown {
    position: absolute;
    top: 125%; /* Position below button */
    left: 0;
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1001;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    min-width: 100px;
  }
  .bmac-dropdown a {
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 3px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .bmac-dropdown a:hover {
    background-color: var(--primary-color);
    color: white;
  }

  /* === Sticky Footer === */
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