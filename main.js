const quizData = [
    {
      question: 'Quem é Lady Gaga?',
      answers: [
        { text: 'É uma pintora', correct: false },
        { text: 'É uma cantora e atriz', correct: true },
        { text: 'É uma violinista', correct: false },
      ],
    },
    {
      question: 'Qual é o terceiro mês do ano?',
      answers: [
        { text: 'Março', correct: true },
        { text: 'Abril', correct: false },
        { text: 'Junho', correct: false },
      ],
    },
    {
      question: 'Qual foi o último album lançado por Charli XCX?',
      answers: [
        { text: 'Crash', correct: true },
        { text: 'How Im Feeling Now', correct: false },
        { text: 'Number 1 Angel', correct: false },
      ],
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const questionElement = document.getElementById('question');
  const answer1Element = document.getElementById('answer1Label');
  const answer2Element = document.getElementById('answer2Label');
  const answer3Element = document.getElementById('answer3Label');
  const answerElements = [answer1Element, answer2Element, answer3Element];
  const submitButton = document.getElementById('submit');
  const scoreElement = document.getElementById('score');
  const balloonsElement = document.getElementById('balloons');
  
  let currentQuestion = 0;
  let score = 0;
  let numCorrect = 0;
  let numWrong = 0;
  
  loadQuestion();
  
  function loadQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;
    answer1Element.innerText = question.answers[0].text;
    answer2Element.innerText = question.answers[1].text;
    answer3Element.innerText = question.answers[2].text;
  }
  
  function getSelectedAnswer() {
    let selectedAnswer;
  
    answerElements.forEach((answerElement) => {
      if (answerElement.previousElementSibling.checked) {
        selectedAnswer = answerElement;
      }
    });
  
    return selectedAnswer;
  }
  
  function deselectAnswers() {
    answerElements.forEach((answerElement) => {
      answerElement.previousElementSibling.checked = false;
    });
  }
  
  submitButton.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();
  
    if (selectedAnswer) {
      const answerText = selectedAnswer.innerText;
      const question = quizData[currentQuestion];
  
      if (answerText === question.answers.find((answer) => answer.correct).text) {
        score++;
        numCorrect++;
      } else {
        numWrong++;
      }
  
      currentQuestion++;
  
      if (currentQuestion < quizData.length) {
        loadQuestion();
        deselectAnswers();
      } else {
        quizContainer.style.display = 'none';
  
        const percentage = ((numCorrect / quizData.length) * 100).toFixed(0);
        scoreElement.innerHTML = `You scored ${score} out of ${quizData.length}.<br>Correct answers: ${numCorrect} (${percentage}%)<br>Incorrect answers: ${numWrong} (${(100 - percentage)}%)`;
  
        if (numCorrect === quizData.length) {
          balloonsElement.style.display = 'block';
          balloonsElement.classList.add('rise');
        }
      }
      
      submitButton.style.backgroundColor = numCorrect > numWrong ? '#8BC34A' : '#F44336';
    }
  });
  