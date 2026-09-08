<script lang="ts">
  import { WebsiteName } from "../../config"
  import "../../app.css"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

<header class="site-header">
  <a class="wordmark" href="/" aria-label={`${WebsiteName} home`}>
    <span class="wordmark-mark">R</span>
    <span>{WebsiteName}</span>
  </a>
  <nav aria-label="Primary navigation">
    <a href="/#about">About</a>
    <a href="/blog">Blog</a>
    <a href="/tools">Tools</a>
  </nav>
</header>

<main>
  {@render children?.()}
</main>

<footer class="site-footer">
  <a class="wordmark" href="/">
    <span class="wordmark-mark">R</span>
    <span>{WebsiteName}</span>
  </a>
  <p>Notes on everyday and legal life in Russia.</p>
  <span class="footer-year">© {new Date().getFullYear()}</span>
</footer>
