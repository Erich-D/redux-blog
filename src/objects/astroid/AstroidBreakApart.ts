import { create } from 'domain';
import Game from '../game/Game';
import { degreesToRadians, getLargeCircleAroundSmall, getSmallCirclesInLarge, radiansToDegrees, randomNumBetween, rotatePoint } from '../helpers/helpers';
import Asteroid from './Astroid';
import { AstroidConstants } from './AstroidConstants';
import Particle from '../particle/Particle';
import { AstroidsState } from '../../features/astroids/astroidsSlice';
import Shockwave from '../shockwave/Shockwave';

export default class AstroidBreakApart extends Game{
    id: number;
    inc: number = 0;
    scaler: number = 1;
    spawnScale:number = 1
    spawnlings: Asteroid[];
    reqRad: number = 1
    create: any;
    add: any;
    breakSpeed:number = 6
    breakArray:any[]
    frame:number = 0
    constructor(arg:Asteroid){
        super(
            arg.position.x,
            arg.position.y,
            arg.velocity.x,
            arg.velocity.y,
            500,            //mass
            600,            //life in frames
            1,
            arg.radius,
            arg.rotation,
            0
        );
        this.special = true
        this.id = arg.id //identifies sprite sheet
        this.create = arg.create
        this.add = arg.addScore
        //this.scaler = this.radius/AstroidConstants.getIndex(this.id)!.radius
        this.spawnlings = []
        this.breakArray = AstroidConstants.table.locs[arg.id-1].explode
        this.spawn()
        for(let i=0;i<this.spawnlings.length;i++){
            this.spawnlings[i].velocity = arg.velocity
        }
    }

    spawn(){
        // get number of asteroids to spawn
        const num = this.id <= 1 ? 4:(this.id > 1 && this.id <=5) ? 3:2
        // get radius of num circles drawn in this.radius
        const sRadius = getSmallCirclesInLarge(this.radius,num)
        // get radius of ring of smaller circles
        const circRad = this.radius - sRadius
        // variable to hold largest radius of spawned astroids
        let maxRadius = 0
        // spawn asteroids
        for(let i=0;i<num;i++){
            const id = Math.max(Math.min(this.select(),15),1)
            const angleCoords = rotatePoint({x:-circRad,y:0},{x:0,y:0},i*(degreesToRadians(360/num)))
            //console.log("New asteroid with id: "+id)
            const temp = new Asteroid({size:id,create:this.create,addScore:this.add,position:{x:angleCoords.x+this.position.x, y:angleCoords.y+this.position.y}})
            if(temp.radius>maxRadius){maxRadius = temp.radius}
            // console.log("coords are: {x: "+(temp.position.x)+", y: "+(temp.position.y)+"\nvelocity is: {x: "+this.velocity.x+" y: "+this.velocity.y+"\nposition is: {x: "+this.position.x+" y: "+this.position.y)
            // console.log("random = "+(randomNumBetween(15,-15)))
            const degs = radiansToDegrees(this.getRadians())
            const speed = Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y)
            // reset vector of asteroid to impact vector
            const newDeg = degs + i*(degreesToRadians(360/num)) + randomNumBetween(6,-6)
            //console.log("vector is: "+degs+" and speed is "+speed)
            this.spawnlings.push(temp)
        }
        // get radius of circle required to hold spawned asteroids
        const neededRad = getLargeCircleAroundSmall(maxRadius,num)
        this.reqRad = neededRad
        for(let i=0;i<num;i++){
            this.spawnlings[i].scaler *= sRadius/this.spawnlings[i].radius
        }
        const direction = this.getRadians()
        const distance = this.velocity.x / Math.cos(direction)
        // console.log("radians = "+radiansToDegrees(direction)+" velocity is x: "+this.velocity.x+" y: "+this.velocity.y)
        // console.log(`small radius is: ${sRadius} and required radius is: ${neededRad}`)
        
        

