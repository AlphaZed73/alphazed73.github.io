// https://cg.informatik.uni-freiburg.de/intern/seminar/gridFluids_fluid-EulerParticle.pdf
// board variables
let board;
let distance;
let numParticles = 100;
let boardWidth = 1280;
let boardHeight = 720;
let context;

let t = 0;
let dt = 0.01;
let smoothingRadius = 0.45;
const particles = [];
const neighbors = [];

function kernel(distance) {
    return Math.max(0, ((smoothingRadius ** 2) - (distance ** 2)) ** 3) / (Math.PI * (smoothingRadius ** 8) / 4);
}

class Particle {
    constructor(position) {
        this.mass = 1;
        this.position = position;
        this.velocity = [0, 0];
        this.density;
        this.pressure;
        this.force;
    }
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") // used for drawing on the board

    for (let i = 0; i < numParticles; i++) {
        particles[i] = new Particle([Math.random() * boardWidth, Math.random() * boardHeight]);
    }

    requestAnimationFrame(update);
}

// main loop
function update() {
    requestAnimationFrame(update);

    // update particles and do calculations for forces and such
    for (let j = 0; j < numParticles; j++) {
        neighbors = particles;
        neighbors.pop(j);
        
        // evaluate each neighbor's effects
        for (let n = 0; n < numParticles - 1; n++) {
            // calculate distance
            distance = Math.sqrt((particles[j].position[0] - neighbors[n].position[0]) ** 2 + (particles[j].position[1] - neighbors[n].position[1]) ** 2)

            // density update
            particles[j].density += kernel(distance) * particles[j].mass;
        }
    }
}
/*
Set t = 0
Choose a ∆t
for i from 0 to n
    for j from 1 to numparticles
        Get list Lj of neighbors for Pj
        Calculate Densityj for Pj using Lj
        Calculate Pressurej for Pj using Lj
        Calculate acceleration Aj for Pj using Densityj and Pressurej
        Move Pj using Aj and ∆t using Euler step
    t = t + ∆t
*/