---
title: EleventyOne - A starting point
layout: layouts/base.njk
---

# EleventyOne

A project scaffold for getting building with [Eleventy](https//11ty.io) quickly.

## This site is a starting point

From this point we should already have:

- Eleventy with a skeleton site
- A date format filter for Nunjucks
- Sass pipeline
- JS pipeline
- Serverless (FaaS) [development pipeline](http://127.0.0.1:9000/hello?foo=1&bar=2) with Netlify Functions for Lambda


## Post pages

The pages found in in the posts

<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>



