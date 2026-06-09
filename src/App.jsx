import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Projects";
import SearchBox from "./components/SearchBox/SearchBox";
import Nav from "./components/Nav/Nav";
import AnnouncementBanner from "./components/AnnouncementBanner/AnnouncementBanner";
import ProjectsPage from "./pages/ProjectsPage";

function Home() {
  return (
    <>
      <Hero />
      <Projects />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;