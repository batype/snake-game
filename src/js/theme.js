export function setTheme(themeName) {
  // 移除所有主题类
  document.body.classList.remove('theme-classic', 'theme-modern', 'theme-retro');
  
  // 添加选择的主题类
  if (themeName !== 'classic') {
    document.body.classList.add(`theme-${themeName}`);
  }
  
  // 更新UI
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`${themeName}Theme`).classList.add('active');
  
  // 根据主题更新蛇和食物的颜色
  updateGameColors(themeName);
}

function updateGameColors(themeName) {
  // 获取游戏实例
  const gameCanvas = document.getElementById('gameCanvas');
  if (!gameCanvas) return;
  
  const game = gameCanvas.game;
  if (!game || !game.snake || !game.food) return;
  
  // 根据主题设置颜色
  switch (themeName) {
    case 'classic':
      game.snake.headColor = '#4CAF50';
      game.snake.bodyColor = '#8BC34A';
      game.food.color = '#e74c3c';
      break;
    case 'modern':
      game.snake.headColor = '#3498db';
      game.snake.bodyColor = '#2980b9';
      game.food.color = '#e67e22';
      break;
    case 'retro':
      game.snake.headColor = '#39ff14';
      game.snake.bodyColor = '#32cd32';
      game.food.color = '#ff0000';
      break;
  }
}
