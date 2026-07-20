import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./sections/Hero/Hero";
import ClientWork from "./sections/ClientWork/ClientWork";
import Projects from "./sections/Projects/Projects";
import SearchBox from "./components/SearchBox/SearchBox";
import Nav from "./components/Nav/Nav";
import AnnouncementBanner from "./components/AnnouncementBanner/AnnouncementBanner";
import ProjectsPage from "./pages/ProjectsPage";
import LearningsPage from "./pages/LearningsPage";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";


function Home() {
  return (
    <>
      <Hero />
      <ClientWork />
      <Projects />
      <About />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBanner />
      <Nav />
      <SearchBox />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/learnings" element={<LearningsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;