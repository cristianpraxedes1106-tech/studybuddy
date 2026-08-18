const STORAGE_KEY = 'studybuddy_decks_v1';

const StorageAPI = {
  getAllDecks: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  getDeck: (id) => {
    const decks = StorageAPI.getAllDecks();
    return decks.find(deck => deck.id === id) || null;
  },
  
  saveDeck: (deckData) => {
    const decks = StorageAPI.getAllDecks();
    const newDeck = {
      ...deckData,
      id: deckData.id || crypto.randomUUID(),
      createdAt: deckData.createdAt || new Date().toISOString()
    };
    decks.push(newDeck);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    return newDeck;
  },
  
  deleteDeck: (id) => {
    let decks = StorageAPI.getAllDecks();
    decks = decks.filter(deck => deck.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  }
};