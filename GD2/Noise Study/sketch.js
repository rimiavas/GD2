// This code uses Perlin noise to create a moving, colorful ellipse pattern on a dark blue background.
// The colors of the ellipses gradually transition from yellow to red across the canvas.
// I like how the combination of the noise and color transition creates an interesting and dynamic effect.

let c1, c2;  // Declare two color variables

function setup() {
  createCanvas(windowWidth, windowHeight);  // Create a canvas
  c1 = color(255, 255, 200);  // Set c1 to a yellow color
  c2 = color(255, 0, 0);  // Set c2 to a red color
  noiseDetail(24);  // Increase the Perlin noise detail level
}

function draw() {
  background(10, 10, 30);  // Set the background color to a dark blue
  noStroke();  // Turn off stroke
  
  let xoff = 0;  // Initialize xoff variable to 0
  for (let x = 0; x < width; x++) {  // Loop through every x position on the canvas
    let y = map(noise(xoff, 0, frameCount * 0.01), 0, 1, 0, height);  // Use Perlin noise to determine the y position of the ellipse
    let s = map(noise(xoff, PI, frameCount * 0.01), 0, 1, 1, 30);  // Use Perlin noise to determine the size of the ellipse
    let n = noise(xoff, frameCount * 0.001);  // Use Perlin noise to determine the color of the ellipse
    let c = lerpColor(c1, c2, n);  // Use lerpColor to interpolate between c1 and c2 based on the noise value
    fill(c);  // Set the fill color to the interpolated color
    ellipse(x, y, s, s);  // Draw the ellipse at the current position
    xoff += 0.01;  // Increment xoff to move to the next x position
  }
}
