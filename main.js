// main.js

import { Ball } from './ball.js';
import { Team } from './team.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const VcH = 20, VcW = 30, VcB = 1;
const AcH = 20, AcW = 30, AcB = 1;

const VcY = (height - VcH) / 2;
const AcY = (height - AcH) / 2;

let velocidadeVermelho = 20;
let velocidadeAzul = 20;

const balls = [];
let team_red = new Team(0, VcY, VcW, VcH, "red", VcB);
let team_blue = new Team(width - AcW, AcY, AcW, AcH, "blue", AcB);

// DOM Elements
document.getElementById("red").addEventListener("click", definirTraveVermelho);
document.getElementById("blue").addEventListener("click", definirTraveAzul);
document.getElementById("bolaV").addEventListener("click", definirBolasVermelhas);
document.getElementById("bolaA").addEventListener("click", definirBolasAzuis);

document.getElementById("inp-azul-velocidade").addEventListener("click", definirVelocidadeAzul);
document.getElementById("inp-verm-velocidade").addEventListener("click", definirVelocidadeVerm);

document.getElementById("buttonStart").addEventListener("click", start);

// Funções
function definirVelocidadeAzul(event) {
  event.preventDefault();
  const v = parseInt(document.getElementById("inp-azul-velocidade").value);
  if (!isNaN(v)) velocidadeAzul = v;
}

function definirVelocidadeVerm(event) {
  event.preventDefault();
  const v = parseInt(document.getElementById("inp-verm-velocidade").value);
  if (!isNaN(v)) velocidadeVermelho = v;
}

function definirBolasVermelhas(event) {
  event.preventDefault();
  const count = parseInt(document.getElementById("n-bolas-v").value);
  if (!isNaN(count)) team_red.balls_count = count;
}


function definirBolasAzuis(event) {
  event.preventDefault();
  const count = parseInt(document.getElementById("n-bolas-a").value);
  if (!isNaN(count)) team_blue.balls_count = count;
}


function definirTraveVermelho(event) {
  event.preventDefault();
  const h = parseInt(document.getElementById("inp-verm-trave").value);
  if (!isNaN(h)) team_red = new Team(0, (height - h) / 2, VcW, h, "red", VcB);
}

function definirTraveAzul(event) {
  event.preventDefault();
  const h = parseInt(document.getElementById("inp-azul-trave").value);
  if (!isNaN(h)) team_blue = new Team(width - AcW, (height - h) / 2, AcW, h, "blue", AcB);
}

function start() {
  balls.length = 0;
  for (let i = 0; i < team_red.balls_count; i++) {
    const size = random(10, 20);
    const b = new Ball(random(size, width - size), random(size, height - size), velocidadeVermelho, velocidadeVermelho, "red", size);
    balls.push(b);
  }
  for (let i = 0; i < team_blue.balls_count; i++) {
    const size = random(10, 20);
    const b = new Ball(random(size, width - size), random(size, height - size), velocidadeAzul, velocidadeAzul, "blue", size);
    balls.push(b);
  }
}

function loop() {
  ctx.fillStyle = "rgba(101, 250, 100, 0.25)";
  ctx.fillRect(0, 0, width, height);

  team_red.draw(ctx);
  team_blue.draw(ctx);

  for (const ball of balls) {
    ball.draw(ctx);
    ball.update(width, height);
    ball.collisionDetect(team_red, team_blue);
  }

  requestAnimationFrame(loop);
}
function resetGame() {
  // Restaurar valores padrão
  velocidadeVermelho = 20;
  velocidadeAzul = 20;

  // Restaurar traves
  team_red = new Team(0, (height - VcH) / 2, VcW, VcH, "red", VcB);
  team_blue = new Team(width - AcW, (height - AcH) / 2, AcW, AcH, "blue", AcB);

  // Restaurar contagem de bolas
  team_red.balls_count = VcB;
  team_blue.balls_count = AcB;

  // Limpar bolas existentes
  balls.length = 0;

  // Resetar inputs visuais (opcional)
  document.getElementById("inp-verm-velocidade").value = "";
  document.getElementById("inp-azul-velocidade").value = "";
  document.getElementById("inp-verm-trave").value = "";
  document.getElementById("inp-azul-trave").value = "";
  document.getElementById("n-bolas-v").value = "";
  document.getElementById("n-bolas-a").value = "";
  
}
window.addEventListener("gol", (event) => {
  const time = event.detail.time;
  const mensagem = document.getElementById("mensagemGol");

  if (time === "vermelho") {
    golsVermelho++;
    document.getElementById("placar-vermelho").textContent = golsVermelho;
    mensagem.textContent = "GOOOOL do VERMELHO!";
  } else {
    golsAzul++;
    document.getElementById("placar-azul").textContent = golsAzul;
    mensagem.textContent = "GOOOOL do AZUL!";
  }

  // Esconde a mensagem depois de 2 segundos
  setTimeout(() => {
    mensagem.textContent = "";
  }, 2000);

  // Vitória com 10 gols
  if (golsVermelho === 10) {
    alert("Time VERMELHO venceu com 10 gols!");
    resetGame();
  } else if (golsAzul === 10) {
    alert("Time AZUL venceu com 10 gols!");
    resetGame();
  }
});

document.getElementById("resetButton").addEventListener("click", resetGame);

let golsVermelho = 0;
let golsAzul = 0;


loop();
