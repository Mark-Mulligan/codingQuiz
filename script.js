/* GLOBAL VARIABLES */
let answersCorrect = 0;
let questionsAsked = 0;
let questionOrder = [0, 1, 2, 3, 4];
let totalSeconds = 50;
let endQuiz = false;
let quizQuestions = [{
        question: 'What is a JavaScript element that represents either TRUE or FALSE values?',
        answers: ['Condition', 'Boolean', 'RegExp', 'Event'],
        correctAns: 'Boolean'
    },
    {
        question: 'What is the format called that is used for storing and transporting data in Javascript?',
        answers: ['Syntax', 'Font', 'JSON', 'HTML'],
        correctAns: 'JSON'
    },
    {
        question: 'In JavaScript, what is a block of code called that is used to perform a specific task?',
        answers: ['Declaration', 'Variable', 'String', 'Function'],
        correctAns: 'Function'
    },
    {
        question: 'What is the default behavior called that is used to move declarations to the top of the current scope?',
        answers: ['Jumping', 'Hoisting', 'Sorting', 'Arranging'],
        correctAns: 'Hoisting'
    },
    {
        question: 'What are the identifiers called that cannot be used as variables or function names?',
        answers: ['Reserved Words', 'Favorites', 'Constants', 'Concrete Terms'],
        correctAns: 'Reserved Words'
    }
];

let highscores = [];
//Sets highscores if they are in memory
if (localStorage.getItem('highscoreList')) {
    highscores = JSON.parse(localStorage.getItem('highscoreList'));
}

/* ELEMENT SELECTORS */
let startBtn = document.getElementById('start-btn');
let titleContainer = document.querySelector('.title-container');
let questionWrapper = document.createElement('div');
let questionContainer = document.createElement('div');
questionContainer.classList.add('container', 'question-container');

startBtn.addEventListener('click', () => {
    randomizeQuestions(questionOrder);
    titleContainer.classList.add('hidden');
    document.body.appendChild(questionWrapper);
    questionWrapper.appendChild(questionContainer);

    createTimerElement();
    generateQuestion();
    generateAnswerResult();

    let timerDipsplay = document.getElementById('timer-display');

    let timer = setInterval(function () {
        if (totalSeconds <= 0 || endQuiz) {
            clearInterval(timer);
            if (totalSeconds <= 0) totalSeconds = 0;
            timerDipsplay.innerText = totalSeconds;
            quizOver();
        } else {
            totalSeconds--;
            timerDipsplay.innerText = totalSeconds;
        }
    }, 1000)
})

function randomizeQuestions(array) {
    let index = 0;
    let newArr = [];

    while (array.length > 0) {
        index = Math.floor(Math.random() * Math.floor(array.length));
        newArr.push(array.splice(index, 1));
    }
    questionOrder = newArr.flat();
}

function createTimerElement() {
    let timerContainer = makeElementAddClasses('div', ['timer-container']);
    let timerDisplay = makeElementAddTextAndClass('p', 'Time: ', ['timer-display']);
    let timerInner = makeElementAddTextAndClass('span', '50', ['timer-inner']);
    timerInner.setAttribute('id', 'timer-display');

    timerDisplay.appendChild(timerInner);
    timerContainer.appendChild(timerDisplay);
    questionContainer.appendChild(timerContainer);
}

function generateQuestion() {
    let question = makeElementAddClasses('p', ['question']);
    questionContainer.appendChild(question);
    let divider = document.createElement('hr');
    questionContainer.appendChild(divider);
    let answers = makeElementAddClasses('div', ['answers-container']);

    for (let i = 0; i < 4; i++) {
        let answer = makeElementAddClasses('div', ['answer']);
        answer.addEventListener('click', handleAnswerClick);
        answers.appendChild(answer);
    }
    questionContainer.appendChild(answers);
    showQuestion();
    showAnswers();
}

function generateAnswerResult() {
    let answerResultContainer = makeElementAddClasses('div', ['hidden']);
    answerResultContainer.setAttribute('id', 'answer-result-container');
    let seperator = document.createElement('hr');
    answerResultContainer.appendChild(seperator);
    let answerResult = makeElementAddTextAndClass('p', 'Correct', ['answer-result-text']);
    answerResultContainer.appendChild(answerResult);
    questionContainer.appendChild(answerResultContainer);
}

