import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import "./Hero.css";

function Hero() {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "siteSettings"][0]{
  siteTitle,
  contactEmail,
  githubUrl,
  linkedinUrl,
  instagramUrl,
  heroHeading,
  heroDescription,
  heroImage{
    asset->{
      url
    }
  }
}`,
      )
      .then((data) => setSiteSettings(data))
      .catch(console.error);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-tag">
            {siteSettings?.siteTitle ||
              "Frontend Developer • Creative Technology"}
          </p>

          <h1>{siteSettings?.heroHeading}</h1>

          <p className="hero-description">{siteSettings?.heroDescription}</p>

          <div className="hero-links">
            {siteSettings?.githubUrl && (
              <a href={siteSettings.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}

            {siteSettings?.linkedinUrl && (
              <a
                href={siteSettings.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}

            <a href="#projects">Projects</a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={siteSettings?.heroImage?.asset?.url}
            alt="Lotus Tay portrait"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
