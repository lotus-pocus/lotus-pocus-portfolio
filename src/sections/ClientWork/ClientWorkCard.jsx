function ClientWorkCard({
  project,
  isDragging,
  isAnimating,
  dragOffset,
  showSwipeHint,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}) {
  const cardBackground = project.cardBackgroundColor?.hex || "#121212";

  const cardTextColor = project.cardTextColor?.hex || "#f5f5f5";

  const clientLogoUrl = project.clientLogo?.asset?.url || null;

  return (
    <article
      className={`client-feature-project ${
        isDragging ? "is-dragging" : ""
      } ${isAnimating ? "is-animating" : ""}`}
      aria-live="polite"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={{
        transform: `translate3d(${dragOffset}px, 0, 0)`,
        backgroundColor: cardBackground,
        color: cardTextColor,
      }}
    >
      <div className="client-feature-card-top">
        <div className="client-feature-brand">
          {clientLogoUrl ? (
            <img
              src={clientLogoUrl}
              alt={`${project.title} logo`}
              className="client-feature-logo"
              draggable="false"
            />
          ) : (
            <span className="client-feature-logo-placeholder">
              {project.title?.charAt(0)}
            </span>
          )}
        </div>

        {showSwipeHint && (
          <span className="client-feature-swipe-hint">Drag to explore</span>
        )}
      </div>

      <div className="client-feature-copy">
        {project.type && <p className="client-feature-type">{project.type}</p>}

        <h3>{project.title}</h3>

        {(project.homepageSummary || project.description) && (
          <p className="client-feature-description">
            {project.homepageSummary || project.description}
          </p>
        )}

        {project.tags?.length > 0 && (
          <div className="client-feature-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="client-feature-footer">
        <div className="client-feature-links">
          {project.slug && (
            <a
              href={`/projects#${project.slug}`}
              onPointerDown={(event) => event.stopPropagation()}
            >
              View case study →
            </a>
          )}

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              onPointerDown={(event) => event.stopPropagation()}
            >
              Visit website ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ClientWorkCard;
