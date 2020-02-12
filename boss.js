class Boss {
  constructor(x, y, size, health) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = this.getAngle();
    this.accel = 0.0001;
  }
  draw(col) {
    push();
    fill(col || 'yellow');
    ellipse(this.x, this.y, this.size);
    fill(0);
    translate(this.x, this.y);
    rotate(this.getAngle())
    ellipse(-this.size * 3 / 10, this.size / 10, this.size / 10);
    ellipse(-this.size * 3 / 10, -this.size / 10, this.size / 10);
    pop();
  }

  move(step) {
    this.x -= step * cos(this.angle) * this.accel;
    this.y -= step * sin(this.angle) * this.accel;
    this.angle = this.getAngle();
    this.accelerate();
  }

  accelerate() {
    if (this.accel <= -0.75)
      this.accel = -0.5;
    if (this.accel >= 1)
      this.accel = 1;
    else {
      this.accel += 0.01;
    }
  }

  getAngle() {
    return atan2(this.y - player.y, this.x - player.x);
  }

  hit(list) {
    for (var hitI = 0; hitI < list.length; hitI++) {
      let current = list[hitI];
      if (collideCircleCircle(this.x, this.y, this.size, current.x, current.y, current.size)) {
        this.accel -= 0.15;
        list.splice(hitI, 1);
        return true;
      }
    }
    return false;
  }
}