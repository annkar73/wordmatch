import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card";

// Importera CardComponent här
import CardComponent from "../../Card/Card"; // Förutsatt att den är i samma nivå som MemoryGame

import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import { Button } from "../../styled/Button";
import { breakpoints, fontSizes, spacing, borderRadius } from "../../../styles/variables";

// Styled Components (samma som tidigare)
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
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`}; /* Lägg till för att definiera höjd */
  gap: 10px; /* Kan justeras för att ge lite avstånd mellan korten */
  width: 100%;
  max-width: 600px; /* Kan justeras beroende på din layout */
  height: 80vh; /* Tar upp 80% av höjden på sidan */
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
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [matchedCards, setMatchedCards] = useState<MemoryCard[]>([]);
  const [difficulty, setDifficulty] = useState<number>(16); // Default to 16 cards (4x4)
  const [columns, setColumns] = useState<number>(4); // Default to 4 columns
  const [rows, setRows] = useState<number>(4);

  // Hämta kort när komponenten laddas
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

  // Uppdatera de blandade korten när korten eller svårighetsgraden ändras
  useEffect(() => {
    if (cards.length > 0) {
      const pairedCards = cards
        .flatMap((card) => [
          card,
          { ...card, id: `${card.id}_duplicate` },
        ]) // Skapa duplikat av varje kort
        .sort(() => Math.random() - 0.5); // Blanda korten
      setShuffledCards(pairedCards.slice(0, difficulty)); // Begränsa korten till valt antal
    }
  }, [cards, difficulty, shuffledCards]);

  // Justera antalet kolumner baserat på svårighetsgraden
  useEffect(() => {
    setColumns(difficulty === 16 ? 4 : difficulty === 36 ? 6 : 4);
  }, [difficulty]);

  // Hantera klick på kort
  const handleCardClick = (card: MemoryCard) => {
    // Förhindra att korten vänds tillbaka om de redan har matchats eller om det finns en pågående vändning
    if (flippedCards.length === 2 || flippedCards.includes(card) || matchedCards.includes(card)) return;


    setFlippedCards((prev) => [...prev, card]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;

      // Kontrollera om de två korten matchar
      if (firstCard.id === card.id || firstCard.id === `${card.id}_duplicate`) {
        setMatchedCards((prev) => [...prev, firstCard, card]);
      }

      // Vänta en sekund innan korten vänds tillbaka (om de inte matchade)
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Starta om spelet
  const restartGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    const shuffled = [...cards].flatMap((card) => [
      card,
      { ...card, id: `${card.id}_duplicate` },
    ]).sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled.slice(0, difficulty));
  };

  // Återställ spelet till standardinställningar
  const resetGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setDifficulty(16); // Reset to 16 cards (4x4)
    setColumns(4); // Reset to 4 columns
    setRows(4);
    const shuffled = [...cards].flatMap((card) => [
      card,
      { ...card, id: `${card.id}_duplicate` },
    ]).sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled.slice(0, 16)); // Default to 16 cards
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
                <option value={16}>Lätt (16 kort)</option>
                <option value={36}>Svår (36 kort)</option>
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
                        id={card.id} // Använd id för att säkerställa att varje kort är unikt
                        image={card.image}
                        isFlipped={flippedCards.includes(card) || matchedCards.includes(card)}
                        onClick={() => handleCardClick(card)} isMatched={false}                  />
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
