import Hero from "./sections/Hero/Hero"
import Projects from "./sections/Projects/Projects"
import Experiments from "./sections/Experiments/Experiments"
import About from "./sections/About/About"
import Contact from "./sections/Contact/Contact"
import SearchBox from './components/SearchBox/SearchBox'
import AnnouncementBanner from "./components/AnnouncementBanner/AnnouncementBanner";

function App() {
  return (
    <>
      <AnnouncementBanner />
       <SearchBox />
      <Hero />
      <Projects />
      <Experiments />
      <About />
      <Contact />
    </>
  )
}

export default App