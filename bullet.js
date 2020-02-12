class Bullet {

  constructor(x, y, angle, size, velocity) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.size = size || 15;
    this.velocity = velocity || 10;
  }

  move() {
    this.x += cos(this.angle) * this.velocity;
    this.y += sin(this.angle) * this.velocity;
    this.velocity *= 0.994;
  }

  draw(r, b, g) {
    push();
    fill(r || 255, b || 255, g || 255);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  offScreen() {
    return (this.x > width + this.size || this.x < -this.size || this.y > height + this.size || this.y < -this.size);
  }

}