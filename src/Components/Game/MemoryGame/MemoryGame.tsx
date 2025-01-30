import { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card";
import CardComponent from "../../Card/Card";
import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import {
  breakpoints,
  fontSizes,
  spacing,
  borderRadius,
} from "../../../styles/variables";
import { MuteButton } from "../../styled/MuteButton";
import { soundManager } from "../../../utils/soundManager";
import React from "react";
import Modal from "../../Modal";

// lazy load button for performance
const Button = React.lazy(() => import("../../styled/Button"));
// Styled-components for layout


const GameSizeSelector = styled.div`
  padding: ${spacing.small};
  border-radius: ${borderRadius.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  select {
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
  height: auto;
  background-color: ${(props) => props.theme.gameBackground};
  padding: 10px;
  border-radius: ${borderRadius.medium};
  margin: 0;

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

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameSize, setGameSize] = useState<number>(16);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getCards = async () => {
      try {
        const fetchedCards = await fetchCards<MemoryCard>({});
        
        // Fisher-Yates-algoritm to shuffle images
        for (let i = fetchedCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [fetchedCards[i], fetchedCards[j]] = [fetchedCards[j], fetchedCards[i]];
        }
        
        // Save shuffled cards and generate shuffle for game
        setCards(fetchedCards);
        setShuffledCards(generateShuffledCards(fetchedCards, gameSize));
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    getCards();
  }, [gameSize]); // Uppdate only when gameSize is changed

  // Uppdate generateShuffledCards-funktionen to handle larger game board
  const generateShuffledCards = (
    cards: MemoryCard[],
    size: number
  ): MemoryCard[] => {
    const numberOfCards = size === 16 ? 8 : size === 36 ? 18 : 24; // Dynamic depending on size
    const selectedCards = cards.slice(0, numberOfCards); // Pick correct number of cards

    const pairedCards = selectedCards.flatMap((card) => [
      { ...card, uniqueId: card.id * 2, originalId: card.id },
      { ...card, uniqueId: card.id * 2 + 1, originalId: card.id },
    ]);

    // Fisher-Yates algorithm to shuffle cards
    for (let i = pairedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]];
    }

    return pairedCards;
  };

  const handleCardClick = (card: MemoryCard) => {
    if (
      matchedCards.includes(card.uniqueId) ||
      flippedCards.includes(card.uniqueId)
    ) {
      return;
    }

    soundManager.playSound("flip");

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, card.uniqueId];

      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards;

        const firstCard = shuffledCards.find(
          (card) => card.uniqueId === firstCardId
        );
        const secondCard = shuffledCards.find(
          (card) => card.uniqueId === secondCardId
        );

        if (
          firstCard &&
          secondCard &&
          firstCard.originalId === secondCard.originalId
        ) {
          soundManager.playSound("match");
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
    setIsModalOpen(false);
  };

  const matchedPairs = matchedCards.length / 2;
  const isGameComplete =
    matchedPairs === shuffledCards.length && matchedCards.length;


  useEffect(() => {
    if (isGameComplete) {
      soundManager.playSound("win");
      setIsModalOpen(true);
    }
  }, [isGameComplete]);

  return (
    <>
    <PageWrapper>
      <Suspense fallback={<div>Laddar titel...</div>}>
      </Suspense>
      <GameWrapper>
        <GameContainer>
          <RightColumn>
            <GameSizeSelector>
              <h3>Välj spelbräde:</h3>
              <select
              id="game-size-selector"
                onChange={(e) => setGameSize(Number(e.target.value))}
                value={gameSize}
              >
                <option id="small" value={16}>Liten 4x4 (16 kort)</option>
                <option id="large" value={36}>Stor 6x6 (36 kort)</option>
              </select>
            </GameSizeSelector>
            <MuteButton />
            <ButtonWrapper>
              <Button onClick={restartGame}>
                {isGameComplete ? "Spela igen" : "Börja om"}
              </Button>
            </ButtonWrapper>
          </RightColumn>

          <LeftColumn>
            <CardGrid
              $columns={gameSize === 16 ? 4 : 6}
              $rows={gameSize === 16 ? 4 : 6}
            >
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
        {/* For mobile layout: keep the button under the whole game container */}
        <MobileButtonWrapper>
          <Suspense fallback={<div>Laddar...</div>}>
          <Button onClick={restartGame}>
            {isGameComplete ? "Spela igen" : "Börja om"}
          </Button>
          </Suspense>
        </MobileButtonWrapper>
      </GameWrapper>
    </PageWrapper>
   
{/* Modal opens when game is completed */}
<Modal isOpen={isModalOpen} onClose={restartGame} />

    </>
  );
};

export default MemoryGame;
