// ball.js

export class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(width, height) {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(goal1, goal2) {
    if (
      this.x - this.size < goal1.x + 1 &&
      this.y - this.size > goal1.y &&
      this.y < goal1.y + goal1.h &&
      this.color !== goal1.color
    ) {
      console.log("gol");
    }

    if (
      this.x - this.size > goal2.x &&
      this.y - this.size > goal2.y &&
      this.y < goal2.y + goal2.h &&
      this.color !== goal2.color
    ) {
      console.log("gol");
    }
  }
}
