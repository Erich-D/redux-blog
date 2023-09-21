
interface ParticleArgs{
    position: { x: number; y: number; };
    velocity: any;
    lifeSpan: number;
    size:any;
}

export default class Particle {
    position: { x: number; y: number; };
    velocity: { x: number; y: number; };
    radius: number;
    lifeSpan: number;
    inertia: number;
    delete: boolean;

    constructor(args:ParticleArgs) {
      this.position = args.position
      this.velocity = args.velocity
      this.radius = args.size;
      this.lifeSpan = args.lifeSpan;
      this.inertia = 0.98;
      this.delete = false
    }
  
    destroy(){
      this.delete = true;
    }

    updatePos(sp:number){
      // Move
      this.position.x += this.velocity.x * sp;
      this.position.y += this.velocity.y * sp;
      this.velocity.x *= this.inertia;
      this.velocity.y *= this.inertia;
    }
  
    render(state:{context:CanvasRenderingContext2D}){
      // Shrink
      this.radius -= 0.1;
      if(this.radius < 0.1) {
        this.radius = 0.1;
      }
      if(this.lifeSpan-- < 0){
        this.destroy()
      }
  
      // Draw
      const context = state.context;
      context.setTransform(1,0,0,1,this.position.x, this.position.y)
      context.fillStyle = '#ffffff';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, -this.radius);
      context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    }
  }