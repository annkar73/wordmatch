export type Card = {
    id: number;
    pairId: number;
    image: string;
    word: string;
    difficulty: number;
}

export type MemoryCard = {
    id: number;
    uniqueId: number;
    originalId: number;
    image: string;
}

export type WordCard = {
    id: number;
    image: string;
    word: string;
    pairId?: number;  
    difficulty: number;  
    uniqueId: number;
    originalId: number;
    type: string;

  }
  