function showAnswerResult(result) {
    let answerResultContainerEl = document.getElementById('answer-result-container');
    let answerResultText = document.querySelector('.answer-result-text');
    answerResultText.innerText = result;
    answerResultContainerEl.classList.remove('hidden');

    setTimeout(() => {
        answerResultContainerEl.classList.add('hidden');
    }, 1000)
}

function showQuestion() {
    let questionText = quizQuestions[questionOrder[questionsAsked]].question;
    let questionEl = document.querySelector('.question');
    questionEl.innerText = questionText;
}

function showAnswers() {
    let currentQuestion = questionOrder[questionsAsked];
    let answerElArray = document.querySelectorAll('.answer');

    for (let i = 0; i < answerElArray.length; i++) {
        answerElArray[i].innerText = quizQuestions[currentQuestion].answers[i];
    }
}

function handleAnswerClick(e) {
    if (e.target.innerText === quizQuestions[questionOrder[questionsAsked]].correctAns) {
        showAnswerResult('Correct');
        answersCorrect++;
        totalSeconds += 10;
    } else {
        showAnswerResult('Incorrect');
        totalSeconds -= 10;
    }
    questionsAsked++;

    if (questionsAsked < 5) {
        showQuestion();
        showAnswers();
    } else {
        endQuiz = true;
    }
}

/* handles generating the elements when the quiz is over and logging score data */
function quizOver() {
    hideElement('.question');
    hideElement('.answers-container');
    hideElement('hr');

    let quizResultContainer = makeElementAddClasses('form', ['custom-container']);
    quizResultContainer.setAttribute('method', 'POST');
    let quizOverText = makeElementAddTextAndClass('h2', 'Quiz Over!', ['result-text']);
    let quizScoreText = makeElementAddTextAndClass('h3', `Score: ${totalSeconds}`, ['result-text']);
    let highScoreInputDiv = makeElementAddClasses('div', ['form-group']);

    let initialsInput = makeElementAddClasses('input', ['form-control', 'text-center']);
    initialsInput.setAttribute('name', 'initialsInput');
    initialsInput.setAttribute('id', 'initialsInput');
    let inputLabel = makeElementAddTextAndClass('label', 'Enter Initials', ['input-lable']);
    inputLabel.setAttribute('for', 'initialsInput');
    let submitScoreBtn = makeElementAddTextAndClass('button', 'Submit Score', ['btn', 'btn-custom', 'btn-lg', 'mt-4']);
    submitScoreBtn.setAttribute('type', 'submit');

    highScoreInputDiv.appendChild(inputLabel);
    highScoreInputDiv.appendChild(initialsInput);
    highScoreInputDiv.appendChild(submitScoreBtn);

    quizResultContainer.appendChild(quizOverText);
    quizResultContainer.appendChild(quizScoreText);
    quizResultContainer.appendChild(highScoreInputDiv);

    questionContainer.insertBefore(quizResultContainer, questionContainer.firstChild);

    submitScoreBtn.addEventListener('click', (e) => {
        event.preventDefault();
        let initials = document.getElementById("initialsInput").value;
        let twoletters = /[a-z][a-z]/i

        if (initials.length === 2 && twoletters.test(initials)) {
            let highscore = {
                initial: initials,
                score: totalSeconds
            }
            highscores.push(highscore);
            //sorts scores from largest to smallest
            highscores = highscores.sort((a, b) => b.score - a.score);
            localStorage.setItem('highscoreList', JSON.stringify(highscores));
            localStorage.getItem('highscoreList');
            window.location = 'highscores.html';
        } else {
            alert('Invalid Input. Please enter two letters');
        }
    })
}

/* UTILITY FUNCTIONS */
function makeElementAddClasses(type, classesArr) {
    let newElement = document.createElement(type);
    classesArr.forEach(className => newElement.classList.add(className));
    return newElement;
}

function makeElementAddTextAndClass(type, text, classesArr) {
    let newElement = makeElementAddClasses(type, classesArr);
    newElement.innerText = text;
    return newElement;
}

function hideElement(target) {
    let element = document.querySelector(target);
    element.classList.add('hidden');
}