<script lang="ts">
  const redirectRule = `(http.host eq "russiadecoding.com"
 and ip.src.country eq "RU"
 and http.request.method in {"GET" "HEAD"}
 and not any(http.request.headers["x-timeweb-origin"][*]
   eq "REPLACE_WITH_YOUR_RANDOM_SECRET"))`
  const redirectTarget = `concat("https://cdn.russiadecoding.com", http.request.uri.path)`
  const regionalCountries = `ip.src.country in {"RU" "KZ" "UZ" "TM"}`
</script>

<svelte:head>
  <link
    rel="canonical"
    href="https://russiadecoding.com/blog/regional-cdn-routing-russian-visitors"
  />
</svelte:head>

<p class="lead">
  If your website is hosted on <strong
    >Cloudflare, Vercel, Netlify, or another international hosting platform</strong
  >, you may notice a frustrating problem:
  <strong
    >your website works perfectly for you, but visitors in Russia experience
    slow loading, unreliable connections, or difficulty accessing the site.</strong
  >
</p>

<p>
  The rest of your international audience may have no trouble at all. Moving
  your entire website to another host just to solve a regional access problem
  can mean unnecessary work. Sending everyone around the world through a Russian
  CDN may not suit your audience either.
</p>

<p>
  Regional CDN routing lets you <strong
    >route visitors from selected countries through a CDN with infrastructure
    closer to them</strong
  >, while keeping your existing hosting for everyone else. It can support a
  static business website, product landing page, documentation site, portfolio,
  or blog.
</p>

<p>
  This guide explains the setup I use on russiadecoding.com, with Cloudflare
  handling the geographic redirect and Timeweb CDN delivering the regional
  version. The same general approach can also be used with Vercel, Netlify, and
  other hosting platforms.
</p>

<p class="affiliate-note">
  <strong>Affiliate disclosure:</strong> The Timeweb links in this post are affiliate
  links. If you purchase through them, I may earn a commission.
</p>

<h2 id="access-problem">
  Why a website can work abroad but struggle in Russia
</h2>

<p>
  A website can be fast in Europe or North America and still be difficult to
  access from Moscow, St. Petersburg, or Novosibirsk. Depending on the visitor’s
  ISP and the network route to your hosting provider, the problems may include:
</p>

<ul>
  <li>Pages that take too long to open or fail to load.</li>
  <li>Images, fonts, and JavaScript that load slowly or remain missing.</li>
  <li>
    Intermittent connection errors that are hard to reproduce from abroad.
  </li>
  <li>A homepage that opens while the rest of the site remains unusable.</li>
</ul>

<p>
  For a business website, this can mean visitors leaving before they see your
  services. For a documentation site, it can leave customers unable to find
  instructions. Improving access starts with the connection those visitors
  actually have, rather than your site’s global average load time.
</p>

<h2 id="routing">One website, two delivery paths</h2>

<p>
  A content delivery network, or CDN, stores copies of content on distributed
  servers. A regional CDN gives selected visitors an alternative delivery path.
  Visitors outside Russia can keep using the delivery path they already have,
  while visitors in Russia can be sent to a CDN with infrastructure closer to
  them.
</p>

<figure class="routing-figure">
  <div class="routing-entry">Visitor opens russiadecoding.com</div>
  <div class="routing-paths">
    <div>
      <span class="route-label">Visitors outside Russia</span>
      <p>Visitor → Cloudflare / Vercel / Netlify → your website</p>
    </div>
    <div>
      <span class="route-label">Visitors in Russia</span>
      <p>
        Visitor → existing website → geographic redirect → Russian CDN → your
        website
      </p>
    </div>
  </div>
  <figcaption>
    On a cache miss, Timeweb fetches the page from the existing website using a
    private origin request header. You still maintain one source of content.
  </figcaption>
</figure>

<p>
  Visitors routed through Timeweb will see <code>cdn.russiadecoding.com</code>
  in their address bar, with the original page path preserved.
</p>

<p>
  The automatic redirect requires the initial connection to Cloudflare to
  succeed. If that connection fails completely, visitors will need the direct
  CDN address or another entry point. Timeweb also needs access to the origin to
  retrieve fresh content.
</p>

<h2 id="timeweb">Why I use Timeweb CDN for this setup</h2>

<p>
  I use <a
    href="https://timeweb.cloud/services/cdn?i=147065"
    rel="sponsored nofollow">Timeweb CDN</a
  >
  because it has CDN infrastructure across Russia. Its
  <a href="https://timeweb.cloud/docs/cdn?i=147065" rel="sponsored nofollow"
    >published CDN locations</a
  >
  include Vladivostok, Yekaterinburg, Irkutsk, Kazan, Kaliningrad, Krasnodar, Krasnoyarsk,
  Makhachkala, Moscow, Nizhny Novgorod, Novosibirsk, Norilsk, Omsk, Rostov-on-Don,
  Samara, St. Petersburg, Simferopol, Stavropol, Tyumen, Ufa, Khabarovsk, Khimki,
  and Chita.
