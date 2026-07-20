import Accordion from "../../components/Accordion/Accordion";
import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-header">
        <p className="about-kicker">About</p>

        <h2>
          Curious by nature.
          <br />
          Frontend developer by choice.
        </h2>

        <p className="about-introduction">
          I combine React, UX, SEO and creative technology to turn ideas into
          intuitive websites, interactive experiences and applications that are
          enjoyable to use.
        </p>

        <Accordion
          title="How I got here"
          content={
            <>
              <p>
                I discovered frontend web development in 2023 when I enrolled on
                a 16-week Skills for Life bootcamp. At the time I worked
                alongside talented designers and developers, but coding still
                felt like one of those mysterious skills that everyone else
                seemed to understand. I'd tried following YouTube tutorials
                before, but without knowing the fundamentals I found it
                difficult to make real progress.
              </p>

              <p>
                The bootcamp changed that. Weekly assignments, collaborative
                projects and long evenings spent debugging pushed me well
                outside my comfort zone. There were plenty of moments where I
                wondered whether I'd make it to the end, but every challenge
                solved built a little more confidence.
              </p>

              <p>
                Completing the course completely changed the way I think about
                building for the web and gave me an enormous appreciation for
                the craft of software development.
              </p>

              <p>
                Over the past three years I've continued learning whenever I
                can, applying those skills professionally and through personal
                projects. I've built educational applications, interactive
                websites, browser games, proof-of-concept experiences and
                SEO-focused client websites, always looking for opportunities to
                combine thoughtful design with engaging user experiences.
              </p>

              <p>
                The thing I love most about frontend development is that the
                learning never really stops. Every project introduces a new
                technology, a different challenge or a better way of solving a
                problem. The ability to start with an idea and gradually bring
                it to life is incredibly rewarding, and it's one of the reasons
                I continue to enjoy learning every day.
              </p>

              <p>
                <strong>Currently enjoying:</strong>
              </p>

              <ul>
                <li>React & modern frontend development</li>
                <li>Sanity CMS</li>
                <li>UX & accessibility</li>
                <li>SEO & performance optimisation</li>
                <li>Creative technology & interactive experiences</li>
                <li>Continuous learning</li>
              </ul>

              <p>
                <em>
                  The more I learn, the more I realise there is still to
                  discover. 
                  <br />
                  And that's exactly what keeps frontend development so
                  exciting.
                </em>
              </p>
            </>
          }
        />
      </div>
    </section>
  );
}

export default About;
