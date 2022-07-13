// 1. We basically need to copy this: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API#javascript without the green rectangle
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Instantiate the HTMLImageElement (https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
const backgroundImage = new Image();
const foregroundImage = new Image();
const birdImage = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();
backgroundImage.src = "images/bg.png";
foregroundImage.src = "images/fg.png";
birdImage.src = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// We can control the difficulty with the gap between pipeNorth & pipeSouth as well as the spacing between pipes.
let difficultySettings = {
  pipeGap: 85,
  pipeSpacing: 50,
  speed: 1, // TODO: add support for speed difficulty
};

let bird = {
  x: 20,
  y: 200,
};

let score = 0,
  gameOver = false;

// Start an empty array for pipe coordinates
let pipes = [];
// Start the first obstacle (a pipeNorth and a pipeSouth) at the edge of the canvas (canvas.width)
pipes[0] = {
  x: canvas.width - pipeNorth.width - 5,
  y: 0,
};

function init() {
  window.requestAnimationFrame(draw);
}

function draw(time) {
  // If the gameOver, pause the animation
  if (gameOver) return;
  // 2. Draw a background image on the context
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    backgroundImage, // image
    0, // sx
    0 // sy
  );

  // 5. Loop to build the scene/pipes (this will be the hard part)
  for (let i = 0; i < pipes.length; i++) {
    // Draw pipeNorth
    ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
    // Draw pipeSouth (same x coord)
    // Gap = 85
    ctx.drawImage(
      pipeSouth,
      pipes[i].x,
      pipes[i].y + pipeNorth.height + difficultySettings.pipeGap
    );

    // Reduce the pipe[i].x (movement)
    // TODO: diffucultySettings.speed - but the problem is, the if statement is likely not going to match the difficultySettings.pipeSpacing. We'd have to convert to multiples/common denominators
    pipes[i].x--;

    // At some point, we'll need to add to pipes (pipes.push) for the next pipe to draw
    if (pipes[i].x === difficultySettings.pipeSpacing) {
      let newPipe = {
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      };

      pipes.push(newPipe);
    }

    // If the pipe is behind the bird (x < wherever the bird is), then the user scored
    if (pipes[i].x < bird.x) {
      score = score++;
    }

    if (
      bird.x === pipes[i].x ||
      bird.y === pipes[i] ||
      bird.y === canvas.height - foregroundImage.height
    ) {
      // Collision: if bird.x hits pipe[i].x or bird.y hits pipe[i].y
      // Reset the game
      console.log("Game Over");
      //gameOver = true;
    }
  }

  // 3. Draw foreground
  ctx.drawImage(foregroundImage, 0, canvas.height - foregroundImage.height);
  // 4. Draw bird
  ctx.drawImage(birdImage, bird.x, bird.y);

  // Let's make the bird stop at the bottom instead of going way off the screen
  let topOfForeground =
    canvas.height - foregroundImage.height - birdImage.height;
  if (bird.y < topOfForeground) {
    bird.y += 1.5;
  }

  ctx.fillText("Score : " + score, 10, canvas.height - 20);

  window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", moveBirdUp);

function moveBirdUp() {
  bird.y -= 25;
}

draw();
