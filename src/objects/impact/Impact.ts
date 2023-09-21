import Game, { GameSprite } from "../game/Game";
import { randomNumBetween } from "../helpers/helpers";

interface ImpactAgrs{
    x:number 
    y:number 
    vx:number 
    vy:number 
    cor:number 
    rad:number
    scaler?:number
}

export default class Impact extends Game{
    inc: number = 0
    scale:number = 1/3
    sprites: GameSprite[];
    inertia: number;
    sNum: number;
    interval: number;
    constructor(args:ImpactAgrs){
        super(
            args.x,
            args.y,
            args.vx,
            args.vy,
            1,
            Math.round(randomNumBetween(130, 60)),
            args.cor,
            155,
            randomNumBetween(360),
            randomNumBetween(6, -6)
        );
        if(args.scaler){this.scale *= args.scaler}
        this.inertia = 0.88
        this.sNum = 11
        this.interval = Math.trunc(this.life/this.sNum)
        this.sprites = []
        for(let i = 0; i<11; i++){
            const im = require(`../../assets/explosions/Explo__0${i<10 ? "0"+i:i}.png`)
            const img = new Image()
            img.src = im
            this.sprites.push({image:img,size:{x:394,y:359}})
        }
    }
    render(state:{context:CanvasRenderingContext2D}): void {
        this.inc++
        const rand = Math.random()
        if(this.life-- < 0){
            this.destroy()
        }
        const imgNum = (this.life <= this.durability && this.life > this.durability-this.interval) ? 0:
                    (this.life <= this.durability-this.interval && this.life > this.durability-this.interval*2) ? 1:
                    (this.life <= this.durability-this.interval*2 && this.life > this.durability-this.interval*3) ? 2:
                    (this.life <= this.durability-this.interval*3 && this.life > this.durability-this.interval*4) ? 3:
                    (this.life <= this.durability-this.interval*4 && this.life > this.durability-this.interval*5) ? 4:
                    (this.life <= this.durability-this.interval*5 && this.life > this.durability-this.interval*6) ? 5:
                    (this.life <= this.durability-this.interval*6 && this.life > this.durability-this.interval*7) ? 6:
                    (this.life <= this.durability-this.interval*7 && this.life > this.durability-this.interval*8) ? 7:
                    (this.life <= this.durability-this.interval*8 && this.life > this.durability-this.interval*9) ? 8:
                    (this.life <= this.durability-this.interval*9 && this.life > this.durability-this.interval*10) ? 9:10
        //console.log(imgNum)
        // Rotation
        this.rotation += this.rotationSpeed;
        this.rotationSpeed = -(this.rotationSpeed) 
        if (this.rotation >= 360) {
            this.rotation -= 360;
        }
        if (this.rotation < 0) {
            this.rotation += 360;
        }
        // Draw
        const context = state.context;
        context.setTransform(this.scale,0,0,this.scale,this.position.x, this.position.y)
        context.rotate(this.rotation * Math.PI / 180);
        context.globalAlpha = Math.random()
        context.drawImage(this.sprites[imgNum].image,-this.sprites[2].size.x/2,-this.sprites[2].size.y/2)
        context.globalAlpha = 1
        //console.log(`Interval is ${this.inc%6} * ${rand} = ${this.inc%6*rand}`)
    }
    updatePos(seconds: number): void {
        // Move
        this.position.x += this.velocity.x * seconds;
        this.position.y += this.velocity.y * seconds;
        this.velocity.x *= this.inertia;
        this.velocity.y *= this.inertia;
    }
    destroy(): void {
        this.delete = true
    }
    
}