</p>

<p>
  This coverage is why I recommend Timeweb for this use case: it provides a
  regional delivery network for visitors across Russia while the original
  website stays with its existing host.
</p>

<h2 id="keep-hosting">You do not necessarily need to move your website</h2>

<p>
  One of the main advantages of regional routing is that your primary website
  can stay where it is. If your site is hosted at a platform address such as
  <code>rldblog.pages.dev</code> and uses
  <code>russiadecoding.com</code> as its custom domain, you can keep using that existing
  hosting setup.
</p>

<p>
  Create a separate CDN hostname, such as
  <code>cdn.russiadecoding.com</code>. The CDN pulls content from your existing
  website, so you keep one source of pages and assets while adding another
  delivery route.
</p>

<pre><code>                         Your website
                              │
                              │
                    ┌─────────┴─────────┐
                    │                   │
              International          Russia
                  visitors            visitors
                    │                   │
                    ▼                   ▼
               Cloudflare          Timeweb CDN
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                       Your existing site</code
  ></pre>

<p>
  This arrangement preserves your current hosting infrastructure while giving
  visitors in Russia a separate path.
</p>

<h2 id="automatic-redirect">Automatically redirect visitors in Russia</h2>

<p>The next step is making this automatic.</p>

<p>You don't want to tell your Russian readers:</p>

<blockquote>
  “If you're in Russia, please visit our CDN URL instead.”
</blockquote>

<p>That is inconvenient and confusing.</p>

<p>
  Instead, Cloudflare, Vercel, or Netlify can inspect the connection’s country
  and send visitors in Russia to the alternative CDN hostname automatically.
</p>

<pre><code
    >https://russiadecoding.com/
           ↓
https://cdn.russiadecoding.com/</code
  ></pre>

<p>
  The original path and query string can be preserved during the redirect, so a
  request for an internal page follows the same route as the homepage. Visitors
  outside the selected countries continue using the primary hostname.
</p>

<h2 id="setup">Set up regional routing with Cloudflare and Timeweb</h2>

<h3>1. Prepare the CDN hostname and origin</h3>

<p>
  Start with a working website and a domain you control. In this example, the
  main website is <code>russiadecoding.com</code>, the CDN hostname is
  <code>cdn.russiadecoding.com</code>, and Timeweb retrieves content from the
  main website over HTTPS on port 443.
</p>

<p>
  Create the CDN resource, add your delivery hostname, and create the DNS record
  using the target Timeweb assigns. When managing this DNS record in Cloudflare,
  use DNS-only mode for the CDN hostname so visitors connect to Timeweb. Your
  main hostname needs to pass through Cloudflare for its Redirect Rule to run.
  Enable a valid certificate for the delivery hostname before directing visitors
  to it.
</p>

<p>
  Follow Timeweb’s <a
    href="https://timeweb.cloud/docs/cdn/settings/origin-and-domains?i=147065"
    rel="sponsored nofollow">origin and delivery-domain instructions</a
  >. Check that the origin Host header and TLS server name match the hostname
  your hosting platform accepts. Do not point the CDN back to its own delivery
  hostname.
</p>

<h3>2. Identify requests from the CDN to the origin</h3>

<h4>One important technical detail</h4>

<p>
  There is one complication when the CDN uses your primary domain as its origin.
  In this example, <code>cdn.russiadecoding.com</code> retrieves its content
  from <code>russiadecoding.com</code>.
</p>

<pre><code
    >Visitor in Russia
      ↓
russiadecoding.com
      ↓
Cloudflare
      ↓
cdn.russiadecoding.com
      ↓
Timeweb CDN
      ↓
russiadecoding.com</code
  ></pre>

<p>
  The request from Timeweb arrives at the same primary hostname as the original
  visitor request. Cloudflare can see a Russian IP address again and apply the
  country redirect a second time. The CDN is sent back to itself, creating a
  redirect loop and the familiar “Too many redirects” error.
</p>

<h4>Preventing CDN-origin redirect loops</h4>

<p>
  The fix is to give Timeweb a private request header when it fetches the
  origin. Use a long, random value, for example:
</p>

<pre><code>X-Timeweb-Origin: YOUR_RANDOM_SECRET</code></pre>

<p>
  Cloudflare can then redirect requests without that header and let the matching
  Timeweb origin request pass through. The two paths are:
</p>

<pre><code
    >Visitor in Russia
      ↓
No CDN header
      ↓
Redirect to Timeweb CDN</code
  ></pre>

