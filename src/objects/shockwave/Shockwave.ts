import { AstroidsState } from "../../features/astroids/astroidsSlice";
import Game from "../game/Game";
import Impact from "../impact/Impact";

export default class Shockwave extends Game{
    inertia:number = 0.98
    endRad:number
    create: any;
    constructor(args:{x:number,y:number,vx:number,vy:number,rad:number,create:any}){
        super(
            args.x,
            args.y,
            args.vx,
            args.vy,
            500,
            60,
            1,
            1,
            0,
            0
        );
        this.create = args.create
        this.endRad = args.rad
        this.special = true
        const imp = new Impact({x:this.position.x,y:this.position.y,vx:0,vy:0,cor:1,rad:20})
        this.create(imp, 'particles')
    }
    render(state:AstroidsState): void {
        if(this.life-- < 0){
            console.log("destroy from life")
            this.destroy()
          }
        const context:CanvasRenderingContext2D = state.context!;
        context.setTransform(1,0,0,1,this.position.x, this.position.y)
          // Draw
          context.strokeStyle = '#FFFFFF08';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI)
        context.stroke();
    }
    updatePos(sp: number): void {
        // Move
        this.position.x += this.velocity.x * sp;
        this.position.y += this.velocity.y * sp;
        this.velocity.x *= this.inertia;
        this.velocity.y *= this.inertia;
        // Grow radius
        if(!this.isColl){
            this.radius += 2;
            if(this.radius > this.endRad) {
                //console.log("destroy from radius")
                this.destroy();
            }
        }
    }
    destroy(impactVector?: { x: number; y: number; } | undefined): void {
        //console.log("dead at radius: "+this.radius+"from end radius "+this.endRad+" this delete is "+this.delete)
        this.delete = true;
    }

}