import StorageService from './StorageService';
import { Card } from '../types';

// Define a storage key for card data
const cardStorageService = new StorageService<Card[]>('cards');

export class CardController {
  // List all cards
  static async listCards(): Promise<Card[]> {
    const cards = await cardStorageService.load();
    return cards || [];
  }

  // Find a card by ID
  static async findCardById(id: number): Promise<Card | null> {
    const cards = await cardStorageService.load();
    return cards ? cards.find(card => card.id === id) || null : null;
  }

  // Delete a card by ID
  static async deleteCardById(id: number): Promise<void> {
    const cards = await cardStorageService.load();
    if (cards) {
      const updatedCards = cards.filter(card => card.id !== id);
      await cardStorageService.save(updatedCards);
    }
  }

  // Update a card by ID
  static async updateCardById(id: number, updatedCard: Partial<Card>): Promise<void> {
    const cards = await cardStorageService.load();
    if (cards) {
      const cardIndex = cards.findIndex(card => card.id === id);
      if (cardIndex > -1) {
        cards[cardIndex] = { ...cards[cardIndex], ...updatedCard };
        await cardStorageService.save(cards);
      }
    }
  }
}
