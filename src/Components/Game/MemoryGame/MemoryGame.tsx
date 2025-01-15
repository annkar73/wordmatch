import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchCards } from "../../../services/fetchCards";
import { MemoryCard } from "../../../types/Card";
import CardComponent from "../../Card/Card";
import { PageWrapper, GameWrapper } from "../../styled/Wrappers";
import { Button } from "../../styled/Button";
import {
  breakpoints,
  fontSizes,
  spacing,
  borderRadius,
} from "../../../styles/variables";
import { MuteButton } from "../../styled/MuteButton";
import { soundManager } from "../../../utils/soundManager";

// Styled-components för layouten

const Image = styled.img`
  width: 90vw;
  max-width: 400px;
  margin: 0 15px;
  padding: 0;
  display: block;
  background-color: ${(props) => props.theme.backgroundColor};
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) blur(0.5px);
  //padding: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    width: 70vw;
    max-width: 600px;
    margin-top: ${spacing.xLarge};
    margin-bottom: 0;
  }
`;

const GameSizeSelector = styled.div`
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
  }, [gameSize]); // Uppdatera bara när gameSize ändras

  // Uppdatera generateShuffledCards-funktionen för att hantera större spelplaner
  const generateShuffledCards = (
    cards: MemoryCard[],
    size: number
  ): MemoryCard[] => {
    const numberOfCards = size === 16 ? 8 : size === 36 ? 18 : 24; // Dynamiskt beroende på storlek (16, 36 eller annat)
    const selectedCards = cards.slice(0, numberOfCards); // Välj rätt antal kort

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
  };

  // const totalPairs = shuffledCards.length / 2;
  const matchedPairs = matchedCards.length / 2;
  const isGameComplete =
    matchedPairs === shuffledCards.length && matchedCards.length;

  // console.log( "totalPairs:", totalPairs);

  useEffect(() => {
    if (isGameComplete) {
      soundManager.playSound("win");
    }
  }, [isGameComplete]);

  return (
    <>
    <PageWrapper>
      <Image src="/assets/memory2.png" />

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
          <Button onClick={restartGame}>
            {isGameComplete ? "Spela igen" : "Börja om"}
          </Button>
        </MobileButtonWrapper>
      </GameWrapper>
    </PageWrapper>
    </>
  );
};

export default MemoryGame;
