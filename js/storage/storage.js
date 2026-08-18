const STORAGE_KEY = 'studybuddy_decks_v1';

const StorageAPI = {
  getAllDecks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('StudyBuddy storage error:', error);
      return [];
    }
  },

  getDeck: (id) => {
    return StorageAPI.getAllDecks().find(deck => deck.id === id) || null;
  },

  saveDeck: (deckData) => {
    const decks = StorageAPI.getAllDecks();
    const newDeck = {
      ...deckData,
      id: deckData.id || crypto.randomUUID(),
      createdAt: deckData.createdAt || new Date().toISOString(),
      cards: (deckData.cards || []).map(card => ({
        ...card,
        id: card.id || crypto.randomUUID(),
        image: card.image || null
      }))
    };
    decks.push(newDeck);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    return newDeck;
  },

  updateDeck: (updatedDeck) => {
    const decks = StorageAPI.getAllDecks();
    const index = decks.findIndex(deck => deck.id === updatedDeck.id);
    if (index === -1) return null;
    decks[index] = updatedDeck;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    return updatedDeck;
  },

  deleteDeck: (id) => {
    const decks = StorageAPI.getAllDecks().filter(deck => deck.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  }
};
