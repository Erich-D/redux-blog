import { MutableRefObject, useEffect, useRef, useState } from "react"
import Canvas from "../../components/canvas/Canvas"
import { PlayKeys, ScreenInfo, AstroidsState, initialState } from "./astroidsSlice"
import useKeyPress from "../../hooks/UseKeyPress"
import Ship from "../../objects/ship/Ship"
import Asteroid from "../../objects/astroid/Astroid"
import { randomNumBetween } from "../../objects/helpers/helpers"
import Game from "../../objects/game/Game"
import AstroidBreakApart from "../../objects/astroid/AstroidBreakApart"
import { AstroidConstants } from "../../objects/astroid/AstroidConstants"

interface AstroidProps{
    width:number
}

export interface shipRender{
    keys:PlayKeys
    screen:ScreenInfo
    context:CanvasRenderingContext2D
}


export default function Astroids(){

    const [state, setState] = useState<AstroidsState>(initialState)
    const [mouseState, setMouseState] = useState<{x:number,y:number,text:string}>({x:0,y:0,text:""})
    const [cPoints, setPoints] = useState<{x:number,y:number}[]>([])
    const stateRef = useRef(state)
    const mouseRef = useRef(mouseState)
    const cpRef = useRef(cPoints)
    const cr = useRef(null)
    //TODO remove sprite canvas from state and set ref so it's referance doesn't change with state
    const asteroidSprites = useRef<HTMLCanvasElement>(document.createElement('canvas'))
    // references to game objects
    const ships = useRef<Ship[]>([])            
    const astroids = useRef<Game[]>([])
    const bullets = useRef<Game[]>([])
    const particles = useRef<Game[]>([])
    const points = useRef<{x:number,y:number}[]>([])
    const handleKeys = (e:KeyboardEvent) => {
        const setting = e.type === "keydown" ? true:false
        if(e.key === "ArrowLeft"   || e.key === "a") {setState(state => ({...state, keys:{...state.keys, left:setting}}))};
        if(e.key === "ArrowRight"  || e.key === "d") {setState(state => ({...state, keys:{...state.keys, right:setting}}))};
        if(e.key === "ArrowUp"     || e.key === "w") {setState(state => ({...state, keys:{...state.keys, up:setting}}))};
        if(e.key === " ") {setState(state => ({...state, keys:{...state.keys, space:setting}}))};
    }

    // hook to test for only keys of interest
    useKeyPress(['a','s','w','d',' ','ArrowUp','ArrowDown','ArrowRight','ArrowLeft'],handleKeys)

    // provide reference to mouse data for game objects
    useEffect(()=>{
        mouseRef.current = mouseState
    },[mouseState])

    // provide reference to state for game objects
    useEffect(()=>{
        stateRef.current = state
    },[state])

    useEffect(()=>{
        cpRef.current = cPoints
    },[cPoints])

    // hook to initialize start of game once canvas is available
    useEffect(()=>{
        console.log("looking for canvas")
        if(cr.current){
            console.log(cr.current)
            let frameId:number
            let sp:number 
            let ot:number 
            let fps:number
            // add listener for window resize
            window.addEventListener('resize', handleResize)
            // initial setup
            start()
            // create gameloop
            const canvas:HTMLCanvasElement = cr.current
            canvas.addEventListener('mousemove', mouse)
            canvas.addEventListener('mousedown', mouseClick)
            if(canvas !== null){setState(state=>({...state, context:canvas.getContext('2d')}))}
            const render = (timeStamp:number)=>{
                sp = (timeStamp - ot) / 1000
                ot = timeStamp
                fps = Math.round(1/sp)
                sp  = Math.min(sp, 0.1)  
                if(state.context){path(state.context,sp)}
                frameId = window.requestAnimationFrame(render)
            }
            window.requestAnimationFrame(render)
            return ()=>{
                window.cancelAnimationFrame(frameId);
                window.removeEventListener('resize', handleResize)
                canvas.removeEventListener('mousemove', mouse)
                canvas.removeEventListener('mousedown', mouseClick)
            }
        }
        
    },[cr.current])

    function mouseClick(this:HTMLCanvasElement, ev:MouseEvent){
        if(true){points.current.push({x:ev.offsetX,y:ev.offsetY})}
        setPoints(points=>([...points, {x:mouseRef.current.x,y:mouseRef.current.y}]))
        console.log("x: "+ev.offsetX+" y: "+ev.offsetY+" other info "+ev.movementX)
        //const text = points.current.map((item,index)=>{return `item: ${index} {x:${item.x}, y:${item.y}}`}).join(", ")
        //console.log(text)
        console.log("x: "+mouseRef.current.x+" y: "+mouseRef.current.y) 
    }

    function mouse(this:HTMLCanvasElement, ev:MouseEvent){
        setMouseState(state=>({...state, x:ev.offsetX - (stateRef.current.context ? stateRef.current.context.canvas.width/2:0),y:ev.offsetY - (stateRef.current.context ? stateRef.current.context.canvas.height/2:0)}))
        //console.log("x: "+ev.offsetX+" y: "+ev.offsetY)
        //console.log("x: "+mouseRef.current.x+" y: "+mouseRef.current.y)
    }

    // function to draw next frame for display 
    function path(ctx:CanvasRenderingContext2D,timePassed:number){
        // game background
        const bg = new Image()
        bg.src = require("../../assets/backgrounds/background_01_static.png")
        // use setTransform to ensure context in known state
        ctx.setTransform(state.screen.ratio,0,0,state.screen.ratio,0,0)
        //clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        //draw background
        ctx.drawImage(bg,0,0,ctx.canvas.width,ctx.canvas.height)
        //set text color to white
        ctx.fillStyle = '#FFFFFF'
        // draw scores and instructions
        ctx.font = "20px Georgia"
        ctx.textAlign = "start"
        ctx.fillText(`Score: ${stateRef.current.currentScore}`, 10, 20)
        ctx.textAlign = "end"
        ctx.fillText(`Top Score: ${state.topScore}`, ctx.canvas.width - 10, 20)
        ctx.font = "12px Georgia"
        ctx.textAlign = "center"
        ctx.fillText(`Use [A][S][W][D] or [←][↑][↓][→] to MOVE`, ctx.canvas.width/2, 15)
        ctx.fillText(`Use [SPACE] to SHOOT`, ctx.canvas.width/2, 35)
        ctx.strokeStyle = '#0FF';
        ctx.lineWidth = 1;
        for(let i=0;i<points.current.length;i++){
            // draw center
            ctx.beginPath();
            ctx.arc(points.current[i].x, points.current[i].y, 1, 0, 2 * Math.PI)
            ctx.fill();
        }
        //motion trail for line drawn objects
        // ctx.fillStyle = '#000';
        // ctx.globalAlpha = 0.4;
        //ctx.fillRect(0, 0, state.screen.width, state.screen.height);
        //ctx.globalAlpha = 1;
        //ctx.restore()
        // **********update game objects********
        // check for asteroids add more if none are left
        //if(astroids.current.length===0){setState(state=>({...state, astroidCount:state.astroidCount+1}));generateAsteroids(state.astroidCount)}//generateAsteroids(state.astroidCount)
        // update position of game objects prior to collision detection
        if(ships.current.length > 0){moveObjects(ships,timePassed)}
        if(bullets.current.length > 0){moveObjects(bullets,timePassed)}
        if(astroids.current.length > 0){moveObjects(astroids,timePassed)} 
        if(particles.current.length > 0){moveObjects(particles,timePassed)}
        // test for collisions
        checkCollisionsWith(bullets.current,astroids.current)
        //checkCollisionsWith(ships.current,astroids.current)
        checkCollisonsSame(astroids.current,timePassed)
        //checkCollisionsWith(astroids.current,astroids.current)
        if(ships.current.length > 0){updateObjects(ships)}
        if(bullets.current.length > 0){updateObjects(bullets)}
        if(astroids.current.length > 0){updateObjects(astroids)}
        if(particles.current.length > 0){updateObjects(particles)}
        ctx.setTransform(state.screen.ratio,0,0,state.screen.ratio,0,0)
        ctx.strokeStyle = '#0FF';
        ctx.lineWidth = 1;
        for(let i=0;i<points.current.length;i++){
            // draw center
            ctx.beginPath();
            ctx.arc(points.current[i].x, points.current[i].y, 1, 0, 2 * Math.PI)
            ctx.fill();
        }
        //ctx.restore()
        //ctx.save()
        // ctx.setTransform(.4,0,0,.4,0,0)
        // ctx.drawImage(AstroidConstants.sheet,0,0)
        //ctx.restore()
    }

    function start(){
        // steup sprite sheets
        createSpriteSheets()
        if(cr.current){
            console.log("starting up")
            const cvs:HTMLCanvasElement = cr.current
            setState(state=>({...state, ingame:true, context:cvs.getContext('2d'), topScore:localStorage["topscore"], currentScore:0, screen:{...state.screen, width:cvs.width, height:cvs.height}}))
            // Make ship
            let ship = new Ship({
                position: {
                x: cvs.width/2,
                y: cvs.height/2
                },
                create: createObject,
                onDie: gameOver
            });
            //console.log(stateRef.current.screen)
            ships.current[0] = ship
            astroids.current = []
            //if(astroids.current.length < 1){generateAsteroids(1)}
            //console.log(ships.current[0].position.x+"   "+astroids.current[0].position.x)
            let asteroid = new Asteroid({
                size: 1,//Math.round(randomNumBetween(5,1)),
                position: {
                    x: cvs.width/2,//randomNumBetweenExcluding(0, stateRef.current.screen.width, ship.position.x-60, ship.position.x+60),
                    y: cvs.height/2//randomNumBetweenExcluding(0, stateRef.current.screen.height, ship.position.y-60, ship.position.y+60)
                },
                create: createObject,
                addScore: addScore
                });
            asteroid.velocity = {x:10,y:10}
            asteroid.rotation = 0
            //asteroid.rotationSpeed = 0
            createObject(asteroid, 'asteroids');
        }
    }

    function createObject(item:any,group:string){
        switch (group){
            case "bullets":
                bullets.current.push(item)
                break;
            case "asteroids": 
                astroids.current.push(item)
                break;
            case "particles":
                particles.current.push(item)
                break;
            case "ships":
                ships.current.push(item)
                break;
            default:
                break;
        }
    }

    function moveObjects(items:MutableRefObject<any[]>,time:number){
        for(let item of items.current){
            item.updatePos(time,stateRef.current.screen)
        }
    }

    function updateObjects(items:MutableRefObject<any[]>){
        let index = 0;

        for (let item of items.current) {
            if (item.delete) {
                //if(item.final){item.final()}
                items.current.splice(index, 1);
            }else{
                item.render(stateRef.current);
            }
            index++;
        }
    }

    function addScore(points:number){
        if(stateRef.current.ingame){
            //console.log("adding points" + points)
            const newscore = stateRef.current.currentScore + points
          setState(state=>({...state,
            currentScore:newscore
          }));
        }
    }

    function generateAsteroids(howMany:number){
        if(ships.current.length > 0){
            let ship = ships.current[0];
            let quads:number[] = []
            let test = 0

            test = Math.round(randomNumBetween(5,1))
            console.log("generating asteroids")
            for (let i = 0; i < howMany; i++) {
                if(!quads.includes(test)){quads.push(test)}
                let asteroid = new Asteroid({
                size: 2,//Math.round(randomNumBetween(5,1)),
                position: {
                    x: 520,//randomNumBetweenExcluding(0, stateRef.current.screen.width, ship.position.x-60, ship.position.x+60),
                    y: 520//randomNumBetweenExcluding(0, stateRef.current.screen.height, ship.position.y-60, ship.position.y+60)
                },
                create: createObject,
                addScore: addScore
                });
                console.log("creating "+howMany+" asteroids")
                let obj = new AstroidBreakApart(asteroid)
                createObject(obj, 'asteroids');
            }
        }
    }

    function checkCollisionsWith(items1:any[], items2:any[]) {
        let a = items1.length - 1;
        let b;
        for(a; a > -1; --a){
            b = items2.length - 1;
            for(b; b > -1; --b){
                var obj1 = items1[a];
                var obj2 = items2[b];
                if(checkCollision(obj1, obj2)){
                    obj1.destroy();
                    obj2.destroy();
                }
                // check for collsion if both objects are not set to be deleted (previous collsion detection may have already destroyed object)
                // if(!obj1.delete && !obj2.delete && !obj1.isColl && !obj2.isColl && checkCollision(obj1, obj2)){
                //     // call destroy on both objects to check if this is last hit
                //     obj1.destroy();
                //     obj2.destroy();
                //     // skip collison correction if both objects destroyed
                //     if((!obj1.delete || !obj2.delete)){getCollisionData(obj1,obj2)}
                //     obj1.isColl = true
                //     obj2.isColl = true
                //     console.log(!obj1.delete)
                // }else if(!checkCollision(obj1, obj2)){
                //     obj1.isColl = false
                //     obj2.isColl = false
                // }
            }
        }
    }

    // test for asteroids colliding with each other
    function checkCollisonsSame(items:Game[],time:number){
        let obj1
        let obj2
        for(let i=0;i<items.length;i++){
            obj1 = items[i]
            for(let j=i+1;j<items.length;j++){
                obj2 = items[j]
                // check for collsion if both objects are not set to be deleted (previous collsion detection may have already destroyed object)
                if(!obj1.delete && !obj2.delete && !obj1.isColl && !obj2.isColl && checkCollision(obj1, obj2)){
                    let col = {x:obj1.position.x, y:obj1.position.y}
                    col = getCollisionData(obj1,obj2,time)
                    // call destroy on both objects
                    if(!obj1.special && !obj2.special){obj1.destroy(col)};
                    if(!obj1.special && !obj2.special){obj2.destroy(col)};
                    //console.log(!obj1.delete)
                }else if(!checkCollision(obj1, obj2)){
                    obj1.isColl = false
                    obj2.isColl = false
                }
            }
        }
    }

         
    function getCollisionData(obj1:Game,obj2:Game,time:number){
        // get collision vector (direction of collsion from obj1 perspective)
        const colVec = {x: obj2.position.x - obj1.position.x, y: obj2.position.y-obj1.position.y}
        // get distance of collision vector
        const dist = Math.sqrt(colVec.x*colVec.x + colVec.y*colVec.y)
        const depth = (obj1.radius+obj2.radius)-dist
        //console.log("distance is "+dist+" from "+(obj1.radius+obj2.radius)+" for a dif of: "+depth)
        // get normalized collision vector
        const colVecNorm = {x: colVec.x / dist, y: colVec.y / dist}
        //console.log("col vector is "+colVecNorm.x+" and "+colVecNorm.y+" dir")
        // get impact point
        const impact = {x: obj1.position.x + colVecNorm.x * (dist - obj2.radius), y: obj1.position.y + colVecNorm.y * (dist - obj2.radius)}
        // get collision speed
        const relVel = {x: obj1.velocity.x - obj2.velocity.x, y: obj1.velocity.y - obj2.velocity.y}
        const speed = Math.min(Math.max(relVel.x * colVecNorm.x + relVel.y * colVecNorm.y,-200),200)//*Math.min(obj1.cor,obj2.cor)
        const impulse = speed / (obj1.mass + obj2.mass) / 3
        // change velocity if object moving towards each other (speed is positive)
        if(speed>0){
            // apply speed in direction of collision
            obj1.velocity.x -= (speed*colVecNorm.x)
            obj1.velocity.y -= (speed*colVecNorm.y)
            obj2.velocity.x += (speed*colVecNorm.x)
            obj2.velocity.y += (speed*colVecNorm.y)
        }
        // change velocity by mass 
        if(obj1.mass*(obj1.velocity.x+obj1.velocity.y) >= obj2.mass*(obj2.velocity.x+obj2.velocity.y)){
            obj1.velocity.x -= (impulse*obj2.mass*colVecNorm.x)
            obj1.velocity.y -= (impulse*obj2.mass*colVecNorm.y)
            obj2.velocity.x += (impulse*obj1.mass*colVecNorm.x)
            obj2.velocity.y += (impulse*obj1.mass*colVecNorm.y)
        }else{
            obj1.velocity.x += (impulse*obj2.mass*colVecNorm.x)
            obj1.velocity.y += (impulse*obj2.mass*colVecNorm.y)
            obj2.velocity.x -= (impulse*obj1.mass*colVecNorm.x)
            obj2.velocity.y -= (impulse*obj1.mass*colVecNorm.y)
        }
        // keep velocity within workable range
        obj1.velocity.x = Math.min(Math.max(obj1.velocity.x,-500),500)
        obj1.velocity.y = Math.min(Math.max(obj1.velocity.y,-500),500)
        obj2.velocity.x = Math.min(Math.max(obj2.velocity.x,-500),500)
        obj2.velocity.y = Math.min(Math.max(obj2.velocity.y,-500),500)
        // move back out of collision
        obj1.position.x = obj1.oldPosition.x;
        obj1.position.y = obj1.oldPosition.y;
        obj2.position.x = obj2.oldPosition.x; 
        obj2.position.y = obj2.oldPosition.y;
        // move forward on new heading
        let ct = 0
        do{
            //console.log("run: "+(--ct)+" through coll. Depth is still: "+depth)
            obj1.updatePos(time*(1+depth/2),stateRef.current.screen)
            obj2.updatePos(time*(1+depth/2),stateRef.current.screen)
        }while(checkCollision(obj1, obj2))
        return impact
    }

    function checkCollision(obj1:any, obj2:any){
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = vx * vx + vy * vy;
        // test max radius for possible collision
        if(length < (obj1.radius + obj2.radius)*(obj1.radius + obj2.radius)){
            // TODO add check for multiple hit boxes to allow for better shape coverage
            obj1.isColl = true
            obj2.isColl = true
            return true;
        }
        return false;
    }  

    function gameOver(){
        setState(state=>({...state, ingame:false}))
      
        // Replace top score
        if(stateRef.current.currentScore > stateRef.current.topScore){
        setState(state=>({...state, topScore:stateRef.current.currentScore}))
        localStorage['topscore'] = stateRef.current.currentScore;
        }
    }

    function handleResize(this: Window, ev: UIEvent) {
        const cvs:HTMLCanvasElement = cr.current!
        setState(state=>({...state, screen:{...state.screen, width:cvs.width, height:cvs.height}}))
    }

    function submitCoords(){
        const text = points.current.map((item,index)=>{return `{x:${item.x}, y:${item.y}}`}).join(", ")
        console.log(text)
        setPoints([])
    }

    function createSpriteSheets() {
        AstroidConstants.buildSprites()
    }

    return<>
        <div style={{width:'100%'}}>
            <Canvas ref={cr} callback={null} />
            <p>{`{x:${state.context ? state.context!.canvas.width:"no data"} y:${state.context ? state.context!.canvas.height:"no data"}} spritesheet w: ${asteroidSprites.current.width} h: ${asteroidSprites.current.height}`}</p><button onClick={submitCoords}>Submit</button><p>{`[${cpRef.current.map((item,index)=>{return `{x:${item.x}, y:${item.y}}`}).join(", ")}]`}</p>
        </div>
    </>
}




