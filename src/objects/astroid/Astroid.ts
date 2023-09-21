import Particle from '../particle/Particle';
import { asteroidVertices, randomNumBetween, randomNumBetweenExcluding } from '../helpers/helpers';
import { AstroidsState, ScreenInfo } from '../../features/astroids/astroidsSlice';
import { AstroidConstants } from "./AstroidConstants"
import AstroidBreakApart from "./AstroidBreakApart"
import Game from '../game/Game';
import Impact from '../impact/Impact';


interface AstroidArgs{
    size: number;
    create: any;
    addScore: any;
    position:{ x: number; y: number; }
    scaler?:number
}
// astroid sprite = 600 x 500
export default class Asteroid extends Game{
  static scale: number = 1
  nextState: boolean = false
  scaler: number = Asteroid.scale
  id: number
  score: number;
  create: any;
  addScore: any;
  sprite: HTMLImageElement;
  spriteSize: { x: number; y: number; };
  spriteRows: number;
  spriteNum: number = 0
  clipPaths: string[] = []
  clipPath: string = ""
  break1:any

  constructor(args:AstroidArgs) {
    //console.log(args.size)
    super(args.position.x,
      args.position.y,
      randomNumBetween(150, -150), 
      randomNumBetween(150, -150),
      AstroidConstants.getIndex(args.size)!.radius/2,
      AstroidConstants.getIndex(args.size)!.hits,
      1,
      AstroidConstants.getIndex(args.size)!.radius*Asteroid.scale,
      0,
      0//randomNumBetween(2, -2)
    )
    if(args.scaler){this.scaler = Asteroid.scale*args.scaler;this.radius = AstroidConstants.getIndex(args.size)!.radius*this.scaler}
    this.id = args.size
    this.score = AstroidConstants.getIndex(args.size)!.radius
    //allows this object to create other game objects
    this.create = args.create;
    this.addScore = args.addScore;
    // mark to delete instead of paint
    this.delete = false
    // get image sprite based on size
    const im = require(`../../assets/asteroids/asteroid_${(args.size%15)<10 ? '0'+args.size%15:args.size%15}_with_cracks.png`)
    const img:HTMLImageElement = new Image()
    img.src = im
    this.sprite = img
    this.spriteSize = AstroidConstants.getIndex(args.size)!.size
    this.spriteRows = AstroidConstants.getIndex(args.size)!.rows
    AstroidConstants.getIndex(args.size)!.paths.forEach(item=>{this.clipPaths.push(`${item}`)})
      //make a clip path string  points.current.map((item,index)=>{return `{x:${item.x}, y:${item.y}}`}).join(", ")
      const clip2 = `M -300 0 ${AstroidConstants.getIndex(args.size)!.colArrays[1][0].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[2][1].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 0 250 -300 250 Z`
      const clip1 = `M 0 250 ${AstroidConstants.getIndex(args.size)!.colArrays[2][1].map((o,i)=>{return `${o.x} ${o.y}`}).reverse().join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[1][1].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 300 0 300 250 Z`
      const clip3 = `M -300 0 ${AstroidConstants.getIndex(args.size)!.colArrays[1][0].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[2][0].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 0 -250 -300 -250 Z`
      const clip4 = `M 0 -250 ${AstroidConstants.getIndex(args.size)!.colArrays[2][0].map((o,i)=>{return `${o.x} ${o.y}`}).reverse().join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[1][1].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 300 0 300 -250 Z`
      console.log(this.clipPaths[1])
      this.clipPath = AstroidConstants.getIndex(args.size)!.paths[2]
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = 600
    tempCanvas.height = 500
    const ctx:CanvasRenderingContext2D = tempCanvas.getContext('2d')!
    const width = this.spriteSize.x
    const height = this.spriteSize.y
    //img.onload((e)=>{
      ctx.setTransform(this.scaler,0,0,this.scaler,300, 250)
      console.log(AstroidConstants.getIndex(args.size)!.paths[0])
      const spriteNum = this.durability - this.life
      ctx.save()
      ctx.clip(new Path2D(this.clipPath))
      const cols = 2//this.durability / this.spriteRows
      const rowNum = 1//Math.floor(spriteNum/cols)
      const colNum = 2//spriteNum % cols
      ctx.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
      ctx.restore()
      this.break1 = tempCanvas
    //})
    
    }

