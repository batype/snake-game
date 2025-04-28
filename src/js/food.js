export class Food {
  constructor(game) {
    this.game = game;
    this.position = { x: 0, y: 0 };
    this.generateNew();
    
    // 食物颜色
    this.color = '#e74c3c';
    
    // 食物闪烁效果
    this.pulseSize = 0;
    this.pulseDirection = 0.05;
  }

  // 生成新的食物位置
  generateNew() {
    // 随机位置
    let newPosition;
    let isValidPosition = false;
    
    // 确保食物不会出现在蛇身上
    while (!isValidPosition) {
      newPosition = {
        x: Math.floor(Math.random() * this.game.gridWidth),
        y: Math.floor(Math.random() * this.game.gridHeight)
      };
      
      isValidPosition = true;
      
      // 检查是否与蛇身重叠
      for (const segment of this.game.snake.body) {
        if (segment.x === newPosition.x && segment.y === newPosition.y) {
          isValidPosition = false;
          break;
        }
      }
    }
    
    this.position = newPosition;
  }

  // 绘制食物
  draw(ctx) {
    const gridSize = this.game.gridSize;
    
    // 更新脉动效果
    this.pulseSize += this.pulseDirection;
    if (this.pulseSize > 0.5 || this.pulseSize < 0) {
      this.pulseDirection *= -1;
    }
    
    // 绘制食物（圆形）
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.position.x * gridSize + gridSize / 2,
      this.position.y * gridSize + gridSize / 2,
      (gridSize / 2 - 2) + this.pulseSize,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // 绘制高光效果
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(
      this.position.x * gridSize + gridSize / 3,
      this.position.y * gridSize + gridSize / 3,
      gridSize / 6,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
