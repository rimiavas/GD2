// This code creates a colorful and dynamic recursive pattern that rotates and changes over time.
// The pattern consists of a rotating ellipse with random colors that is drawn recursively.
// The size and angle of the ellipse change with each iteration to create movement and variation.
// The final outcome is an eye-catching and mesmerizing pattern that evolves over time.

// Declare the angle variable to be used for rotation
let angle = 0;

// Set the canvas size to match the window
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Draw the pattern recursively and update the angle
function draw() {
  // Set the background color to black
  background(0);
  
  // Call the recursive function to create the pattern
  drawPattern(width/2, height/2, 600, angle);
  
  // Increment the angle to create movement
  angle += 0.01;
}

// Recursive function to draw the pattern
function drawPattern(x, y, size, angle) {
  // Base case: stop drawing when the shape size is too small
  if (size < 10) {
    return;
  }
  
  // Draw the shape: a rotating ellipse with random colors
  strokeWeight(2);
  stroke(lerpColor(color(255, 51, 204), color(102, 0, 255), random(25)));
  noFill();
  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, size, size);
  pop();
  
  // Recursive calls: draw the shape in different positions and angles
  drawPattern(x-size/4, y, size/2, angle + random(PI/2));
  drawPattern(x+size/4, y, size/2, angle + random(PI/2));
  drawPattern(x, y-size/4, size/2, angle + random(PI/2));
  drawPattern(x, y+size/4, size/2, angle + random(PI/2));
}
