export function setupEventListeners(game) {
  // 键盘控制
  document.addEventListener('keydown', (event) => {
    // 方向控制
    switch (event.key) {
      case 'ArrowUp':
        game.snake.setDirection('up');
        event.preventDefault();
        break;
      case 'ArrowDown':
        game.snake.setDirection('down');
        event.preventDefault();
        break;
      case 'ArrowLeft':
        game.snake.setDirection('left');
        event.preventDefault();
        break;
      case 'ArrowRight':
        game.snake.setDirection('right');
        event.preventDefault();
        break;
      case ' ': // 空格键
        const isPaused = game.togglePause();
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.textContent = isPaused ? '继续' : '暂停';
        event.preventDefault();
        break;
    }
  });

  // 按钮控制
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const restartBtn = document.getElementById('restartBtn');

  // 开始按钮
  startBtn.addEventListener('click', () => {
    if (!game.gameInterval) {
      game.start();
      pauseBtn.textContent = '暂停';
    }
  });

  // 暂停按钮
  pauseBtn.addEventListener('click', () => {
    const isPaused = game.togglePause();
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
  });

  // 重新开始按钮
  restartBtn.addEventListener('click', () => {
    game.start();
    pauseBtn.textContent = '暂停';
  });

  // 难度选择
  const easyBtn = document.getElementById('easyBtn');
  const mediumBtn = document.getElementById('mediumBtn');
  const hardBtn = document.getElementById('hardBtn');

  easyBtn.addEventListener('click', () => {
    game.setDifficulty('easy');
  });

  mediumBtn.addEventListener('click', () => {
    game.setDifficulty('medium');
  });

  hardBtn.addEventListener('click', () => {
    game.setDifficulty('hard');
  });

  // 主题选择
  const classicTheme = document.getElementById('classicTheme');
  const modernTheme = document.getElementById('modernTheme');
  const retroTheme = document.getElementById('retroTheme');

  classicTheme.addEventListener('click', () => {
    setActiveThemeButton(classicTheme);
    import('./theme').then(module => {
      module.setTheme('classic');
    });
  });

  modernTheme.addEventListener('click', () => {
    setActiveThemeButton(modernTheme);
    import('./theme').then(module => {
      module.setTheme('modern');
    });
  });

  retroTheme.addEventListener('click', () => {
    setActiveThemeButton(retroTheme);
    import('./theme').then(module => {
      module.setTheme('retro');
    });
  });

  // 设置活动主题按钮
  function setActiveThemeButton(activeButton) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeButton.classList.add('active');
  }
}
