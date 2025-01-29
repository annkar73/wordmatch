import supabase from "./supabaseClient";
import { Card, MemoryCard, WordCard } from "../types/Card";

// Preload images for fast rendering
const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// Generic type for fetch, so it can be used for both MemoryCard och WordCard
export const fetchCards = async <T extends Card | MemoryCard | WordCard>(
  filters?: { difficulty?: number; numberOfCards?: number; pairId?: number }
): Promise<T[]> => {
  // Check if cards are already stored in localStorage
  const savedCards = localStorage.getItem("memoryCards");
  if (savedCards) {
    const parsedCards = JSON.parse(savedCards) as T[];

    // Preload images from the stored cards
    const imageUrls = parsedCards.map((card) => card.image);
    preloadImages(imageUrls);

    // If numberOfCards is defined, return correct number of cards from storage
    if (filters?.numberOfCards) {
      return parsedCards.slice(0, filters.numberOfCards);
    }

    return parsedCards; // Return all stored cards if numberOfCards is not defined
  }

  try {
    let query = supabase.from("cards").select("*");

    // Use filter if they are defined
    if (filters?.difficulty !== undefined) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters?.pairId !== undefined) {
      query = query.eq("pairId", filters.pairId);
    }

    // Add log to search for errors
    console.log("Fetching cards with filters:", filters);

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching cards: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No cards found.");
    }

    // Preload images from the fetched cards
    const imageUrls = data.map((card) => card.image);
    preloadImages(imageUrls);

    // Save cards in localStorage for future use
    localStorage.setItem("memoryCards", JSON.stringify(data));

    // Return currect number of cards if numberOfCards är definierat, else all cards
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
