// src/Components/Game/MemoryGame/MemoryGame.tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card"; // Importera MemoryCard-typen

// Styled Components
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const DifficultySelector = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-template-rows: ${({ columns }) => `repeat(${columns}, 1fr)`};
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px; /* Maximal bredd för grid, så det inte blir för brett på stora skärmar */

  /* Media query för att anpassa layouten för olika skärmstorlekar */
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);  // För skärmar som är mindre än 768px, använd 3 kolumner
    grid-template-rows: repeat(3, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);  // För mellanstora skärmar, använd 4 kolumner
    grid-template-rows: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`}; // För större skärmar, använd dynamisk gridkolumn
    grid-template-rows: ${({ columns }) => `repeat(${columns}, 1fr)`};
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  padding-top: 100%;  // Proportionell padding för att skapa kvadratiskt format
  position: relative;  // Viktigt för att hålla kortet i rätt form

  /* För att säkerställa att korten är kvadratiska */
  aspect-ratio: 1 / 1; 
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CardImage = styled.div<{ isFlipped: boolean; image: string }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-image: ${({ isFlipped, image }) =>
    isFlipped ? `url(${image})` : "url(/assets/cardbg.png)"};
  background-size: cover;
  background-position: center;
  background-color: ${({ isFlipped }) => (isFlipped ? "transparent" : "#f0f0f0")}; // Lägg till bakgrundsfärg när kortet inte är vänt
  transition: transform 0.3s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

// MemoryGame-komponent
const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [matchedCards, setMatchedCards] = useState<MemoryCard[]>([]);
  const [difficulty, setDifficulty] = useState<number>(9); // Svårighetsgrad, börjar med 9 kort
  const [columns, setColumns] = useState<number>(3); // Default till 3 kolumner för 9 kort

  useEffect(() => {
    const getCards = async () => {
      try {
        // Hämta MemoryCard-data från Supabase
        const fetchedCards = await fetchCards<MemoryCard>({}); // Skickar inga filter
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    getCards();
  }, []);

  useEffect(() => {
    // Shuffle korten när de är hämtade
    if (cards.length > 0) {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }
  }, [cards]);

  // Uppdatera kolumnantal baserat på svårighetsgrad
  useEffect(() => {
    let numColumns = 0;
    if (difficulty === 9) {
      numColumns = 3; // 3x3
    } else if (difficulty === 16) {
      numColumns = 4; // 4x4
    } else if (difficulty === 36) {
      numColumns = 6; // 6x6
    }

    setColumns(numColumns);
  }, [difficulty]);

  const handleCardClick = (card: MemoryCard) => {
    if (flippedCards.length === 2 || flippedCards.includes(card)) return;

    setFlippedCards((prev) => [...prev, card]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;

      if (firstCard.id === card.id) {
        setMatchedCards((prev) => [...prev, firstCard, card]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <GameContainer>
      <h2>Memory Game</h2>

      {/* Difficulty selector */}
      <DifficultySelector>
        <h3>Välj svårighetsgrad:</h3>
        <select onChange={(e) => setDifficulty(Number(e.target.value))} value={difficulty}>
          <option value={9}>Enkel (9 kort)</option>
          <option value={16}>Medel (16 kort)</option>
          <option value={36}>Svår (36 kort)</option>
        </select>
      </DifficultySelector>

      {/* Card Grid */}
      <CardGrid columns={columns}>
        {shuffledCards.slice(0, difficulty).map((card) => (
          <CardWrapper key={card.id} onClick={() => handleCardClick(card)}>
            <CardImage
              isFlipped={flippedCards.includes(card) || matchedCards.includes(card)}
              image={card.image}
            />
          </CardWrapper>
        ))}
      </CardGrid>
    </GameContainer>
  );
};

export default MemoryGame;
