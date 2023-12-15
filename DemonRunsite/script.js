const demonrun = document.querySelector('.demonrun');
const monstro = document.querySelector('.monstro');
const start = document.querySelector('.start');
const startMessage = document.getElementById('start-message');
const gameOver = document.querySelector('.game-over');
const scoreElement = document.getElementById('score');
let gameInterval;
let score = 0;


const startGame = () => {
  monstro.classList.add('monstro-animation');
  start.style.display = 'none';
  startMessage.style.display = 'none';

 
  gameInterval = setInterval(() => {
    increaseScore();
    updateScore();
  }, 100);
};

const hideStartMessage = () => {
  startMessage.style.display = 'none';
  startGame();
};

const restartGame = () => {
  gameOver.style.display = 'none';
  monstro.style.left = '';
  monstro.style.right = '0';
  demonrun.style.bottom = '0';
  start.style.display = 'none';
  startMessage.style.display = 'block';
  
  resetScore();
  



 
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      increaseScore();
      updateScore();
    }, 100);
  }
};

const jump = () => {
  demonrun.classList.add('jump');

  setTimeout(() => {
    demonrun.classList.remove('jump');
  }, 800);
};

const loop = () => {
  setInterval(() => {
    const monstroPosition = monstro.offsetLeft;
    const demonrunPosition = parseInt(
      window.getComputedStyle(demonrun).bottom.replace('px', '')
    );

    if (monstroPosition <= 90 && monstroPosition > 0 && demonrunPosition < 80) {
      monstro.classList.remove('monstro-animation');
      monstro.style.left = `${monstroPosition}px`;

      demonrun.classList.remove('jump');
      demonrun.style.bottom = `${demonrunPosition}px`;

      clearInterval(gameInterval);
      
      gameOver.style.display = 'flex';
    }
  }, 10);
};

const increaseScore = () => {
  score += 10;
};

const resetScore = () => {
  score = 0;
};

const updateScore = () => {
  scoreElement.innerText = `HS: ${score}`;
};




const saveScore = () => {
  const playerName = prompt('Digite seu nome:');
  if (playerName) {
    const data = { playerName, score };

    
    fetch('http://localhost:3000/api/salvar-pontuacao', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
      .then(response => response.json())
      .then(result => {
        console.log(result);
        restartGame();
      })
      .catch(error => {
        console.error('Erro ao salvar pontuação:', error);
      });
  }
};


loop();

document.addEventListener('keypress', (e) => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
  } else if (tecla === 'Enter') {
    hideStartMessage();
  }
});

document.addEventListener('touchstart', (e) => {
  if (e.touches.length) {
    jump();
  }
});



