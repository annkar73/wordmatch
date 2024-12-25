import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassicMemoryPage from "./Pages/ClassicMemoryGame";
import Faq from "./Pages/Faq";
import Home from "./Pages/Home";
import MatchingGamePage from "./Pages/MatchingGamePage";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching-game" element={<MatchingGamePage />} />
        <Route path="/classic-memory" element={<ClassicMemoryPage />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
