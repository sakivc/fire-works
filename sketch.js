var rockets = [];
var explosions = [];

function setup() {
  let W = windowWidth / 2;
  let H = windowHeight * 2 / 3;
  createCanvas(W, H);
}

function draw() {
  background(51,100);
  showForeground();
  for( let rocket of rockets){
    rocket.update();
    rocket.show();
  }
  for( let rocket of rockets){
    if (rocket.counter < 0 || rocket.pos.y < 0 || rocket.pos.x < 0 || rocket.pos.x > width){
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
    while (i<500){this.particles.push(new Particles(_x,_y,_col));i++;}
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
    this.vel = createVector(random(-1,1),random(-3,1)).setMag(random(5));
    this.acc = createVector(0,0.1);
    this.col = [];
    for (let c of _col){
      this.col.push(c + random(-10,10));
    }
    this.counter = random(20,height/2);
  }
  update(){
    this.vel.add(this.acc);
    this.vel.mult(0.95);
    this.pos.add(this.vel);
    this.counter = this.counter - 1;
  }
  show(){
    push();
    fill(this.col);
    noStroke();
    ellipse(this.pos.x,this.pos.y,1);
    pop();
  }
}

class Rocket{
  constructor(_x,_y){
    this.pos = createVector(_x,_y);
    this.vel = createVector(random(-0.5,0.5),-5);
    this.acc = createVector(0,0);
    this.col = [random(100,255),random(100,255),random(100,255)];
    this.counter = random(100,height);
  }
  update(){
    this.acc = createVector(random(-0.5,0.5),0);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.counter = this.counter - 1;
  }
  show(){
    push();
    fill(this.col);
    noStroke();
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
  text('- - - - - - - - - - - - - - - -',width/2,height-61);
  text('C L I C K   H E R E',width/2,height-50);
  text('- - - - - - - - - - - - - - - -',width/2,height-40);
  pop();
}

function mouseClicked(){
  if (mouseY > height - 100){
    rockets.push(new Rocket(mouseX,mouseY));
  }
}
