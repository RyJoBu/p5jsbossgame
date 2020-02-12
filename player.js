class Player {
  constructor(x, y, angle, size) {
    this.x = x;
    this.y = y
    this.angle = angle;
    this.size = size;
  }
  move(speed) {
    var isLeft = keyIsDown(65) || keyIsDown(37);
    var isRight = keyIsDown(68) || keyIsDown(39);
    var isFor = keyIsDown(87) || keyIsDown(38);
    var isBack = keyIsDown(83) || keyIsDown(40);
    var currentX = 0;
    var currentY = 0;
    if (isLeft || isRight || isBack || isFor) {
      if ((isFor || isBack) && (isLeft || isRight))
        speed *= sqrt(2) / 2;
      if (isFor)
        currentY -= speed;
      if (isBack)
        currentY += speed;
      if (isLeft)
        currentX -= speed;
      if (isRight)
        currentX += speed;
    }
    this.x += currentX;
    this.y += currentY;
  }
  reset() {
    var edgeSize = this.size / 2
    if (this.x - edgeSize < 0)
      this.x = edgeSize;
    if (this.x + edgeSize > width)
      this.x = width - edgeSize;
    if (this.y - edgeSize < 0)
      this.y = edgeSize;
    if (this.y + edgeSize > height)
      this.y = height - edgeSize;
  }
  draw() {
    push();
    fill(90, 40, 255);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  hit(boss) {
    if (collideCircleCircle(this.x, this.y, this.size, boss.x, boss.y, boss.size))
      return true;
    return false;
  }
}