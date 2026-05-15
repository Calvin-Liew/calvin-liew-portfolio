---
title: "RAG as Organizational Memory: Reducing Amnesia, Risking Rigidity"
date: "2026-04-06"
excerpt: "Retrieval-augmented generation can help organizations stop losing institutional knowledge when people leave. But a better memory system can also preserve outdated thinking with more authority than it deserves. The value of RAG depends less on the model than on the quality and governance of what it retrieves."
tags: ["RAG", "Knowledge Management", "Enterprise", "LLM"]
---

*This is an edited version of a course paper written for MGSD15H3 — Managing the Information Economy at the University of Toronto (Winter 2026). [Read the full paper with complete citations →](/papers/rag-organizational-memory.html)*

---

Every organization has experienced some version of this: a key employee leaves, and weeks later someone realizes that three years of hard-won context — why a decision was made, how a vendor relationship actually works, what failed last time — walked out the door with them. The formal documentation exists. The real knowledge does not.

This paper started as a course essay for MGSD15H3 at the University of Toronto. But the argument it makes connects directly to the kind of AI work I do at Sanofi and the systems I build on the side. Retrieval-augmented generation is a technical architecture. It is also, if you think about it carefully, an organizational memory system. And that framing changes what questions matter.

---

## The problem RAG is actually solving

Knowledge-management researchers have a precise term for what happens when institutional knowledge erodes after employee turnover: organizational amnesia. Walsh and Ungson defined organizational memory in 1991 as knowledge from an organization's past that shapes present decisions — not just information stored somewhere, but retained knowledge that remains usable. When that knowledge stays tied to individuals rather than embedded in organizational systems, it is one resignation away from disappearing.

Grant's knowledge-based view of the firm treats this as a strategic problem. Firms do not create value only by generating knowledge; they create value by coordinating and integrating knowledge that is distributed across people and over time. A firm that generates expertise but cannot retain it has a structural weakness, not just a documentation problem.

The connection to RAG is direct. A RAG system does not ask an LLM to generate an answer from training data alone. It retrieves relevant documents from an external knowledge base — policies, project records, decision logs, process guides — and uses those as grounding for its response. In organizational terms, this is a mechanism for making codified knowledge more accessible and reusable, precisely the capability that organizational memory theory says firms need.

---

## The limit that theory already anticipated

Here is where the literature introduces a necessary complication. Nonaka's 1994 framework distinguishes between tacit knowledge — personal, experience-based, hard to formalize — and explicit knowledge, which can be articulated, documented, and transferred. What makes this relevant to RAG is that retrieval systems can only operate on knowledge that has already been externalized.

If the reason a decision was made lives in someone's intuition, in an informal relationship, in the unwritten understanding of how a team actually works, no retrieval architecture can recover it by searching more efficiently. Jarrahi and colleagues (2023) put this plainly: AI can support significant knowledge management tasks, but tacit knowledge transfer remains predominantly a human process. RAG improves access to what is already written down. It cannot substitute for the organizational work of making knowledge writable in the first place.

This is not a failure of the technology. It is a structural property of the problem. Organizations do not lose knowledge only because they store it poorly. They lose knowledge because the most valuable knowledge often resists being stored at all — it lives in judgment, in contextual reading of situations, in the soft skills that experienced people cannot fully explain and newer colleagues cannot fully inherit from a document.

Practically, this means the value of a RAG implementation is bounded by a prior question: how well has the organization converted what matters into explicit, retrievable form? Building a RAG layer on top of a knowledge base that is mostly incomplete or never written down does not solve organizational amnesia. It makes the gaps more searchable.

---

## The risk that is easy to underestimate

The second half of this paper's argument is less intuitive, and I think more important.

Leonard-Barton (1992) described a paradox in organizational learning: the routines, systems, and capabilities that once made a firm successful can become rigidities that make adaptation harder. A company that learned well in one environment may be unable to unlearn when the environment changes. What the firm "knows" becomes an obstacle.

RAG systems can amplify this problem. If a retrieval layer surfaces a well-written procedure document from three years ago, and that procedure was correct then but is now outdated, the system will present it with the same authority as if it were current. The answer is fluent and cites a real source. The underlying knowledge is stale.

Chen and colleagues (2024, 2025) confirm this as an active technical problem. Time-sensitive retrieval remains difficult. Systems may return outdated documents. Handling noisy or misleading evidence, and correctly weighting conflicting sources, are unsolved challenges in practice. In enterprise settings, this is not an edge case — organizational knowledge deteriorates continuously as policies change, regulations update, and institutional context shifts.

