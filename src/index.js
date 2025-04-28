import './styles/main.css';
import { Game } from './js/game';
import { setupEventListeners } from './js/controls';
import { initializeAudio } from './js/audio';
import { setTheme } from './js/theme';

document.addEventListener('DOMContentLoaded', () => {
  // 初始化游戏
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建游戏实例
  const game = new Game(canvas, ctx);
  
  // 设置事件监听器
  setupEventListeners(game);
  
  // 初始化音频
  initializeAudio();
  
  // 设置默认主题
  setTheme('classic');
  
  // 更新UI显示
  game.updateScoreDisplay();
  
  // 显示开始信息
  game.showMessage('按"开始游戏"按钮开始!');
});
