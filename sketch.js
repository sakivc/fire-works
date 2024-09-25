var rockets = [];
var explosions = [];

function setup() {
  W = int(windowWidth * 0.8);
  H = int(windowHeight * 0.8);
  createCanvas(W,H);
}

function draw() {
  background(50);
  showForeground();
  for( let rocket of rockets){
    rocket.update();
    rocket.show();
  }
  for( let rocket of rockets){
    if (rocket.counter < 0 || rocket.pos.x < 0 || rocket.pos.x < 0 || rocket.pos.x > width){
      explosions.push(new Explosion(rocket.pos.x,rocket.pos.y,rocket.col));
      rockets.splice(rockets.indexOf(rocket),1);
    }
  }
  for( let expo of explosions){
    expo.update();
    expo.show();
  }
  for( let expo of explosions){
    if (expo.counter < 0){
      explosions.splice(explosions.indexOf(expo),1);
    }
  }
}

class Explosion{
  constructor(_x,_y,_col){
    this.counter = 100;
    this.particles = [];
    let i = 0;
    while (i<100){this.particles.push(new Particles(_x,_y,_col));i++;}
  }
  update(){
    for(let par of this.particles){
      par.update();
      if (par.counter < 0){
        this.particles.splice(this.particles.indexOf(par),1);
      }
    }
    this.counter = this.counter - 1;
  }
  show(){
    for(let par of this.particles){
      par.show();
    }
  }
}

class Particles{
  constructor(_x,_y,_col){
    this.pos = createVector(_x,_y);
    this.vel = createVector(random(-1,1),random(-3,1)).setMag(random(1));
    this.acc = createVector(0,0.001);
    this.col = [];
    for (let c of _col){
      this.col.push(c + random(-10,10));
    }
    this.counter = random(30);
  }
  update(){
    let c = 0;
    while (c<20){
      this.vel.add(this.acc);
      this.vel.mult(0.99);
      this.pos.add(this.vel);
      c++;
    }
    this.counter = this.counter - 1;
  }
  show(){
    push();
    noStroke();
    fill(55);
    ellipse(this.pos.x,this.pos.y,6);
    fill(60);
    ellipse(this.pos.x,this.pos.y,10);
    fill(this.col);
    ellipse(this.pos.x,this.pos.y,2);
    pop();
  }
}

class Rocket{
  constructor(_x,_y){
    this.pos = createVector(_x,_y);
    this.trail = [];
    this.vel = createVector(random(-0.5,0.5),-1);
    this.acc = createVector(0,0);
    this.col = [random(100,255),random(100,255),random(100,255)];
    this.counter = random(80,120);
  }
  update(){
    let c = 0;
    while (c<5){
      this.acc = createVector(random(-0.05,0.05),0);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      c++;
    }
    this.trail.push(this.pos.copy());
    if(this.trail.length>10){
      this.trail = this.trail.splice(1);
    }
    this.counter = this.counter - 1;
  }
  show(){
    push();
    noStroke();
    let col = 51;
    let dia = 2;
    for (let trail of this.trail){
      fill(col);
      ellipse(trail.x,trail.y,dia);
      dia = dia + 1.5;
      col += 1
    }
    fill(this.col);
    ellipse(this.pos.x,this.pos.y,5);
    pop();
  }
}

function showForeground(){
  push();
  fill(55);
  noStroke();
  rect(0,height-100,width,100);
  fill(255);
  textAlign(CENTER,CENTER);
  text('- - - - - - - - - - - - - - - -',width/2,height-60);
  text('C L I C K   H E R E',width/2,height-50);
  text('- - - - - - - - - - - - - - - -',width/2,height-40);
  pop();
}

function mouseClicked(){
  if (mouseY > height-100){
    rockets.push(new Rocket(mouseX,mouseY));
  }
}
