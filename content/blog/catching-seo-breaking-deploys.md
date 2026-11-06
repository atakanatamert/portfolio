---
title: Catching the deploy that quietly drops a site from search
date: 2026-11-03
summary: A noindex or a robots.txt block can ship with a normal deploy while every uptime check stays green. Here is what to check, and when.
---

Here is a failure that is easy to miss. A deploy goes out with a staging setting still on: a `noindex` tag, a robots.txt rule that blocks Googlebot, a canonical pointing somewhere else. The page still loads. It still returns 200. Every uptime check stays green.

Nothing looks wrong until search traffic drops, and by then a crawler has already read the change.

I build [stillindexed](https://stillindexed.com), a monitoring service for exactly this, aimed at SEO consultants and agencies who look after client sites. This post is about the problem more than the product, but I will be clear about which parts are mine.

## What decides whether a page can be indexed

A handful of signals can take a page out of search while it looks perfectly normal in a browser:

- **meta robots** in the HTML, for example `noindex` or `none`
- **X-Robots-Tag** in the response headers, which you never see on the page
- **robots.txt** rules for the URL
- the **HTTP status** and any **redirects** along the way
- the **canonical** link, if it points to a different URL

Some slower problems matter too: a broken sitemap, an expiring TLS certificate, an expiring domain.

robots.txt is the trickiest of these. Google picks the longest matching rule, `Allow` wins over `Disallow` when they are the same length, and a group for `Googlebot` replaces the `*` group entirely. A rule that looks harmless can block more than you expect.

## Check at deploy time

The cheapest place to catch this is in CI, right after a deploy. [seo-guard](https://github.com/stillindexed/seo-guard) is a small, free GitHub Action that fails the step when a page picks up one of these regressions:

```yaml
- uses: stillindexed/seo-guard@v1
  with:
    urls: |
      https://example.com/
      https://example.com/pricing
```

It does one fetch per URL plus one robots.txt per origin. It checks for `noindex` in meta tags and headers, Googlebot blocks in robots.txt using Google's matching rules, a canonical that does not point at the page itself, and unexpected status codes. It does not render JavaScript and it does not crawl. Point it at the handful of pages the business depends on.

## Check between deploys

A deploy check only sees the moment it runs. A CDN rule, a CMS plugin update or a DNS change can break indexability on a Tuesday afternoon when nobody deployed anything.

That gap is what stillindexed covers. You add a domain and the URLs that matter. It records a baseline of what a crawler sees, then re-checks each URL on a schedule and compares it with the last result. When something critical changes, it fetches again about a minute later to confirm, so a change that reverted on its own does not wake anyone up. The alert names the URL and the before and after values.

It needs no access to the client's Google account, no DNS record and no snippet on the site, which keeps onboarding a client short. The backend is Go and the site is Astro.

For WordPress there is also a free, read-only plugin that shows in wp-admin whether the homepage is indexable right now, checked daily from the site's own server.

## What I would do on any site

Whether or not you use any of this:

1. List the pages that matter. Usually it is fewer than you think.
2. After every deploy, fetch them as a crawler would and check status, meta robots, X-Robots-Tag, robots.txt and canonical. A small script works.
3. Keep watching between deploys, from outside your own server, because that is when the surprises happen.

If you have been bitten by one of these, I would like to hear how it happened: [hello@atakanatamert.dev](mailto:hello@atakanatamert.dev).
