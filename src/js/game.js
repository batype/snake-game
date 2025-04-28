import { Snake } from './snake';
import { Food } from './food';
import { playSound } from './audio';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gridSize = 20; // 每个网格的大小
    this.gridWidth = canvas.width / this.gridSize;
    this.gridHeight = canvas.height / this.gridSize;
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.score = 0;
    this.highScore = localStorage.getItem('snakeHighScore') || 0;
    this.speed = 150; // 初始速度，毫秒每帧
    this.gameInterval = null;
    this.isPaused = false;
    this.isGameOver = false;
    this.difficulty = 'easy'; // 默认难度
    
    // 更新高分显示
    document.getElementById('highScore').textContent = this.highScore;
  }

  // 开始游戏
  start() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    
    this.snake = new Snake(this);
    this.food.generateNew();
    this.score = 0;
    this.updateScoreDisplay();
    this.isGameOver = false;
    this.isPaused = false;
    
    // 根据难度设置速度
    this.setDifficulty(this.difficulty);
    
    // 开始游戏循环
    this.gameInterval = setInterval(() => this.gameLoop(), this.speed);
    
    // 清除消息
    this.showMessage('');
    
    // 播放开始音效
    playSound('start');
  }

  // 游戏主循环
  gameLoop() {
    if (this.isPaused || this.isGameOver) return;
    
    // 移动蛇
    this.snake.move();
    
    // 检查是否吃到食物
    if (this.checkFoodCollision()) {
      this.snake.grow();
      this.food.generateNew();
      this.increaseScore();
      
      // 播放吃食物音效
      playSound('eat');
      
      // 根据得分增加速度
      this.increaseSpeed();
    }
    
    // 检查碰撞
    if (this.checkCollision()) {
      this.gameOver();
      return;
    }
    
    // 绘制游戏
    this.draw();
  }

  // 绘制游戏
  draw() {
    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 绘制网格背景
    this.drawGrid();
    
    // 绘制食物
    this.food.draw(this.ctx);
    
    // 绘制蛇
    this.snake.draw(this.ctx);
  }

  // 绘制网格
  drawGrid() {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.lineWidth = 0.5;
    
    // 绘制垂直线
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    // 绘制水平线
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  // 检查食物碰撞
  checkFoodCollision() {
    const head = this.snake.body[0];
    return head.x === this.food.position.x && head.y === this.food.position.y;
  }

  // 检查碰撞（墙壁和自身）
  checkCollision() {
    const head = this.snake.body[0];
    
    // 检查墙壁碰撞
    if (
      head.x < 0 || 
      head.x >= this.gridWidth || 
      head.y < 0 || 
      head.y >= this.gridHeight
    ) {
      return true;
    }
    
    // 检查自身碰撞
    for (let i = 1; i < this.snake.body.length; i++) {
      if (head.x === this.snake.body[i].x && head.y === this.snake.body[i].y) {
        return true;
      }
    }
    
    return false;
  }

  // 游戏结束
  gameOver() {
    clearInterval(this.gameInterval);
    this.isGameOver = true;
    
    // 更新最高分
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('snakeHighScore', this.highScore);
      document.getElementById('highScore').textContent = this.highScore;
      this.showMessage('游戏结束! 新的最高分!');
    } else {
      this.showMessage('游戏结束! 按重新开始再玩一次');
    }
    
    // 播放游戏结束音效
    playSound('gameOver');
  }

  // 暂停/继续游戏
  togglePause() {
    if (this.isGameOver) return;
    
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      clearInterval(this.gameInterval);
      this.showMessage('游戏已暂停');
      playSound('pause');
    } else {
      this.gameInterval = setInterval(() => this.gameLoop(), this.speed);
      this.showMessage('');
      playSound('resume');
    }
    
    return this.isPaused;
  }

  // 增加分数
  increaseScore() {
    // 根据难度增加不同的分数
    switch(this.difficulty) {
      case 'easy':
        this.score += 10;
        break;
      case 'medium':
        this.score += 20;
        break;
      case 'hard':
        this.score += 30;
        break;
    }
    
    this.updateScoreDisplay();
  }

  // 更新分数显示
  updateScoreDisplay() {
    document.getElementById('score').textContent = this.score;
  }

  // 根据得分增加速度
  increaseSpeed() {
    // 每100分增加一次速度
    if (this.score % 100 === 0 && this.speed > 50) {
      this.speed -= 10;
      clearInterval(this.gameInterval);
      this.gameInterval = setInterval(() => this.gameLoop(), this.speed);
    }
  }

  // 设置难度
  setDifficulty(level) {
    this.difficulty = level;
    
    // 根据难度设置速度
    switch(level) {
      case 'easy':
        this.speed = 150;
        break;
      case 'medium':
        this.speed = 100;
        break;
      case 'hard':
        this.speed = 70;
        break;
    }
    
    // 如果游戏正在运行，更新速度
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = setInterval(() => this.gameLoop(), this.speed);
    }
    
    // 更新UI
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(`${level}Btn`).classList.add('active');
  }

  // 显示游戏消息
  showMessage(message) {
    const messageElement = document.getElementById('gameMessage');
    messageElement.textContent = message;
  }
}
