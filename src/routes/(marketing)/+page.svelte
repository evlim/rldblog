<script lang="ts">
  import { sortedBlogPosts } from "./blog/posts"
  import { WebsiteBaseUrl, WebsiteDescription, WebsiteName } from "../../config"

  const topics = [
    {
      number: "01",
      title: "Everyday life",
      description:
        "Practical context for living in Russia, visiting, and staying connected from abroad.",
    },
    {
      number: "02",
      title: "Legal essentials",
      description:
        "Clear explanations of the rules, documents, and processes that shape life and work in Russia.",
    },
    {
      number: "03",
      title: "Useful tools",
      description:
        "Focused resources for handling practical tasks, services, and decisions connected to Russia.",
    },
  ]
</script>

<svelte:head>
  <title>{WebsiteName} — Understand Russia from anywhere</title>
  <meta name="description" content={WebsiteDescription} />
  <meta
    property="og:title"
    content={`${WebsiteName} — Understand Russia from anywhere`}
  />
  <meta property="og:description" content={WebsiteDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={WebsiteBaseUrl} />
  <meta
    property="og:image"
    content={`${WebsiteBaseUrl}/images/landing-page-preview.png`}
  />
  <meta property="og:image:alt" content="Russia Decoding homepage" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content={`${WebsiteName} — Understand Russia from anywhere`}
  />
  <meta name="twitter:description" content={WebsiteDescription} />
  <meta
    name="twitter:image"
    content={`${WebsiteBaseUrl}/images/landing-page-preview.png`}
  />
</svelte:head>

<section class="hero-shell">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Practical guidance for understanding Russia</p>
      <h1>Make sense of <em>Russia.</em></h1>
      <p class="hero-description">
        Russia Decoding breaks down everyday life, legal topics, technology, and
        practical services connected to Russia into clear, useful guidance for
        people at home or abroad.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="/blog"
          >Read the blog <span>↗</span></a
        >
        <a class="text-link" href="#about">About the project <span>↓</span></a>
      </div>
    </div>
    <div class="hero-mark" aria-hidden="true">
      <div class="mark-ring"></div>
      <div class="mark-label">RD<br /><span>01</span></div>
    </div>
  </div>
</section>

<section id="about" class="intro-section">
  <div class="section-label">The idea</div>
  <div class="intro-content">
    <h2>Clarity over assumptions.</h2>
    <p>
      Understanding another country comes with a thousand small questions. This
      is a growing collection of observations, explainers, and tools for people
      living in Russia, working with Russian organisations, or trying to make
      sense of what happens here from abroad.
    </p>
  </div>
</section>

<section class="topics-section">
  <div class="section-heading">
    <div class="section-label">What you'll find</div>
    <a class="text-link" href="/blog">Browse all articles <span>↗</span></a>
  </div>
  <div class="topic-grid">
    {#each topics as topic}
      <article class="topic-card">
        <span class="topic-number">{topic.number}</span>
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </article>
    {/each}
  </div>
</section>

<section class="latest-section">
  <div class="section-heading">
    <div class="section-label">From the blog</div>
    <a class="text-link" href="/blog">View the blog <span>↗</span></a>
  </div>
  <div class="latest-grid">
    {#each sortedBlogPosts.slice(0, 3) as post}
      <a class="latest-card" href={post.link}>
        <span class="post-date">
          {post.parsedDate?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span class="read-more">Read article <span>↗</span></span>
      </a>
    {/each}
  </div>
</section>
