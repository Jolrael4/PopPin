/**********************
	Global Settings
**********************/
var particles = [];
var numParticles = 2500;
var radius = 10;
var prob = .2;
var popFrequency = 20;
var disco = false;
var glitter = true;
// var r = 255; var g = 255; var b = 255; // White
// var r = 255; var g = 0; var b = 170; // Pink
// var r = 220; var g = 0; var b = 0; // Red
// var r = 255; var g = 125; var b = 0;   // Orange
// var r = 255; var g = 255; var b = 0; // Yellow
var r = 0; var g = 200; var b = 75; // Green
// var r = 0; var g = 100; var b = 255; // Blue
// var r = 170; var g = 0; var b = 170; // Purple
// var r = 140; var g = 70; var b = 20; // Brown

/*********************/

// Get HTML elements
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = 1500; var H = 600;
canvas.width = W;
canvas.height = H;

var running;

// Create a number of particles and distribute their locations
createParticles(numParticles);

// Run main every 1 ms
running = setInterval(main, 1);

var counter = 0;
var step = 1;

function main() {
	// Increment counter between 0 and popFrequency
	counter += step;
	counter %= popFrequency;

	// Empty canvas
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, W, H);

	// Redraw
	decayParticles();
  if (glitter){
    popBlack();
  } else{
	  if (counter < step) { popParticles(); }
  }
	drawParticles();
}


// Helper functions

// Particle class
function Particle(x, y) {
	this.x = x;
	this.y = y;
  if (glitter || disco){
    randomColor(this);
  } else{
	this.r = r;
	this.g = g;
	this.b = b;
  }
}

// Create particles and assign x,y position
function createParticles(numParticles) {
	rows = Math.sqrt(numParticles);
	for (var i = 0; i < numParticles; i++) {
		var x = W / (rows * i)
		particles.push(new Particle(((i % rows) * radius * 2) + radius, (Math.floor(i / rows) * radius * 2) + radius));
	}
}

// Draw each particle using the particle.draw prototype method
function drawParticles() {
	for (var i = 0; i < particles.length; i++) {
		particles[i].draw(ctx);
	}
}

// Make each particle rgb value closer to black
function decayParticles() {
	var speed = glitter ? 5 : 1;
	for (var i = 0; i < particles.length; i++) {
		particles[i].r = Math.max(0, particles[i].r - speed);
		particles[i].g = Math.max(0, particles[i].g - speed);
		particles[i].b = Math.max(0, particles[i].b - speed);
	}
}

// Brighten particles randomly
function popParticles() {
	for (var i = 0; i < particles.length; i++) {
		if (prob > Math.random()) {
			if (disco) {
        randomColor(particles[i]);
				/*particles[i].r = Math.floor(Math.random() * 255);
				particles[i].g = Math.floor(Math.random() * 255);
				particles[i].b = Math.floor(Math.random() * 255);*/
			} else{
				 particles[i].r = r;
				 particles[i].g = g;
				 particles[i].b = b;
			}
		}
	}
}

//limit how dark the random colors can be
function randomColor(particle){
	if(glitter){
  	particle.r = Math.floor(Math.random() * 255);
	particle.g = Math.floor(Math.random() * 255);
	particle.b = Math.floor(Math.random() * 255);}
  else{
  var randm = Math.floor(Math.random() * 255);
  //particle.r = Math.floor(Math.random() * 185 + 70)
  particle.r = randm > 70 ? randm : 70;
  randm = Math.floor(Math.random() * 255);
  particle.g = randm > 70 ? randm : 70;
  randm = Math.floor(Math.random() * 255);
  particle.b = randm > 70 ? randm : 70;}
}

function popBlack(){
  for (var i = 0; i < particles.length; i++){
    if (particles[i].r <= 20 && particles[i].g <= 20 && particles[i].b <= 20){
      randomColor(particles[i]);
    }
  }
}

// Draw prototype function,
Particle.prototype.draw = function (ctx) {
	var grd = ctx.createRadialGradient(this.x + radius/2, this.y + radius/2, radius/2, this.x - radius/2, this.y - radius/2, radius * 2);
	ctx.fillStyle = grd;
	grd.addColorStop(0, "rgb(" + this.r + ", " + this.g + ", " + this.b + ")");
	grd.addColorStop(.75, "black");
	ctx.beginPath();
	ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
	ctx.fill();
}