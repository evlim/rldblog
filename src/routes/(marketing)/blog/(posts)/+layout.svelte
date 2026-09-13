<script lang="ts">
  import { page } from "$app/stores"
  import { error } from "@sveltejs/kit"
  import { sortedBlogPosts, type BlogPost } from "./../posts"
  import { WebsiteBaseUrl, WebsiteName } from "../../../../config"
  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()

  function getCurrentPost(url: string): BlogPost {
    let searchPost: BlogPost | null = null
    for (const post of sortedBlogPosts) {
      if (url == post.link || url == post.link + "/") {
        searchPost = post
        continue
      }
    }
    if (!searchPost) {
      error(404, "Blog post not found")
    }
    return searchPost
  }
  let currentPost = $derived(getCurrentPost($page.url.pathname))

  function buildLdJson(post: BlogPost) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.parsedDate?.toISOString(),
      dateModified: post.parsedDate?.toISOString(),
    }
  }
  let jsonldScript = $derived(
    `<script type="application/ld+json">${
      JSON.stringify(buildLdJson(currentPost)) + "<"
    }/script>`,
  )

  let pageUrl = $derived(WebsiteBaseUrl + currentPost.link)
  let socialImage = $derived(
    currentPost.coverImage ? WebsiteBaseUrl + currentPost.coverImage : null,
  )
</script>

<svelte:head>
  <title>{currentPost.title}</title>
  <meta name="description" content={currentPost.description} />

  <!-- Facebook -->
  <meta property="og:title" content={currentPost.title} />
  <meta property="og:description" content={currentPost.description} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta property="og:url" content={pageUrl} />
  {#if socialImage}
    <meta property="og:image" content={socialImage} />
    <meta
      property="og:image:alt"
      content={currentPost.coverImageAlt ?? currentPost.title}
    />
    <meta property="og:image:type" content="image/webp" />
  {/if}

  <!-- Twitter -->
  <!-- “summary”, “summary_large_image”, “app”, or “player” -->
  <meta
    name="twitter:card"
    content={socialImage ? "summary_large_image" : "summary"}
  />
  <meta name="twitter:title" content={currentPost.title} />
  <meta name="twitter:description" content={currentPost.description} />
  <!-- <meta name="twitter:site" content="@samplesite"> -->
  {#if socialImage}
    <meta name="twitter:image" content={socialImage} />
  {/if}

  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<article class="prose mx-auto py-12 px-6 font-sans">
  <div class="text-sm text-accent">
    {currentPost.parsedDate?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
  </div>
  <h1>{currentPost.title}</h1>
  <div class="post-byline" aria-label="Author and estimated reading time">
    <img
      class="post-byline-portrait"
      src="/images/portrait.webp"
      alt=""
      width="36"
      height="36"
    />
    <span class="post-byline-name">Evan Lim</span>
    <span class="post-byline-separator" aria-hidden="true">·</span>
    <span
      aria-label={`Estimated reading time: ${currentPost.readingMinutes} minutes`}
    >
      {currentPost.readingMinutes} min read
    </span>
  </div>
  {#if currentPost.coverImage}
    <img
      class="post-cover"
      src={currentPost.coverImage}
      alt={currentPost.coverImageAlt ?? ""}
      loading="eager"
    />
  {/if}
  {@render children?.()}
  <section class="author-block" aria-label="About the author">
    <img
      class="author-portrait"
      src="/images/portrait.webp"
      alt="Evan Lim"
      loading="lazy"
    />
    <div>
      <h2>Evan Lim</h2>
      <p>Founder of Russia Decoding</p>
      <p>University lecturer and researcher in Computer Science and Law</p>
    </div>
  </section>
</article>
