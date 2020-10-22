let goBackBtn = document.getElementById('go-back-btn');
let clearScoresBtn = document.getElementById('clear-scores-btn');

console.log(localStorage.getItem('highscoreList'));

goBackBtn.addEventListener('click', () => {
    window.location = 'index.html'
})

clearScoresBtn.addEventListener('click', () => {
    console.log('scores cleared');
    localStorage.clear();
})