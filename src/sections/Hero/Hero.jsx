import "./Hero.css"
import portrait from "../../assets/images/lotus_blk&wht.png"

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-text">
          <p className="hero-tag">
            Frontend Developer • Creative Technology
          </p>

          <h1>
            Building atmospheric frontend experiences
            with a growing focus on interactive web.
          </h1>

          <p className="hero-description">
            Exploring immersive interfaces, educational tools,
            realtime visuals and lightweight WebGL experiences
            using React and modern frontend technologies.
          </p>

          <div className="hero-links">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#projects">Projects</a>
          </div>

        </div>

        <div className="hero-image-wrapper">
          <img
            src={portrait}
            alt="Lotus Tay portrait"
            className="hero-image"
          />
        </div>

      </div>

    </section>
  )
}

export default Hero