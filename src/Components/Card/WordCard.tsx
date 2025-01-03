// Card.tsx
import styled from 'styled-components';
import { WordCard } from '../../types/Card';
import { borderRadius } from '../../styles/variables';

interface IWordCardProps {
  card: WordCard;
  image: string;
  $isFlipped: boolean; // Styled-prop
  $isMatched: boolean; // Styled-prop
  onClick: (id: number) => void;
}

// Styled components för kortet
const CardContainer = styled.div`
  width: 100%;
  max-width: 150px; /* Justera max-width baserat på layout */
  aspect-ratio: 1; /* Sätt aspect-ratio till 1 för att göra det kvadratiskt */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  perspective: 1000px;
`;

const Card = styled.div<{ $isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: ${borderRadius.large};
  transform-style: preserve-3d;
  transition: transform 0.5s;
  position: relative;
  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transition: all 0.5s ease-in-out;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    image-rendering: auto;
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    padding: 0.5rem;
    border-radius: ${borderRadius.small};
  }
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-image: url('/assets/cardbg.png');
  //background-color: black;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: all 0.5s ease-in-out;
`;

const WordCardComponent = ({ card, $isFlipped, $isMatched, onClick }: IWordCardProps) => {
  const { id, image, word } = card;
  // Kortet ska bara vändas om det inte är matchat
  const isFlipped = $isFlipped || $isMatched;  // Om kortet är matchat, håll det vänt med framsidan upp.
  
  return (
    <CardContainer onClick={() => !$isMatched && onClick(id)}>
      <Card $isFlipped={isFlipped}>
      <CardFront>
          {isFlipped ? (
            image ? (
              <img src={image} alt="card front" loading="eager" />
            ) : (
              <span>{word}</span>
            )
          ) : null}
        </CardFront>        <CardBack />
      </Card>
    </CardContainer>
  );
};

export default WordCardComponent;
