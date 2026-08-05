import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import Accordion from "../../components/Accordion/Accordion";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import "./Projects.css";

function Projects() {
  const [sanityProjects, setSanityProjects] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[
          _type == "project" &&
          coalesce(workCategory, "project") == "project"
        ] | order(displayOrder asc) {
          _id,
          title,
          "slug": slug.current,
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
        setSanityProjects(data || []);
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

  const filteredProjects = selectedSkills.length
    ? sanityProjects.filter((project) =>
        selectedSkills.every((skill) =>
          project.tags?.includes(skill),
        ),
      )
    : sanityProjects;

  function toggleSkill(skill) {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter(
            (currentSkill) => currentSkill !== skill,
          )
        : [...currentSkills, skill],
    );
  }

  return (
    <section
      className="projects"
      id="projects"
      style={{
        backgroundColor:
          siteSettings?.projectsBackgroundColor?.hex || "#050505",
      }}
    >
      <div className="projects-header">
        <p className="section-kicker">Projects & Experiments</p>

        <h2>
          Independent projects exploring learning, interaction and immersive
          presentation.
        </h2>

        <Accordion
          title={siteSettings?.projectsAccordionTitle}
          content={siteSettings?.projectsAccordionContent}
        />
      </div>

      {selectedSkills.length > 0 && (
        <div className="projects-filter-status" aria-live="polite">
          {selectedSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className="projects-clear-filter"
              aria-label={`Remove ${skill} filter`}
            >
              {skill}
              <span className="close-icon">×</span>
            </button>
          ))}
        </div>
      )}

      <ProjectCarousel
        projects={filteredProjects}
        selectedSkills={selectedSkills}
        onToggleSkill={toggleSkill}
      />

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