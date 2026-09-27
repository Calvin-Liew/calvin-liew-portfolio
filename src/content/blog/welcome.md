---
title: "Why I Built This Portfolio (And What You'll Find Here)"
date: "2025-12-23"
updated: "2026-09-27"
excerpt: "A product analyst who also designs and builds things needs a place to show the full picture — not just the job title. This is that place."
tags: ["Career", "AI Agents", "RAG", "Product Strategy"]
---

Most portfolios are résumés with screenshots. I wanted something different.

I work at the intersection of AI agents, data, and product strategy. That means my day-to-day involves designing the right product question, pulling data to answer it, building an agent or dashboard to operationalize the answer, and testing whether the result gives people enough evidence to act. None of those steps fit neatly into "Product Manager" or "Data Analyst" or "Developer." The job is all of them, in sequence, with judgment about which hat to put on next.

This site is my attempt to show that full picture — the technical architecture, the product reasoning, the design decisions, and the honest caveats.

## What I'm working on right now

At Sanofi I designed and built **SupRM Intelligence**, an AI assistant for supplier decisions. It reached 80 unique production users and 572 conversations in its first six months. I also created an evaluation framework across 18 business scenarios and 25 checks that achieved a 97.9% production pass rate.

On the side I built **SaaSScout**, a RAG copilot for SaaS evaluation. It indexes 335 products and nearly 5,000 review chunks into partitioned Chroma vector collections, runs six-signal retrieval ranking before the LLM ever sees a query, and delivers grounded procurement recommendations with a three-tier LLM fallback chain. Building it sharpened a conviction I now apply everywhere: the expensive part of an AI product is not the model. It is the retrieval layer, the evidence partitioning, and the fallback architecture.

## What you'll find here

**Projects** — full case studies with the real reasoning behind design decisions, not just the polished outcome. Each one has an "honest caveats" section because every project has limits and acknowledging them is part of the work.

**Blog** — long-form thinking on AI product strategy, RAG architecture, organizational knowledge management, and anything else I have worked through carefully enough to write down.

If you want to see specific work, start with [projects](/projects). If you want to understand how I think, the [blog](/blog) is where that lives.

And if you want to talk — about AI products, agentic systems, or anything in between — [reach out](/profile#contact).
