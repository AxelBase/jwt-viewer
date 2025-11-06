<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'What is the JWT Header & Payload Viewer?', description: 'An introduction to this client-side tool for decoding and inspecting JSON Web Tokens without sending data to servers.' },
    { href: '/blog/posts/post2', title: 'Understanding JWT Structure: Header, Payload, and Signature', description: 'A breakdown of JWT components and why viewing header and payload is essential for developers.' },
    { href: '/blog/posts/post3', title: 'How to Decode JWTs Locally for Privacy', description: 'Step-by-step guide on using the viewer to decode tokens entirely in your browser.' },
    { href: '/blog/posts/post4', title: 'Common JWT Claims and Their Meanings', description: 'Explaining standard claims like iss, sub, exp, and how the tool highlights them.' },
    { href: '/blog/posts/post5', title: 'Handling JWT Expiration and Timestamps', description: 'Learn how the viewer converts Unix timestamps to readable dates and checks validity.' },
    { href: '/blog/posts/post6', title: 'Raw vs. Decoded Views: Customizing Your Inspection', description: 'Tips on toggling between Base64Url raw strings and pretty-printed JSON.' },
    { href: '/blog/posts/post7', title: 'Integrating JWT Viewer into Development Workflows', description: 'Best practices for using the tool in debugging auth flows and API testing.' },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AxelBase JWT Blog",
    "url": "https://axelbase.github.io/jwt-viewer/blog/",
    "description": "Insights, tutorials, and updates on the AxelBase JWT Header & Payload Viewer.",
    "publisher": {
      "@type": "Organization",
      "name": "AxelBase",
      "logo": {
        "@type": "ImageObject",
        "url": "https://axelbase.github.io/jwt-viewer/AxelLab-Logo.ico"
      }
    }
  };
</script>

<svelte:head>
  <title>JWT Blog | Tutorials & Insights | AxelBase</title>
  <meta name="description" content="Explore tutorials, updates, and best practices for the AxelBase JWT Header & Payload Viewer." />
  <link rel="canonical" href="https://axelbase.github.io/jwt-viewer/blog/" />
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large" />
  <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1><i class="bi bi-journal-richtext"></i> Blog: AxelBase JWT Insights</h1>
    <p class="subtitle">
      Explore tutorials, updates, and best practices for the JWT Header & Payload Viewer. Check out our
      <a href="https://github.com/axelbase/jwt-viewer" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article &rarr;</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .post-card .card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-title {
    font-size: 1.25rem;
    color: var(--accent-secondary);
    margin-bottom: 0.75rem;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  .read-more {
    color: var(--accent-primary);
    font-weight: 600;
    align-self: flex-start;
    transition: var(--transition-fast);
  }

  .post-card:hover .read-more {
    transform: translateX(5px);
  }
</style>