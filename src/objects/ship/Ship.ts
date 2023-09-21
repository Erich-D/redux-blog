import { shipRender } from "../../features/astroids/Astroids";
import Bullet from "../bullet/Bullet";
import { randomNumBetween, rotatePoint } from "../helpers/helpers";
import Particle from "../particle/Particle";
import sp from "../../asteroids-spaceship-png.png"
import { AstroidsState } from "../../features/astroids/astroidsSlice";

interface ShipArgs{
  position:{x:number,y:number}
  create:any 
  onDie:any
}

export default class Ship{
  position: { x: number; y: number; };
  velocity: { x: number; y: number; };
  rotation: number;
  rotationSpeed: number;
  speed: number;
  inertia: number;
  radius: number;
  lastShot: number;
  create: any;
  onDie: any;
  delete: boolean;
  sprite:any

  constructor(args:ShipArgs) {
    this.position = {
      x: args.position.x, 
      y: args.position.y
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.rotation = 0;
    this.rotationSpeed = 6;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.radius = 20;
    this.lastShot = 0;
    this.create = args.create;
    this.onDie = args.onDie;
    this.delete = false;
    const img = new Image()
    img.src = sp
    this.sprite = img
  }

  destroy(){
    //this.delete = true;
    //this.onDie();

    // Explode
    for (let i = 0; i < 60; i++) {
      const particle = new Particle({
        lifeSpan: randomNumBetween(100, 60),
        size: randomNumBetween(4, 1),
        position: {
          x: this.position.x + randomNumBetween(this.radius/4, -this.radius/4),
          y: this.position.y + randomNumBetween(this.radius/4, -this.radius/4)
        },
        velocity: {
          x: randomNumBetween(1.5, -1.5),
          y: randomNumBetween(1.5, -1.5)
        }
      });
      this.create(particle, 'particles');
    }
  }

  rotate(dir:string){
    if (dir == 'LEFT') {
      this.rotation -= this.rotationSpeed;
    }
    if (dir == 'RIGHT') {
      this.rotation += this.rotationSpeed;
    }
  }
    
  accelerate(val:number){
    this.velocity.x -= Math.sin(-this.rotation*Math.PI/180) * this.speed;
    this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;

    // Thruster particles
    let posDelta = rotatePoint({x:0, y:-10}, {x:0,y:0}, (this.rotation-180) * Math.PI / 180);
    const particle = new Particle({
      lifeSpan: randomNumBetween(40, 20),
      size: randomNumBetween(3, 1),
      position: {
        x: this.position.x + posDelta.x + randomNumBetween(2, -2),
        y: this.position.y + posDelta.y + randomNumBetween(2, -2)
      },
      velocity: {
        x: posDelta.x / randomNumBetween(5, 3),
        y: posDelta.y / randomNumBetween(5, 3)
      }
      //radius: this.radius
    });
    this.create(particle, 'particles');
  }

  updatePos(sp:number){
    //console.log(sp)
    // Move
    this.position.x += this.velocity.x ;
    this.position.y += this.velocity.y ;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;
  }

  render(state:AstroidsState){
    //console.log(state.keys)
    // Controls
    if(state.keys.up){
      this.accelerate(1);
    }
    if(state.keys.left){
      this.rotate('LEFT');
    }
    if(state.keys.right){
      this.rotate('RIGHT');
    }
    if(state.keys.space && Date.now() - this.lastShot > 300){
      const bullet = new Bullet({ship: this});
      this.create(bullet, 'bullets');
      this.lastShot = Date.now();
    }

    // Rotation
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    // Screen edges
    if(this.position.x > state.screen.width) this.position.x = 0;
    else if(this.position.x < 0) this.position.x = state.screen.width;
    if(this.position.y > state.screen.height) this.position.y = 0;
    else if(this.position.y < 0) this.position.y = state.screen.height;
    //console.log(this.position)
    // Draw
    const context:CanvasRenderingContext2D = state.context!;
    
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    const width = context.canvas.width*.15
    const height = context.canvas.height*.15
    context.drawImage(this.sprite,-width/2,-height/2,width,height)

    //**** draw ship from path */
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#000000';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI)
    // context.moveTo(0, -15);
    // context.lineTo(10, 10);
    // context.lineTo(5, 7);
    // context.lineTo(-5, 7);
    // context.lineTo(-10, 10);
    // context.closePath();
    // context.fill();
    context.stroke();
    context.restore();
  }

    
}