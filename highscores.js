let goBackBtn = document.getElementById('go-back-btn');
let clearScoresBtn = document.getElementById('clear-scores-btn');
let highscoreListEl = document.getElementById('highscore-list');

goBackBtn.addEventListener('click', () => {
    window.location = 'index.html'
})

clearScoresBtn.addEventListener('click', () => {
    localStorage.clear();
    highscoreListEl.innerHTML = 'No scores recorded';
})

let highscores = JSON.parse(localStorage.getItem('highscoreList'));

if (!highscores) {
    highscoreListEl.innerHTML = 'No scores recorded';
} else {
    for (let i = 0; i < highscores.length; i++) {
        let highscore = document.createElement('div');
        highscore.innerHTML = `${i + 1}. ${highscores[i].initial} - ${highscores[i].score}`;
        highscore.classList.add('highscore');
        highscoreListEl.appendChild(highscore);
    }
}