  destroy(impactVector:{ x: number; y: number }){
    // check if end of life
    if(this.life-1 < 1){this.delete = true; this.addScore(this.score);}
    // take from life if still in there
    this.life = Math.max(this.life-1,1)
    //this.cor *= .8
    // Explode if end of life
    if(this.delete){
      for (let i = 0; i < this.radius; i++) {
        const particle = new Particle({
          lifeSpan: randomNumBetween(100, 60),
          size: randomNumBetween(3, 1),
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
      if(this.durability>2){
        //console.log(this.durability)
        const breakup = new AstroidBreakApart(this)
        this.create(breakup, 'asteroids')
      }
    }
    if(this.isColl){
      if(impactVector !== undefined){
        const imp = new Impact({x:impactVector.x,y:impactVector.y,vx:0,vy:0,cor:1,rad:20})
        this.create(imp, 'particles')
      }
      
    }
  }


  updatePos(sp:number,screen:ScreenInfo){
    // old position should be updated if collisions will be checked
    const time = Number.isNaN(sp) ? .016:sp
    this.oldPosition.x = this.position.x 
    this.oldPosition.y = this.position.y  
    // Move
    this.position.x += (this.velocity.x * time);
    this.position.y += (this.velocity.y * time);
    // Screen edges
    if(this.position.x > screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = screen.width + this.radius;
    if(this.position.y > screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = screen.height + this.radius;
    // Rotation
    this.oldRotation = this.rotation
    this.rotation += this.rotationSpeed;
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }
  }

  render(state: AstroidsState){
    // Move
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;

    //Rotation
    this.rotation += this.rotationSpeed;
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }
    // console.log(this.rotationSpeed)
    // Screen edges
    // if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
    // else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
    // if(this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
    // else if(this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

    // Draw
    const context:CanvasRenderingContext2D = state.context!;
    context.setTransform(this.scaler,0,0,this.scaler,this.position.x+10, this.position.y+10)
    // Draw heading vector
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.velocity.x*2, this.velocity.y*2);
    context.stroke();
    context.rotate(this.rotation * Math.PI / 180);
    context.save()
    context.clip(new Path2D(this.clipPath))
    // draw image sprite
    const width = this.spriteSize.x
    const height = this.spriteSize.y
    const spriteNum = this.durability - this.life
    if(spriteNum !== this.spriteNum){this.spriteNum=spriteNum;this.nextState=true}
    const cols = this.durability / this.spriteRows
    const rowNum = Math.floor(spriteNum/cols)
    const colNum = spriteNum % cols
    context.drawImage(this.break1, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
    context.restore()
    // draw hitbox
    context.strokeStyle = '#0F0';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, this.radius/this.scaler, 0, 2 * Math.PI)
    context.stroke();
    // draw center
    context.strokeStyle = '#0FF';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, 5, 0, 2 * Math.PI)
    context.fill();
    
    if(spriteNum-1 >= 0 && this.nextState){
      const rands = AstroidConstants.getIndex(this.id)?.colArrays[spriteNum-1]
      console.log(rands?.length)
      const flat = rands!.flat()
      console.log(flat[52])
      for(let i=0; i<flat.length/2;i++){
        const index = Math.round(randomNumBetween(flat.length-1))
        const imp = new Impact({x:flat[index].x+this.position.x,y:flat[index].y+this.position.y,vx:0,vy:0,cor:1,rad:20})
        this.create(imp, 'particles')
      }
      this.nextState = false
    }
  }
}