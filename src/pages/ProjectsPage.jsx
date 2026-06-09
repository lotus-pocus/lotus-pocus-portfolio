import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import "./ProjectsPage.css";

function ProjectImages({ images, title, section }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="project-image-grid">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.asset.url}
          alt={`${title} ${section} image ${index + 1}`}
        />
      ))}
    </div>
  );
}

function CaseStudySection({
  heading,
  text,
  images,
  title,
  section,
  reverse,
  layout,
}) {
  const hasImages = images && images.length > 0;

  return (
    <section
      className={`project-case-section ${
        layout === "gallery"
          ? "gallery-layout"
          : hasImages
          ? "split"
          : "full-width"
      } ${reverse ? "reverse" : ""}`}
    >
      <div className="project-copy">
        <h3>{heading}</h3>
        <p>{text}</p>
      </div>

      {hasImages && (
        <ProjectImages images={images} title={title} section={section} />
      )}
    </section>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "project" && !(_id in path("versions.**"))]
        | order(coalesce(displayOrder, 9999) asc, title asc){
          _id,
          title,
          slug,
          type,
          description,
          caseStudyIntro,
          challenge,
          solution,
          outcome,
          tags,
          projectUrl,
          repo,
          displayOrder,
          mainImage{
            asset->{ url }
          },
          challengeImages[]{
            asset->{ url }
          },
          solutionImages[]{
            asset->{ url }
          },
          outcomeImages[]{
            asset->{ url }
          }
        }
      `)
      .then((data) => setProjects(data))
      .catch(console.error);

    client
      .fetch(`
        *[_type == "siteSettings"][0]{
          projectsPageBackgroundColor{
            hex
          }
        }
      `)
      .then((data) => setSiteSettings(data))
      .catch(console.error);
  }, []);

  return (
    <main
      className="projects-page"
      style={{
        backgroundColor:
          siteSettings?.projectsPageBackgroundColor?.hex || "#050505",
      }}
    >
      <h1>Projects</h1>

      {projects.map((project) => (
        <article className="project-case" key={project._id}>
          {project.mainImage?.asset?.url && (
            <img
              className="project-main-image"
              src={project.mainImage.asset.url}
              alt={project.title}
            />
          )}

          <p className="project-case-type">{project.type}</p>
          <h2>{project.title}</h2>

          <p className="project-intro">
            {project.caseStudyIntro || project.description}
          </p>

          <CaseStudySection
            heading="Challenge"
            text={project.challenge}
            images={project.challengeImages}
            title={project.title}
            section="challenge"
          />

          <CaseStudySection
            heading="What I Built"
            text={project.solution}
            images={project.solutionImages}
            title={project.title}
            section="solution"
            reverse
          />

          <CaseStudySection
            heading="Outcome"
            text={project.outcome}
            images={project.outcomeImages}
            title={project.title}
            section="outcome"
            layout="gallery"
          />
        </article>
      ))}
    </main>
  );
}

export default ProjectsPage;