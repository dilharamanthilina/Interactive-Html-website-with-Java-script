const quizData = [
  {
    question: "What is a football club named after a city among these?",
	options: ["Polonnaruwa", "Newyork", "Paris", "Madrid"],
    correct: "Madrid"
  },
  {
    question: "The first football match was hosted in?",
    options: ["1990", "1890", "1869", "1969"],
    correct: "1869"
  },
  {
    question: "Which footballer holds the record for the highest number of assists in the Premier League?",
    options: ["Cesc Fabregas", "Paul Scholes", "Ryan Giggs", "Frank Lampard"],
    correct: "Frank Lampard"
  },
  {
    question: "Who is the current top scorer in the UEFA Champions League?",
    options: ["Cristiano Ronaldo", "Robert Lewandowski", "Thierry Henry", "Alan Shearer"],
    correct: "Cristiano Ronaldo"
  },
  {
    question: "Which is not a football club in Sri Lanka?",
    options: ["Real Madrid FC", "Air Force SC", "Colombo FC", "Blue Star SC"],
    correct: "Real Madrid FC"
  },
  {
    question: "Which equipment is not used in football?",
    options: ["Bat", "Ball", "Shin guards", "Boots"],
    correct: "Bat"
  },
  {
    question: "To players who get red cards which of the following happens?",
    options: ["Allowed to play", "Not allowed to play", "Allowed to play in later half", "Not allowed to play in later half"],
    correct: "Not allowed to play"
  },
  {
    question: "Who is not a member of any team?",
    options: ["Coach", "Goal Keeper", "Referee", "Defender"],
    correct: "Referee"
  },
  {
    question: "What is the meaning of 'FIFA' in English?",
    options: ["International Association Football Federation", "International Federation Of Football", "Federation of International Football Association", " Football Federation"],
    correct: "International Association Football Federation"
  },
  {
    question: "When was the last FIFA world cup held?",
    options: ["2016", "2022", "2023", "2018"],
    correct: "2022"
  }
 
  
  
];
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const resultElement = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const startBox = document.getElementById("start-box");
const endBox = document.getElementById("end-box");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let secondsRemaining = 60;
let timerInterval;
let totalQuestions = quizData.length;

function startQuiz() {
  startBox.style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  loadQuestion();
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}
function updateTimer() {
  secondsRemaining--;
  timerElement.textContent = `Time remaining: ${secondsRemaining} seconds`;

  if (secondsRemaining <= 0) {
    clearInterval(timerInterval);
    secondsRemaining = 0; 
    timerElement.textContent = `Time remaining: ${secondsRemaining} seconds`;
    showEndBox(); 
  }
}


function loadQuestion() {
  answered = false;
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const optionBox = document.createElement("div");
    optionBox.classList.add("option-box");
    optionBox.textContent = option;


    optionBox.removeEventListener("click", () => selectAnswer(optionBox, option));
    optionBox.removeEventListener("click", checkAnswer);

    optionBox.addEventListener("click", () => selectAnswer(optionBox, option));
    optionsContainer.appendChild(optionBox);
  });


  const optionBoxes = document.querySelectorAll(".option-box");
  optionBoxes.forEach(box => {
    box.style.backgroundColor = "";
  });

  submitButton.style.display = answered ? "none" : "block";
  nextButton.style.display = answered ? "block" : "none";
}

function selectAnswer(optionBox, selectedOption) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (answered) return;

  answered = true;
  if (selectedOption === currentQuestion.correct) {
    score++;
    optionBox.style.backgroundColor = "green";
  } else {
    optionBox.style.backgroundColor = "red";
    const correctOptionBox = Array.from(optionsContainer.children).find(box => box.textContent === currentQuestion.correct);
    correctOptionBox.style.backgroundColor = "green";
  }

  submitButton.style.display = "none";
  nextButton.style.display = "block";

  if (answered) {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
      setTimeout(loadQuestion, 1000); 
    } else {
      clearInterval(timerInterval);
      setTimeout(showEndBox, 1000);
    }
  }
}

function checkAnswer() {

}

function showEndBox() {
  clearInterval(timerInterval);
  const quizContainer = document.querySelector(".quiz-container");

  const correctAnswers = score;
  const percentageCorrect = (correctAnswers / totalQuestions) * 100;

  let colorClass;
  if (percentageCorrect >= 70) {
    colorClass = "green";
  } else if (percentageCorrect >= 40) {
    colorClass = "orange";
  } else {
    colorClass = "red";
  }

  const endBoxContent = `
    <div class="end-box-content">
      <h2>Quiz Ended</h2>
      <p>Time taken: ${60 - secondsRemaining} seconds</p>
      <p class="result-text">Correct answers: <span class="${colorClass}">${correctAnswers}</span> out of <span>${totalQuestions}</span></p>
    </div>
  `;

  quizContainer.innerHTML = endBoxContent;
  quizContainer.style.display = "flex";
  quizContainer.style.justifyContent = "center";
  quizContainer.style.alignItems = "center";
  quizContainer.style.height = "10vh";
}






const startButton = document.querySelector("#start-box button");
startButton.addEventListener("click", startQuiz);


submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", selectAnswer);
