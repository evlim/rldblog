<script lang="ts">
  import { sortedBlogPosts } from "./blog/posts"
  import { WebsiteDescription, WebsiteName } from "../../config"

  const topics = [
    {
      number: "01",
      title: "Everyday life",
      description:
        "Practical context for settling in, getting around, and feeling at home.",
    },
    {
      number: "02",
      title: "Legal essentials",
      description:
        "Clear explanations of the rules, documents, and processes that matter.",
    },
    {
      number: "03",
      title: "Useful tools",
      description:
        "Small, focused resources that make navigating life in Russia easier.",
    },
  ]
</script>

<svelte:head>
  <title>{WebsiteName} — Understand life in Russia</title>
  <meta name="description" content={WebsiteDescription} />
</svelte:head>

<section class="hero-shell">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">A practical guide for life in Russia</p>
      <h1>Make sense of <em>life in Russia.</em></h1>
      <p class="hero-description">
        Russian Life Decoding breaks down everyday and legal topics into clear,
        useful guidance for foreigners building a life here.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="/blog"
          >Read the journal <span>↗</span></a
        >
        <a class="text-link" href="#about">About the project <span>↓</span></a>
      </div>
    </div>
    <div class="hero-mark" aria-hidden="true">
      <div class="mark-ring"></div>
      <div class="mark-label">RLD<br /><span>01</span></div>
    </div>
  </div>
</section>

<section id="about" class="intro-section">
  <div class="section-label">The idea</div>
  <div class="intro-content">
    <h2>Clarity over assumptions.</h2>
    <p>
      Moving through a new country comes with a thousand small questions. This
      is a growing collection of observations, explainers, and tools designed to
      replace guesswork with a better understanding of how things work.
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
    <div class="section-label">From the journal</div>
    <a class="text-link" href="/blog">View the journal <span>↗</span></a>
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
