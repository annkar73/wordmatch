import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card";
import CardComponent from "../../Card/Card";
import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import { Button } from "../../styled/Button";
import { breakpoints, fontSizes, spacing, borderRadius } from "../../../styles/variables";

const DifficultySelector = styled.div`
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

const CardGrid = styled.div<{ columns: number, rows: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
  gap: 10px;
  width: 100%;
  max-width: 600px;
  height: 80vh;
  background-color: transparent;
  margin: 0 auto;

  @media (max-width: 600px) {
    max-width: 100%;
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

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<number>(16);
  const [columns, setColumns] = useState<number>(4);
  const [rows, setRows] = useState<number>(4);

  useEffect(() => {
    const getCards = async () => {
      try {
        const fetchedCards = await fetchCards<MemoryCard>({});
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    getCards();
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      const pairedCards = cards
        .flatMap((card) => [
          card,
          { ...card, id: card.id + 1000 },
        ])
        .sort(() => Math.random() - 0.5);
      setShuffledCards(pairedCards.slice(0, difficulty));
    }
  }, [cards, difficulty]);

  useEffect(() => {
    setColumns(difficulty === 16 ? 4 : difficulty === 36 ? 6 : 4);
  }, [difficulty]);

  const handleCardClick = (card: MemoryCard) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(card.id) ||
      matchedCards.includes(card.id) // Kontrollera om kortet redan är matchat
    ) {
      return;
    }
  
    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, card.id];
  
      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards;
  
        if (firstCardId === secondCardId) {
          setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
        }
  
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
  
      return newFlippedCards;
    });
  };
  

  const restartGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    const shuffled = [...cards].flatMap((card) => [
      card,
      { ...card, id: card.id + 1000 },
    ]).sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled.slice(0, difficulty));
  };

  const resetGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setDifficulty(16);
    setColumns(4);
    setRows(4);
    const shuffled = [...cards].flatMap((card) => [
      card,
      { ...card, id: card.id + 1000 },
    ]).sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled.slice(0, 16));
  };

  return (
    <PageWrapper>
      <GameWrapper>
        <GameContainer>
          <RightColumn>
            <DifficultySelector>
              <h3>Välj svårighetsgrad:</h3>
              <select
                onChange={(e) => setDifficulty(Number(e.target.value))}
                value={difficulty}
              >
                <option value={16}>Liten (16 kort)</option>
                <option value={36}>Stor (36 kort)</option>
              </select>
            </DifficultySelector>

            <ControlWrapper>
              <Button onClick={restartGame}>Starta om</Button>
              <Button onClick={resetGame}>Rensa</Button>
            </ControlWrapper>
          </RightColumn>

          <LeftColumn>
            <CardGrid columns={columns} rows={rows}>
              {shuffledCards.length > 0 ? (
                shuffledCards.map((card) => (
                  <CardComponent
                    key={card.id}
                    id={card.id}
                    image={card.image}
                    $isFlipped={flippedCards.includes(card.id)}
                    $isMatched={matchedCards.includes(card.id)}
                    onClick={() => handleCardClick(card)}
                  />
                ))
              ) : (
                <p>Laddar kort...</p>
              )}
            </CardGrid>
          </LeftColumn>
        </GameContainer>
      </GameWrapper>
    </PageWrapper>
  );
};

export default MemoryGame;
