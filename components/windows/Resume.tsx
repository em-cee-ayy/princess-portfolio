"use client";

export default function Resume() {
  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value="C:\Users\Princess\resume.doc" readOnly />
      </div>

      {/* Download bar */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-2"
        style={{
          background: "linear-gradient(180deg, #fffbe6 0%, #f5e9b5 100%)",
          borderBottom: "1px solid #aca899",
        }}
      >
        <div className="text-[12px]">
          <strong>💾 want the original?</strong>{" "}
          <span className="text-[#555]">
            grab the PDF — same content, in recruiter-friendly format.
          </span>
        </div>
        <a
          href="/Mariah-Anderson-resume.pdf"
          download
          className="xp-btn"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          ⬇ Download Resume.pdf
        </a>
      </div>

      <div
        className="bg-white border border-[#999] p-5 serif"
        style={{
          minHeight: 400,
          fontSize: 13,
          lineHeight: 1.55,
          color: "#111",
        }}
      >
        <div className="text-center">
          <div style={{ fontSize: 26, fontWeight: "bold" }}>
            Mariah Anderson
          </div>
          <div className="italic text-[12px] tracking-wide">
            SR. PRODUCT ENGINEER · AI PRODUCT LEADER
          </div>
          <div className="text-[11px] mt-1.5 leading-snug">
            mariah.c.anderson@gmail.com · linkedin.com/in/mariahanderson
            <br />
            github.com/em-cee-ayy · mariahtheoptimist.framer.website · ABRC
            founder
          </div>
        </div>

        <Section label="SUMMARY">
          Product engineer and AI builder with a foundation in psychology, UX,
          and full-stack development — specializing in translating complex data
          systems into scalable product strategy. Experienced working with APIs,
          behavioral datasets, and cross-functional teams to drive measurable
          outcomes. Natural bridge between engineering, data science, and
          product leadership, with a track record of diagnosing systemic
          platform issues and shaping roadmap direction. Background in digital
          marketing strategy and consumer behavior, with deep interest in
          privacy-compliant, data-driven targeting systems. Currently building
          toward an AI-native Product Manager / Technical Product Leadership
          role — and, eventually, CPO.
        </Section>

        <Section label="EXPERIENCE">
          <Job
            company="SOCi"
            title="Senior Product Engineer"
            time="2022 – Present"
          >
            <li>
              Led cross-functional collaboration between Product, Engineering,
              and Design to identify platform gaps and shape product strategy.
            </li>
            <li>
              Investigated complex platform issues across APIs, databases, and
              application layers using SQL, JavaScript, PHP, Python, and backend
              debugging tools.
            </li>
            <li>
              Analyzed large behavioral datasets — user interaction signals, API
              event logs, support trend data — to identify systemic product
              gaps, contributing to a{" "}
              <strong>55% reduction in resolution time</strong> and directly
              influencing roadmap prioritization.
            </li>
            <li>
              Acted as a technical liaison between Engineering and Product
              leadership, translating system-level insights into product
              requirements and architectural recommendations.
            </li>
            <li>
              Partnered with Product Managers to surface recurring platform
              issues and prioritize improvements to reliability, performance,
              and user experience.
            </li>
            <li>
              Mentored and onboarded new hires, establishing technical workflows
              and product collaboration standards across a cross-functional
              team.
            </li>
            <li>
              Designed + ran company-wide Claude / AI training webinars
              alongside VPs and the CTO — translating capabilities into
              role-specific workflows for engineering, product, support, and
              revenue teams.
            </li>
            <li>
              Co-built an internal LMS with Governance + Security to
              operationalize responsible AI use (ISO 42001-aligned use case
              documentation, approval flows, and training tracks). Recognized by
              leadership (incl. CTO) for AI-native instincts + cross-functional
              impact.
            </li>
          </Job>

          <div className="mt-3" />
          <Job company="eLocal" title="Account Manager" time="2021 – 2022">
            <li>
              Analyzed client performance data to improve retention and
              outcomes.
            </li>
          </Job>

          <div className="mt-3" />
          <Job
            company="Charity Footprints"
            title="Customer Success Manager"
            time="2020 – 2021"
          >
            <li>
              Managed 100+ client accounts and led onboarding demos to increase
              platform adoption.
            </li>
          </Job>
        </Section>

        <Section label="PROJECTS">
          <Job
            company="Flux"
            title="AI-Powered Behavioral Productivity System"
            time="Independent · 2025 – Present"
          >
            <li>
              Built Flux, an AI-powered application integrating behavioral
              signal processing, user state modeling, and real-time API data
              flows — demonstrating ability to architect complex data systems
              that track, resolve, and activate user context over time.
            </li>
            <li>
              Architected the system using React, Firebase, and OpenAI APIs to
              translate user inputs and contextual signals into dynamic
              AI-generated workflows. (Flux is the foundation BrainMode is being
              built on.)
            </li>
            <li>
              Conducted user research and behavioral data analysis to validate
              product hypotheses and inform feature design.
            </li>
          </Job>

          <div className="mt-3 text-[12px]">
            <strong>Portfolio (4 roles · 4 pieces · one thesis)</strong> — see{" "}
            <em>work.explorer</em> on the desktop for full case studies:
          </div>
          <ul className="list-disc pl-5 mt-1 text-[12px] space-y-1">
            <li>
              <strong>🛠️ BrainMode</strong> — cognitive state router (not a task
              manager). Next.js · Supabase · Anthropic · Replicate.{" "}
              <em>Product Engineer target.</em>
            </li>
            <li>
              <strong>🤖 Happy Trails AI</strong> — trail recommendation engine
              built on Attention Restoration Theory. FastAPI · Pinecone RAG ·
              Anthropic · Mapbox. <em>AI Engineer target.</em>
            </li>
            <li>
              <strong>🎨 ABRC</strong> — Anti Brain Rot Club website as a live
              neuro-informed design case study, every decision cited.{" "}
              <em>Design Engineer target.</em>
            </li>
            <li>
              <strong>📋 The Phantom PRD</strong> — unsolicited AI PM strategy
              for Character.AI through a behavioral psych lens, including a
              90-second speculative product film.{" "}
              <em>AI Product Manager target.</em>
            </li>
          </ul>
        </Section>

        <Section label="SKILLS">
          <SkillRow
            label="AI & Technical"
            body="SQL, JavaScript, HTML/CSS, API integrations, Python, PHP, debugging, data analysis, React, Tailwind, Next.js, Firebase, Supabase, behavioral data analysis, AI/ML product integration, data flows, behavioral datasets, system analysis, Anthropic + OpenAI APIs"
          />
          <SkillRow
            label="Product Management"
            body="Roadmapping, user research, stakeholder collaboration, Agile/Scrum, metrics-driven decisions, consumer app lifecycle, research-to-feature translation, privacy-first product strategy, data partnership evaluation"
          />
          <SkillRow
            label="UX & Human-Centered Design"
            body="Usability testing, prototyping, wireframing, information architecture, neuro-informed design rationale, accessibility"
          />
          <SkillRow
            label="Tools"
            body="Figma, IDE, Confluence, GitHub, Zendesk, Salesforce, Trello, Notion, Adobe Creative Cloud, Chrome devtools"
          />
          <SkillRow
            label="Data Systems & Infrastructure"
            body="API integrations + debugging, data pipeline troubleshooting, platform reliability analysis, large dataset + behavioral signal interpretation, data-informed product decision making, privacy-compliant data frameworks, audience segmentation concepts, identity resolution patterns"
          />
        </Section>

        <Section label="EDUCATION">
          <div className="text-[12px] space-y-2">
            <div>
              <strong>Western Connecticut State University</strong>
              <div className="italic">B.S. Psychology · Graduated May 2017</div>
            </div>
            <div>
              <strong>Florida Atlantic University</strong>
              <div className="italic">
                UX / UI Design Certification · Completed 2022
              </div>
            </div>
            <div>
              <strong>Southern New Hampshire University</strong>
              <div className="italic">
                M.S. Digital Marketing · Expected 2028
              </div>
            </div>
          </div>
        </Section>

        <Section label="BRAND + ORIGIN">
          <div className="text-[12px]">
            Founder of <strong>ABRC — Anti Brain Rot Club</strong>: a personal
            brand at the intersection of AI, neuroscience, and intentional tech
            use. Tagline: <em>stop rotting, start living.</em> Publishing in
            public on Substack, TikTok, LinkedIn, and Instagram.
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div
        style={{
          borderBottom: "1px solid #444",
          fontWeight: "bold",
          letterSpacing: 2,
          fontSize: 11,
          paddingBottom: 2,
        }}
      >
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Job({
  company,
  title,
  time,
  children,
}: {
  company: string;
  title: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between text-[12px] flex-wrap gap-2">
        <strong>
          {company} — {title}
        </strong>
        <span className="italic">{time}</span>
      </div>
      <ul className="list-disc pl-5 mt-1 text-[12px] space-y-1">{children}</ul>
    </div>
  );
}

function SkillRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="text-[12px] mb-1.5">
      <strong>{label}:</strong> {body}
    </div>
  );
}
