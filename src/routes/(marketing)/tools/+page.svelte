<script lang="ts">
  import { certificateNames } from "../../../lib/data/criminal-record-certificates"
  import { eligibleCountries } from "../../../lib/data/decree-702-countries"

  let countryQuery = ""
  let certificateQuery = ""

  const matches = (value: string, query: string) =>
    value.toLowerCase().includes(query.trim().toLowerCase())
</script>

<svelte:head>
  <title>Russia immigration tools | Russian Life Decoding</title>
  <meta
    name="description"
    content="Check Decree 702 eligibility, find common criminal record certificate names, and access TRP document resources."
  />
</svelte:head>

<div class="blog-index">
  <div class="blog-heading">
    <div>
      <p class="eyebrow">Russian Life Decoding</p>
      <h1>Useful tools</h1>
      <p>Focused references for planning a TRP application under Decree 702.</p>
    </div>
  </div>

  <section id="eligibility" class="tool-section">
    <p class="section-label">01 · Eligibility</p>
    <h2>Countries and territories listed under Decree 702</h2>
    <p>
      This reference list replaces the map and country list formerly embedded in
      the guide. Verify the current government order before applying.
    </p>
    <label>
      Search countries
      <input
        bind:value={countryQuery}
        type="search"
        placeholder="Start typing a country"
      />
    </label>
    <ul class="country-grid">
      {#each eligibleCountries.filter( (country) => matches(country, countryQuery), ) as country}
        <li>{country}</li>
      {/each}
    </ul>
  </section>

  <section id="criminal-record" class="tool-section">
    <p class="section-label">02 · Criminal record certificate</p>
    <h2>Common certificate names</h2>
    <p>
      Names vary by jurisdiction. Use this as a starting point, then confirm the
      exact document and legalization route with your issuing authority.
    </p>
    <label>
      Search by country
      <input
        bind:value={certificateQuery}
        type="search"
        placeholder="For example, Canada"
      />
    </label>
    <dl class="certificate-list">
      {#each Object.entries(certificateNames).filter( ([country, name]) => matches(`${country} ${name}`, certificateQuery), ) as [country, name]}
        <div>
          <dt>{country}</dt>
          <dd>{name}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <section id="documents" class="tool-section">
    <p class="section-label">03 · Document resources</p>
    <h2>Forms to review before you apply</h2>
    <p>
      These are resource links, not automatic downloads. Check the official
      source and the current form version before using them.
    </p>
    <ul class="resource-list">
      <li>
        <a
          href="/pdf/notification-arrival-foreign-citizen-stateless-person-place-stay-effective-february-5-2025.pdf"
          >Migration registration notification form ↗</a
        >
      </li>
      <li>
        <a href="/pdf/trp-application-form.pdf">TRP application form ↗</a>
      </li>
      <li>
        <a href="/pdf/trp-application-form-under-18.pdf"
          >TRP application form for minors ↗</a
        >
      </li>
    </ul>
  </section>
</div>

<style>
  .tool-section {
    margin-top: 4rem;
    border-top: 1px solid var(--line);
    padding-top: 2rem;
  }

  .tool-section h2 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .tool-section > p:not(.section-label) {
    max-width: 680px;
    color: var(--muted);
    line-height: 1.7;
  }

  label {
    display: grid;
    max-width: 32rem;
    gap: 0.5rem;
    margin: 1.5rem 0;
    color: var(--ink);
    font-size: 0.8rem;
    font-weight: 700;
  }

  input {
    border: 1px solid var(--line);
    padding: 0.8rem 1rem;
    background: var(--surface);
    color: var(--ink);
    font: inherit;
    font-weight: 400;
  }

  .country-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 0.5rem;
    padding: 0;
    list-style: none;
  }

  .country-grid li,
  .certificate-list div {
    padding: 0.75rem 1rem;
    background: var(--surface);
  }

  .certificate-list {
    display: grid;
    gap: 0.5rem;
    margin: 0;
  }

  .certificate-list div {
    display: grid;
    grid-template-columns: minmax(8rem, 0.5fr) 1fr;
    gap: 1rem;
  }

  .certificate-list dt {
    font-weight: 700;
  }

  .certificate-list dd {
    margin: 0;
    color: var(--muted);
  }

  .resource-list {
    display: grid;
    gap: 0.75rem;
    padding-left: 1.2rem;
  }

  .resource-list a {
    color: var(--pine);
    font-weight: 700;
  }
</style>
