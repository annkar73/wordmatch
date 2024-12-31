// src/Components/Game/MemoryGame/MemoryGame.tsx
import { useState, useEffect } from "react";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card"; // Importera MemoryCard-typen

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<MemoryCard[]>([]);

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

  return (
    <div>
      <h2>Memory Game</h2>
      <div className="card-grid">
        {shuffledCards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt="memory card" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
