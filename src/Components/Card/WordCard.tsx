import styled from "styled-components";
import { WordCard } from "../../types/Card"; // Import av WordCard-typ
import { borderRadius } from "../../styles/variables";

interface IWordCardProps {
  card: WordCard;
  $isFlipped: boolean; // Om kortet är vänt eller inte
  $isMatched: boolean; // Om kortet är matchat
  onClick: (id: number) => void; // Funktion som hanterar klick på kortet
}

interface ICardFrontProps {
  $isFlipped: boolean;
}

// Styled components för kortet
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
  object-fit: cover;
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
  const { id, image, word } = card; // Vi använder både image och word från card

  // Kortet ska bara vändas om det inte är matchat
  const isFlipped = $isFlipped || $isMatched; // Om kortet är matchat, håll det vänt med framsidan upp.

  return (
    <CardContainer onClick={() => !$isMatched && onClick(id)}>
      <Card $isFlipped={isFlipped}>
        {/* När kortet inte är vänt, visa CardBack */}
        {!isFlipped ? (
          <CardBack />
        ) : (
          <CardFront $isFlipped={isFlipped}>
            {/* Visa antingen bild eller ord beroende på om det är bildkort eller ordkort */}
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
