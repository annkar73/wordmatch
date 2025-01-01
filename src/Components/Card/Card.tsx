import React from "react";
import { styled } from "styled-components";

interface CardProps {
  id: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

// Container för hela kortet
const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  perspective: 1000px;

  &:hover {
    filter: brightness(1.1); /* Visuell feedback vid hover */
  }
`;

// Själva kortet som kan flippas
const Card = styled.div<{ $isFlipped: boolean; $isMatched: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => ($isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  transition: transform 0.5s;

  position: relative;

  ${({ $isMatched }) => $isMatched && `
    opacity: 0.5; /* Gör kortet genomskinligt om det är matchat */
    pointer-events: none; /* Inaktivera klick */
  `}
`;

// Bas för fram- och baksidan av kortet
const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 8px;
`;

// Framsidan av kortet
const CardFront = styled(CardFace)`
  background-color: #f0f0f0;
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

// Baksidan av kortet
const CardBack = styled(CardFace)`
  background-image: url('/assets/cardbg.png');
  background-color: black;
  background-size: cover;
  background-position: center;
`;

// Komponent för kortet
const CardComponent = React.memo(({ id, image, isFlipped, isMatched, onClick }: CardProps) => {
  // Spärra klick om kortet redan är flippat eller matchat
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick();
    }
  };

  return (
    <CardContainer onClick={handleClick} data-id={id}>
      <Card $isFlipped={isFlipped} $isMatched={isMatched}>
        <CardFront>
          {isFlipped ? <img src={image} alt="card front" /> : null}
        </CardFront>
        <CardBack />
      </Card>
    </CardContainer>
  );
});

export default CardComponent;
