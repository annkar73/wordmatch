import { useState, useEffect, useCallback, Suspense } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { WordCard } from "../../../types/Card";
import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import {
  breakpoints,
  fontSizes,
  spacing,
  borderRadius,
} from "../../../styles/variables";
import WordCardComponent from "../../Card/WordCard";
import { MuteButton } from "../../styled/MuteButton";
import { soundManager } from "../../../utils/soundManager";
import Modal from "../../Modal";
import React from "react";

const Button = React.lazy(() => import("../../styled/Button"));
const HeaderTitle = React.lazy(() => import("../../styled/Titles"));
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
  width: 90vw;
  padding: 10px;
  border-radius: ${borderRadius.large};
  margin: 0;
  background-color: ${(props) => props.theme.gameBackground};

  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 45px;
    max-width: 100%;
    gap: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.large};
  width: 100%;
  align-items: center;
  margin-top: 40px; /* For mobile layout */
  
  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 20px; /* Reduced margin for tablet/desktop */
  }
  
  /* Hide on mobile */
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const MobileButtonWrapper = styled.div`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: ${spacing.large};
    width: 100%;
    align-items: center;
    margin-top: 40px;
  }
`;

const DifficultySelector = styled.div`
  //margin-bottom: ${spacing.medium};
  padding: ${spacing.small};
  border-radius: ${borderRadius.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  select {
    //margin-top: ${spacing.small};
    padding: ${spacing.xSmall};
    border-radius: ${borderRadius.small};
    border: 1px solid ${(props) => props.theme.text};
    background-color: white;
    font-size: ${fontSizes.base};
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    width: auto;
  }
`;

const WordMatchGame = () => {
  const [cards, setCards] = useState<WordCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<WordCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<number | null>(1); // null = random
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const generateShuffledCards = useCallback((cards: WordCard[]): WordCard[] => {
    const selectedCards = difficulty === null
      ? cards
      : cards.filter((card) => card.difficulty === difficulty);

    const pairedCards = selectedCards.slice(0, 8).flatMap((card) => [
      { ...card, uniqueId: card.id * 2, type: "image" },
      { ...card, uniqueId: card.id * 2 + 1, type: "word" },
    ]);

    // Fisher-Yates shuffle algorithm
    for (let i = pairedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]];
    }

    return pairedCards;
  }, [difficulty]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const fetchedCards = await fetchCards<WordCard>({
          difficulty: difficulty === null ? undefined : difficulty,
        });
        setCards(fetchedCards);
        setShuffledCards(generateShuffledCards(fetchedCards));
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    getCards();
  }, [difficulty, generateShuffledCards]);

  const handleCardClick = (card: WordCard) => {
    if (
      flippedCards.includes(card.uniqueId) ||
      matchedCards.includes(card.uniqueId)
    ) {
      return;
    }
    soundManager.playSound("flip");
  
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
          setTimeout(() => {
            soundManager.playSound("match");
            setMatchedCards((prev) => [
              ...prev,
              firstCard.uniqueId,
              secondCard.uniqueId,
            ]);
          }, 300); // Delay to sync with animation
        }
        setTimeout(() => setFlippedCards([]), 1000);
      }
      return newFlippedCards;
    });
  };

  const matchedPairs = matchedCards.length / 2;
  const isGameComplete = shuffledCards.length > 0 && matchedPairs === shuffledCards.length;

  useEffect(() => {
    // When all pairs are matched, play the winning sound
    if (isGameComplete && !gameCompleted) {
      soundManager.playSound("win");
      setGameCompleted(true);
      setIsModalOpen(true);
    }
  }, [isGameComplete, gameCompleted]);

  const restartGame = () => {
    setMatchedCards([]);
    setFlippedCards([]);
    setShuffledCards(generateShuffledCards(cards));
    setGameCompleted(false);
    setIsModalOpen(false);
  };

  return (
    <>
    <PageWrapper>
      <Suspense fallback={<div>Laddar titel...</div>}>
      <HeaderTitle>Matcha med ord</HeaderTitle>
      </Suspense>
      <GameWrapper>
        <GameContainer>
          <RightColumn>
            <DifficultySelector>
              <h3>Välj svårighetsgrad:</h3>
              <select
              id="game-difficulty-selector"
                value={difficulty === null ? "random" : difficulty.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  setDifficulty(value === "random" ? null : parseInt(value, 10));
                }}
              >
                <option value="1">Lätt (2-3 bokstäver)</option>
                <option value="2">Mellan (4 bokstäver)</option>
                <option value="3">Svår (5+ bokstäver)</option>
                <option value="random">Slumpmässig</option>
              </select>
            </DifficultySelector>
            <MuteButton />
            <ButtonWrapper>
              <Suspense fallback={<div>Laddar...</div>}>
              <Button onClick={restartGame}>
                {isGameComplete ? "Spela igen" : "Börja om"}
              </Button>
              </Suspense>
            </ButtonWrapper>
          </RightColumn>

          <LeftColumn>
            <CardGrid>
              {shuffledCards.map((card) => (
                <WordCardComponent
                  key={card.uniqueId}
                  card={card}
                  $isFlipped={flippedCards.includes(card.uniqueId)}
                  $isMatched={matchedCards.includes(card.uniqueId)}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </CardGrid>
          </LeftColumn>
        </GameContainer>

        <MobileButtonWrapper>
          <Button onClick={restartGame}>
            {isGameComplete ? "Spela igen" : "Börja om"}
          </Button>
        </MobileButtonWrapper>
      </GameWrapper>
    </PageWrapper>
    <Modal isOpen={isModalOpen} onClose={restartGame} />
    </>
  );
};

export default WordMatchGame;