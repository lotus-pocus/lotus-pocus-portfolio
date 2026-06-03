import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import "./Projects.css";

function Projects() {
  const [sanityProjects, setSanityProjects] = useState([]);

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
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-header">
        <p className="section-kicker">Selected Work</p>

        <h2>
          Projects with a focus on learning, interaction and immersive
          presentation.
        </h2>
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
                <div className="project-tags">
                  {project.tags?.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-links">...</div>
              </div>

              <div className="project-links">
                {(project.live || project.projectUrl) && (
                  <a
                    href={project.live || project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open live site for ${project.title}`}
                  >
                    ↗ Live Site
                  </a>
                )}

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open GitHub repository for ${project.title}`}
                  >
                    ↗ GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
