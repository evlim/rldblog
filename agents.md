# Notes for future agents

## Project

This repository is a SvelteKit static publication for Russian Life Decoding.
Marketing routes live under `src/routes/(marketing)`, blog post content lives in
`src/routes/(marketing)/blog/(posts)`, and shared visual styles are in
`src/app.css`.

## Conventions

- Keep the Russian Life Decoding visual language in `src/app.css`; do not copy
  layouts or styles from the legacy `rld-blog` project.
- Add blog metadata to `src/routes/(marketing)/blog/posts.ts` when creating a
  post. The metadata link must match the post route.
- Prefer semantic headings, paragraphs, lists, and links in editorial content.
  Do not use `<pre>` or code styling for ordinary prose.
- Run `npm run format_check`, `npm run check`, `npm run lint`, `npm run test_run`,
  and `npm run build` before handing off changes.
