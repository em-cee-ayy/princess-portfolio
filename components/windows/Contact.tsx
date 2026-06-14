"use client";

export default function Contact() {
  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value="C:\Users\Princess\contact.txt" readOnly />
      </div>
      <div
        className="bg-white border border-[#999] p-4"
        style={{ minHeight: 200, fontSize: 12, lineHeight: 1.6 }}
      >
        <div className="serif" style={{ fontSize: 22 }}>
          📧 say hi
        </div>
        <p className="mt-2">
          best ways to reach me (yes, i actually read these).
        </p>
        <ul className="mt-3 space-y-1">
          <li>
            ✉️ email —{" "}
            <a className="xp-link" href="mailto:mariah.c.anderson@gmail.com">
              mariah.c.anderson@gmail.com
            </a>
          </li>
          <li>
            💼 linkedin —{" "}
            <a
              className="xp-link"
              href="https://www.linkedin.com/in/mariahanderson"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/mariahanderson
            </a>
          </li>
          <li>
            🐙 github —{" "}
            <a
              className="xp-link"
              href="https://github.com/em-cee-ayy"
              target="_blank"
              rel="noreferrer"
            >
              github.com/em-cee-ayy
            </a>
          </li>
          <li>
            ✨ substack (ABRC) —{" "}
            <a className="xp-link" href="#" target="_blank" rel="noreferrer">
              antibrainrotclub.substack.com
            </a>
          </li>
          <li>
            🎬 tiktok —{" "}
            <a className="xp-link" href="#" target="_blank" rel="noreferrer">
              @whoismariahhhh
            </a>
          </li>
        </ul>
        <div className="mt-4 p-3 bg-[#fff8e1] border border-[#e0c878]">
          <strong>currently open to:</strong>
          <ul className="list-disc pl-5 mt-1">
            <li>AI-native product manager / technical PM roles</li>
            <li>conversations with AI PM leaders / CPOs (i learn fast)</li>
            <li>speaking + advising on responsible AI + neuro-design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
