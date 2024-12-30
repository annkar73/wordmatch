import { useEffect, useState } from "react";
import supabase from "../services/supabaseClient";
import { ICard } from "../types/Card";

interface SupabaseError {
  message: string;
}

interface GameConfig {
  gameType: 'memory' | 'word-match';  // Typer av spel
  difficulty: 'easy' | 'medium' | 'hard';  // Svårighetsgrader
}

const CardList = ({ gameConfig }: { gameConfig: GameConfig }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);    
  const [error, setError] = useState<SupabaseError | null>(null); 

  useEffect(() => {
    const fetchCards = async () => {
      // Byt baserat på spelets typ och svårighetsgrad
      let query = supabase.from('cards').select('id, image_url');
      
      // Dynamisk svårighetsbaserad hämtning
      switch (gameConfig.difficulty) {
        case 'easy':
          query = query.limit(6);  // Exempel: 6 kort för lätt svårighetsgrad
          break;
        case 'medium':
          query = query.limit(12);  // 12 kort för medium svårighetsgrad
          break;
        case 'hard':
          query = query.limit(18);  // 18 kort för hård svårighetsgrad
          break;
        default:
          break;
      }

      // Hämta bilder baserat på spelets typ
      const { data, error } = await query;
      
      if (error) {
        setError(error); 
        console.error('Error fetching cards:', error.message);
      } else {
        if (data) {
          // Om spelet är memory: slumpar korten och duplicerar
          if (gameConfig.gameType === 'memory') {
            const shuffledCards = shuffleCards([...data, ...data]);  // Duplicera korten för par
            setCards(shuffledCards);
          } else if (gameConfig.gameType === 'word-match') {
            // För ordmatchning: sortera bilder beroende på ordlängd
            const filteredCards = filterCardsByWordLength(data, 4); // T.ex. filtra på ordlängd
            setCards(filteredCards);
          }
        }
      }

      setLoading(false);  
    };

    fetchCards();
  }, [gameConfig]);  // Hämta kort igen om gameConfig ändras

  // Funktion för att slumpa korten (Memory)
  const shuffleCards = (cards: ICard[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Byt plats på korten
    }
    return cards;
  };

  // Funktion för att filtrera kort beroende på ordlängd (Word match)
  const filterCardsByWordLength = (cards: ICard[], length: number) => {
    return cards.filter(card => card.word.length === length);
  };

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error.message}</p>; 

  return (
    <div className="card-list">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <img src={card.image_url} alt={`Card ${card.id}`} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
