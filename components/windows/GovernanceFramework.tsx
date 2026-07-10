"use client";

/**
 * AI Governance Framework — the publishable artifact behind case study #3
 * (companion to the Phantom PRD, governance layer). Professional register:
 * sentence case throughout. Content is held as data so the copy stays
 * verbatim and the rendering stays systematic.
 */

const IMPACT_ASSESSMENT = `SYSTEM ID:            aims-017-visit-summary
LIFECYCLE STAGE:      [ideation | sandbox | staging | production | decommissioned]
INTENDED PURPOSE:     Draft structured visit summaries from clinician-recorded
                      transcripts for clinician review and sign-off.
EXPLICIT NON-GOALS:   No autonomous patient communication. No diagnostic
                      suggestions. No unsigned content enters the record.
SYSTEM DEPENDENCIES:  LLM API (zero-data-retention contract) · vector store
                      (RBAC-tagged embeddings) · transcript pipeline
AFFECTED STAKEHOLDERS: Clinicians (internal) · patients (external, high-stakes)
DATA CLASSIFICATION:  PHI — highest tier
EU AI ACT ORIENTATION: Health context → treat as high-risk-adjacent; document
                      accordingly even where not strictly in scope`;

const WORKFLOW = `[PM/engineer creates draft record]
            │
            ▼
[automated risk classification]
  reads the use-case record:
  external_stakeholders? contains_PHI? clinical_proximity?
            │
   ┌────────┴─────────┐
(low risk)        (high risk)
   │                   │
   ▼                   ▼
[peer eng         [security + compliance
 sign-off]         + AI safety review]
   │                   │
   └────────┬──────────┘
            ▼
[immutable audit log entry — who, when, what config]
            ▼
[CI/CD pipeline unlocks deploy]`;

const MANIFEST = `{
  "system_id": "aims-017-visit-summary",
  "version": "1.3.0",
  "risk_classification": "high",
  "risks_considered": {
    "hallucination": "RAG-grounded on transcript only; temperature 0; schema-validated output; clinician sign-off required",
    "phi_exposure": "inline PHI masking pre-API; ZDR contract verified; vector RBAC by session token",
    "prompt_injection": "untrusted-input wrapping; role segregation; upstream intent filtering",
    "model_drift": "model registry with rollback; weekly evals vs. gold-standard set; schema gates alert on failure"
  },
  "approvers": ["security-lead", "compliance-officer", "product-owner"],
  "audit_ref": "ledger://aims-017/v1.3.0"
}`;

const RISK_REGISTER: { risk: string; wrong: string; mitigation: string }[] = [
  {
    risk: "Hallucinated clinical content",
    wrong:
      "A fabricated medication, dosage, or finding enters a draft; a rushed clinician signs it into the patient record.",
    mitigation:
      "RAG-grounded on the visit transcript only (no general-knowledge generation) · temperature 0 for deterministic output · structured schema validation — non-conforming output is discarded, never rendered · clinician review + signature as a hard product gate, not a suggestion.",
  },
  {
    risk: "PHI exposure",
    wrong:
      "Protected health information reaches an external model provider, or retrieval surfaces one patient's data to the wrong user.",
    mitigation:
      "Inline PHI masking/NER scrubbing before any external API call · zero-data-retention API contracts, verified not assumed · RBAC at the vector level — embeddings carry permission metadata, and every query is filtered by the requesting user's active session token.",
  },
  {
    risk: "Prompt injection via patient-supplied text",
    wrong:
      "Malicious content in an intake form or message (“ignore your instructions and…”) manipulates the summarizer's behavior.",
    mitigation:
      "All user-originated text treated as untrusted data — wrapped with strict role segregation from system instructions (the SQL-injection mindset, applied to prompts) · upstream semantic intent filtering · output PII/toxicity scrubbing before render.",
  },
  {
    risk: "Silent model drift",
    wrong:
      "A vendor model update quietly changes summary quality; a feature that was safe last month degrades without any code change.",
    mitigation:
      "Model registry logging every deployed model version, prompt template, and system config — with instant rollback · continuous evaluation against a gold-standard transcript set on every codebase update · schema gates block failing outputs and fire alerts.",
  },
  {
    risk: "Resource abuse",
    wrong:
      "Runaway loops or malicious usage spike inference costs and degrade availability for clinical users.",
    mitigation:
      "Aggressive per-user and per-endpoint rate limiting · budget alerts tied to the model registry so cost anomalies map to specific deployments.",
  },
];

