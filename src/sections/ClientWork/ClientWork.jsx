import { useEffect, useRef, useState } from "react";
import { client } from "../../sanityClient";
import "./ClientWork.css";

function ClientWork() {
  const [clientProjects, setClientProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({
    x: 0,
    y: 0,
    pointerId: null,
  });

  useEffect(() => {
    client
      .fetch(`
        *[
          _type == "project" &&
          workCategory == "client"
        ] | order(coalesce(displayOrder, 9999) asc, title asc) {
          _id,
          title,
          type,
          description,
          tags,
          projectUrl,
          repo,
          "slug": slug.current,
          mainImage {
            asset-> {
              url
            }
          }
        }
      `)
      .then((data) => {
        setClientProjects(data);
      })
      .catch(console.error);
  }, []);

  if (!clientProjects.length) {
    return null;
  }

  const activeProject = clientProjects[activeIndex];

  function selectProject(index) {
    if (
      index === activeIndex ||
      clientProjects.length < 2 ||
      isChanging
    ) {
      return;
    }

    setIsChanging(true);
    setDragOffset(0);
    setIsDragging(false);

    window.setTimeout(() => {
      setActiveIndex(index);
      setIsChanging(false);
    }, 300);
  }

  function showNextProject() {
    const nextIndex = (activeIndex + 1) % clientProjects.length;
    selectProject(nextIndex);
  }

  function showPreviousProject() {
    const previousIndex =
      (activeIndex - 1 + clientProjects.length) %
      clientProjects.length;

    selectProject(previousIndex);
  }

  function handlePointerDown(event) {
    if (clientProjects.length < 2 || isChanging) {
      return;
    }

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };

    setIsDragging(true);
    setDragOffset(0);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (
      !isDragging ||
      dragStart.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const horizontalMovement = event.clientX - dragStart.current.x;
    const verticalMovement = event.clientY - dragStart.current.y;

    /*
      Only treat the gesture as a horizontal drag when the user
      has moved farther sideways than vertically. This helps retain
      normal vertical page scrolling on mobile.
    */
    if (Math.abs(horizontalMovement) > Math.abs(verticalMovement)) {
      setDragOffset(horizontalMovement);
    }
  }

  function finishDrag(event) {
    if (
      !isDragging ||
      dragStart.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const swipeThreshold = 60;

    if (dragOffset <= -swipeThreshold) {
      showNextProject();
    } else if (dragOffset >= swipeThreshold) {
      showPreviousProject();
    } else {
      setDragOffset(0);
      setIsDragging(false);
    }

    dragStart.current.pointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handlePointerCancel(event) {
    setDragOffset(0);
    setIsDragging(false);
    dragStart.current.pointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section className="client-work" id="client-work">
      <div className="client-work-header">
        <p className="client-work-kicker">Client Work</p>
        <h2>Selected client work.</h2>
      </div>

      <div className="client-feature">
        <article
          className={`client-feature-project ${
            isChanging ? "is-changing" : ""
          }`}
          aria-live="polite"
        >
          {activeProject.mainImage?.asset?.url && (
            <div
              className={`client-feature-image ${
                isDragging ? "is-dragging" : ""
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={handlePointerCancel}
              style={{
                transform: `translateX(${dragOffset}px)`,
              }}
            >
              <img
                src={activeProject.mainImage.asset.url}
                alt={`${activeProject.title} project preview`}
                draggable="false"
              />

              {clientProjects.length > 1 && (
                <span className="client-feature-swipe-hint">
                  Swipe or drag
                </span>
              )}
            </div>
          )}

          <div className="client-feature-copy">
            {activeProject.type && (
              <p className="client-feature-type">
                {activeProject.type}
              </p>
            )}

            <h3>{activeProject.title}</h3>

            {activeProject.description && (
              <p className="client-feature-description">
                {activeProject.description}
              </p>
            )}

            {activeProject.tags?.length > 0 && (
              <div className="client-feature-tags">
                {activeProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}

            <div className="client-feature-links">
              {activeProject.slug && (
                <a href={`/projects#${activeProject.slug}`}>
                  View case study →
                </a>
              )}

              {activeProject.projectUrl && (
                <a
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit website ↗
                </a>
              )}
            </div>
          </div>
        </article>

        {clientProjects.length > 1 && (
          <div
            className="client-feature-dots"
            aria-label="Choose a client project"
          >
            {clientProjects.map((project, index) => (
              <button
                key={project._id}
                type="button"
                className={index === activeIndex ? "active" : ""}
                onClick={() => selectProject(index)}
                aria-label={`Show ${project.title}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ClientWork;