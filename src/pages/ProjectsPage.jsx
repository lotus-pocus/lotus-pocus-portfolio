import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import { CaseStudySection } from "../components/CaseStudy";
import "./ProjectsPage.css";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "project" && !(_id in path("versions.**"))]
        | order(coalesce(displayOrder, 9999) asc, title asc) {
          _id,
          title,
          "slug": slug.current,
          type,
          description,
          homepageSummary,
          caseStudyIntro,
          tags,
          projectUrl,
          repo,
          displayOrder,

          clientLogo {
            asset-> {
              url
            }
          },

          mainImage {
            asset-> {
              url
            }
          },

          caseStudySections[] {
            _key,
            heading,
            body,
            imageLayout,

            images[] {
              _key,
              alt,
              caption,

              asset-> {
                url
              }
            }
          },

          challenge,
          challengeImages[] {
            _key,

            asset-> {
              url
            }
          },

          solution,
          solutionImages[] {
            _key,

            asset-> {
              url
            }
          },

          outcome,
          outcomeImages[] {
            _key,

            asset-> {
              url
            }
          }
        }
      `,
      )
      .then((data) => {
        setProjects(data || []);
      })
      .catch((error) => {
        console.error("Projects page fetch failed:", error);
      });

    client
      .fetch(
        `
        *[_type == "siteSettings"][0] {
          projectsPageBackgroundColor {
            hex
          }
        }
      `,
      )
      .then((data) => {
        setSiteSettings(data || null);
      })
      .catch((error) => {
        console.error("Site settings fetch failed:", error);
      });
  }, []);

  useEffect(() => {
    if (projects.length === 0 || !window.location.hash) {
      return;
    }

    const slug = decodeURIComponent(window.location.hash.slice(1));

    const scrollToProject = () => {
      const projectSection = document.getElementById(slug);

      if (!projectSection) {
        return;
      }

      const headerOffset = 40;

      const projectPosition =
        projectSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(projectPosition - headerOffset, 0),
        behavior: "smooth",
      });
    };

    const scrollTimeout = window.setTimeout(scrollToProject, 350);

    return () => {
      window.clearTimeout(scrollTimeout);
    };
  }, [projects]);

  return (
    <main
      className="projects-page"
      style={{
        backgroundColor:
          siteSettings?.projectsPageBackgroundColor?.hex || "#050505",
      }}
    >
      <h1>Projects</h1>

      {projects.map((project) => {
        const hasFlexibleSections =
          Array.isArray(project.caseStudySections) &&
          project.caseStudySections.length > 0;

        return (
          <article
            className="project-case"
            id={project.slug}
            key={project._id}
          >
            <div className="project-case-content">
              <header className="project-case-header">
                {project.clientLogo?.asset?.url && (
                  <div className="project-brand-logo-frame">
                    <img
                      className="project-brand-logo"
                      src={project.clientLogo.asset.url}
                      alt={`${project.title} logo`}
                    />
                  </div>
                )}

                {project.type && (
                  <p className="project-case-type">{project.type}</p>
                )}

                <h2>{project.title}</h2>

                {project.homepageSummary && (
                  <p className="project-case-summary">
                    {project.homepageSummary}
                  </p>
                )}

                {(project.caseStudyIntro || project.description) && (
                  <p className="project-intro">
                    {project.caseStudyIntro || project.description}
                  </p>
                )}

                {project.projectUrl && (
                  <a
                    className="project-live-link"
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit website ↗
                  </a>
                )}

                {project.tags?.length > 0 && (
                  <div className="project-case-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </header>

              {project.mainImage?.asset?.url && (
                <div className="project-overview-image">
                  <img
                    src={project.mainImage.asset.url}
                    alt={`${project.title} website overview`}
                    loading="lazy"
                  />
                </div>
              )}

              {hasFlexibleSections ? (
                project.caseStudySections.map((section) => (
                  <CaseStudySection
                    key={section._key}
                    title={section.heading}
                    text={section.body}
                    images={section.images}
                    layout={section.imageLayout || "two-column"}
                  />
                ))
              ) : (
                <>
                  <CaseStudySection
                    title="Project Overview"
                    text={project.challenge}
                    images={project.challengeImages}
                    layout="two-column"
                  />

                  <CaseStudySection
                    title="My Contribution"
                    text={project.solution}
                    images={project.solutionImages}
                    layout="two-column"
                  />

                  <CaseStudySection
                    title="Reflection"
                    text={project.outcome}
                    images={project.outcomeImages}
                    layout="gallery"
                  />
                </>
              )}
            </div>
          </article>
        );
      })}
    </main>
  );
}

export default ProjectsPage;