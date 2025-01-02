// Card.tsx
import styled from 'styled-components';
import { MemoryCard } from '../../types/Card';

// Användning av I prefix för TypeScript-konventionen
interface ICardProps {
  card: MemoryCard;
  image: string;
  $isFlipped: boolean; // Styled-prop
  $isMatched: boolean; // Styled-prop
  onClick: (id: number) => void;
}

// Styled components för kortet
const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  perspective: 1000px;
`;

const Card = styled.div<{ $isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
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
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-image: url('/assets/cardbg.png');
  background-color: black;
  background-size: cover;
  background-position: center;
`;

const CardComponent = ({ card, $isFlipped, $isMatched, onClick }: ICardProps) => {
  const { id, image } = card;
  // Kortet ska bara vändas om det inte är matchat
  const isFlipped = $isFlipped || $isMatched;  // Om kortet är matchat, håll det vänt med framsidan upp.

  return (
    <CardContainer onClick={() => !$isMatched && onClick(id)}>
      {/* Vi skickar $isFlipped och $isMatched till styled-componenten istället för DOM-elementet */}
      <Card $isFlipped={isFlipped}>
        <CardFront>
          {isFlipped ? <img src={image} alt="card front" /> : null}
        </CardFront>
        <CardBack />
      </Card>
    </CardContainer>
  );
};

export default CardComponent;
