---
title: EleventyOne
subtitle: A project scaffold for getting building with Eleventy quickly.<br /> Made by <a href="https://twitter.com/philhawksworth">Phil</a> for <a href="https://twitter.com/philhawksworth">Phil</a>, but perhaps you might also find it useful.
layout: layouts/base.njk
---


## This site is a starting point

From this point we should already have:

- [Eleventy](https://11ty.io) with a skeleton site
- A date format filter for Nunjucks based on [Luxon](https://moment.github.io/luxon)
- A tiny CSS pipeline with PostCSS
- A tiny inline JS pipeline. (<a href="#" class="btn-log">Test a console.log message</a>)
- JS [search index](/search.json) generator
- [Netlify Dev](https://www.netlify.com/products/dev) for testing [Netlify redirects](https://netlify.com/docs/redirects/)
- Serverless (FaaS) development pipeline with [Netlify Dev](https://www.netlify.com/products/dev) and [Netlify Functions](https://www.netlify.com/products/functions)



## Post pages

The pages found in in the posts

<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay("LLLL d, y") }}</time>
  </li>
{%- endfor -%}
</ul>

## Links from an external data source

These links were sourced from [hawksworx.com](https://www.hawksworx.com/feed.json) at build time.

<ul class="listing">
{%- for item in hawksworx.entries.slice(0,5) -%}
  <li>
    <a href="{{ item.link }}">{{ item.title }}</a>
  </li>
{%- endfor -%}
</ul>


## Prerequisite

- [Node and NPM](https://nodejs.org/)

## Running locally

```bash
# install the dependencies
npm install

# External data sources can be stashed locally
npm run seed

# It will then be available locally for building with
npm run start
```

## Add some Netlify helpers
Netlify Dev adds the ability to use Netlify redirects, proxies, and serverless functions.

```bash
# install the Netlify CLI in order to get Netlify Dev
npm install -g netlify-cli

# run a local server with some added Netlify sugar in front of Eleventy
netlify dev
```

A serverless functions pipeline is included via Netlify Dev. By running `netlify dev` you'll be able to execute any of your serverless functions directly like this:

- [/.netlify/functions/hello](/.netlify/functions/hello)
- [/.netlify/functions/fetch-joke](/.netlify/functions/fetch-joke)

### Redirects and proxies

Netlify's Redirects API can provide friendlier URLs as proxies to these URLs.

- [/api/hello](/api/hello)
- [/api/fetch-joke](/api/fetch-joke)




