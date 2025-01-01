import { styled } from "styled-components";

interface CardProps {
  id: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const Card = styled.div<{ $isFlipped: boolean; $isMatched: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: #f0f0f0;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => ($isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  transition: transform 0.5s;
  position: relative;
  ${({ $isMatched }) => $isMatched && "opacity: 0.5;"} /* Gör matchade kort genomskinliga */
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 8px;
`;

const CardFront = styled(CardFace)`
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
`;

const CardBack = styled(CardFace)`
  background-image: url('/assets/cardbg.png');
  background-color: black;
  background-size: cover;
  background-position: center;
`;

const CardComponent = ({ id, image, isFlipped, isMatched, onClick }: CardProps) => (
  <CardContainer onClick={onClick} data-id={id}>
    <Card $isFlipped={isFlipped} $isMatched={isMatched}>
      <CardFront>{isFlipped ? <img src={image} /> : "Front"}</CardFront>
      <CardBack />
    </Card>
  </CardContainer>
);

export default CardComponent;
