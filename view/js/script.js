// directory.html — populate games table
function loadGames() {
    const gamedata = document.getElementById('gamedata');
    if (!gamedata) return;
    fetch('/games')
        .then(res => res.json())
        .then(games => {
            gamedata.innerHTML = '';
            games.forEach(game => {
                const row = document.createElement('tr');
                const desc = game.description || '';
                const truncated = desc.length > 60 ? desc.slice(0, 60) + '…' : desc;
                row.innerHTML = `
                    <td><input type="checkbox" /></td>
                    <td>${game._id}</td>
                    <td>${game.name}</td>
                    <td>${game.developer}</td>
                    <td>${game.genre}</td>
                    <td>${truncated}</td>
                `;
                gamedata.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Failed to fetch games', err);
            document.getElementById('gamedata').innerHTML =
                '<tr><td colspan="6" class="text-danger">Failed to load games.</td></tr>';
        });
}

loadGames();

function resetForm() {
    const form = document.getElementById('modal-add-game-form');
    if (form) form.reset();
}

// intercept modal form submit — stay on directory.html
const modalForm = document.getElementById('modal-add-game-form');
if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        fetch('/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(modalForm))
        })
        .then(res => {
            if (res.ok) {
                bootstrap.Modal.getInstance(document.getElementById('gameFormModal')).hide();
                resetForm();
                loadGames();
            }
        })
        .catch(err => console.error('Failed to save game', err));
    });
}

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
