import { useState, useEffect } from "react";
import styled from "styled-components";

interface Card {
  id: number;
  text: string;
  image: string;
  matched: boolean;
}

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

const Card = styled.div<{ flipped: boolean }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.flipped ? "white" : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BackSide = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;


const MatchingGamePage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    // Här laddar vi in kort från databasen
    const fetchCards = async () => {
      const response = await fetch("https://your-supabase-url/cards");
      const data = await response.json();
      setCards(
        data.map((card: Card) => ({
          ...card,
          matched: false,
        }))
      );
    };
    fetchCards();
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2) return;

    setFlipped((prev) => [...prev, id]);

    if (flipped.length === 1) {
      const firstCard = cards.find((card) => card.id === flipped[0]);
      const secondCard = cards.find((card) => card.id === id);

      if (firstCard && secondCard && firstCard.text === secondCard.text) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true }
              : card
          )
        );
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <GameGrid>
      {cards.map((card) => (
        <Card
          key={card.id}
          onClick={() => handleFlip(card.id)}
          flipped={flipped.includes(card.id) || card.matched}
        >
          {flipped.includes(card.id) || card.matched ? (
            <img src={card.image} alt={card.text} />
          ) : (
            <BackSide />
          )}
        </Card>
      ))}
    </GameGrid>
  );
};


export default MatchingGamePage;
