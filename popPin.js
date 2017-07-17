/**********************
	Global Settings
**********************/
var particles = [];
var numParticles = 2500;
var counter = 0;
var step = 1;
var W = 800; 
var H = 800;
var radius = 8;
var prob = .2;
var popFrequency = 22;
var disco = false;
var glitter = false;
var r = 0; var g = 200; var b = 75; //Green 6
/*********************/

// Get HTML elements
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var colorSlide = document.getElementById("colorSlide");
var probSlide = document.getElementById("probSlide");
var freqSlide = document.getElementById("freqSlide");
canvas.width = W;
canvas.height = H;

var running;

// Create a number of particles and distribute their locations
createParticles();

// Run main every 1 ms
running = setInterval(main, 1);

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
function createParticles() {
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


//HTML helper functions
//prob .1-.9
function changeProb(value){
	prob = value;
}

//freq 2-42 by 5
function changeFreq(value){
	popFrequency = value;
}

function pickBasic(){
	disco = false;
	glitter = false;
	colorSlide.style.display = 'block'; 
	probSlide.style.display = 'block';
	freqSlide.style.display = 'block';
}

function pickDisco(){
	disco = true;
	glitter = false;
	colorSlide.style.display = 'none'; 
	probSlide.style.display = 'block';
	freqSlide.style.display = 'block';
}

function pickGlitter(){
	glitter = true;
	disco = false;
	colorSlide.style.display = 'none'; 
	probSlide.style.display = 'block';
	freqSlide.style.display = 'block';
}

function changeColor(value){
	if (value == 1) {
		r = 255;  g = 255;  b = 255; // White 1
	} else{ if (value == 2) {
		r = 255;  g = 0;  b = 170; //Pink 2
	} else{ if (value == 3) {
		r = 220;  g = 0;  b = 0; //Red 3
	} else{ if (value == 4) {
		r = 255;  g = 125;  b = 0; // Orange 4
	} else{ if (value == 5) {
		r = 255;  g = 255;  b = 0; //Yellow 5
	} else{ if (value == 6) {
		r = 0;  g = 200;  b = 75; //Green 6
	} else{ if (value == 7) {
		r = 0;  g = 100;  b = 255; // Blue 7
	} else{ if (value == 8) {
		r = 170;  g = 0;  b = 170; //Purple 8
	} else{
		r = 255; g = 170; b = 85; //Brown 9
	};};};};};};};};
}