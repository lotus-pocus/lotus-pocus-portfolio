import { useEffect, useRef } from "react";
import "./FeaturedProject.css";

const gameUrl = "https://grownontrees.gg";
const technologies = ["React", "Sanity CMS", "MapLibre", "JavaScript", "Responsive Design"];
const rounds = ["WHERE", "FLAG", "SLIDER", "WHAT"];

export default function FeaturedProject() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const syncPlayback = () => {
      if (visible && !reducedMotion.matches && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener?.("change", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener?.("change", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <section className="featured-project" id="featured-project" aria-labelledby="featured-project-title">
      <div className="featured-project-inner">
        <div className="featured-project-heading">
          <p className="featured-project-kicker">Featured Independent Project / 2026</p>
          <h2 id="featured-project-title">Grown on Trees<span className="featured-project-dot">.</span></h2>
          <p className="featured-project-subtitle">Not everything grows on trees.</p>
        </div>

        <div className="featured-project-grid">
          <div className="featured-project-copy">
            <p className="featured-project-lead">Four rounds. One curious Fruit. A new challenge every day.</p>
            <p className="featured-project-description">
              Grown on Trees is an independently designed and developed daily puzzle game exploring geography,
              flags, numbers and words through curious celebrations from around the world.
            </p>
            <p className="featured-project-description">
              Built with React and Sanity, the project brings together interactive maps, custom game mechanics,
              responsive interfaces and a content-driven publishing workflow.
            </p>
            <div className="featured-project-tags">
              {technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
            <div className="featured-project-actions">
              <a className="featured-project-primary" href={gameUrl} target="_blank" rel="noopener noreferrer">Play the game ↗</a>
              <a className="featured-project-secondary" href="#projects">More projects ↓</a>
            </div>
          </div>

          <div className="featured-project-visual">
            <div className="featured-project-preview">
              <div className="featured-project-preview-top">
                <span>GROWN ON TREES</span>
                <span>DAILY WEB GAME</span>
              </div>

              <div className="featured-project-showcase">
                <div className="featured-project-phone">
                  <video
                    ref={videoRef}
                    className="featured-project-video"
                    src="/videos/GOT-portfolio-optimised.mp4"
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label="Short gameplay demonstration of Grown on Trees"
                  />
                </div>
                <p className="featured-project-video-caption">FOUR ROUNDS. ONE CURIOUS FRUIT.</p>
              </div>

              <div className="featured-project-rounds" aria-label="Game rounds">
                {rounds.map((round, index) => (
                  <div key={round} className={`featured-project-round round-${index}`}>{round}</div>
                ))}
              </div>
              <div className="featured-project-preview-bottom">
                <span>NOT EVERYTHING GROWS ON TREES.</span>
                <span>32 SEC / GAMEPLAY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="featured-project-footer">
          <span>INDEPENDENTLY DESIGNED &amp; DEVELOPED</span>
          <span>01 / FEATURED PROJECT</span>
        </div>
      </div>
    </section>
  );
}
