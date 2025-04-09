document.addEventListener('DOMContentLoaded', () => {
  const tempRaw = document.body.dataset.temperature;
  const bierGlas = document.querySelector('.bierGlas');

  const temp = parseInt(tempRaw) * 2;

  const bubbleRate = Math.min(temp, 50); // Bubbles per 10 seconds, for example

  // Create a bubble function
  function createBubble() {
    const bubbel = document.createElement('div');
    bubbel.classList.add('bubbel');

    bubbel.style.left = `${Math.random() * 90}%`;
    bubbel.style.animationDelay = `0s`;
    const size = 6 + Math.random() * 6;
    bubbel.style.width = `${size}px`;
    bubbel.style.height = `${size}px`;
    bubbel.style.animationDuration = `${4 + Math.random() * 3}s`;

    bierGlas.appendChild(bubbel);

    // Remove bubble after animation ends
    setTimeout(() => {
      bubbel.remove();
    }, 7000);
  }

  // Interval to keep generating bubbles based on temperature
  setInterval(() => {
    for (let i = 0; i < bubbleRate / 10; i++) {
      createBubble();
    }
  }, 1000); // Every second
});