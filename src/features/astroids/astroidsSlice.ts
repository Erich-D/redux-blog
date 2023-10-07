import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import Ship from "../../objects/ship/Ship"


export interface ScreenInfo{
    width:number 
    height: number 
    ratio: number
}

export interface PlayKeys{
    left:boolean 
    right:boolean  
    up:boolean  
    down:boolean  
    space:boolean 
}

export interface ShipState{
    create: any
    onDie: any
    position:any 
    velocity:any 
    rotation:number 
    rotationSpeed:number 
    speed:number 
    inertia:number 
    radius:number 
    lastShot:number 
}

export interface AstroidsState{
    screen:ScreenInfo
    context:CanvasRenderingContext2D | null
    keys:PlayKeys
    astroidCount:number 
    currentScore:number 
    topScore:number 
    ingame:boolean
    spriteLocs:{}
}

export const initialState:AstroidsState = {
    screen: {width:window.innerWidth,height:window.innerHeight,ratio:window.devicePixelRatio || 1},
    context:null,
    keys: {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    },
    astroidCount: 3,
    currentScore: 0,
    topScore: 0,
    ingame: true,
    spriteLocs:{}
 } 
 
interface keyPayload{
    value:number
}

export const astroidsSlice = createSlice({
    name: 'astroids',
    initialState,
    reducers:{
        set: (state, action: PayloadAction<AstroidsState>) => {state.screen = action.payload.screen; state.astroidCount = action.payload.astroidCount},
        // setLeftKey: (state, action:PayloadAction<boolean>) => {state.keys.left = action.payload},
        // setRightKey: (state, action:PayloadAction<boolean>) => {state.keys.right = action.payload},
        // setUpKey: (state, action:PayloadAction<boolean>) => {state.keys.up = action.payload},
        // setDownKey: (state, action:PayloadAction<boolean>) => {state.keys.down = action.payload},
        // setSpaceKey: (state, action:PayloadAction<boolean>) => {state.keys.space = action.payload},
        // setStartGame: (state, action:PayloadAction<any>) => {state.ingame = true; state.currentScore = 0},
        // setGameOver: (state, action:PayloadAction<any>) => {state.ingame = false},
        // setTopScore: (state, action:PayloadAction<number>) => {state.topScore = action.payload}
    }
})

// export const {set, setLeftKey, setRightKey, setUpKey, setDownKey, setSpaceKey, setStartGame, setGameOver, setTopScore} = astroidsSlice.actions;

// export const selectScreen = (state: RootState) => state.astroids.screen;
// export const selectTopScore = (state: RootState) => state.astroids.topScore;
// export const selectScore = (state: RootState) => state.astroids.currentScore;
// export const selectKeys = (state: RootState) => state.astroids.keys;
// export const selectAstroidCount = (state: RootState) => state.astroids.astroidCount;

export default astroidsSlice.reducer