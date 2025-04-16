document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('beerCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const tempRaw = document.body.dataset.temperature;
  const temp = parseInt(tempRaw) * 2;
  const bubbleRate = Math.min(temp, 50); // Bubbles per 10 seconds
  const bubbles = [];
  const bubbleLifespan = 3600; // 5 seconds per bubble

  class Bubble {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 50;
      this.radius = 3 + Math.random() * 6;
      this.speed = 1 + Math.random() * 2;
      this.alpha = 1;
      this.age = 0; // track how long the bubble's been alive
    }
  
    update(deltaTime) {
      this.y -= this.speed;
      this.age += deltaTime;
      this.alpha = 1 - this.age / bubbleLifespan;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  
    isAlive() {
      return this.age < bubbleLifespan;
    }
  }

  function addBubbles() {
    for (let i = 0; i < bubbleRate / 10; i++) {
      bubbles.push(new Bubble());
    }
  }

  let lastTimestamp = 0;

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    bubbles.forEach((bubble) => {
      bubble.update(deltaTime);
      bubble.draw(ctx);
    });
  
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (!bubbles[i].isAlive()) {
        bubbles.splice(i, 1);
      }
    }
  
    requestAnimationFrame(animate);
  }

  setInterval(addBubbles, 1000);
  animate();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toggleFullScreen();
  }
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}