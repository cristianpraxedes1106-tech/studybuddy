document.addEventListener('DOMContentLoaded', () => {
  const decksContainer = document.getElementById('recent-decks');
  
  if (decksContainer) {
    const decks = StorageAPI.getAllDecks();
    
    if (decks.length === 0) {
      decksContainer.innerHTML = `
        <div class="empty-state">
          <h3>Sua mesa está vazia ☕</h3>
          <p class="mt-2 mb-2">Crie seu primeiro baralho para começar a estudar!</p>
          <a href="pages/create.html" class="btn btn-primary">Criar meu primeiro baralho ✨</a>
        </div>
      `;
    } else {
      let html = '<div class="deck-grid">';
      // Mostra apenas os 3 mais recentes na home
      const recentDecks = decks.reverse().slice(0, 3); 
      
      recentDecks.forEach(deck => {
        html += `
          <div class="deck-card">
            <h3>${deck.name}</h3>
            <p>${deck.cards.length} cards</p>
            <div class="deck-card-actions">
              <a href="pages/study.html?id=${deck.id}" class="btn btn-primary" style="flex: 1; text-align: center;">Estudar</a>
            </div>
          </div>
        `;
      });
      html += '</div>';
      decksContainer.innerHTML = html;
    }
  }
});