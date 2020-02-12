let point;
let player;
let boss;
let boss2;
var skip;
let bulletList = [];
let targetList = [];
var points;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  textSize(36);
  noCursor();
  skip = false;
  points = 0;
  player = new Player(width / 2, height / 2, 0, 20);
  boss = new Boss(100, 100, 50);
  boss2 = new Boss(200, 100, 20);
  point = new Pointer(player.x, player.y);
}

function draw() {
  background(120);
  if (player.hit(boss)) {
    fill(0);
    cursor();
    while (bulletList.length > 0)
      bulletList.pop();
    text("GAME OVER", width / 2 - 108, height / 2);
    text("Points:" + floor(points), width / 2 - 108, height / 2 + 36);
    skip = true;
  } else {
    player.move(4);
    player.reset();
    point.x = player.x;
    point.y = player.y;
    for (i = 0; i < bulletList.length; i++)
      if (bulletList[i].offScreen())
        bulletList.splice(i, 1);
      else {
        bulletList[i].move();
        bulletList[i].draw(60, 60, 60);
      }

    points += boss.hit(bulletList);
    points += boss2.hit(bulletList);
    boss.move(5);
    boss2.move(3);
    boss.draw();
    boss2.draw('red');
    point.maker(mouseX, mouseY, 20);
    player.draw();
    while (bulletList.length >= 200)
      bulletList.pop();
    var d = dist(boss.x, boss.y, player.x, player.y);
    //rewards being closer
    points += -0.1 * (d - boss.size - player.size - 40);
    //rewards being farther
    // points += (d-boss.size-player.size-300) / 1000;
    points += 5 * abs(boss.accel + 0.25) * (boss.accel + 0.25);
    text("Points: " + round(points), 0, 36);
  }
}

function mousePressed() {
  bulletList.push(new Bullet(player.x, player.y, point.getAngle(mouseX, mouseY), 12, 8));
  if (skip)
    setup();
}