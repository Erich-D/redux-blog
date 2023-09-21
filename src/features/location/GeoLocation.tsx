import { useEffect } from "react"
import {selectCoords, set} from './geoLocationSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks';

interface LocProps{
  show?:boolean,
}

export default function GeoLocation({show = false}:LocProps){

    const coords = useAppSelector(selectCoords);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                  console.log(result.state);
                  navigator.geolocation.getCurrentPosition(success,errors);
                } else if (result.state === "denied") {
                  //TODO: If denied then you have to show instructions to enable location
                }
                result.onchange = function () {
                  console.log(result.state);
                };
              });
          } else {
            alert("Sorry Not available!");
          }
    },[])

    function success(pos:GeolocationPosition) {
      dispatch(set({timestamp:pos.timestamp, coords:{
        accuracy: pos.coords.accuracy ?? 0,
        altitude: pos.coords.altitude ?? 0,
        altitudeAccuracy: pos.coords.altitudeAccuracy ?? 0,
        heading: pos.coords.heading ?? 0,
        latitude: pos.coords.latitude ?? 0,
        longitude: pos.coords.longitude ?? 0,
        speed: pos.coords.speed ?? 0
      }}));
      const crd:GeolocationCoordinates = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
  
    function errors(err:GeolocationPositionError) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    return<>
        {(show && navigator.geolocation) ? <div>
                  <p>Your current position is:</p>
                  <p>Latitude: {coords.latitude}</p>
                  <p>Longitude: {coords.longitude}</p>
                  <p>More or less {coords.accuracy} meters.</p>
                </div>:<></>}
        {/* <h1>Your Location is {navigator.geolocation ? "success":"sorry"}</h1> */}
    </>
}