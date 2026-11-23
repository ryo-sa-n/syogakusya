const stars = [];
const fireworks = [];
const starCount = 180;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // 星をランダムな場所に作る
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }
}

function draw() {
  background(0);
  for (const star of stars) {
    fill(192,192,192);
    circle(star.x, star.y, star.size);
  }

  // 花火の粒を動かして、寿命が尽きた粒を消す
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const particle = fireworks[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.035;
    particle.life -= 1;

    fill(
     particle.r,
     particle.g,
     particle.b,
     map(particle.life, 0, particle.maxLife, 0, 255) 
   );
    circle(
      particle.x,
      particle.y,
      map(particle.life, 0, particle.maxLife, 0, 4)
    );

    if (particle.life <= 0) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  const particleCount = 800;

  // このクリックで出る花火の色を1回だけ決める
  const r = random(256);
  const g = random(256);
  const b = random(256);

  for (let i = 0; i < particleCount; i++) {
    const angle = (TWO_PI * i) / particleCount;
    const speed = random(1.5, 5.2);
    const life = random(55, 150);

    fireworks.push({
      x: mouseX,
      y: mouseY,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      r: r,
      g: g,
      b: b,
      life: life,
      maxLife: life
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 画面サイズが変わったら星を新しい範囲に配置し直す
  for (const star of stars) {
    star.x = random(width);
    star.y = random(height);
  }
}