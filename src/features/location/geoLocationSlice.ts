import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface GeoCoords{
    accuracy:number,
    altitude:number,
    altitudeAccuracy:number,
    heading:number,
    latitude:number,
    longitude:number,
    speed:number
}

interface GeoLocationPosition{
    coords:GeoCoords,
    timestamp:number
}

const initialState: GeoLocationPosition = {
    coords:{
        accuracy:0,
        altitude:0,
        altitudeAccuracy:0,
        heading:0,
        latitude:0,
        longitude:0,
        speed:0
    }, 
    timestamp:0
}

export const geoLocationSlice = createSlice({
    name: 'location',
    initialState,
    reducers:{
        set: (state, action: PayloadAction<GeoLocationPosition>) => {state.timestamp = action.payload.timestamp; state.coords = action.payload.coords}
    }
})

export const {set} = geoLocationSlice.actions;

export const selectTimestamp = (state: RootState) => state.location.timestamp;
export const selectCoords = (state: RootState) => state.location.coords;

export default geoLocationSlice.reducer

