// The signature element of this UI: every screen — login, register, the
// signed-in badge — lives inside the same keycard silhouette, with a
// notch cut out of the top edge and a row of punch holes along the side,
// echoing a physical access card. The LED in the corner reflects session
// status (amber = idle/pending, teal = signed in, red = error).

export default function AccessCard({ eyebrow, title, ledState = "idle", children }) {
  return (
    <div className="access-card">
      <div className="access-card__notch" aria-hidden="true" />
      <div className="access-card__holes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="access-card__header">
        <div>
          {eyebrow && <p className="access-card__eyebrow mono">{eyebrow}</p>}
          <h1 className="access-card__title">{title}</h1>
        </div>
        <span className={`led led--${ledState}`} title={`status: ${ledState}`} />
      </div>

      <div className="access-card__body">{children}</div>
    </div>
  );
}