<pre><code
    >Timeweb CDN
      ↓
Private origin header
      ↓
Do not redirect
      ↓
Serve the website</code
  ></pre>

<p>
  In the Timeweb resource’s HTTP-header settings, add an origin
  <strong>request</strong> header named <code>X-Timeweb-Origin</code> with a
  long, randomly generated value. Timeweb documents this in its
  <a
    href="https://timeweb.cloud/docs/cdn/settings/http-headers?i=147065"
    rel="sponsored nofollow">HTTP-header settings</a
  >. Keep the value in provider configuration and use the same value in the
  Cloudflare exception below.
</p>

<p>
  The redirect rule checks the exact header value, so the Timeweb request can
  retrieve the page without being redirected back to the CDN. This header is
  only a routing signal; it is not a replacement for authentication on private
  content.
</p>

<h3>3. Create the Cloudflare Redirect Rule</h3>

<p>
  Create a Single Redirect using a custom filter expression. Replace the domain
  and secret placeholder with your own values. This example is for public pages
  and assets, so it matches only GET and HEAD requests.
</p>

<pre><code>{redirectRule}</code></pre>

<p>
  Cloudflare’s <a
    href="https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/"
    >request-header field</a
  > uses lowercase header names. The exception allows Timeweb’s matching origin request
  to retrieve the content even when its IP address matches the country condition.
</p>

<p>Set the dynamic target expression to:</p>

<pre><code>{redirectTarget}</code></pre>

<p>
  Choose <strong>302 — Temporary Redirect</strong> and turn on
  <strong>Preserve query string</strong>, following Cloudflare’s
  <a
    href="https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/"
    >Single Redirect settings</a
  >. A request for <code>/services?ref=newsletter</code> then keeps that path and
  query on the CDN hostname. Use a temporary redirect for geographic routing so visitors
  are not permanently tied to the regional hostname.
</p>

<h3>4. Optionally include Kazakhstan, Uzbekistan, and Turkmenistan</h3>

<p>
  To include these countries, replace the Russia-only country condition with:
</p>

<pre><code>{regionalCountries}</code></pre>

<p>
  These codes mean Russia, Kazakhstan, Uzbekistan, and Turkmenistan. Keep the
  rest of the rule, including the origin-header exception.
</p>

<p>
  As checked on September 13, 2026, Timeweb’s
  <a href="https://timeweb.cloud/docs/cdn?i=147065" rel="sponsored nofollow"
    >location list</a
  >
  includes Akkol, Almaty, Astana, Karaganda, and Kostanay in Kazakhstan, as well
  as Tashkent and Ashgabat. Cloudflare’s
  <a href="https://www.cloudflare.com/network/">public network list</a>
  names Aktobe, Almaty, and Astana in Kazakhstan, but does not list a location in
  Uzbekistan or Turkmenistan.
</p>

<h2 id="other-platforms">What changes for Vercel and Netlify?</h2>

<p>
  The idea stays the same: identify the target connection, redirect eligible
  page requests, and let the CDN fetch content without triggering that redirect
  again.
</p>

<p>
  Vercel exposes a <a
    href="https://vercel.com/docs/headers/request-headers#x-vercel-ip-country"
    >country request header</a
  >
  that server-side routing logic can use. Netlify documents
  <a
    href="https://docs.netlify.com/manage/routing/redirects/redirect-options/#redirect-by-country-or-language"
    >country-based redirects</a
  >. Include an origin-request exception in the routing logic, or use a separate
  origin hostname that does not trigger the geographic redirect.
</p>

<h2 id="testing">Test website access before rollout</h2>

<ul>
  <li>
    <strong>Compare both routes.</strong> From Russian home and mobile networks,
    check the original address, the redirect, and the direct CDN address. Also verify
    that a connection outside the selected countries stays on the main site.
  </li>
  <li>
    <strong>Open more than the homepage.</strong> Test an internal page, a missing
    page, images, fonts, scripts, and URLs with query parameters. Follow internal
    links; absolute links to the main domain can send visitors through another redirect.
  </li>
  <li>
    <strong>Check fresh and cached content.</strong> A warm CDN cache can hide an
    unreachable origin. Confirm a cache miss works, publish a small content change,
    and verify that the updated page reaches the CDN.
  </li>
  <li>
    <strong>Inspect errors before purging.</strong> A 403 can come from an origin
    rule, host mismatch, or access policy. If cache headers show an older response
    is being served, purge the affected content after fixing its cause.
  </li>
  <li>
    <strong>Review interactive features separately.</strong> Timeweb’s documented
    CDN methods are GET, HEAD, and OPTIONS. Do not send login submissions, payments,
    or other POST requests through this example. Even GET pages may be private; exclude
    account routes and prevent shared caching of personalized responses. Cookies,
    CORS, and third-party resources also need testing on the new hostname.
  </li>
