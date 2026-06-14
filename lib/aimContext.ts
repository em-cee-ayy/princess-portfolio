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
Product engineer and AI builder with a foundation in psychology, UX, and full-stack development. Specializes in translating complex data systems into scalable product strategy. Bridge between engineering, data science, and product leadership. Background in digital marketing strategy + consumer behavior, deep interest in privacy-compliant, data-driven targeting systems.

== EXPERIENCE ==

Senior Product Engineer — SOCi (2022 – Present)
- Led cross-functional collaboration between Product, Engineering, Design to identify platform gaps and shape product strategy
- Investigated complex platform issues across APIs, databases, application layers using SQL, JavaScript, PHP, Python, backend debugging
- Analyzed large behavioral datasets (user interaction signals, API event logs, support trend data) — contributing to a 55% reduction in resolution time and directly influencing roadmap prioritization
- Acted as technical liaison between Engineering and Product leadership, translating system-level insights into product requirements + architectural recommendations
- Partnered with PMs to surface recurring platform issues and prioritize reliability, performance, and UX improvements
- Mentored + onboarded new hires, establishing technical workflows and product collaboration standards
- Designed + ran company-wide Claude / AI training webinars alongside VPs and the CTO
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
- Tools: Figma, Confluence, GitHub, Zendesk, Salesforce, Trello, Notion, Adobe Creative Cloud, Chrome devtools
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

- [work] work.explorer — the 4 case studies (BrainMode, Happy Trails AI, ABRC, Phantom PRD)
- [soci] SOCi Highlights — extra-credit SOCi work (Claude webinars, LMS, CTO recognition)
- [brainlab] Brain Lab — live Claude tools: cognitive load scorer + brain state check-in
- [spill] Spill the Beans — trivia mini-game about Mariah
- [resume] Resume — full resume (with PDF download)
- [contact] Contact — email, LinkedIn, GitHub, Substack, TikTok
- [whatsnew] What's New — recent travel, projects, photos
- [welcome] Welcome — intro window
`;

export const FULL_CONTEXT = `${RESUME}

== SOCI HIGHLIGHTS (extra-credit work) ==
${SOCI_EXTRAS}

== PORTFOLIO CASE STUDIES ==
${PORTFOLIO}
`;
