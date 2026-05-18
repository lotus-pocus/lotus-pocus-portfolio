import { projects } from "../../data/projects"
import "./Projects.css"

function Projects() {
  return (
    <section className="projects" id="projects">

      <div className="projects-header">
        <p className="section-kicker">Selected Work</p>

        <h2>
          Projects with a focus on learning,
          interaction and immersive presentation.
        </h2>
      </div>

      <div className="project-grid">

        {projects.map((project) => (

          <div className="project-card" key={project.title}>

            <div>

              <p className="project-type">
                {project.type}
              </p>

              <h3>
                {project.title}
              </h3>

              <p>
                {project.description}
              </p>

            </div>

            <div>

              <div className="project-tags">

                {project.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}

              </div>

              <div className="project-links">

                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Site
                </a>

                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Projects