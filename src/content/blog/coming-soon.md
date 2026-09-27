---
title: "What's on the Writing Queue"
date: "2025-12-20"
updated: "2026-09-27"
excerpt: "The topics I'm working through carefully enough to write down — on RAG architecture, stakeholder trust in AI, and the gap between building something and shipping something."
tags: ["RAG", "AI Agents", "Product Strategy", "LLM"]
---

Writing is slow for me because I only publish things I've actually worked through. These are the topics currently earning that treatment.

## On the queue

**The retrieval problem nobody talks about** — Most RAG discussions focus on the model. The hard part is the retrieval layer: how you partition your knowledge base, how you rank candidates before the LLM ever sees them, and how you handle the case where the right document simply isn't there. I built a six-signal retrieval ranking system for SaaSScout and the design decisions behind it are worth explaining in detail.

**How to evaluate trust in an AI agent** — The story of SupRM Intelligence at Sanofi. I want to unpack how 18 business scenarios and 25 deterministic checks helped evaluate answer quality, tool compliance, and concise evidence. The production evaluation reached a 97.9% pass rate. Organizational trust is its own product and engineering problem.

**When the spec and the product diverge** — Every project has a version that existed on paper and a version that shipped. The interesting material is in the gap — what changed, why, and what that reveals about the limits of planning versus building. I want to write about this across a few projects.

**Evidence, not confidence** — A recurring theme in my work is the difference between an AI system that sounds certain and one that earns trust through source attribution, explicit uncertainty, and graceful degradation when evidence is thin. This is as much a design problem as a technical one.

---

If any of these connect to something you're working on, [reach out](/profile#contact). I write better when I know who I'm writing for.

Connect with me on [LinkedIn](https://www.linkedin.com/in/calvin-liew-/) — I post shorter versions of these ideas there while the long-form pieces are in progress.
