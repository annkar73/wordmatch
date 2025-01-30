import styled from "styled-components";
import { WordCard } from "../../types/Card"; 
import { borderRadius } from "../../styles/variables";

interface IWordCardProps {
  card: WordCard;
  $isFlipped: boolean; 
  $isMatched: boolean; 
  onClick: (id: number) => void; 
}

interface ICardFrontProps {
  $isFlipped: boolean;
}

// Styled components for card
const CardContainer = styled.div`
  width: 100%;
  max-width: 150px;
  aspect-ratio: 1;
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
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFront = styled.div<ICardFrontProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transition: all 0.5s ease-in-out;
  flex-direction: column; 
  transform: ${({ $isFlipped }) => ($isFlipped ? "rotateY(180deg)" : "none")};
`;

const SpanText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  text-transform: uppercase;
  text-align: center;
  padding: 0.5rem;
  border-radius: ${borderRadius.small};
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  border-radius: 4px;
  image-rendering: auto;
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-image: url("/assets/bg_fairytale2.jpg");
  border-radius: ${borderRadius.large};
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: all 0.5s ease-in-out;
`;

const WordCardComponent = ({
  card,
  $isFlipped,
  $isMatched,
  onClick,
}: IWordCardProps) => {
  const { id, image, word } = card; // we use both image and word

  
  const isFlipped = $isFlipped || $isMatched; 

  return (
    <CardContainer onClick={() => !$isMatched && onClick(id)}>
      <Card $isFlipped={isFlipped}>
        {/* when card is not flipped, show CardBack */}
        {!isFlipped ? (
          <CardBack />
        ) : (
          <CardFront $isFlipped={isFlipped}>
            {/* Show image or word */}
            {card.type === "image" ? (
              <Img src={image} alt="card front" loading="eager" />
            ) : (
              <SpanText>{word}</SpanText>
            )}
          </CardFront>
        )}
      </Card>
    </CardContainer>
  );
};

export default WordCardComponent;
