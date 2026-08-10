import { useEffect, useRef, useState } from "react";
import "./ProjectCarousel.css";

function ProjectCarousel({
  projects,
  selectedSkills,
  onToggleSkill,
}) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [selectedSkills]);

  const getContrastColor = (hex) => {
    if (!hex) return "#f5f5f5";

    const color = hex.replace("#", "");
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 160 ? "#111111" : "#f5f5f5";
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "next" ? 420 : -420,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (event) => {
    if (!carouselRef.current) return;

    if (event.target.closest("a, button")) {
      return;
    }

    setIsDragging(true);
    setStartX(event.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !carouselRef.current) return;

    event.preventDefault();

    const x = event.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;

    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleSkillClick = (event, tag) => {
    event.stopPropagation();
    onToggleSkill(tag);
  };

  if (!projects?.length) return null;

  return (
    <div className="project-carousel">
      <div className="carousel-controls">
        <button
          type="button"
          onClick={() => scrollCarousel("prev")}
          aria-label="Previous project"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => scrollCarousel("next")}
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <div
        className={`carousel-track ${
          isDragging ? "is-dragging" : ""
        }`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {projects.map((project) => {
          const backgroundColor =
            project.cardBackgroundColor?.hex || "#080808";

          const textColor =
            project.cardTextColor?.hex ||
            getContrastColor(backgroundColor);

          return (
            <article
              className="carousel-card"
              key={project._id}
              style={{
                backgroundColor,
                color: textColor,
              }}
            >
              <p className="project-type">{project.type}</p>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              {project.tags?.length > 0 && (
                <div
                  className="project-tags"
                  aria-label={`Skills used in ${project.title}`}
                >
                  {project.tags.map((tag) => {
                    const isActive =
                      selectedSkills.includes(tag);

                    return (
                      <button
                        key={tag}
                        type="button"
                        className={isActive ? "active" : ""}
                        onClick={(event) =>
                          handleSkillClick(event, tag)
                        }
                        onMouseDown={(event) =>
                          event.stopPropagation()
                        }
                        aria-pressed={isActive}
                        aria-label={
                          isActive
                            ? `Remove ${tag} filter`
                            : `Add ${tag} filter`
                        }
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="project-links">
                {project.slug && (
                  <a
                    href={`/projects#${project.slug}`}
                    onMouseDown={(event) =>
                      event.stopPropagation()
                    }
                    aria-label={`View case study for ${project.title}`}
                  >
                    Case study →
                  </a>
                )}

                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseDown={(event) =>
                      event.stopPropagation()
                    }
                  >
                    ↗ Live Site
                  </a>
                )}

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    onMouseDown={(event) =>
                      event.stopPropagation()
                    }
                  >
                    ↗ GitHub
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectCarousel;