document.addEventListener('DOMContentLoaded', () => {
    const tempRaw = document.body.dataset.temperature;
    const bierGlas = document.querySelector('.bierGlas');

  
    const temp = parseInt(tempRaw);
    // const temp = 30;

    console.log('Temperature:', temp);

    const bubbleCount = Math.min(temp, 50); // Safety cap
    for (let i = 0; i < bubbleCount; i++) {
      const bubbel = document.createElement('div');
      bubbel.classList.add('bubbel');

      bubbel.style.left = `${Math.random() * 90}%`;
      bubbel.style.animationDelay = `${Math.random() * 5}s`;
      const size = 6 + Math.random() * 6;
      bubbel.style.width = `${size}px`;
      bubbel.style.height = `${size}px`;

      bierGlas.appendChild(bubbel);
    }
  });