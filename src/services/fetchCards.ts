// src/services/fetchCards.ts
import supabase from "./supabaseClient";

// Generisk typ för fetch, så den kan användas för både MemoryCard och WordCard
export const fetchCards = async <T>(filters?: { difficulty?: number; pairId?: number }): Promise<T[]> => {
  try {
    let query = supabase.from("cards").select("*");

    // Använd filter om de är definierade
    if (filters?.difficulty !== undefined) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters?.pairId !== undefined) {
      query = query.eq("pairId", filters.pairId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching cards: ${error.message}`);
    }

    if (!data) {
      throw new Error("No cards found.");
    }

    // Returnera data som en array av generiska typer T
    return data as T[];
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