        // console.log("max radius is: "+maxRadius)
    }

    updateRadius(inc:number){
        this.radius += inc 
        //this.radius = (this.radius >= this.reqRad) ? this.reqRad:this.radius
        const r = getSmallCirclesInLarge(this.radius,this.spawnlings.length)
        const circRad = this.radius-r
        for(let i=0;i<this.spawnlings.length;i++){
            //const id = this.select()
            const angleCoords = rotatePoint({x:-circRad,y:0},{x:0,y:0},i*(2*Math.PI/this.spawnlings.length))
            this.spawnlings[i].position = {x:angleCoords.x+this.position.x, y:angleCoords.y+this.position.y}
            this.spawnlings[i].scaler = Math.min(this.spawnlings[i].scale * r/this.spawnlings[i].radius,this.spawnlings[i].scale)
            //this.spawnlings[i].radius = this.spawnlings[i].scaler * AstroidConstants.getIndex(this.spawnlings[i].id).radius * AstroidConstants.getIndex(this.spawnlings[i].id).initScale
        }
    }

    select():number{
        return (this.id <= 1) ? Math.round(randomNumBetween(5,2)):(this.id > 1 && this.id <= 5) ? Math.round(randomNumBetween(13,6)):Math.round(randomNumBetween(15,14))
    }

    getRadians(){
        let deg = Math.atan2(this.velocity.y,this.velocity.x)
        return deg
    }

    render(state:AstroidsState): void {
        this.inc++
        if(this.inc%this.breakSpeed === 0){this.frame++}
        console.log(`modulus: ${this.life} fram: ${this.radius} req: ${this.reqRad}`) 
        if(this.life-- < 0 || this.radius >= this.reqRad){
            //console.log("cur rad "+this.radius+" target rad "+this.reqRad)
            for(let i=0;i<this.spawnlings.length;i++){
                //this.create(this.spawnlings[i],"asteroids")
            }
            this.destroy()
        }

        this.updateRadius(1)

        // Screen edges
        if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
        else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
        if(this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
        else if(this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

        const r = getSmallCirclesInLarge(this.radius,this.spawnlings.length)

        // Draw
        const context:CanvasRenderingContext2D = state.context!;
        context.setTransform(1,0,0,1,this.position.x, this.position.y)
        // Draw heading vector
        context.strokeStyle = '#0FF';
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.velocity.x*20, this.velocity.y*20);
        context.stroke();
        context.strokeStyle = '#F0F';
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(500*Math.cos(this.getRadians()), 500*Math.sin(this.getRadians()));
        context.stroke();
        //let deg = Math.atan(this.velocity.x/this.velocity.y)
        //if(this.velocity.y>0){deg += Math.PI}
        //console.log("small r: "+deg+" big R: "+(-deg))
        context.rotate(this.getRadians());//this.rotation * Math.PI / 180
        if(this.frame<this.breakArray.length){
            const img = this.breakArray[this.frame]
            console.log(img)
            context.drawImage(AstroidConstants.sheet, img[0], img[1], img[2], img[3], img[4], img[5], img[6], img[7])
        }else{
            // draw hitbox
            const circRad = this.radius-r
            context.strokeStyle = '#0FF';
            context.lineWidth = 4;
            for(let i= 0;i<this.spawnlings.length;i++){
                let newCenter = rotatePoint({x:-circRad,y:0},{x:0,y:0},i*degreesToRadians(360/this.spawnlings.length))
                context.beginPath()
                context.arc(newCenter.x, newCenter.y, r, 0, 2 * Math.PI)
                context.stroke()
            }
            context.beginPath();
            context.arc(0, 0, this.radius, 0, 2 * Math.PI)
            context.stroke();
            context.beginPath()
        }
        // context.arc(-circRad, 0, r, 0, 2 * Math.PI)
        // context.stroke()
        // context.beginPath()
        // let newCenter = rotatePoint({x:-circRad,y:0},{x:0,y:0},degreesToRadians(120))
        // context.arc(newCenter.x, newCenter.y, r, 0, 2 * Math.PI)
        // context.stroke()
        // context.beginPath()
        // newCenter = rotatePoint({x:-circRad,y:0},{x:0,y:0},degreesToRadians(240))
        // context.arc(newCenter.x, newCenter.y, r, 0, 2 * Math.PI)
        // context.stroke()
        // context.strokeStyle = '#00F';
        // context.lineWidth = 6;
        //context.save()
        //context.scale(1,1)
        // for(let i= 0;i<this.spawnlings.length;i++){
        //     const sprite = this.spawnlings[i]
        //     //  
        //     // draw image sprite
        //     sprite.render(state)
        // }
        //context.restore()
    }
    updatePos(seconds: number): void {
        const time = Number.isNaN(seconds) ? .016:seconds
        this.oldPosition.x = this.position.x 
        this.oldPosition.y = this.position.y  
        // Move
        this.position.x += (this.velocity.x * time);
        this.position.y += (this.velocity.y * time);
        for(let i=0;i<this.spawnlings.length;i++){
            this.spawnlings[i].position.x += (this.velocity.x * time)
            this.spawnlings[i].position.y += (this.velocity.y * time)
        }
    }
    destroy(impactVector?: { x: number; y: number; } | undefined): void {
        if(this.life<0 || this.radius >= this.reqRad){
            // send shock waves to children asteroids velocity vectors
            //const shock = new Shockwave({x:this.position.x, y:this.position.y, vx:this.velocity.x, vy:this.velocity.y, rad:this.radius,create:this.create})
            //this.create(shock, "asteroids")
            this.delete = true;
        }
    }

}