</ul>

<p>
  Keep a rollback simple: save the previous configuration and be ready to
  disable the geographic rule. Monitor page-load failures and response times on
  both routes after rollout.
</p>

<h2 id="seo">Keep a clear primary URL for search engines</h2>

<p>
  The CDN serves the same pages under another hostname. Use an absolute
  canonical URL pointing to the corresponding page on the primary domain, and
  keep sitemap URLs consistent with that choice. Google’s
  <a
    href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
    >canonicalization guidance</a
  > explains how these signals help consolidate duplicate URLs.
</p>

<p>
  Check the HTML delivered from both hostnames. A canonical generated from the
  incoming request host can accidentally identify the CDN copy as primary.
  Canonical metadata belongs in the document; it should not become a forced
  redirect that sends regional visitors straight back to the main hostname.
  Review analytics too, so the hostname change does not make visits harder to
  understand.
</p>

<section class="service-note" aria-labelledby="regional-service">
  <p class="service-label">A service from Russia Decoding</p>
  <h2 id="regional-service">Regional CDN Routing</h2>
  <p>
    If your website works abroad but visitors in Russia struggle to access it, I
    can handle the regional CDN setup through Russia Decoding, from diagnosing
    the access problem to testing the finished configuration. You keep your
    existing website and hosting, with a regional delivery path built around
    your visitors’ needs.
  </p>
  <p>The service covers:</p>
  <ul>
    <li>
      <strong>Access diagnosis and routing design.</strong> Review your hosting,
      domain setup, and affected pages to identify where access fails and plan which
      countries and content should use the regional CDN.
    </li>
    <li>
      <strong>Timeweb CDN and domain integration.</strong> Set up the CDN resource,
      connect it to your existing origin, configure DNS and the delivery hostname,
      and resolve origin connection and host-header issues.
    </li>
    <li>
      <strong>SSL certificate setup and HTTPS.</strong> Configure the certificate
      for your CDN hostname and check HTTPS connections between visitors, the CDN,
      and your origin, including certificate validity and renewal settings.
    </li>
    <li>
      <strong>Geographic routing and redirect-loop prevention.</strong> Configure
      country rules and private origin-request headers while preserving page paths
      and query strings.
    </li>
    <li>
      <strong>Cache configuration and content checks.</strong> Set cache behavior,
      plan how updates reach the CDN, troubleshoot cached errors, and check images,
      scripts, fonts, internal links, and canonical URLs.
    </li>
    <li>
      <strong>Timeweb payment assistance.</strong> If you do not have a Russian payment
      method, the service can include paying for Timeweb CDN on your behalf, with
      the payment arrangements agreed in advance.
    </li>
    <li>
      <strong>Testing and handover.</strong> Test access from the target regions,
      check both fresh and cached pages, confirm that visitors elsewhere retain their
      normal route, and provide the configuration details and rollback steps.
    </li>
  </ul>
  <p>
    This service is for static business websites, landing pages, documentation,
    portfolios, and blogs. Send your website address and a description of the
    access problems through the
    <a href="https://t.me/russiadecoding">Russia Decoding Telegram channel</a>
    to discuss the setup and scope of work.
  </p>
</section>

<p>
  If you are setting this up yourself, <a
    href="https://timeweb.cloud/services/cdn?i=147065"
    rel="sponsored nofollow">explore Timeweb CDN</a
  > using my affiliate link. Start with a few pages, compare access from your target
  countries, and expand the routing once the setup is working.
</p>

<style>
  .affiliate-note {
    border-left: 3px solid var(--line);
    padding-left: 1rem;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .routing-figure {
    margin: 2rem 0;
    border: 1px solid var(--line);
    padding: 1.5rem;
    background: var(--paper);
  }

  .routing-entry {
    color: var(--pine);
    font-weight: 700;
    text-align: center;
    overflow-wrap: anywhere;
  }

  .routing-paths {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.25rem 0;
  }

  .routing-paths > div {
    padding: 1rem;
    border-top: 2px solid var(--pine);
    background: var(--surface);
  }

  .route-label,
  .service-label {
    color: var(--muted);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .routing-paths p {
    margin: 0.5rem 0 0;
    font-size: 0.95rem;
  }

  .routing-figure figcaption {
    margin-top: 1rem;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .service-note {
    margin: 3rem 0 2rem;
    padding: 1.5rem;
    border: 1px solid var(--line);
    border-top: 3px solid var(--pine);
  }

  .service-note h2 {
    margin-top: 0.5rem;
  }

  .service-label {
    margin-top: 0;
  }

  @media (max-width: 520px) {
    .routing-paths {
      grid-template-columns: 1fr;
    }
  }
</style>
