export class Snake {
  constructor(game) {
    this.game = game;
    
    // 蛇的初始位置（中心点）
    const centerX = Math.floor(game.gridWidth / 2);
    const centerY = Math.floor(game.gridHeight / 2);
    
    // 蛇的身体，每个部分是一个坐标点
    this.body = [
      { x: centerX, y: centerY },
      { x: centerX - 1, y: centerY },
      { x: centerX - 2, y: centerY }
    ];
    
    // 蛇的移动方向（初始向右）
    this.direction = 'right';
    
    // 下一个方向（用于处理快速按键）
    this.nextDirection = 'right';
    
    // 蛇的颜色
    this.headColor = '#4CAF50';
    this.bodyColor = '#8BC34A';
  }

  // 设置方向
  setDirection(direction) {
    // 防止180度转向（例如向右移动时不能直接向左转）
    if (
      (this.direction === 'up' && direction === 'down') ||
      (this.direction === 'down' && direction === 'up') ||
      (this.direction === 'left' && direction === 'right') ||
      (this.direction === 'right' && direction === 'left')
    ) {
      return;
    }
    
    this.nextDirection = direction;
  }

  // 移动蛇
  move() {
    // 更新方向
    this.direction = this.nextDirection;
    
    // 获取头部位置
    const head = { ...this.body[0] };
    
    // 根据方向移动头部
    switch (this.direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }
    
    // 将新头部添加到身体前端
    this.body.unshift(head);
    
    // 移除尾部（除非蛇在生长）
    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }
  }

  // 增加蛇的长度
  grow() {
    this.growing = true;
  }

  // 绘制蛇
  draw(ctx) {
    const gridSize = this.game.gridSize;
    
    // 绘制身体
    for (let i = 1; i < this.body.length; i++) {
      const segment = this.body[i];
      
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(
        segment.x * gridSize, 
        segment.y * gridSize, 
        gridSize, 
        gridSize
      );
      
      // 绘制内部阴影，让身体部分看起来更立体
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(
        segment.x * gridSize + 3, 
        segment.y * gridSize + 3, 
        gridSize - 6, 
        gridSize - 6
      );
    }
    
    // 绘制头部
    const head = this.body[0];
    
    ctx.fillStyle = this.headColor;
    ctx.fillRect(
      head.x * gridSize, 
      head.y * gridSize, 
      gridSize, 
      gridSize
    );
    
    // 绘制眼睛
    ctx.fillStyle = 'white';
    
    // 根据方向绘制眼睛
    let eyePositions = [];
    
    switch (this.direction) {
      case 'up':
        eyePositions = [
          { x: head.x * gridSize + gridSize * 0.25, y: head.y * gridSize + gridSize * 0.25 },
          { x: head.x * gridSize + gridSize * 0.75, y: head.y * gridSize + gridSize * 0.25 }
        ];
        break;
      case 'down':
        eyePositions = [
          { x: head.x * gridSize + gridSize * 0.25, y: head.y * gridSize + gridSize * 0.75 },
          { x: head.x * gridSize + gridSize * 0.75, y: head.y * gridSize + gridSize * 0.75 }
        ];
        break;
      case 'left':
        eyePositions = [
          { x: head.x * gridSize + gridSize * 0.25, y: head.y * gridSize + gridSize * 0.25 },
          { x: head.x * gridSize + gridSize * 0.25, y: head.y * gridSize + gridSize * 0.75 }
        ];
        break;
      case 'right':
        eyePositions = [
          { x: head.x * gridSize + gridSize * 0.75, y: head.y * gridSize + gridSize * 0.25 },
          { x: head.x * gridSize + gridSize * 0.75, y: head.y * gridSize + gridSize * 0.75 }
        ];
        break;
    }
    
    // 绘制眼睛
    eyePositions.forEach(pos => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, gridSize * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      // 绘制眼球
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, gridSize * 0.07, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
