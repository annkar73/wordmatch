import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-load sidorna
const Home = React.lazy(() => import('./Pages/Home'));
const ClassicMemoryPage = React.lazy(() => import('./Pages/ClassicMemoryGame'));
const MatchingGamePage = React.lazy(() => import('./Pages/MatchingGamePage'));
const Faq = React.lazy(() => import('./Pages/Faq'));
const Contact = React.lazy(() => import('./Pages/Contact'));
const Game = React.lazy(() => import('./Pages/Game'));

const Router = () => {
  return (
    <Suspense fallback={<div>Laddar...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching-game" element={<MatchingGamePage />} />
        <Route path="/classic-memory" element={<ClassicMemoryPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/games" element={<Game />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
