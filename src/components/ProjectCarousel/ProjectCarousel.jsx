import { useRef, useState } from "react";
import "./ProjectCarousel.css";

function ProjectCarousel({ projects }) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "next" ? 420 : -420,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;

    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  if (!projects?.length) return null;

  return (
    <div className="project-carousel">
      <div className="carousel-controls">
        <button
          onClick={() => scrollCarousel("prev")}
          aria-label="Previous project"
        >
          ←
        </button>

        <button
          onClick={() => scrollCarousel("next")}
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <div
        className={`carousel-track ${isDragging ? "is-dragging" : ""}`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {projects.map((project) => (
          <article
            className="carousel-card"
            key={project.title}
            style={{
              backgroundColor: project.cardBackgroundColor?.hex || "#080808",
            }}
          >
            <p className="project-type">{project.type}</p>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="project-tags">
              {project.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-links">
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noreferrer">
                  ↗ Live Site
                </a>
              )}

              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer">
                  ↗ GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProjectCarousel;
