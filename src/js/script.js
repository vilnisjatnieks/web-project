document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById('show-form-btn');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const addGameForm = document.getElementById('add-game-form');

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
});
