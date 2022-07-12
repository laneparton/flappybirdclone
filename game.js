// 1. We basically need to copy this: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API#javascript without the green rectangle

/*
 * Game Assets
 */
// Example:
// Instantiate the HTMLImageElement (https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
const backgroundImage = new Image();
// Assign the source attribute
backgroundImage.src = "images/bg.png";

function draw() {
  console.log("We're drawing!");
  // 2. Draw a background image on the context

  // 5. Loop to build the scene/pipes (this will be the hard part)

  // endloop

  // 3. Draw foreground
  // 4. Draw bird

  requestAnimationFrame(draw);
}

draw();
