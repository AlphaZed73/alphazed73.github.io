// https://cg.informatik.uni-freiburg.de/intern/seminar/gridFluids_fluid-EulerParticle.pdf
// board variables
let board;
let boardWidth = 1280;
let boardHeight = 720;
let context;


let smoothing = 1
function kernel(distance) {
    return (1/(Math.sqrt(Math.PI ** 3) * (smoothing ** 3))) * (Math.E ** ((distance ** 2) / (smoothing ** 2)));
}

class Particle {
    constructor() {
        this.mass = 1;
        this.position;
        this.velocity;
        this.density;
        this.pressure;
        this.force;
    }
}

class Car {
    constructor(name, year) {
      this.name = name;
      this.year = year;
    }
  }

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") // used for drawing on the board

    requestAnimationFrame(update);
}
/*
Set t = 0
Choose a ∆t
for i from 0 to n
for j from 1 to numparticles
Get list Lj of neighbors for Pj
Calculate Densityj for Pj using Lj
Calculate P ressurej for Pj using Lj
Calculate acceleration Aj for Pj using Densityj and
P ressurej
Move Pj using Aj and ∆t using Euler step
t = t + ∆t
*/