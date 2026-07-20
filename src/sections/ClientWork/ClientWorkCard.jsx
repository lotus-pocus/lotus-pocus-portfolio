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
      }}
    >
      {project.mainImage?.asset?.url && (
        <div className="client-feature-image">
          <img
            src={project.mainImage.asset.url}
            alt={`${project.title} project preview`}
            draggable="false"
          />

          {showSwipeHint && (
            <span className="client-feature-swipe-hint">
              Swipe or drag
            </span>
          )}
        </div>
      )}

      <div className="client-feature-copy">
        {project.type && (
          <p className="client-feature-type">{project.type}</p>
        )}

        <h3>{project.title}</h3>

        {project.description && (
          <p className="client-feature-description">
            {project.description}
          </p>
        )}

        {project.tags?.length > 0 && (
          <div className="client-feature-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        <div className="client-feature-links">
          {project.slug && (
            <a href={`/projects#${project.slug}`}>
              View case study →
            </a>
          )}

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
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