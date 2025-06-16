import {useEffect, useState} from "react";
import * as Location from "expo-location";


export default function MapDataHooks() {

    const [location, setLocation] = useState(null);
    const [gymLocations, setGymLocations] = useState([]);

    async function fetchGyms() {

        try {
            const url = `https://stud.hosted.hr.nl/1028086/trainmore-spots/trainmore-locations.json?timestamp=${Date.now()}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });
            const data = await response.json()
            setGymLocations(data);
        } catch (e) {
            console.log("Couldnt fetch data" + e)
        }
    }

    async function getCurrentLocation() {

        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }
        ;
        // get the current location of the user and set it as the center of the map and it needs to be accurate
        let currentLocation = await Location.getCurrentPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1000
            }
        )
        setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
            , latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })
    };
    // Try to look if there is a way to use 1 useEffect

    // First useEffect to load the gyms and get users current location
    // Crashes when it is depended of th selected gym ?
    useEffect(() => {
        fetchGyms();
        getCurrentLocation();
    }, []);





    return {
        location,
        gymLocations,
        getCurrentLocation,
        fetchGyms
    }
}
