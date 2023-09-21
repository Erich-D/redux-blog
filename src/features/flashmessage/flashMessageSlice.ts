import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface FlashMessageType{
    type:string 
    message:string
}

export interface FlashMessagePayload{
    flashMessage: FlashMessageType 
    visible: boolean
    duration: number
}

const initialState:FlashMessagePayload = {
    flashMessage:{type:"",message:""},
    visible:false,
    duration:10000
}

export interface FlashPayload{
    flashMessage: FlashMessageType 
    duration?: number
}

export const flashMessageSlice = createSlice({
    name: 'flashMessage',
    initialState,
    reducers:{
        flash: (state, action: PayloadAction<FlashPayload>) => {
            const dur = action.payload.duration ? action.payload.duration:10
            console.log(`Duration is: ${dur}`)
            state.flashMessage = action.payload.flashMessage;
            state.visible = true;
            state.duration = dur*1000
        },
        hideFlash: (state, action: PayloadAction<undefined>) => {state.visible = false}
    }
})

export const {flash, hideFlash} = flashMessageSlice.actions;

export const selectFlashMessage = (state: RootState) => state.flashMessage.flashMessage;
export const selectVisible = (state: RootState) => state.flashMessage.visible;
export const selectDuration = (state: RootState) => state.flashMessage.duration;


export default flashMessageSlice.reducer