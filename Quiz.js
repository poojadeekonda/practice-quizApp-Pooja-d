// 1. Array of question objects
const questions = [
    {
        question: "What does DOM stand for?",
        choices: ["Document Object Model", "Display Object Management", "Digital Ordering Module", "Data Object Model"],
        correctIndex: 0
    },
    {
        question: "Which method is used to add an event handler to an element?",
        choices: ["attachEvent()", "addEventListener()", "handleEvent()", "onEvent()"],
        correctIndex: 1
    },
    {
        question: "How do you access the content of an HTML element in JavaScript?",
        choices: ["element.style", "element.class", "element.innerHTML", "element.data"],
        correctIndex: 2
    },
    {
        question: "Which of these is NOT a primitive data type in JavaScript?",
        choices: ["string", "boolean", "object", "number"],
        correctIndex: 2
    }
];

let currentQuestionIndex = 0;

// DOM Element References
const questionTextEl = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

// 2. Display Question Functionality
function loadQuestion() {
    // Check if the quiz is finished
    if (currentQuestionIndex >= questions.length) {
        questionTextEl.textContent = "Quiz Finished! Thank you for participating.";
        answerButtons.forEach(btn => btn.style.display = 'none'); // Hide answer buttons
        feedbackEl.textContent = "";
        nextBtn.style.display = 'none'; // Hide next button
        return;
    }

    const currentQ = questions[currentQuestionIndex];

    // Update question text
    questionTextEl.textContent = currentQ.question;

    // Update answer button text
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQ.choices[index];
        btn.disabled = false; // Re-enable buttons
        btn.style.display = 'block'; // Ensure buttons are visible for new questions
        btn.classList.remove('correct', 'incorrect'); // Clear previous styling
    });

    // Reset feedback and button state
    feedbackEl.textContent = "";
    feedbackEl.className = "";
    nextBtn.disabled = true;
}

// 3. Handle Answer Selection Functionality
function handleAnswerSelection(event) {
    const selectedButton = event.target;
    // Get the index of the chosen answer from the data-index attribute
    const selectedIndex = parseInt(selectedButton.dataset.index);
    const correctIndex = questions[currentQuestionIndex].correctIndex;

    // Check if the selected answer is correct
    if (selectedIndex === correctIndex) {
        feedbackEl.textContent = "Correct! 🎉";
        feedbackEl.classList.add('correct');
        selectedButton.classList.add('correct');
    } else {
        feedbackEl.textContent = "Incorrect. Try the next question!";
        feedbackEl.classList.add('incorrect');
        selectedButton.classList.add('incorrect');
        // Highlight the correct answer for visual feedback
        answerButtons[correctIndex].classList.add('correct');
    }

    // Disable all answer buttons after a selection
    answerButtons.forEach(btn => btn.disabled = true);

    // Enable the "Next Question" button
    nextBtn.disabled = false;
}

// Attach click event listeners to answer buttons (Run once)
answerButtons.forEach(button => {
    // We attach one listener that stays active for the whole quiz duration
    button.addEventListener('click', handleAnswerSelection);
});


// 4. Next Question Functionality
function goToNextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Attach event listener to the "Next Question" button (Run once)
nextBtn.addEventListener('click', goToNextQuestion);


// Start the quiz by loading the first question
loadQuestion();