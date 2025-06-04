const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "Which language runs in a browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets"
    ],
    answer: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<src>"],
    answer: 0
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Apple", "Google"],
    answer: 1
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: 2
  }
];

let currentIndex = 0;
let score = 0;
let userName = "";

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function login() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();

  if (!name || !email) {
    showPopup("Please enter your name and email.");
    return;
  }

  userName = name;
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  document.getElementById("welcomeMsg").innerText = `Hi, ${userName}! Let's begin.`;

  loadQuestion();
}

function signup() {
  // Same as login, could be extended for real use
  login();
}

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const optionButtons = document.querySelectorAll(".option-btn");
  const currentQuiz = quizData[currentIndex];

  questionEl.innerText = currentQuiz.question;
  optionButtons.forEach((btn, i) => {
    btn.innerText = currentQuiz.options[i];
    btn.disabled = false;
    btn.style.background = "#444";
    btn.style.color = "#fff";
  });

  document.getElementById("nextBtn").disabled = true;
}

function selectAnswer(selected) {
  const correct = quizData[currentIndex].answer;
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) {
      btn.style.background = "green";
    } else if (i === selected) {
      btn.style.background = "red";
    }
  });

  showPopup(selected === correct ? "✅ Correct!" : "❌ Wrong!");
  if (selected === correct) score++;

  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizScreen").innerHTML = `
    <h2>Well done, ${userName}! You scored ${score} out of ${quizData.length} 🎉</h2>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerText = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 1500);
}
