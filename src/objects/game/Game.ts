import { ScreenInfo } from "../../features/astroids/astroidsSlice";

export interface GameSprite{image:HTMLImageElement,size:{x:number,y:number}}

export default abstract class Game{
    special = false
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    oldPosition: { x: number; y: number }
    oldVelocity: { x: number; y: number }
    rotation: number;
    oldRotation:number
    rotationSpeed: number;
    isColl: boolean
    mass: number;
    life: number;
    delete: boolean;
    cor: number;
    durability: number;
    radius: number;

    constructor(x:number,y:number,vx:number,vy:number,mass:number,life:number,cor:number,rad:number,rotation:number,rotationSpeed:number){
        this.position = {x:x,y:y}
        this.velocity = {x:vx,y:vy}
        this.oldPosition = {x:x,y:y}
        this.oldVelocity = {x:vx,y:vy}
        this.rotation = rotation
        this.oldRotation = rotation
        this.rotationSpeed = rotationSpeed
        this.mass = mass
        this.life = life
        this.durability = life
        this.cor = cor 
        this.radius = rad
        this.isColl = false
        this.delete = false
    }
    abstract render(params:any):void
    abstract updatePos(seconds:number,screen?:ScreenInfo):void
    abstract destroy(impactVector?:{ x: number; y: number }):void
}