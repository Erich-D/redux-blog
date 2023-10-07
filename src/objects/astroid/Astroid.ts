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
  scale: number = 1
  cnt:number = 0
  nextState: boolean = false
  scaler: number = 1
  id: number
  score: number;
  create: any;
  addScore: any;
  // sprite: HTMLImageElement;
  // spriteSize: { x: number; y: number; };
  // spriteRows: number;
  spriteNum: number = 0
  // clipPaths: Path2D[] = []
  // clipPath: string = ""
  //break1:any

  constructor(args:AstroidArgs) {
    //console.log(args.size)
    super(args.position.x,
      args.position.y,
      randomNumBetween(150, -150), 
      randomNumBetween(150, -150),
      AstroidConstants.getIndex(args.size)!.radius/2,
      AstroidConstants.getIndex(args.size)!.hits,
      1,
      AstroidConstants.getIndex(args.size)!.radius*AstroidConstants.getIndex(args.size).initScale,
      0,
      randomNumBetween(2, -2)
    )
    this.scale*= AstroidConstants.getIndex(args.size).initScale
    this.scaler *= this.scale
    if(args.scaler){this.scaler *= args.scaler;this.radius *= args.scaler}
    this.id = args.size
    this.score = AstroidConstants.getIndex(args.size)!.radius
    //allows this object to create other game objects
    this.create = args.create;
    this.addScore = args.addScore;
    // mark to delete instead of paint
    this.delete = false
    // get image sprite based on size
    // const im = require(`../../assets/asteroids/asteroid_${(args.size)<10 ? '0'+args.size:args.size}_with_cracks.png`)
    // const img:HTMLImageElement = new Image()
    // img.src = im
    // this.sprite = img
    // this.spriteSize = AstroidConstants.getIndex(args.size)!.size
    // this.spriteRows = AstroidConstants.getIndex(args.size)!.rows
    // AstroidConstants.getIndex(args.size)!.paths.forEach(item=>{this.clipPaths.push(new Path2D(item))})
      //make a clip path string  points.current.map((item,index)=>{return `{x:${item.x}, y:${item.y}}`}).join(", ")
    //   const clip2 = `M -300 0 ${AstroidConstants.getIndex(args.size)!.colArrays[1][0].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[2][1].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 0 250 -300 250 Z`
    //   const clip1 = `M 0 250 ${AstroidConstants.getIndex(args.size)!.colArrays[2][1].map((o,i)=>{return `${o.x} ${o.y}`}).reverse().join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[1][1].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 300 0 300 250 Z`
    //   const clip3 = `M -300 0 ${AstroidConstants.getIndex(args.size)!.colArrays[1][0].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[2][0].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 0 -250 -300 -250 Z`
    //   const clip4 = `M 0 -250 ${AstroidConstants.getIndex(args.size)!.colArrays[2][0].map((o,i)=>{return `${o.x} ${o.y}`}).reverse().join(" ")} ${AstroidConstants.getIndex(args.size)!.colArrays[1][1].map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 300 0 300 -250 Z`
    //   console.log(this.clipPaths[1])
    //   this.clipPath = AstroidConstants.getIndex(args.size)!.paths[3]
    // const tempCanvas = document.createElement('canvas')
    // tempCanvas.width = 600
    // tempCanvas.height = 500
    // const ctx:CanvasRenderingContext2D = tempCanvas.getContext('2d')!
    // const width = this.spriteSize.x
    // const height = this.spriteSize.y
    //img.onload((e)=>{
      // ctx.setTransform(this.scaler,0,0,this.scaler,300, 250)
      // console.log(AstroidConstants.getIndex(args.size)!.paths[0])
      // const spriteNum = this.durability - this.life
      // ctx.save()
      // ctx.clip(new Path2D(this.clipPath))
      // const cols = 2//this.durability / this.spriteRows
      // const rowNum = 1//Math.floor(spriteNum/cols)
      // const colNum = 2//spriteNum % cols
      // ctx.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
      // ctx.restore()
      // this.break1 = tempCanvas
    //})
    
    }

  //called by gameloop when collision detected  
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
        console.log(this.durability)
        const breakup = new AstroidBreakApart(this)
        this.create(breakup, 'asteroids') 
      }
    }
    //called if collision doesn't result in impact
    if(this.isColl){
      if(impactVector !== undefined){
        const imp = new Impact({x:impactVector.x,y:impactVector.y,vx:this.velocity.x,vy:this.velocity.y,cor:1,rad:20})
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
    this.cnt++
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
    context.setTransform(this.scaler/this.scale,0,0,this.scaler/this.scale,this.position.x, this.position.y) 
    // Draw heading vector
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.velocity.x*20, this.velocity.y*20);
    context.stroke();
    context.rotate(this.rotation * Math.PI / 180);
    const trans2 = Math.min(this.cnt*.2,100)
    const trans = trans2
    //context.save()
    //context.clip(new Path2D(this.clipPath))
    // draw image sprite
    // const width = this.spriteSize.x
    // const height = this.spriteSize.y
    const spriteNum = this.durability - this.life
    if(spriteNum !== this.spriteNum){this.spriteNum=spriteNum;this.nextState=true}
    // const cols = this.durability / this.spriteRows
    // const rowNum = Math.floor(spriteNum/cols)
    // const colNum = spriteNum % cols
    //context.translate(trans,trans)
    //context.clip(new Path2D(AstroidConstants.ASTEROID_06.paths[1]))
    //context.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
    const img = AstroidConstants.table.locs[this.id-1].hits[spriteNum]
    context.drawImage(AstroidConstants.sheet, img[0], img[1], img[2], img[3], img[4], img[5], img[6], img[7])
    // //lower right
    // context.save()
    // context.translate(trans,trans)
    // context.clip(this.clipPaths[0])
    // context.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
    // context.beginPath();
    // context.stroke(this.clipPaths[0]);
    // context.restore()
    // //lower left
    // context.save()
    // context.translate(-trans,trans)
    // context.clip(this.clipPaths[1])
    // context.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
    // context.beginPath();
    // context.stroke(this.clipPaths[1]);
    // context.restore()
    // //upper left
    // context.save()
    // context.translate(-trans,-trans)
    // context.clip(this.clipPaths[2])
    // context.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
    // context.beginPath();
    // context.stroke(this.clipPaths[2])
    // context.restore()
    // //upper right
    // context.save()
    // context.translate(trans,-trans)
    // context.clip(this.clipPaths[3])
    // context.drawImage(this.sprite, colNum*width, rowNum*height, width, height, -width/2, -height/2, width, height)
    // context.beginPath();
    // context.stroke(this.clipPaths[3]);
    // context.restore()
    // draw center
    // context.strokeStyle = '#0FF';
    // context.lineWidth = 2;
    // context.beginPath();
    // context.rect(-(width/2+trans2), -(height/2+trans2), width+trans2*2, height+trans2*2)
    // context.stroke();
    // context.moveTo(0,-(height/2+trans2))
    // context.lineTo(0,height/2+trans2)
    // context.stroke()
    // context.moveTo(-(width/2+trans2),0)
    // context.lineTo(width/2+trans2,0)
    // context.stroke()
    // const tmep1 = [{x:-22.5, y:2.5}, {x:-18.5, y:0.5}, {x:-14.5, y:-0.5}, {x:-12.5, y:-2.5}, {x:-9.5, y:-4.5}, {x:-7.5, y:-7.5}, {x:-4.5, y:-9.5}, {x:-1.5, y:-11.5}, {x:2.5, y:-14.5}, {x:6.5, y:-13.5}, {x:8.5, y:-15.5}, {x:8.5, y:-18.5}, {x:10.5, y:-22.5}, {x:13.5, y:-24.5}, {x:19.5, y:-26.5}]
    // const temp2 = [{x:-33.5, y:-7.5}, {x:-26.5, y:-11.5}, {x:-20.5, y:-14.5}, {x:-18.5, y:-18.5}, {x:-16.5, y:-22.5}, {x:-14.5, y:-28.5}, {x:-14.5, y:-35.5}, {x:-14.5, y:-42.5}, {x:-19.5, y:-46.5}, {x:-21.5, y:-51.5}, {x:-28.5, y:-55.5}, {x:-34.5, y:-60.5}, {x:-34.5, y:-66.5}, {x:-32.5, y:-67.5}, {x:-28.5, y:-72.5}, {x:-26.5, y:-77.5}, {x:-22.5, y:-85.5}]
    // const temp3 = [{x:-32.5, y:-5.5}, {x:-27.5, y:-7.5}, {x:-23.5, y:-6.5}, {x:-15.5, y:-5.5}, {x:-11.5, y:-3.5}, {x:-7.5, y:0.5}, {x:-2.5, y:-2.5}, {x:-2.5, y:-11.5}, {x:1.5, y:-13.5}, {x:4.5, y:-10.5}, {x:8.5, y:-7.5}, {x:13.5, y:-10.5}, {x:20.5, y:-14.5}, {x:29.5, y:-15.5}, {x:34.5, y:-15.5}, {x:42.5, y:-13.5}, {x:47.5, y:-11.5}, {x:53.5, y:-15.5}, {x:58.5, y:-19.5}, {x:63.5, y:-18.5}, {x:68.5, y:-15.5}, {x:73.5, y:-12.5}, {x:73.5, y:-7.5}, {x:71.5, y:-2.5}, {x:68.5, y:0.5}, {x:72.5, y:3.5}, {x:76.5, y:5.5}, {x:78.5, y:8.5}, {x:84.5, y:10.5}, {x:89.5, y:3.5}, {x:94.5, y:-3.5}, {x:95.5, y:-10.5}, {x:101.5, y:-8.5}, {x:105.5, y:-14.5}, {x:109.5, y:-23.5}, {x:117.5, y:-22.5}, {x:121.5, y:-17.5}, {x:124.5, y:-9.5}, {x:122.5, y:-0.5}, {x:123.5, y:5.5}, {x:130.5, y:6.5}, {x:139.5, y:8.5}, {x:148.5, y:10.5}, {x:154.5, y:12.5}, {x:158.5, y:18.5}, {x:166.5, y:24.5}, {x:172.5, y:29.5}, {x:178.5, y:31.5}, {x:183.5, y:37.5}, {x:188.5, y:41.5}, {x:197.5, y:44.5}, {x:205.5, y:44.5}, {x:222.5, y:46.5}]
    // const clip2 = `M -35 0 ${tmep1.map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 35 0 35 -50 -35 -50 Z`
    // const clip1 = `M 0 100 ${tmep1.map((o,i)=>{return `${o.x} ${o.y}`}).reverse().join(" ")} ${temp2.map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 0 -100 -225 -100 -225 100 Z`
    // const clip3 = `M 0 -100 ${temp2.map((o,i)=>{return `${o.x} ${o.y}`}).reverse().join(" ")} ${temp3.map((o,i)=>{return `${o.x} ${o.y}`}).join(" ")} 225 50 225 -100 Z`
    // const path = new Path2D(AstroidConstants.ASTEROID_06.paths[1])
    // console.log(clip2)
    // context.stroke(path)
    if(spriteNum-1 >= 0 && this.nextState){
      const rands = AstroidConstants.getIndex(this.id)?.colArrays[spriteNum-1]
      console.log(rands?.length)
      const flat = rands!.flat()
      console.log(flat[52])
      for(let i=0; i<flat.length/2;i++){
        const index = Math.round(randomNumBetween(flat.length-1))
        const imp = new Impact({x:flat[index].x*this.scaler+this.position.x,y:flat[index].y*this.scaler+this.position.y,vx:0,vy:0,cor:1,rad:20})
        this.create(imp, 'particles')
      }
      this.nextState = false
    }
  }

  toString(){
    return `
      position: { x: ${this.position.x}, y: ${this.position.y} }\n
      velocity: { x: ${this.velocity.x}, y: ${this.velocity.y} }\n
      oldPosition: { x: ${this.oldPosition.x}, y: ${this.oldPosition.y} }\n
      oldVelocity: { x: ${this.oldVelocity.x}, y: ${this.oldVelocity.y} }\n
      rotation: ${this.rotation}\n
      oldRotation:${this.oldRotation}\n
      rotationSpeed: ${this.rotationSpeed}\n
      isColl: ${this.isColl}\n
      mass: ${this.mass}\n
      life: ${this.life}\n
      delete: ${this.delete}\n
      cor: ${this.cor}\n
      durability: ${this.durability}\n
      radius: ${this.radius}
    `
  }
}