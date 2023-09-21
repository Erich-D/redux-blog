import { MutableRefObject, RefCallback, useEffect, useRef } from "react"
import { ScreenInfo } from "../../features/astroids/astroidsSlice"
import React from "react"

interface CanvasProps{
    callback:any
}

function Canvas(props:CanvasProps, ref:any){

    useEffect(()=>{
        let frameId:number
        let sp:number 
        let ot:number 
        let fps:number
        if(ref){
            const canvas: HTMLCanvasElement = ref.current
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetWidth*.75;
        }
    },[ref])

    return<>
        <canvas ref={ref} >No Content</canvas>
    </>
}

export default React.forwardRef(Canvas)