// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
  
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(goal1, goal2) {
    if (
      this.x - this.size <  goal1.x + 1  && 
      (this.y - this.size > goal1.y && this.y < goal1.y + goal1.h) &&
      this.color !== goal1.color
    ){
      console.log("gol")
    }

    if (this.x - this.size >  goal2.x && 
      (this.y - this.size > goal2.y && this.y < goal1.y + goal1.h ) &&
      this.color !== goal2.color
    ){
      console.log("gol")
    }
  }
}
const VcH = 20;
const VcW = 30;
const VcB = 1;

const AcH = 20;
const AcW = 30;
const AcB = 1;

const VcY = (height - VcH) / 2;
const AcY = (height - AcH)/ 2;

class Team {
  constructor( x, y,  w, h, color, balls_count) {
    this.name = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.balls_count = balls_count;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

}

T_vermelho = document.getElementById("red")
T_vermelho.addEventListener("click", definirTraveVermelho);
T_azul = document.getElementById("blue")
T_azul.addEventListener("click", definirTraveAzul);
B_vermelho = document.getElementById("bolaV");
B_vermelho.addEventListener("click", definirBolasVermelhas);
B_Azul = document.getElementById("bolaA");
B_Azul.addEventListener("click", definirBolasAzuis);


let velocidadeVermelho = 20;
let velocidadeAzul = 20;


velocidadebolaAzul = document.getElementById("inp-azul-velocidade")
velocidadebolaAzul.addEventListener("click", definirVelocidadeAzul)


function definirVelocidadeAzul(event){
  event.preventDefault()
  const elemento = document.getElementById("inp-azul-velocidade").value
  const bolaAzulVelocidade = parseInt(elemento)
  if(!isNaN(bolaAzulVelocidade)){
    velocidadeAzul = bolaAzulVelocidade
  }
}

velocidadebolaVerm = document.getElementById("inp-verm-velocidade")
velocidadebolaVerm.addEventListener("click", definirVelocidadeVerm)


function definirVelocidadeVerm(event){
  event.preventDefault()
  const elemento = document.getElementById("inp-verm-velocidade").value
  const bolaVermVelocidade = parseInt(elemento)
  if(!isNaN(bolaVermVelocidade)){
    velocidadeVermelho = bolaVermVelocidade;

  }
}

function definirBolasAzuis(event){
  event.preventDefault()
  const elemento = document.getElementById("n-bolas-a").value;
  const bAzulBola = parseInt(elemento);
  if(!isNaN(bAzulBola)){
    team_blue = new Team(0 , AcY, AcW, AcH, "blue" , bAzulBola)
  }
}


function definirBolasVermelhas(event){
  event.preventDefault();
  const elemento = document.getElementById("n-bolas-v").value;
  const bVermelhoBola = parseInt(elemento);
  if (!isNaN(bVermelhoBola)) {
    team_red = new Team(0, VcY, VcW, VcH, "red", bVermelhoBola);
  }
}



function definirTraveVermelho(event){
  event.preventDefault();
  const elemento = document.getElementById("inp-verm-trave").value;
  const hVermelhoTrave = parseInt(elemento);
  if (!isNaN(hVermelhoTrave)) {
    const y = (height - hVermelhoTrave) / 2;
    team_red = new Team(0 , y, VcW, hVermelhoTrave, "red", VcB);
  }
}

function definirTraveAzul(event){
  event.preventDefault();
  const elemento = document.getElementById("inp-azul-trave").value;
  const hAzulTrave = parseInt(elemento);
  if (!isNaN(hAzulTrave)) {
    const y = (height - hAzulTrave) / 2;
    team_blue = new Team(width - 30, y, AcW, hAzulTrave, "blue", AcB);
  }
}



const balls = [];
let team_red = new Team( 0, VcY, VcW, VcH, "red", VcB); 
let team_blue = new Team( width - AcW, AcY  ,AcW, AcH, "blue", AcB);


function start(){
  balls.length = 0
  for (let i = 0; i < team_red.balls_count; i++) {
    const size = random(10, 20);
    const ball_red = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      velocidadeVermelho,
      velocidadeVermelho,
      "red",
      size
    );
    balls.push(ball_red);
  }
  for (let i = 0; i < team_blue.balls_count; i++)  {
    const size = random(10, 20);
    const ball_blue = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      velocidadeAzul,
      velocidadeAzul,
      "blue",
      size
    );
    balls.push(ball_blue);
  }
  
}
const botaoStart = document.getElementById("buttonStart");
botaoStart.addEventListener("click", start);





function loop() {
  ctx.fillStyle = "rgba(101, 250, 100, 0.25)";
  ctx.fillRect(0, 0, width, height);

  team_red.draw()
  
  team_blue.draw()

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(team_red, team_blue);
  }

  requestAnimationFrame(loop);
}

loop();