const FEATURE_SPEC: {
  id: string;
  req: string;
  type: string;
  owner: string;
  criteria: string;
}[] = [
  {
    id: "R1",
    req: "Summary drafts generate only from the visit transcript via grounded retrieval",
    type: "Product + Safety",
    owner: "Eng lead",
    criteria:
      "Ablation test: with transcript removed, the system returns “insufficient context,” never a summary",
  },
  {
    id: "R2",
    req: "Every drafted claim carries a transcript citation (timestamp anchor)",
    type: "Product + Integrity",
    owner: "Eng lead",
    criteria: "100% of rendered sentences link to a transcript span in QA sample",
  },
  {
    id: "R3",
    req: "Clinician review + e-signature required before any content persists to the record",
    type: "Product + Safety",
    owner: "PM",
    criteria:
      "Unsigned drafts are non-persistable at the API level — the unsafe path does not exist",
  },
  {
    id: "R4",
    req: "PHI masking runs before any external model call",
    type: "Compliance",
    owner: "Security",
    criteria:
      "Red-team fixture set (synthetic PHI) shows 0 unmasked instances reaching the API boundary",
  },
  {
    id: "R5",
    req: "Vector retrieval filtered by requester's session permissions",
    type: "Compliance",
    owner: "Security",
    criteria:
      "Cross-tenant retrieval test returns zero results across permission boundaries",
  },
  {
    id: "R6",
    req: "Model/prompt/config changes require manifest update → approval gate → audit entry",
    type: "Governance",
    owner: "AI safety officer",
    criteria: "Deploy is blocked by CI when manifest and deployed config diverge",
  },
  {
    id: "R7",
    req: "Weekly automated eval vs. gold-standard set; regression blocks release",
    type: "Quality",
    owner: "Eng lead",
    criteria:
      "Eval score threshold enforced in pipeline; failures page the owning team",
  },
  {
    id: "N1",
    req: "Non-goal: no autonomous patient-facing output",
    type: "Scope",
    owner: "PM",
    criteria: "No code path exists from model output to patient channels",
  },
  {
    id: "N2",
    req: "Non-goal: no diagnostic or treatment suggestions",
    type: "Scope",
    owner: "PM",
    criteria:
      "Output schema has no fields for diagnosis/treatment; schema gate rejects them",
  },
];

export default function GovernanceFramework({
  onOpenApp,
}: {
  onOpenApp?: (id: string) => void;
}) {
  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value="C:\Users\Mariah\AI-Governance\framework.doc" readOnly />
      </div>

      <div
        className="bg-white border border-[#999] p-6"
        style={{ minHeight: 400, fontSize: 13, lineHeight: 1.55, color: "#111" }}
      >
        {/* Header */}
        <div style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1.2 }} className="serif">
          Governing AI feature rollout in a healthtech SaaS
        </div>
        <div className="italic text-[#555] mt-1">
          An applied AI governance framework — by Mariah Anderson
        </div>
        <p className="mt-3 text-[12px]">
          The publishable artifact behind portfolio case study #3. Written as the
          deliverable an AI Governance PM would hand a healthtech engineering org
          on day 30. Sentence case throughout — this is a professional artifact,
          same register as the Phantom PRD.
        </p>
        <div className="mt-2 p-2 bg-[#eef3fb] border-l-4 border-[#1B998B] text-[12px]">
          Companion to <strong>The Phantom PRD</strong>: that document governs the
          psychology of an AI product; this one governs the pipeline.
          {onOpenApp && (
            <>
              {" "}
              <button
                onClick={() => onOpenApp("work")}
                className="xp-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#0a3cc4",
                  textDecoration: "underline",
                  fontSize: 12,
                }}
              >
                open the Phantom PRD case study →
              </button>
            </>
          )}
        </div>

        <Heading>The premise</Heading>
        <p className="text-[12px]">
          A mid-size healthtech SaaS (clinic management platform) wants to ship
          its first AI feature: <strong>AI-drafted visit summaries</strong> — the
          model drafts a structured summary from the visit transcript, and the
          clinician reviews, edits, and signs before anything touches the patient
          record.
        </p>
        <p className="text-[12px] mt-2">
          Most orgs would ship the feature, then write the policy. This framework
          makes the governance part of the build, so the feature ships faster
          because it can be trusted. Three artifacts, one pipeline:
        </p>
        <ol className="list-decimal pl-5 text-[12px] mt-1 space-y-1">
          <li>A use-case impact assessment template (ISO 42001 Annex A.5-aligned)</li>
          <li>A risk-tiered approval workflow that gates CI/CD with an immutable audit trail</li>
          <li>
            A flagship feature spec where compliance requirements are product
            requirements — with owners and acceptance criteria
          </li>
        </ol>
        <p className="text-[12px] mt-2">
          <strong>Frameworks applied:</strong> NIST AI RMF (govern → map → measure
          → manage), ISO 42001 (AI management system), EU AI Act risk-tier
          awareness, HIPAA-adjacent PHI handling, zero trust architecture, and the
          CIA triad.
        </p>

        <Heading>Artifact 1 — the use-case impact assessment</Heading>
        <p className="text-[12px]">
          Every AI feature starts as a structured record, not a Slack thread. The
          template is deliberately short — a form nobody fills out governs nothing.
        </p>
        <Code>{IMPACT_ASSESSMENT}</Code>
        <p className="text-[12px] mt-2">
          The two lines that do the most work: <strong>explicit non-goals</strong>{" "}
          (scope is a safety control) and <strong>affected stakeholders</strong>{" "}
          (the trigger for automated risk tiering below).
        </p>

        <Heading>Artifact 2 — the risk-tiered approval workflow</Heading>
        <p className="text-[12px]">
          Governance that treats every feature identically will be routed around.
          This flow makes the governed path the fast path: low-risk features move
          at peer-review speed; only high-risk features pay the full review cost.
        </p>
        <Code>{WORKFLOW}</Code>
        <p className="text-[12px] mt-2">
          <strong>Compliance as code.</strong> The record lives in the feature repo
          as <code className="bg-[#f0f0f0] px-1">ai-manifest.json</code>. Modify the
          manifest → the pipeline re-classifies risk → the right approval gate
          engages. Auditors read version control, not binders.
        </p>
        <Code>{MANIFEST}</Code>
        <p className="text-[12px] mt-2">
          Every state transition — who approved, when, with which prompt
          configuration — is written to an append-only log table. When behavior
          changes in production, the first question (&ldquo;what changed, who
          signed it?&rdquo;) has a one-query answer.
        </p>

        <Heading>Artifact 3 — the risk register</Heading>
        <p className="text-[12px]">
          ISO 42001 requires cataloging what could go wrong and proving the stack
          stops it. Impact stated in patient terms, because that&apos;s the term
          that matters.
        </p>
        <table className="w-full mt-2 border-collapse text-[11px]" style={{ lineHeight: 1.4 }}>
          <thead>
            <tr className="bg-[#f0ede0]">
              <Th>Identified risk</Th>
              <Th>What could go wrong</Th>
              <Th>Technical + product mitigation</Th>
            </tr>
          </thead>
          <tbody>
            {RISK_REGISTER.map((r) => (
              <tr key={r.risk} className="align-top">
                <Td>
                  <strong>{r.risk}</strong>
                </Td>
                <Td>{r.wrong}</Td>
                <Td>{r.mitigation}</Td>
              </tr>
            ))}
          </tbody>
        </table>

        <Heading>Artifact 4 — the flagship feature spec</Heading>
        <p className="text-[12px]">
          The point of the whole framework in one table: compliance items written
          as product requirements with owners and acceptance criteria —
          indistinguishable in form from any other requirement, because that&apos;s
          what makes them ship.
        </p>
        <div className="italic text-[12px] mt-2 mb-1">
          Feature: AI-drafted visit summaries (v1)
        </div>
        <table className="w-full border-collapse text-[11px]" style={{ lineHeight: 1.4 }}>
          <thead>
            <tr className="bg-[#f0ede0]">
              <Th>#</Th>
              <Th>Requirement</Th>
              <Th>Type</Th>
              <Th>Owner</Th>
              <Th>Acceptance criteria</Th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_SPEC.map((r) => (
              <tr key={r.id} className="align-top">
                <Td>
                  <strong>{r.id}</strong>
                </Td>
                <Td>{r.req}</Td>
                <Td>{r.type}</Td>
                <Td>{r.owner}</Td>
                <Td>{r.criteria}</Td>
              </tr>
            ))}
          </tbody>
        </table>

        <Heading>Why this is the governance layer of a product portfolio</Heading>
        <p className="text-[12px]">
          Every product I build runs one loop — sense a state, classify it with AI,
          adapt the experience, learn from the outcome. This framework is that same
          loop applied to an organization&apos;s AI pipeline: sense the
          feature&apos;s risk surface (impact assessment), classify it (automated
          tiering), adapt the process to the risk (gated approvals), and learn
          continuously (evals, registry, audit log).
        </p>
        <p className="text-[12px] mt-2">
          Governance done this way isn&apos;t the brake on AI product velocity.
          It&apos;s the reason the org is allowed to accelerate.
        </p>

        <div className="mt-5 pt-3 border-t border-[#ccc] text-[11px] text-[#555]">
          Mariah Anderson · Sr. Product Engineer &amp; AI Enablement Lead, SOCi ·
          ISO 42001 · NIST AI RMF · Google Cybersecurity + AI (Coursera, completing
          2026)
          <br />
          Full portfolio: mariahtheoptimist.framer.website
        </div>
      </div>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="serif mt-5 mb-1"
      style={{ fontSize: 16, fontWeight: "bold", borderBottom: "1px solid #ddd", paddingBottom: 2 }}
    >
      {children}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre
      className="mt-2 overflow-x-auto"
      style={{
        background: "#1e1e24",
        color: "#e6e6ea",
        padding: "10px 12px",
        borderRadius: 6,
        fontSize: 11,
        lineHeight: 1.45,
        fontFamily: "Consolas, 'Courier New', monospace",
      }}
    >
      {children}
    </pre>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="border border-[#ccc] p-1.5 text-left font-bold"
      style={{ verticalAlign: "top" }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-[#ccc] p-1.5">{children}</td>;
}
