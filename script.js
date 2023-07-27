let formPanel = document.getElementById("formPanel");
let quizPanel = document.getElementById("quizPanel");
let goBackBtn = document.getElementById("goBackBtn");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");
let question = document.getElementById("ques");
let opt = document.getElementById("opt");
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let termsInput = document.getElementById("terms");
let resultPanel = document.getElementById("resultPanel");
let currentQuestion = 0;

let formValues = {
  name: null,
  age: null,
  gender: null,
};

const questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "Extensible Markup Language",
    options: [
      "Extensible Markup Language",
      "Executable Multiple Language",
      "Extra Multi-Program Language",
      "Examine Multiple Language",
    ],
  },
];

const userAnswers = new Array(questions.length);

function validateForm() {
  let name = nameInput.value.trim();
  let age = ageInput.value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let terms = termsInput.checked;

  const nameRegex = /^[a-zA-Z\s]+$/;
  const ageRegex = /^\S[0-9]{0,2}$/;

  if (!nameRegex.test(name)) {
    nameInput.style.border = "5px solid blue";
    return false;
  } else {
    nameInput.style.border = "2px solid transparent";
  }

  if (!ageRegex.test(age) || parseInt(age) <= 0) {
    ageInput.style.border = "5px solid blue";
    return false;
  } else {
    ageInput.style.border = "2px solid transparent";
  }

  if (!gender) {
    return false;
  }

  if (!terms) {
    termsInput.style.outline = "3px solid blue";
    return false;
  } else {
    termsInput.style.outline = "none";
  }

  formPanel.style.display = "none";
  quizPanel.style.display = "block";
  loadQues();
  return false;
}

function handleNextButton(hasAnswer) {
  console.log(hasAnswer);
  nextBtn.style.display = hasAnswer ? "block" : "none";
  let radioBtns = document.querySelectorAll('[name="answer"]');
  radioBtns.forEach((btn) => {
    btn.addEventListener("change", (e) => {
      let status = currentQuestion === questions.length - 1;
      nextBtn.style.display = status ? "none" : "block";
      submitBtn.style.display = status ? "block" : "none";
    });
  });
}

function loadQues() {
  let optionsStatus = [];
  question.textContent = questions[currentQuestion].question;
  opt.innerHTML = "";
  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    let status =
      !!userAnswers[currentQuestion] && userAnswers[currentQuestion] === i;
    optionsStatus.push(status);
    let radioBtnTemplate = `<div>
    <input type="radio" name="answer" value="${i}" ${status && "checked"}/> 
    <label >${questions[currentQuestion].options[i]}</label>
    </div>`;
    opt.insertAdjacentHTML("beforeend", radioBtnTemplate);
  }
  let hasAnswer = optionsStatus.some((s) => s);
  handleNextButton(hasAnswer);
}

function prevQuestion() {
  checkAns();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQues();
  } else {
    formPanel.style.display = "block";
    quizPanel.style.display = "none";
    goBackBtn.style.display = "none";
  }
}

function nextQuestion() {
  checkAns();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQues();
  }
}

function checkAns() {
  let selectedOption = document.querySelector('[name="answer"]:checked');
  userAnswers[currentQuestion] = selectedOption
    ? parseInt(selectedOption.value)
    : null;
}

function submitQuiz() {
  checkAns();
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    console.log(
      `i = ${i}, userAnswers[i] = ${userAnswers[i]}, questions[i] = ${questions[i]}`
    );
    if (
      userAnswers[i] !== null &&
      questions[i].options[userAnswers[i]] === questions[i].answer
    ) {
      score++;
    }
  }

  quizPanel.style.display = "none";
  resultPanel.style.display = "block";
  resultPanel.classList.add("animate-in");

  formValues.name = nameInput.value.trim();
  formValues.age = ageInput.value;
  formValues.gender = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;

  let resultTable = document.getElementById("resultTable");
  resultTable.innerHTML = `
    <tr>
      <td>Name : </td>
      <td>${formValues.name}</td>
    </tr>
    <tr>
      <td>Age : </td>
      <td>${formValues.age}</td>
    </tr>
    <tr>
      <td>Gender : </td>
      <td>${formValues.gender}</td>
    </tr>
      <tr>
        <td>Score : </td>
        <td>You have scored ${score} out of ${questions.length} Questions</td>
      </tr>
  `;
  goBackBtn.style.display = "block";
}

function goBackToForm() {
  resultPanel.style.display = "none";
  formPanel.style.display = "block";
  goBackBtn.style.display = "none";
  window.location.reload();
}
