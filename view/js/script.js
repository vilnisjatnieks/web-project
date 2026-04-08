// this function makes it easier to fetch games
async function fetchGames() {
    return fetch('/games').then(r => r.json());
}

// this function is used in directory.html. it dynamically loads games into the CRUD table
async function loadGames() {
    const gamedata = document.getElementById('gamedata');
    if (!gamedata) return;
    try {
        const games = await fetchGames();
        gamedata.innerHTML = '';
        games.forEach(g => {
            const desc = (g.description || '').slice(0, 60) + (g.description?.length > 60 ? '…' : '');
            const row = document.createElement('tr');
            row.style.cursor = 'pointer';
            row.innerHTML = `<td>${g._id}</td><td>${g.name}</td><td>${g.developer}</td><td>${g.genre}</td><td>${desc}</td>`;
            row.addEventListener('click', () => showGame(g));
            gamedata.appendChild(row);
        });
    } catch (err) {
        console.error('Failed to fetch games', err);
        gamedata.innerHTML = '<tr><td colspan="6" class="text-danger">Failed to load games.</td></tr>';
    }
}

// this functions ensures that the game creation modal is cleared before the user accesses it again
function resetForm() {
    document.getElementById('modal-add-game-form')?.reset();
}

function showGame(g) {
    document.getElementById('gameViewTitle').textContent = g.name;
    document.getElementById('editTxtId').value = g._id;
    document.getElementById('editTxtName').value = g.name;
    document.getElementById('editTxtDeveloper').value = g.developer;
    document.getElementById('editTxtGenre').value = g.genre;
    document.getElementById('editTxtDescription').value = g.description || '';
    bootstrap.Modal.getOrCreateInstance(document.getElementById('gameViewModal')).show();
}

document.getElementById('modal-edit-game-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const res = await fetch('/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.target))
    });
    if (res.ok) {
        bootstrap.Modal.getInstance(document.getElementById('gameViewModal')).hide();
        loadGames();
    }
});

document.getElementById('deleteGameBtn')?.addEventListener('click', () => {
    document.getElementById('deleteGameName').textContent = document.getElementById('editTxtName').value;
    bootstrap.Modal.getOrCreateInstance(document.getElementById('gameDeleteModal')).show();
});

document.getElementById('confirmDeleteBtn')?.addEventListener('click', async () => {
    const id = document.getElementById('editTxtId').value;
    await fetch(`/deletegame/${id}`);
    bootstrap.Modal.getInstance(document.getElementById('gameDeleteModal')).hide();
    bootstrap.Modal.getInstance(document.getElementById('gameViewModal')).hide();
    loadGames();
});

// this function intercepts the modal form submit, POSTs the game to the backend, then closes the modal and refreshes the table
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

// this function provides the form toggle and sidebar on index.html
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
