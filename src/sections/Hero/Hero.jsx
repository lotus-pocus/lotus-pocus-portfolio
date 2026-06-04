import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-tag">Frontend Developer • Creative Technology</p>

          <h1>Lotus Pocus - Sanity Test</h1>

          <p className="hero-description">
            Exploring immersive interfaces, educational tools, realtime visuals
            and lightweight WebGL experiences using React and modern frontend
            technologies.
          </p>

          <div className="hero-links">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#projects">Projects</a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="/images/lotus-bw.png"
            alt="Lotus Tay portrait"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
