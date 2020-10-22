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

let startBtn = document.getElementById('start-btn');
let titleContainer = document.querySelector('.title-container');
let questionWrapper = document.createElement('div');
let questionContainer = document.createElement('div');
questionContainer.classList.add('container', 'question-container');

startBtn.addEventListener('click', () => {
    randomizeQuestions(questionOrder);
    console.log(questionOrder);
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
            timerDipsplay.innerText = totalSeconds;
            quizOver();
        } else {
            totalSeconds--;
            timerDipsplay.innerText = totalSeconds;
        }
    }, 1000)
})

function createTimerElement() {
    let timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');
    let timerDisplay = document.createElement('p');
    let timerInner = document.createElement('span');
    timerDisplay.innerText = 'Time: ';
    timerInner.innerText = '50';
    timerDisplay.appendChild(timerInner);
    timerInner.setAttribute('id', 'timer-display');
    timerContainer.appendChild(timerDisplay);
    questionContainer.appendChild(timerContainer);
}

function randomizeQuestions(array) {
    let index = 0;
    let newArr = [];

    while (array.length > 0) {
        index = Math.floor(Math.random() * Math.floor(array.length));
        newArr.push(array.splice(index, 1));
    }
    questionOrder = newArr.flat();
}

function generateQuestion() {
    let question = document.createElement('p');
    question.classList.add('question');
    questionContainer.appendChild(question);

    let divider = document.createElement('hr');
    questionContainer.appendChild(divider);

    let answers = document.createElement('div');
    answers.classList.add('answers-container');

    for (let i = 0; i < 4; i++) {
        let answer = document.createElement('div');
        answer.classList.add('answer');
        answer.addEventListener('click', handleAnswerClick);
        answers.appendChild(answer);
    }
    questionContainer.appendChild(answers);
    showQuestion();
    showAnswers();
}

function generateAnswerResult () {
    let answerResultContainer = document.createElement('div');
    answerResultContainer.setAttribute('id', 'answer-result-container');
    answerResultContainer.classList.add('hidden');
    let seperator = document.createElement('hr');
    answerResultContainer.appendChild(seperator);
    let answerResult = document.createElement('p');
    answerResult.classList.add('answer-result-text');
    answerResult.innerText = 'Correct';
    answerResultContainer.appendChild(answerResult);
    questionContainer.appendChild(answerResultContainer);
}

function showAnswerResult (result) {
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
        console.log('quiz over');
        endQuiz = true;
    }
}

function quizOver() {
    hideElement('.question');
    hideElement('.answers-container');
    hideElement('hr');

    let quizResultContainer = document.createElement('form');
    quizResultContainer.classList.add('quiz-result-container');
    quizResultContainer.setAttribute('method', 'POST');
    //quizResultContainer.setAttribute('action', 'highscores.html');

    let quizOverText = document.createElement('h3');
    quizOverText.innerText = 'Quiz Over!';
    quizOverText.classList.add('result-text');
    let quizScoreText = document.createElement('h3');
    quizScoreText.innerText = `Score: ${totalSeconds}`;
    quizScoreText.classList.add('result-text');

    let highScoreInputDiv = document.createElement('div');
    highScoreInputDiv.classList.add('form-group');
    let initialsInput = document.createElement('input');
    initialsInput.setAttribute('name', 'initialsInput');
    initialsInput.classList.add('form-control', 'text-center');
    initialsInput.setAttribute('id', 'initialsInput');
    let inputLabel = document.createElement('label');
    initialsInput.setAttribute('for', 'initialsInput');
    inputLabel.innerText = 'Enter Initials';

    //let link = document.createElement('a');
    //link.setAttribute('href', 'highscores.html');
    let submitScoreBtn = document.createElement('button');
    submitScoreBtn.innerText = 'Submit Score';
    submitScoreBtn.classList.add('btn', 'btn-secondary', 'mt-2');
    submitScoreBtn.setAttribute('type', 'submit');
    submitScoreBtn.setAttribute('onclick', './highscores.html');
    //link.appendChild(submitScoreBtn);
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
        highscores.push(`${initials} - ${totalSeconds}`);
        console.log(highscores);
        console.log('button clicked');
        window.location = 'highscores.html';
    })
}
//someParentObject.insertBefore(someChildObject,someParentObject.firstChild)

function hideElement(target) {
    let element = document.querySelector(target);
    element.classList.add('hidden');
}