// Card.tsx
import styled from 'styled-components';
import { MemoryCard } from '../../types/Card';
import { borderRadius } from '../../styles/variables';

interface ICardProps {
  card: MemoryCard;
  image: string;
  $isFlipped: boolean; // Styled-prop
  $isMatched: boolean; // Styled-prop
  onClick: (id: number) => void;
}

// Styled components for card
const CardContainer = styled.div`
  width: 100%;
  max-width: 150px; /* adjust max-width based on layout */
  aspect-ratio: 1; /* aspect-ratio 1 to make a square */
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

  will-change: transform;
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transition: all 0.5s ease-in-out;


  img {
    display: block;
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    image-rendering: auto;
    position: relative;

    -webkit-transform: translateZ(0); 
    transform: translateZ(0); 
    
  }
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-image: url('/assets/bg_fairytale.jpg');
  border-radius: ${borderRadius.large};
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: all 0.5s ease-in-out;
`;

const CardComponent = ({ card, $isFlipped, $isMatched, onClick }: ICardProps) => {
  const { id, image } = card;
  // Card should only flip back if it is not matched
  const isFlipped = $isFlipped || $isMatched;  // If card is matched, keep card front visible
  
  return (
    <CardContainer onClick={() => !$isMatched && onClick(id)}>
      <Card $isFlipped={isFlipped}>
        <CardFront>
          {isFlipped ? <img src={image} alt="card front" loading='lazy' /> : null}
        </CardFront>
        <CardBack />
      </Card>
    </CardContainer>
  );
};

export default CardComponent;
