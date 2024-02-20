//This code creates a simulation of multiple vehicles moving around and avoiding collisions with each other. 
//The vehicles move randomly at first, but will change direction if they get too close to each other to avoid colliding. 
//The code uses object-oriented programming to define a Vehicle class, which contains methods for updating the vehicle's position and displaying it on the screen. 
//The vehicles are also given a "seek" behavior, which makes them move towards a target point if one is set. The final outcome is an interesting visual display of vehicles moving around and avoiding collisions in a simulated environment.
let vehicles = [];
let target;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // create random vehicles
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 20);
    let speed = random(1, 3);
    let angle = random(TWO_PI);
    let vehicle = new Vehicle(x, y, r, speed, angle);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);

  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].checkCollision(vehicles); // Check collision with other vehicles
    vehicles[i].update();
    vehicles[i].display();
  }
}


class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
    this.maxSpeed = 5;
    this.maxForce = 0.3;
    this.r = 6;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  display() {
    let theta = this.vel.heading() + PI / 2;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    fill(lerpColor(color(255, 51, 204), color(102, 0, 255), random(1)));
    stroke(0);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  checkCollision(vehicles) {
    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i] !== this) {
        let d = dist(this.pos.x, this.pos.y, vehicles[i].pos.x, vehicles[i].pos.y);
        if (d < this.r + vehicles[i].r) {
          // Change direction randomly
          this.vel.rotate(random(-PI/4, PI/4));
        }
      }
    }
  }
}

/* This code creates a simulation of vehicles moving around randomly on a canvas, and it includes collision detection and avoidance between vehicles.

The code begins by initializing an empty array called "vehicles" and a variable called "target". In the setup function, the canvas is created and 100 vehicles are randomly generated and added to the "vehicles" array.

In the draw function, the background is set to a dark gray color, and then each vehicle in the "vehicles" array is checked for collision with other vehicles, updated based on its current position and velocity, and displayed on the canvas.

The Vehicle class defines the behavior of each vehicle in the simulation. Each vehicle has a position, velocity, and acceleration vector, a maximum speed, a maximum force, and a size defined by its radius. The class includes several methods for applying forces, updating the vehicle's position and velocity, and displaying the vehicle on the canvas. The seek method is used to make the vehicle move towards a target point.

The checkCollision method is used to detect when a vehicle collides with another vehicle. If a collision is detected, the vehicle changes its direction randomly. */
