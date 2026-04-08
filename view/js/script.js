async function fetchGames() {
    return fetch('/games').then(r => r.json());
}

// directory.html — load games into table
async function loadGames() {
    const gamedata = document.getElementById('gamedata');
    if (!gamedata) return;
    try {
        const games = await fetchGames();
        gamedata.innerHTML = games.map(g => {
            const desc = (g.description || '').slice(0, 60) + (g.description?.length > 60 ? '…' : '');
            return `<tr><td><input type="checkbox"></td><td>${g._id}</td><td>${g.name}</td><td>${g.developer}</td><td>${g.genre}</td><td>${desc}</td></tr>`;
        }).join('');
    } catch (err) {
        console.error('Failed to fetch games', err);
        gamedata.innerHTML = '<tr><td colspan="6" class="text-danger">Failed to load games.</td></tr>';
    }
}

function resetForm() {
    document.getElementById('modal-add-game-form')?.reset();
}

document.getElementById('modal-add-game-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const res = await fetch('/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.target))
    });
    if (res.ok) {
        bootstrap.Modal.getInstance(document.getElementById('gameFormModal')).hide();
        resetForm();
        loadGames();
    }
});

loadGames();

// index.html — form toggle + sidebar
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('show-form-btn')?.addEventListener('click', () => {
        document.getElementById('add-game-form').style.display = 'block';
        document.getElementById('show-form-btn').style.display = 'none';
    });
    document.getElementById('cancel-form-btn')?.addEventListener('click', () => {
        document.getElementById('add-game-form').style.display = 'none';
        document.getElementById('show-form-btn').style.display = 'block';
    });

    const gamesList = document.getElementById('games-list');
    if (gamesList) {
        try {
            const games = await fetchGames();
            gamesList.innerHTML = games.map(g => `
                <div class="list-group-item">
                    <h6 class="mb-1">${g.name}</h6>
                    <small class="text-muted">${g.developer} &mdash; ${g.genre}</small>
                    <p class="mb-0 mt-1 small">${g.description}</p>
                </div>`).join('');
        } catch (err) {
            console.error('Failed to fetch games', err);
            gamesList.innerHTML = '<p class="text-danger">Failed to load games.</p>';
        }
    }
});
