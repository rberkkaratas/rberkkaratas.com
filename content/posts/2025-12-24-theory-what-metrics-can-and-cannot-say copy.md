---
title: "asdasdory View of Football Analytics"
date: "2025-12-24"
summary: "A theoretical lens on sports metrics: measurement error, uncertainty, and why decisions should be framed as trade-offs—not rankings."
tags: ["Theory", "Methodology", "Recruitment", "Match Analysis"]
cover:
draft: false
---

A useful metric is not “true.” It is **decision-relevant**.

The job of analytics is to reduce uncertainty enough to make better choices—while being honest about what remains unknown.

This post frames football analytics through three theoretical ideas: measurement, uncertainty, and decision-making.

## 1. Metrics are measurements, not reality
A metric is a compressed representation of a complex system.

- xG compresses shot context into a probability.
- Passing networks compress circulation into a graph.
- “Progressive actions” compress movement into thresholds.

All compression discards information. The question is whether it discards information you need for the decision.

## 2. Two kinds of uncertainty
**Aleatory uncertainty**: randomness inherent in outcomes (deflections, finishing variance).  
**Epistemic uncertainty**: lack of knowledge (missing variables, mis-specified models).

Many discussions treat all uncertainty as the same. That’s a mistake:
- Aleatory uncertainty can often only be managed through sample size and risk control.
- Epistemic uncertainty can be reduced by better data, definitions, and modeling.

## 3. The per-90 trap and the “usage problem”
Per-90 rates are attractive because they normalize time. But they can hide the role:

- A player with low touches may have high “per touch” impact, but cannot scale.
- A player’s output is conditional on team structure and usage.

A better framing is: **what would change if usage changed?**  
That is a counterfactual question, and many simple leaderboards can’t answer it.

## 4. Decisions are trade-offs, not rankings
Recruitment questions are almost never:
“Who is the best player?”

They are:
- Who fits this role under budget constraints?
- Who reduces risk in a critical position?
- Who matches our game model and transition plan?

A ranking collapses multi-dimensional trade-offs into a single axis. It can be useful as a tool, but it is rarely a decision.

## 5. Model outputs should be treated as evidence
A mature workflow treats metrics as evidence that updates beliefs:

- prior belief: player is an average ball-progressor
- evidence: consistently high progressive receptions + successful carries under pressure
- posterior belief: player likely provides progression value in certain contexts

This is why method transparency matters: without it, you can’t calibrate how much to update.

## 6. Practical implications for your analysis
If you want your work to be decision-grade:

- report uncertainty (confidence intervals, variability, sample size)
- show assumptions and definitions clearly
- avoid absolute claims from small samples
- include at least one alternative explanation

## A good rule of thumb
If a chart cannot answer “Compared to what, under which assumptions, and with what uncertainty?” it should not drive a decision.

Use metrics to **structure thinking**, not to replace it.
