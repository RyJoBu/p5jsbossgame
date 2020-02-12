class Pointer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
  }

  makeReticle(x, y, size) {
    push();
    noFill();
    translate(x, y);
    ellipse(0, 0, size * 4 / 3);
    line(-size, 0, size, 0);
    line(0, -size, 0, size);
    pop();
  }

  maker(x, y, size, upperBound) {
    push();
    var hyp = min(upperBound || 9999, dist(this.x, this.y, x, y));
    translate(this.x, this.y);
    rotate(this.getAngle(x, y));
    line(0, 0, floor(hyp - size * sqrt(2) / 2) - 3, 0);
    noFill();
    translate(hyp, 0);
    ellipse(0, 0, size * 5 / 3);
    line(-size, -size, size, size);
    line(size, -size, -size, size);
    pop();
  }

  getAngle(x, y) {
    return atan2(y - this.y, x - this.x);
  }

}