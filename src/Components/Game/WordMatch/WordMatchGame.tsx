import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { WordCard } from "../../../types/Card";
import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import { Button } from "../../styled/Button";
import {
  breakpoints,
  fontSizes,
  spacing,
  borderRadius,
} from "../../../styles/variables";
import WordCardComponent from "../../Card/WordCard";

// Styled-components för layouten
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

// CardGrid utan props
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
  width: 90vw;
  padding: 10px;
  border-radius: ${borderRadius.medium};
  margin: 0;
  background-color: ${(props) => props.theme.gameBackground};

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

const DifficultySelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.small};
`;

const DifficultyLabel = styled.label`
  cursor: pointer;
  font-size: ${fontSizes.base};
`;

const WordMatchGame = () => {
  const [cards, setCards] = useState<WordCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<WordCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<string>("1"); // Difficulty som en string (kan vara "1", "2", "3", eller "random")

  // Hämta kort från databasen
  useEffect(() => {
    const getCards = async () => {
      try {
        // Hämta kort baserat på svårighetsgrad
        const fetchedCards = await fetchCards<WordCard>({ difficulty });
        setCards(fetchedCards);
        setShuffledCards(generateShuffledCards(fetchedCards)); // Använder generateShuffledCards för att blanda korten
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    getCards();
  }, [difficulty]); // Beroende på difficulty så kommer vi hämta nya kort

  // Hämta kort baserat på svårighetsgrad och skapa shuffle
  const generateShuffledCards = useCallback((cards: WordCard[]): WordCard[] => {
    let selectedCards = [];
    if (difficulty === "random") {
      selectedCards = cards; // Om difficulty är random, hämta alla kort
    } else {
      selectedCards = cards.filter(card => card.difficulty === parseInt(difficulty)); // Filtrera kort baserat på difficulty
    }

    // Ta de första 8 korten för att skapa 8 par
    const pairedCards = selectedCards.slice(0, 8).flatMap((card) => [
      { ...card, uniqueId: card.id * 2, type: "image" },
      { ...card, uniqueId: card.id * 2 + 1, type: "word" },
    ]);

    // Fisher-Yates shuffle
    for (let i = pairedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]];
    }

    return pairedCards;
  }, [difficulty]);

  // Hantera klick på kort
  const handleCardClick = (card: WordCard) => {
    if (
      flippedCards.includes(card.uniqueId) ||
      matchedCards.includes(card.uniqueId)
    ) {
      return;
    }

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, card.uniqueId];
      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards.map((id) =>
          shuffledCards.find((c) => c.uniqueId === id)
        );

        if (
          firstCard &&
          secondCard &&
          firstCard.type !== secondCard.type &&
          firstCard.id === secondCard.id
        ) {
          setMatchedCards((prev) => [
            ...prev,
            firstCard.uniqueId,
            secondCard.uniqueId,
          ]);
        }
        setTimeout(() => setFlippedCards([]), 1000);
      }
      return newFlippedCards;
    });
  };

  // Starta om spelet
  const restartGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setShuffledCards(generateShuffledCards(cards));
  };

  const isGameComplete = matchedCards.length === shuffledCards.length;

  return (
    <PageWrapper>
      <GameWrapper>
        <GameContainer>
          <RightColumn>
            <DifficultySelector>
              <h3>Välj svårighetsgrad:</h3>
              {["1", "2", "3", "random"].map((level) => (
                <DifficultyLabel key={level}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={difficulty === level}
                    onChange={() => setDifficulty(level)}
                  />
                  {level === "1"
                    ? "Lätt (2-3 bokstäver)"
                    : level === "2"
                    ? "Mellan (4 bokstäver)"
                    : level === "3"
                    ? "Svår (5+ bokstäver)"
                    : "Slumpmässig"}
                </DifficultyLabel>
              ))}
            </DifficultySelector>
            <ControlWrapper>
              <Button onClick={restartGame}>
                {isGameComplete ? "Spela igen" : "Börja om"}
              </Button>
            </ControlWrapper>
          </RightColumn>
          <LeftColumn>
            <CardGrid>
              {shuffledCards.map((card) => (
                <WordCardComponent
                  key={card.uniqueId}
                  card={card}
                  image={card.type === "image" ? card.image : ""}
                  word={card.type === "word" ? card.word : ""}
                  $isFlipped={flippedCards.includes(card.uniqueId)}
                  $isMatched={matchedCards.includes(card.uniqueId)}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </CardGrid>
          </LeftColumn>
        </GameContainer>
      </GameWrapper>
    </PageWrapper>
  );
};

export default WordMatchGame;
