// team.js

export class Team {
  constructor(x, y, w, h, color, balls_count) {
    this.name = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.balls_count = balls_count;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
