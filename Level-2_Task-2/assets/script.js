// Store quizzes
let quizzes = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

// Show and hide sections
function showCreateQuiz() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('createQuizPage').classList.remove('hidden');
  document.getElementById('quizListPage').classList.add('hidden');
  document.getElementById('takeQuizPage').classList.add('hidden');
  document.getElementById('resultPage').classList.add('hidden');
}

function showQuizList() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('createQuizPage').classList.add('hidden');
  document.getElementById('quizListPage').classList.remove('hidden');
  document.getElementById('takeQuizPage').classList.add('hidden');
  document.getElementById('resultPage').classList.add('hidden');
  renderQuizList();
}

function showTakeQuiz(quizIndex) {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('createQuizPage').classList.add('hidden');
  document.getElementById('quizListPage').classList.add('hidden');
  document.getElementById('takeQuizPage').classList.remove('hidden');
  currentQuiz = quizzes[quizIndex];
  currentQuestionIndex = 0;
  score = 0;
  renderQuestion();
}

function showResult() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('createQuizPage').classList.add('hidden');
  document.getElementById('quizListPage').classList.add('hidden');
  document.getElementById('takeQuizPage').classList.add('hidden');
  document.getElementById('resultPage').classList.remove('hidden');
  document.getElementById('score').textContent = `Your score is ${score} / ${currentQuiz.questions.length}`;
}

// Quiz Creation Form
document.getElementById('quizForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const question = document.getElementById('question').value;
  const options = [
    document.getElementById('option1').value,
    document.getElementById('option2').value,
    document.getElementById('option3').value,
    document.getElementById('option4').value,
  ];
  const correctAnswer = parseInt(document.getElementById('correctAnswer').value);

  if (!currentQuiz) {
    currentQuiz = { questions: [] };
    quizzes.push(currentQuiz);
  }

  currentQuiz.questions.push({ question, options, correctAnswer });

  // Clear form
  document.getElementById('quizForm').reset();
});

// Render Quiz List
function renderQuizList() {
  const quizList = document.getElementById('quizList');
  quizList.innerHTML = '';

  quizzes.forEach((quiz, index) => {
    const li = document.createElement('li');
    li.textContent = `Quiz ${index + 1}`;
    li.onclick = () => showTakeQuiz(index);
    quizList.appendChild(li);
  });
}

// Render Quiz Questions
function renderQuestion() {
  const quizContainer = document.getElementById('quizContainer');
  const question = currentQuiz.questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <h3>${question.question}</h3>
    ${question.options
      .map(
        (option, index) =>
          `<div><input type="radio" name="answer" value="${index + 1}"> ${option}</div>`
      )
      .join('')}
  `;
}

// Submit Quiz
function submitQuiz() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const answerValue = parseInt(selectedAnswer.value);
    if (answerValue === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
      score++;
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  } else {
    alert('Please select an answer.');
  }
}
