// script.js
const cutey = document.getElementById('cutey');
const catContainer = document.getElementById('cat-container');
const speechBubble = document.getElementById('speech-bubble');
const gameContainer = document.getElementById('game-container');

// Initial position of Cutey
let posX = window.innerWidth - 75; // 75px from the right edge
let posY = 20; // 20px from the top edge
cutey.style.left = `${posX}px`;
cutey.style.top = `${posY}px`;

// Speed of Cutey's movement
const speed = 15;

// Proximity threshold (in pixels) - to control when Cutey starts running away from the mouse
const proximityThreshold = 50;

// Function to shake Cutey
function shakeIcon() {
  cutey.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => {
    cutey.style.animation = 'none';
  }, 500);
}

// Shake Cutey every 3 seconds
setInterval(shakeIcon, 3000);

// Function to move Cutey away from the mouse
function moveIcon(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Calculate the distance between the mouse and Cutey
  const deltaX = posX - mouseX;
  const deltaY = posY - mouseY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Only move Cutey if the mouse is within the proximity threshold
  if (distance < proximityThreshold) {
    // Normalize the direction vector
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;

    // Update Cutey's position
    posX += directionX * speed;
    posY += directionY * speed;

    // Ensure Cutey stays within the window boundaries with a safe margin
    const iconRect = cutey.getBoundingClientRect();
    const margin = 50; // Safe margin from the edges
    const maxX = window.innerWidth - iconRect.width - margin;
    const maxY = window.innerHeight - iconRect.height - margin;

    if (posX < margin) posX = margin;
    if (posX > maxX) posX = maxX;
    if (posY < margin) posY = margin;
    if (posY > maxY) posY = maxY;

    // Apply the new position
    cutey.style.left = `${posX}px`;
    cutey.style.top = `${posY}px`;
  }
}

function slideCat() {
    // Make the cat container visible
    catContainer.style.display = 'block';
  
    // Reset animations
    catContainer.style.animation = 'none';
    speechBubble.style.animation = 'none';
  
    // Trigger reflow to restart animations
    void catContainer.offsetWidth;
    void speechBubble.offsetWidth;
  
    // Slide in the cat container
    catContainer.style.animation = 'slideIn 1s forwards';
    speechBubble.style.animation = 'fadeIn 1s 1s forwards';
  
    // Slide out the cat container after 3 seconds
    setTimeout(() => {
      catContainer.style.animation = 'slideOut 1s forwards';
      speechBubble.style.animation = 'none';
  
      // Hide the cat container after the slide-out animation completes
      setTimeout(() => {
        catContainer.style.display = 'none';
      }, 1000); // Wait for the slide-out animation to finish
    }, 3000);
  }

// Add event listener for mouse movement
gameContainer.addEventListener('mousemove', moveIcon);

// Add event listener for clicking Cutey
cutey.addEventListener('click', slideCat);