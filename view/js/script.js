document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById('show-form-btn');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const addGameForm = document.getElementById('add-game-form');
    const gamesList = document.getElementById('games-list');

    if (showFormBtn && cancelFormBtn && addGameForm) {
        showFormBtn.addEventListener('click', () => {
            addGameForm.style.display = 'block';
            showFormBtn.style.display = 'none';
        });

        cancelFormBtn.addEventListener('click', () => {
            addGameForm.style.display = 'none';
            showFormBtn.style.display = 'block';
        });
    }

    if (gamesList) {
        fetch('/games')
            .then(res => res.json())
            .then(games => {
                gamesList.innerHTML = '';
                games.forEach(game => {
                    const item = document.createElement('div');
                    item.className = 'list-group-item';
                    item.innerHTML = `
                        <h6 class="mb-1">${game.name}</h6>
                        <small class="text-muted">${game.developer} &mdash; ${game.genre}</small>
                        <p class="mb-0 mt-1 small">${game.description}</p>
                    `;
                    gamesList.appendChild(item);
                });
            })
            .catch(err => {
                console.error("Failed to fetch games", err);
                gamesList.innerHTML = '<p class="text-danger">Failed to load games.</p>';
            });
    }
});
