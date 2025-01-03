import styled from 'styled-components';
import { WordCard } from '../../types/Card'; // Import av WordCard-typ
import { borderRadius } from '../../styles/variables';

interface IWordCardProps {
  card: WordCard;
  image: string;
  word: string;
  $isFlipped: boolean; // Om kortet är vänt eller inte
  $isMatched: boolean; // Om kortet är matchat
  onClick: (id: number) => void; // Funktion som hanterar klick på kortet
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
`;

const SpanText = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${(props) => props.theme.text};
    text-align: center;
    padding: 0.5rem;
    border-radius: ${borderRadius.small};
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-image: url('/assets/cardbg.png');
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
          {
            // Rendera endast en av dem beroende på om kortet är vänt eller inte
            isFlipped ? (
              image ? (
                <img src={image} alt="card front" loading="eager" />
              ) : (
                <SpanText>{word}</SpanText>
              )
            ) : (
              <SpanText>?</SpanText> // Visa frågetecken när kortet inte är vänt
            )
          }
        </CardFront>

        <CardBack />
      </Card>
    </CardContainer>
  );
};

export default WordCardComponent;
