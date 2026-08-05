import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import "./Hero.css";

function Hero() {
  const [siteSettings, setSiteSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          },
          heroBackgroundColor {
            hex
          }
        }`,
      )
      .then((data) => {
        setSiteSettings(data);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <section className="hero hero-loading" />;
  }

  return (
    <section
      className="hero"
      style={{
        backgroundColor: siteSettings?.heroBackgroundColor?.hex || "#050505",
      }}
    >
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-tag">
            {siteSettings?.siteTitle || "LOTUS POCUS"}
          </p>

          <h1>{siteSettings?.heroHeading}</h1>

          <p className="hero-description">
            {siteSettings?.heroDescription}
          </p>

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

        {siteSettings?.heroImage?.asset?.url && (
          <div className="hero-image-wrapper">
            <img
              src={siteSettings.heroImage.asset.url}
              alt="Lotus Tay portrait"
              className="hero-image"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;