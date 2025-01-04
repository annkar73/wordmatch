import { Routes, Route } from "react-router-dom";
import ClassicMemoryPage from "./Pages/ClassicMemoryGame";
import {Faq} from "./Pages/Faq";
import Home from "./Pages/Home";
import MatchingGamePage from "./Pages/MatchingGamePage";
import Contact from "./Pages/Contact";


const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching-game" element={<MatchingGamePage />} />
        <Route path="/classic-memory" element={<ClassicMemoryPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
};

export default Router;
