import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card";
import CardComponent from "../../Card/Card";
import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import { Button } from "../../styled/Button";
import { breakpoints, fontSizes, spacing, borderRadius } from "../../../styles/variables";

// Styled-components för layouten
const GameSizeSelector = styled.div`
  margin-bottom: ${spacing.medium};
  padding: ${spacing.small};
  border-radius: ${borderRadius.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  select {
    margin-top: ${spacing.small};
    padding: ${spacing.xSmall};
    border-radius: ${borderRadius.small};
    border: 1px solid ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.background};
    font-size: ${fontSizes.base};
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    width: auto;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.large};
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  order: 2;

  @media (min-width: ${breakpoints.tablet}) {
    width: 60%;
    order: 0;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
  align-items: center;
  width: 100%;
  max-width: 200px;
  order: 1;

  @media (min-width: ${breakpoints.tablet}) {
    width: 40%;
    max-width: 300px;
    order: 1;
  }
`;

const CardGrid = styled.div<{ $columns: number; $rows: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  grid-template-rows: ${({ $rows }) => `repeat(${$rows}, 1fr)`};
  gap: 5px;
  width: 90vw;
  //max-width: 600px;
  height: auto;
  background-color: ${(props) => props.theme.gameBackground};
  //margin: 45px auto;
  padding: 10px;
  border-radius: ${borderRadius.medium};
  margin: 0;

  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 45px;
    max-width: 100%;
    gap: 10px;
  }
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.large};
  width: 100%;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
`;

// MemoryGame-komponent
const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameSize, setGameSize] = useState<number>(16);
  
  useEffect(() => {
    const getCards = async () => {
      try {
        const fetchedCards = await fetchCards<MemoryCard>({});
        setCards(fetchedCards);
        setShuffledCards(generateShuffledCards(fetchedCards, gameSize));
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    getCards();
  }, [gameSize]);  // Uppdatera bara när gameSize ändras
  
  // Uppdatera generateShuffledCards-funktionen för att hantera större spelplaner
  const generateShuffledCards = (cards: MemoryCard[], size: number): MemoryCard[] => {
    const numberOfCards = size === 16 ? 8 : size === 36 ? 18 : 24; // Dynamiskt beroende på storlek (16, 36 eller annat)
    const selectedCards = cards.slice(0, numberOfCards); // Välj rätt antal kort
  
    const pairedCards = selectedCards
      .flatMap((card) => [
        { ...card, uniqueId: card.id * 2, originalId: card.id },
        { ...card, uniqueId: card.id * 2 + 1, originalId: card.id },
      ]);
  
    // Fisher-Yates algoritm för att blanda korten
    for (let i = pairedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]]; // Byt plats på korten
    }
  
    return pairedCards;
  };

  const handleCardClick = (card: MemoryCard) => {
    if (matchedCards.includes(card.uniqueId) || flippedCards.includes(card.uniqueId)) {
      return;
    }

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, card.uniqueId];

      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards;

        const firstCard = shuffledCards.find((card) => card.uniqueId === firstCardId);
        const secondCard = shuffledCards.find((card) => card.uniqueId === secondCardId);

        if (firstCard && secondCard && firstCard.originalId === secondCard.originalId) {
          setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
          setFlippedCards([]);
        } else {
          setTimeout(() => setFlippedCards([]), 1000);
        }
      }

      return newFlippedCards;
    });
  };

  const restartGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setShuffledCards(generateShuffledCards(cards, gameSize));
  };

  const isGameComplete = matchedCards.length === shuffledCards.length;

  return (
    <PageWrapper>
      <GameWrapper>
        <GameContainer>
          <RightColumn>
            <GameSizeSelector>
              <h3>Välj spelbräde:</h3>
              <select
                onChange={(e) => setGameSize(Number(e.target.value))}
                value={gameSize}
              >
                <option value={16}>Liten 4x4 (16 kort)</option>
                <option value={36}>Stor 6x6 (36 kort)</option>
              </select>
            </GameSizeSelector>

            <ControlWrapper>
              <Button onClick={restartGame}>
                {isGameComplete ? "Spela igen" : "Börja om"}
              </Button>
            </ControlWrapper>
          </RightColumn>

          <LeftColumn>
            <CardGrid $columns={gameSize === 16 ? 4 : 6} $rows={gameSize === 16 ? 4 : 6}>
              {shuffledCards.map((card) => (
                <CardComponent
                  key={card.uniqueId}
                  card={card}
                  $isFlipped={flippedCards.includes(card.uniqueId)}
                  $isMatched={matchedCards.includes(card.uniqueId)}
                  onClick={() => handleCardClick(card)}
                  image={card.image || ""}
                />
              ))}
            </CardGrid>
          </LeftColumn>
        </GameContainer>
      </GameWrapper>
    </PageWrapper>
  );
};

export default MemoryGame;
