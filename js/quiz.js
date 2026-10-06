const questions = [
    {
        question: "विद्युत आवेश की SI इकाई क्या है?",
        options: ["न्यूटन", "कूलॉम", "जूल", "वाट"],
        answer: 1
    },
    {
        question: "समान आवेशों के बीच क्या होता है?",
        options: ["आकर्षण", "प्रतिकर्षण", "कोई बल नहीं", "गुरुत्वाकर्षण"],
        answer: 1
    },
    {
        question: "विद्युत क्षेत्र किस प्रकार की राशि है?",
        options: ["अदिश", "सदिश", "दोनों", "कोई नहीं"],
        answer: 1
    },
    {
        question: "विद्युत फ्लक्स का सूत्र क्या है?",
        options: [
            "Φ = EA cos θ",
            "Φ = E/A",
            "Φ = E + A",
            "Φ = E − A"
        ],
        answer: 0
    },
    {
        question: "गॉस के नियम का सूत्र क्या है?",
        options: [
            "Φ = q/ε₀",
            "Φ = qε₀",
            "Φ = ε₀/q",
            "Φ = q + ε₀"
        ],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("quizQuestion");
const optionsElement = document.getElementById("quizOptions");
const feedbackElement = document.getElementById("quizFeedback");
const nextButton = document.getElementById("quizNext");
const currentElement = document.getElementById("quizCurrent");
const questionNoElement = document.getElementById("quizQuestionNo");
const progressBar = document.getElementById("quizProgressBar");

const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("quizResult");

const scoreElement = document.getElementById("quizScore");
const percentageElement = document.getElementById("quizPercentage");
const messageElement = document.getElementById("quizMessage");
const restartButton = document.getElementById("quizRestart");


function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    currentElement.textContent = currentQuestion + 1;

    questionNoElement.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    feedbackElement.style.display = "none";

    nextButton.style.display = "none";

    optionsElement.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "quiz-option";

        button.innerHTML = `
            <span class="quiz-option-letter">
                ${letters[index]}
            </span>
            ${option}
        `;

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        optionsElement.appendChild(button);
    });
}


function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];

    const buttons =
        optionsElement.querySelectorAll(".quiz-option");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }

        if (
            index === selected &&
            selected !== question.answer
        ) {
            button.classList.add("wrong");
        }
    });


    if (selected === question.answer) {

        score++;

        feedbackElement.className =
            "quiz-feedback success";

        feedbackElement.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            सही उत्तर! 🎉
        `;

    } else {

        feedbackElement.className =
            "quiz-feedback error";

        feedbackElement.innerHTML = `
            <i class="bi bi-x-circle-fill"></i>
            गलत उत्तर। सही उत्तर है:
            <strong>
                ${question.options[question.answer]}
            </strong>
        `;
    }

    feedbackElement.style.display = "flex";

    nextButton.style.display = "inline-flex";

    if (currentQuestion === questions.length - 1) {

        nextButton.innerHTML = `
            परिणाम देखें
            <i class="bi bi-trophy"></i>
        `;

    } else {

        nextButton.innerHTML = `
            अगला प्रश्न
            <i class="bi bi-arrow-right"></i>
        `;
    }
}


nextButton.addEventListener("click", function () {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        showResult();

    }

});


function showResult() {

    quizBox.style.display = "none";

    resultBox.style.display = "block";

    scoreElement.textContent = score;

    const percentage =
        Math.round((score / questions.length) * 100);

    percentageElement.textContent =
        percentage + "%";


    if (percentage >= 80) {

        messageElement.textContent =
            "शानदार! आपकी तैयारी बहुत अच्छी है। 🎉";

    } else if (percentage >= 60) {

        messageElement.textContent =
            "बहुत अच्छा! थोड़ी और practice करें। 👍";

    } else {

        messageElement.textContent =
            "Notes को दोबारा पढ़ें और फिर से test दें। 💪";
    }
}


restartButton.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    quizBox.style.display = "block";

    resultBox.style.display = "none";

    loadQuestion();

});


loadQuestion();