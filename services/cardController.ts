import StorageService from "./storageService";
import { Card } from "../types";

// Define a storage key for card data
const cardStorageService = new StorageService<Card[]>("cards");
const counterKey = "cardIdCounter";

export class CardController {
  // List all cards
  static async listCards(): Promise<Card[]> {
    const cards = await cardStorageService.load();
    return cards || [];
  }

  // Find a card by ID
  static async findCardById(id: number): Promise<Card | null> {
    const cards = await cardStorageService.load();
    return cards ? cards.find((card) => card.id === id) || null : null;
  }

  // Delete a card by ID
  static async deleteCardById(id: number): Promise<void> {
    const cards = await cardStorageService.load();
    if (cards) {
      const updatedCards = cards.filter((card) => card.id !== id);
      await cardStorageService.save(updatedCards);
    }
  }

  // Update a card by ID
  static async updateCardById(
    id: number,
    updatedCard: Partial<Card>
  ): Promise<void> {
    const cards = await cardStorageService.load();
    if (cards) {
      const cardIndex = cards.findIndex((card) => card.id === id);
      if (cardIndex > -1) {
        cards[cardIndex] = { ...cards[cardIndex], ...updatedCard };
        await cardStorageService.save(cards);
      }
    }
  }

  // List all cards
  static async resetCardController() {
    cardStorageService.remove();
  }

  // Create a new card
  static async createCard(newCard: Omit<Card, "id">): Promise<Card> {
    const cards = (await cardStorageService.load()) || [];

    // Get and increment the counter for the new ID
    const newId = await cardStorageService.incrementCounter(counterKey);

    const card: Card = { id: newId, ...newCard };
    cards.push(card);

    await cardStorageService.save(cards);

    return card;
  }
}
