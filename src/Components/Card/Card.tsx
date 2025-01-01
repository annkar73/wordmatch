import styled from 'styled-components';

// Typen för dina props
interface CardProps {
  id: number;
  image: string;
  word?: string;
  pairId?: string;
  $isFlipped: boolean;
  $isMatched: boolean;
  onClick: () => void;
}

// Typa CardContainer korrekt genom att använda CardProps
const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  perspective: 1000px;
`;

const Card = styled.div<{ $isFlipped: boolean; $isMatched: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  position: relative;
  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  opacity: ${({ $isMatched }) => ($isMatched ? 1 : 1)};
  pointer-events: ${({ $isMatched }) => ($isMatched ? 'none' : 'auto')};
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

// Själva Card-komponenten
const CardComponent = ({ id, image, $isFlipped, $isMatched, onClick }: CardProps) => {
  const handleClick = () => {
    // Korten ska inte flipppas om de är matchade
    if (!$isFlipped && !$isMatched) {
      onClick(); // Anrop på onClick för att vända kortet om det inte redan är vänd eller matchat
    }
  };

  return (
    <CardContainer onClick={handleClick} data-id={id}>
      <Card $isFlipped={$isFlipped} $isMatched={$isMatched}>
        <CardFront>
          {$isFlipped ? <img src={image} alt="card front" /> : null}
        </CardFront>
        <CardBack />
      </Card>
    </CardContainer>
  );
};

export default CardComponent;
