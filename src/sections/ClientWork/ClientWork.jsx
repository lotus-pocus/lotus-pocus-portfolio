import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import Accordion from "../../components/Accordion/Accordion";
import "./ClientWork.css";

function ClientWork() {
  const [clientProjects, setClientProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

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
          },
          cardBackgroundColor {
            hex
          },
          cardTextColor {
            hex
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

    window.setTimeout(() => {
      setActiveIndex(index);
      setIsChanging(false);
    }, 300);
  }

  return (
    <section className="client-work" id="client-work">
      <div className="client-work-header">
        <p className="client-work-kicker">Client Work</p>

        <h2>Selected client work.</h2>

        <Accordion
          title="My approach to client work"
          content="Working alongside businesses to improve their digital presence through website development, technical SEO, content strategy and interactive digital experiences."
        />
      </div>

      <div className="client-feature">
        <article
          aria-live="polite"
          className={`client-feature-project ${
            isChanging ? "is-changing" : ""
          }`}
          style={{
            backgroundColor:
              activeProject.cardBackgroundColor?.hex || "#050505",
            color: activeProject.cardTextColor?.hex || "#ffffff",
          }}
        >
          <div className="client-feature-copy">
            <div>
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
            </div>

            <div className="client-feature-links">
              {activeProject.slug && (
                <a href={`/projects#${activeProject.slug}`}>
                  View project →
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

              {activeProject.repo && (
                <a
                  href={activeProject.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository ↗
                </a>
              )}
            </div>
          </div>

          {activeProject.mainImage?.asset?.url && (
            <div className="client-feature-image">
              <img
                src={activeProject.mainImage.asset.url}
                alt={`${activeProject.title} project preview`}
              />
            </div>
          )}
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