"use client";

type Props = { onOpenWork: () => void };

export default function Welcome({ onOpenWork }: Props) {
  return (
    <div style={{ fontSize: 12, lineHeight: 1.5, maxWidth: 480 }}>
      <p>
        oh, hey! i'm{" "}
        <a
          href="https://www.linkedin.com/in/mariahanderson"
          target="_blank"
          rel="noreferrer"
          className="xp-link"
        >
          Mariah
        </a>{" "}
        - welcome to my 100% vibe-coded portfolio!
      </p>
      <p className="mt-3">
        this project is a celebration of the early days of personal computing
        that made me fall in love with the internet: unpretentious
        self-expression, delightfully simple interactions, and joyful moments of
        discovery + play.
      </p>
      <p className="mt-3">
        an intentional blend of retro interfaces, contemporary metaphors, and AI
        tools brought this experience to life. but the through-line is the
        thesis behind every project here:{" "}
        <strong>
          i build products that treat cognitive state as a first-class input.
        </strong>{" "}
        every one runs the same loop - sense the user&apos;s state, classify it
        with AI, adapt the experience, feed the outcome back into the next
        decision. brainmode runs that loop at the interface layer, happy trails
        at the environment layer, and the phantom prd asks what we owe users
        when we run it at scale.
      </p>
      <p className="mt-3">
        i&apos;m a senior product engineer with a psychology degree, a ux/ui
        certification, and a habit of connecting them. at soci i lead
        company-wide ai training and ship internal ai products; outside work i
        build cognitive-state-aware products end to end - research → design
        system → api contract → shipped code. the throughline: i think in loops
        and second-order effects. if a design decision doesn&apos;t account for
        what it teaches the user to do next, it isn&apos;t finished.
      </p>
      <p className="mt-3">
        double-click <strong>work.explorer</strong> to see the case studies, or{" "}
        <button
          onClick={onOpenWork}
          className="xp-link"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#0a3cc4",
            textDecoration: "underline",
          }}
        >
          click here
        </button>
        . the desktop is yours! poke around the icons, play{" "}
        <em>Spill the Beans</em>, run something through the <em>Brain Lab</em>.
        i'm grateful you showed up here, and i hope you have fun &lt;3333
      </p>
    </div>
  );
}
