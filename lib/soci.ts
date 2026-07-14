export type SOCiHighlight = {
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
};

export const soci: SOCiHighlight[] = [
  {
    title: "SOCi's company-wide AI training program",
    subtitle: "Designed + led with VPs + the CTO",
    body: "I co-lead and design SOCi's company-wide AI training program - Claude workshops for engineers, PMs, and execs, run alongside our VPs and the CTO. The program translates dense AI capabilities into role-specific workflows for engineering, product, support, and revenue teams - bridging the gap between 'AI is cool' and 'AI lives in our daily workflow.'",
    tags: ["AI enablement", "executive partnership", "AI adoption"],
  },
  {
    title: "SOCi Sage - internal Slack-native AI assistant",
    subtitle: "Shipped internal AI product",
    body: "Shipped SOCi Sage, an internal Slack-native AI assistant that puts company knowledge and Claude-powered workflows where teams already work. Instead of a separate tool to adopt, the assistance shows up in the surface people are already in - the difference between an AI product teams use and one they forget.",
    tags: ["internal product", "Claude", "Slack", "AI adoption"],
  },
  {
    title: "LMS build with Governance & Security",
    subtitle: "AI-native learning + compliance",
    body: "Co-built an internal LMS with the governance / security team to operationalize responsible AI use at SOCi. Encoded ISO 42001-aligned AI use case documentation, approval flows, and training tracks - so AI adoption scales with guardrails, not around them.",
    tags: ["governance", "ISO 42001", "responsible AI"],
  },
  {
    title: "Cross-team workflows + automations",
    subtitle: "AI-native productivity, not AI-veneer",
    body: "Built workflow automations + Claude-powered tooling for product, engineering, support, and revenue teams - turning manual debug rituals, ticket triage, and reporting cadences into instrumented, repeatable systems. The pattern: surface tribal knowledge as structured Claude context, then automate.",
    tags: ["automation", "Claude", "PHP/Python", "SQL"],
  },
  {
    title: "Leadership + CTO recognition",
    subtitle: "Sr. Product Engineer → AI-native leadership track",
    body: "Recognized by leadership for technical depth, AI-native instincts, and cross-functional impact. Currently building the kind of work that makes the case for an AI Product Manager / AI Technical Product Leader role - internally and externally.",
    tags: ["recognition", "leadership", "AI PM track"],
  },
  {
    title: "Day-to-day: debugging, PHP/Python, SQL, devtools",
    subtitle: "Engineer who ships",
    body: "Core Sr. Product Engineer work: PHP + Python scripting, SQL across production databases, deep Chrome devtools debugging, customer-impact bug triage. The differentiator is treating every bug as a behavioral systems problem - what was the user trying to do, what did the system mispredict, what's the fix that respects both.",
    tags: ["PHP", "Python", "SQL", "debugging", "devtools"],
  },
];
