const questions = [
    {
      question: 'Care este capitala Franței?',
      options: ['Berlin', 'Paris', 'Londra', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'Care este cel mai lung fluviu din lume?',
      options: ['Nil', 'Amazon', 'Yangtze', 'Mississippi'],
      correctAnswer: 'Amazon'
    },
    {
      question: 'Câte continente există pe Pământ?',
      options: ['3', '5', '7', '9'],
      correctAnswer: '7'
    },
    {
      question: 'Care este cel mai înalt munte din lume?',
      options: ['Everest', 'K2', 'Makalu', 'Lhotse'],
      correctAnswer: 'Everest'
    },
    {
      question: 'Ce ocean este considerat cel mai mare?',
      options: ['Oceanul Atlantic', 'Oceanul Indian', 'Oceanul Arctic', 'Oceanul Pacific'],
      correctAnswer: 'Oceanul Pacific'
    },
    {
      question: 'Câte limbi oficiale sunt recunoscute în Națiunile Unite?',
      options: ['1', '2', '3', '6'],
      correctAnswer: '6'
    },
    {
      question: 'În ce an a avut loc Revoluția Franceză?',
      options: ['1776', '1789', '1804', '1848'],
      correctAnswer: '1789'
    },
    {
      question: 'Cine a scris piesa "Romeo și Julieta"?',
      options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Leo Tolstoy'],
      correctAnswer: 'William Shakespeare'
    },
    {
      question: 'Câți ani a domnit regina Victoria în Regatul Unit?',
      options: ['50', '63', '76', '81'],
      correctAnswer: '63'
    },
    {
      question: 'Care este cel mai mare deșert din lume?',
      options: ['Deșertul Sahara', 'Deșertul Gobi', 'Deșertul Arctic', 'Deșertul Kalahari'],
      correctAnswer: 'Deșertul Sahara'
    },
    {
      question: 'Care este cel mai populat oraș din lume?',
      options: ['Tokyo', 'Beijing', 'Delhi', 'Shanghai'],
      correctAnswer: 'Tokyo'
    },
    {
      question: 'Cine a inventat becul?',
      options: ['Thomas Edison', 'Nikola Tesla', 'Alexander Graham Bell', 'Marie Curie'],
      correctAnswer: 'Thomas Edison'
    },
    {
      question: 'Câte state are SUA?',
      options: ['46', '50', '54', '48'],
      correctAnswer: '50'
    },
    {
      question: 'Care este cel mai mare animal din lume?',
      options: ['Elefantul African', 'Megalodon', 'Balena Albastră', 'Tiranosauros Rex'],
      correctAnswer: 'Balena Albastră'
    },
    {
      question: 'Cine a scris "O noapte furtunoasă"?',
      options: ['Ion Luca Caragiale', 'Mihai Eminescu', 'Liviu Rebreanu', 'Ion Creangă'],
      correctAnswer: 'Ion Luca Caragiale'
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
  
    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';
  
    questions[currentQuestionIndex].options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkAnswer(option));
      optionsContainer.appendChild(optionElement);
    });
  }
  
  function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
    if (selectedOption === correctAnswer) {
      score++;
    }
  
    document.getElementById('score').textContent = `Score: ${score}`;
  
  
    setTimeout(() => {
      nextQuestion();
    }, 1);
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }
  
  function endGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `<h1>Game Over</h1><p>Your final score is: ${score}</p>`;
  }
  
  // Initial display of the first question
  displayQuestion();
  