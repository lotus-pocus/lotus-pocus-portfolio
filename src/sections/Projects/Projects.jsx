import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import Accordion from "../../components/Accordion/Accordion";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
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
          featured,
          cardBackgroundColor {
            hex
          },
          cardTextColor {
            hex
          }
        }`,
      )
      .then((data) => {
        console.log("Sanity projects:", data);
        setSanityProjects(data);
      })
      .catch(console.error);

    client
      .fetch(
        `*[_type == "siteSettings"][0]{
      projectsAccordionTitle,
      projectsAccordionContent,
      ContactCTA,
      ContactCTAButtonLabel,
      contactEmail,
      GoogleMapsURL,

      heroBackgroundColor {
        hex
      },
      projectsBackgroundColor {
        hex
      },
      experimentsBackgroundColor {
        hex
      },
      aboutBackgroundColor {
        hex
      },
      contactBackgroundColor {
        hex
      }
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

      <ProjectCarousel projects={sanityProjects} />
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
