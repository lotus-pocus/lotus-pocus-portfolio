import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import Accordion from "../../components/Accordion/Accordion";
import "./Projects.css";

function Projects() {
  const [sanityProjects, setSanityProjects] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "project"]{
          title,
          type,
          description,
          tags,
          projectUrl,
          repo,
          featured
        }`,
      )
      .then((data) => setSanityProjects(data))
      .catch(console.error);

    client
      .fetch(
        `*[_type == "siteSettings"][0]{
          projectsAccordionTitle,
          projectsAccordionContent,
          ContactCTA,
          ContactCTAButtonLabel,
          contactEmail,
          GoogleMapsURL
        }`,
      )
      .then((data) => setSiteSettings(data))
      .catch(console.error);
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-header">
        <p className="section-kicker">Selected Work</p>

        <h2>
          Projects with a focus on learning, interaction and immersive
          presentation.
        </h2>

        <Accordion
          title={siteSettings?.projectsAccordionTitle}
          content={siteSettings?.projectsAccordionContent}
        />

      </div>

      <div className="project-grid">
        {sanityProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>

            <div>
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
            </div>
          </article>
        ))}
      </div>
        {siteSettings?.ContactCTA && siteSettings?.ContactCTAButtonLabel && (
          <div className="projects-cta">
            <p>{siteSettings.ContactCTA}</p>

            <a
              href={`mailto:${siteSettings.contactEmail}`}
              className="projects-cta-button"
            >
              {siteSettings.ContactCTAButtonLabel}
            </a>
          </div>
        )}
    </section>
  );
}

export default Projects;