import { caseStudies } from "./caseStudies";
import { soci } from "./soci";

/**
 * One canonical string of "everything Claude needs to know about Mariah" —
 * imported by both the AIM API route and any future Q&A surface.
 *
 * Keep this in sync with lib/caseStudies.ts, lib/soci.ts, and components/windows/Resume.tsx.
 */

const RESUME = `
Name: Mariah Anderson (sometimes goes by mariahtheoptimist)
Title: Senior Product Engineer at SOCi (2022 – Present)
Targets: AI-native Product Manager / Technical Product Leader → eventually CPO
Contact: mariah.c.anderson@gmail.com · linkedin.com/in/mariahanderson · github.com/em-cee-ayy · mariahtheoptimist.framer.website
Brand: Founder of ABRC (Anti Brain Rot Club) - AI, neuroscience, intentional tech use. Tagline: "stop rotting, start living."

== SUMMARY ==
Product engineer and AI builder with a foundation in psychology, UX, and full-stack development. Core thesis: I build cognitive-state-aware products that treat cognitive state as a first-class input — built end to end (research → design system → API contract → shipped code) and reasoned about in loops and second-order effects. Lead company-wide AI enablement and ship internal AI products at SOCi. Specialize in translating complex data systems into scalable product strategy; a bridge between engineering, data science, and product leadership. Background in digital marketing strategy + consumer behavior, with deep interest in privacy-compliant, data-driven targeting systems. Keywords: adaptive interfaces, systems thinking, closed feedback loops, AI product strategy, LLM API design, structured output contracts, design systems, design tokens, state architecture, attention restoration theory, cognitive load, roadmap influence, north star metric.

== EXPERIENCE ==

Senior Product Engineer — SOCi (2022 – Present)
- Led cross-functional collaboration between Product, Engineering, Design to identify platform gaps and shape product strategy
- Investigated complex platform issues across APIs, databases, application layers using SQL, JavaScript, PHP, Python, backend debugging
- Surfaced the systemic product gaps others missed in SOCi's behavioral data (user interaction signals, API event logs, support trend data) — the analysis informed the fixes that cut resolution time 55%, and leadership reprioritized the roadmap based on it
- Acted as technical liaison between Engineering and Product leadership, translating system-level insights into product requirements + architectural recommendations
- Partnered with PMs to surface recurring platform issues and prioritize reliability, performance, and UX improvements
- Mentored + onboarded new hires, establishing technical workflows and product collaboration standards
- Design and lead SOCi's company-wide AI training program — Claude workshops for engineers, PMs, and execs, run alongside our VPs and the CTO — translating capabilities into role-specific workflows
- Shipped SOCi Sage, an internal Slack-native AI assistant that puts company knowledge and Claude-powered workflows where teams already work
- Co-built an internal LMS with Governance + Security to operationalize responsible AI use (ISO 42001-aligned)
- Recognized by leadership (incl. CTO) for AI-native instincts + cross-functional impact

Account Manager — eLocal (2021 – 2022)
- Analyzed client performance data to improve retention and outcomes

Customer Success Manager — Charity Footprints (2020 – 2021)
- Managed 100+ client accounts and led onboarding demos to increase platform adoption

== PROJECTS ==

Flux — AI-Powered Behavioral Productivity System (Independent, 2025 – Present)
- AI-powered app integrating behavioral signal processing, user state modeling, real-time API data flows
- Built with React, Firebase, OpenAI APIs
- Foundation for BrainMode (see portfolio below)

== SKILLS ==
- AI & Technical: SQL, JavaScript, HTML/CSS, API integrations, Python, PHP, debugging, data analysis, React, Tailwind, Next.js, Firebase, Supabase, behavioral data analysis, AI/ML product integration, Anthropic + OpenAI APIs
- Product Management: Roadmapping, user research, stakeholder collaboration, Agile/Scrum, metrics-driven decisions, consumer app lifecycle, research-to-feature translation, privacy-first product strategy
- UX & Human-Centered Design: Usability testing, prototyping, wireframing, information architecture, neuro-informed design
- Tools: Figma, Weavy, Node-based tools, Confluence, GitHub, Zendesk, Salesforce, Trello, Notion, Adobe Creative Cloud, Chrome devtools
- Data Systems & Infrastructure: API integrations + debugging, data pipeline troubleshooting, platform reliability analysis, large dataset interpretation, privacy-compliant data frameworks, audience segmentation, identity resolution

== EDUCATION ==
- Western Connecticut State University — B.S. Psychology (May 2017)
- Florida Atlantic University — UX / UI Design Certification (2022)
- Southern New Hampshire University — M.S. Digital Marketing (Expected 2028)
`;

const SOCI_EXTRAS = soci
  .map((s) => `- ${s.title} (${s.subtitle}): ${s.body}`)
  .join("\n");

const PORTFOLIO = caseStudies
  .map(
    (c) =>
      `### ${c.emoji} ${c.title} — targets ${c.role}
Pitch: ${c.pitch}
Problem: ${c.problem}
Insight: ${c.insight}
Stack: ${c.stack.join(", ")}
Status: ${c.status}
Key build decisions: ${c.buildDecisions.join(" | ")}
Outcomes / lineage: ${c.outcomes.join(" | ")}`,
  )
  .join("\n\n");

export const APP_INDEX = `
The portfolio site has these openable windows (the app/window id is in [brackets]).
When the user asks for a link to a section, suggest the matching window id by using the literal token "[open:work]" etc. on a line of its own — the UI will turn it into a clickable button.

- [systemmap] System Map — how the 4 projects relate: one loop (sense → classify → adapt → learn), four layers (interface, environment, design, governance)
- [work] work.explorer — the 4 case studies (BrainMode, Happy Trails AI, ABRC, Phantom PRD)
- [governance] governance.msc (the AI Governance Framework) — publishable applied-governance artifact (companion to the Phantom PRD): governing an AI visit-summary feature rollout in a healthtech SaaS, with ISO 42001 / NIST AI RMF, a risk register, and compliance-as-code
- [soci] SOCi Highlights — extra-credit SOCi work (Claude webinars, LMS, CTO recognition)
- [brainlab] Brain Lab — live Claude tools: cognitive load scorer + brain state check-in
- [spill] Spill the Beans — trivia mini-game about Mariah
- [resume] Resume — full resume (with PDF download)
- [contact] Contact — email, LinkedIn, GitHub, Substack, TikTok
- [whatsnew] What's New — recent travel, projects, photos
- [welcome] Welcome — intro window
`;

const GOVERNANCE = `
AI Governance Framework — "Governing AI feature rollout in a healthtech SaaS" (open with [governance]).
A publishable applied-governance artifact and the companion to the Phantom PRD: the Phantom PRD governs the psychology of an AI product; this one governs the pipeline. Written as the deliverable an AI Governance PM would hand a healthtech engineering org on day 30 (professional sentence-case register).
Premise: a mid-size healthtech SaaS wants to ship AI-drafted visit summaries (model drafts a structured summary from a visit transcript; clinician reviews, edits, and signs before anything touches the record).
Four artifacts, one pipeline: (1) a use-case impact assessment template (ISO 42001 Annex A.5-aligned), (2) a risk-tiered approval workflow that gates CI/CD via an immutable audit trail (compliance-as-code: an ai-manifest.json in the repo re-classifies risk on change), (3) a risk register (hallucinated clinical content, PHI exposure, prompt injection, silent model drift, resource abuse — each with technical + product mitigations), (4) a flagship feature spec where compliance requirements ARE product requirements with owners + acceptance criteria.
Frameworks applied: NIST AI RMF (govern → map → measure → manage), ISO 42001, EU AI Act risk-tier awareness, HIPAA-adjacent PHI handling, zero trust, CIA triad.
Thesis tie-in: it's the same sense → classify → adapt → learn loop applied to an org's AI pipeline — governance as the reason a company is allowed to accelerate, not the brake.`;

export const FULL_CONTEXT = `${RESUME}

== SOCI HIGHLIGHTS (extra-credit work) ==
${SOCI_EXTRAS}

== PORTFOLIO CASE STUDIES ==
${PORTFOLIO}

== APPLIED GOVERNANCE ARTIFACT ==
${GOVERNANCE}
`;
