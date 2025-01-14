import supabase from "./supabaseClient";

// Generisk typ för fetch, så den kan användas för både MemoryCard och WordCard
export const fetchCards = async <T>(filters?: { difficulty?: number; numberOfCards?: number; pairId?: number }): Promise<T[]> => {
  // Kolla om korten redan finns lagrade i localStorage
  const savedCards = localStorage.getItem('memoryCards');
  if (savedCards) {
    const parsedCards = JSON.parse(savedCards) as T[];

    // Om numberOfCards är definierat, returnera rätt antal kort från de lagrade korten
    if (filters?.numberOfCards) {
      return parsedCards.slice(0, filters.numberOfCards);
    }

    return parsedCards; // Returnera alla lagrade kort om numberOfCards inte är definierat
  }

  try {
    let query = supabase.from("cards").select("*");

    // Använd filter om de är definierade
    if (filters?.difficulty !== undefined) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters?.pairId !== undefined) {
      query = query.eq("pairId", filters.pairId);
    }

    // Lägg till logg för felsökning
    console.log("Fetching cards with filters:", filters);

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching cards: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No cards found.");
    }

    // Spara korten i localStorage för framtida användning
    localStorage.setItem('memoryCards', JSON.stringify(data));

    // Returnera rätt antal kort om numberOfCards är definierat, annars alla kort
    return filters?.numberOfCards ? data.slice(0, filters.numberOfCards) : data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching cards:", err.message);
      throw err;
    } else {
      console.error("Unexpected error:", err);
      throw new Error("An unexpected error occurred while fetching cards.");
    }
  }
};
