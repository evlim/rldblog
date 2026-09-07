<script lang="ts">
  import { sortedBlogPosts, blogInfo } from "./posts"
</script>

<svelte:head>
  <title>{blogInfo.name}</title>
  <meta name="description" content={blogInfo.description} />
</svelte:head>

<div class="blog-index">
  <div class="blog-heading">
    <div>
      <p class="eyebrow">Russian Life Decoding</p>
      <h1>{blogInfo.name}</h1>
      <p>{blogInfo.description}</p>
    </div>
    <a href="/blog/rss.xml" target="_blank" rel="noreferrer">
      <span class="rss-link">RSS ↗</span>
    </a>
  </div>

  {#each sortedBlogPosts as post}
    <a class="blog-card" href={post.link}>
      <div class="blog-card-accent"></div>
      <div class="blog-card-content">
        <div class="post-date">
          {post.parsedDate?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <span class="read-more">Read article <span>↗</span></span>
      </div>
    </a>
  {/each}
</div>
