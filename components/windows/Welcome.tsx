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
        thesis i've been building toward in every project:{" "}
        <strong>
          technology should work WITH the human brain, not against it.
        </strong>
      </p>
      <p className="mt-3">
        i'm a sr. product engineer at SOCi with a psychology + neuroscience
        background, building toward an AI-native product leadership role. four
        pieces in this portfolio, four roles they target — all unified by a
        psych-forward, AI-native creative philosophy.
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
