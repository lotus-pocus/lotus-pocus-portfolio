import Hero from "./sections/Hero/Hero"
import Projects from "./sections/Projects/Projects"
import Experiments from "./sections/Experiments/Experiments"
import About from "./sections/About/About"
import Contact from "./sections/Contact/Contact"
import AnnouncementBanner from "./components/AnnouncementBanner/AnnouncementBanner";

function App() {
  return (
    <>
      <AnnouncementBanner />
      <Hero />
      <Projects />
      <Experiments />
      <About />
      <Contact />
    </>
  )
}

export default App