Lewis and colleagues (2020) flag the same issue from the architecture side: source traceability and timely updating remain unresolved challenges for RAG. And de Holan and Phillips (2004) make a point from organizational theory that applies directly: organizational memory requires ongoing maintenance. It can weaken or distort over time if it is not actively curated. Better retrieval does not automatically produce better memory. It can produce faster access to the wrong thing, presented with apparent confidence.

Tsang and Zahra (2008) add a further layer by framing organizational unlearning as the deliberate discarding of existing routines. Organizations do not just need stronger mechanisms for remembering. They need the capacity to revise, retire, and sometimes delete what they previously knew. Without that capacity, a more powerful memory system preserves outdated routines more efficiently than it supports learning.

---

## What this means in practice

The organizational theory literature converges on a few practical implications that I think are underappreciated in most RAG implementations.

**Choose where to deploy RAG carefully.** The system is most useful for knowledge that is clearly defined, frequently needed, and at risk after turnover — standard operating procedures, decision logs, policy documents, onboarding materials, operational playbooks. These are the areas where codified knowledge is actually available and where retrieval adds real value. Deploying RAG across undifferentiated organizational content without scoping it to high-quality sources is a reliable path to surfacing noise.

**Prepare the knowledge base before the interface.** A RAG system cannot compensate for repositories that are poorly governed or full of duplicated and outdated material. The implementation work is mostly organizational, not technical. What documents are authoritative? Who owns them? How are they versioned? How will they be updated when practices change? Before these questions are answered, retrieval will not reliably surface the right thing.

**Make sources visible and require human judgment.** Retrieved answers should cite what they retrieved, when it was last updated, and who owns the source. A fluent answer should not be treated as proof that the underlying knowledge is reliable. Users need to be able to evaluate the provenance of what the system hands them. This is not a nice-to-have — it is the core mechanism that prevents RAG from laundering stale knowledge as current guidance.

**Maintain the knowledge base continuously.** Old documents should not remain in the same active retrieval pool as current guidance without clear differentiation. Organizations need review cycles, archival rules, version control, and clear processes for retiring outdated material. This is the same work that organizational memory theory describes as necessary for retention to remain useful over time.

---

## The connection to what I build

I wrote this paper for a course, but it captures something I have thought about while building the RAG layer in SaaSScout and while working on SupRM Intelligence at Sanofi.

The thing that makes a RAG system trustworthy in an enterprise context is not the model. It is the evidence architecture: how the data is partitioned, how retrieval candidates are ranked, how missing evidence is surfaced rather than silently omitted, and how the system signals what it knows versus what it does not. The knowledge governance question — which documents are in the retrieval pool, how current they are, who is responsible for updating them — is the organizational side of the same problem.

SaaSScout partitions its knowledge into four separate Chroma collections with different trust levels because mixing unverified review text with structured enterprise metadata would let high-volume content drown out the more reliable signal. That design decision is organizational memory governance implemented as a retrieval architecture.

The argument in this paper is that RAG should be understood this way: as a form of organizational memory infrastructure, not just a model feature. It amplifies what is already there. If the underlying knowledge base is well-maintained, governed, and current, it can meaningfully reduce organizational amnesia after turnover. If it is not, it will make fragmented and outdated knowledge more accessible than it deserves to be.

---

## Conclusion

Retrieval-augmented generation can make organizational knowledge more accessible and reusable, which is genuinely valuable when important knowledge is at risk of being lost after employee turnover. But its value is bounded by two conditions that organizations often underestimate.

First, retrieval systems can only recover knowledge that has already been externalized. Tacit knowledge, contextual judgment, and experience-based understanding that was never converted into explicit form cannot be retrieved. Organizations need to do the prior work of externalization before retrieval adds meaningful value.

Second, a better memory system can also preserve outdated thinking with more authority than it deserves. If knowledge governance is weak — if old documents sit alongside current ones with no differentiation, if sources are not dated or attributed, if no one is responsible for retiring stale guidance — then RAG will surface obsolete material fluently and confidently. That is a form of organizational rigidity, not organizational learning.

RAG is an amplifier. It makes the knowledge behind it more accessible, more searchable, and more reusable. Whether that is a capability or a liability depends almost entirely on the quality and governance of what is behind it.

---

*Written as MGSD15H3 — Managing the Information Economy, University of Toronto, April 2026. References: Walsh & Ungson (1991); Grant (1996); Nonaka (1994); Galan (2023a, 2023b); de Holan & Phillips (2004); Leonard-Barton (1992); Tsang & Zahra (2008); Jarrahi et al. (2023); Lewis et al. (2020); Chen et al. (2024, 2025).*
