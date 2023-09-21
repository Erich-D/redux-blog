import { useEffect, useRef, useState } from "react";
import Body from "../../components/body/Body";
import Canvas from "../../components/canvas/Canvas";
import ship from "../../asteroids-spaceship-png.png" 
import space from "../../space.jpg"
import Ship from "../../objects/ship/Ship";
import Astroids from "../../features/astroids/Astroids";

// function to draw next frame for display
function path(ctx:CanvasRenderingContext2D,tp:number){
    const frameCount = 9
    // game background
    const bg = new Image()
    bg.src = require("../../assets/backgrounds/background_01_static.png")
    ctx.drawImage(bg,0,0)
    // Get a random color, red or blue
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    // Draw a rectangle
    ctx.fillStyle = randomColor;
    ctx.fillRect(100, 50, 200, 175);
}

function getRads(d:number):number{
    return d * Math.PI / 180
}

export default function TestPage(){
    const headId = useRef(null)
    const [hw, setHw] = useState<number|null>(null)

    useEffect(()=>{
        const temp:any = headId.current
        if(temp){setHw(temp.offsetWidth)}
    },[headId])

    return<>
        <Body sidebar>
            <h1 ref={headId}>Test Page</h1>
            <Astroids />
            {/* <Canvas path={path} /> */}
        </Body>
    </>
}