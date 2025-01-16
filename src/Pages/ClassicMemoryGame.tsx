// src/Pages/MemoryGamePage.tsx
import React, { Suspense } from "react";
import { PageWrapper } from "../Components/styled/Wrappers";

const MemoryGame = React.lazy(() => import("../Components/Game/MemoryGame/MemoryGame"));

const MemoryGamePage = () => {
  return (
    <>
    <PageWrapper>
     <Suspense fallback={<div>Laddar spelet...</div>}>
      <MemoryGame />
      </Suspense>
    </PageWrapper>
    </>
  );
};

export default MemoryGamePage;
