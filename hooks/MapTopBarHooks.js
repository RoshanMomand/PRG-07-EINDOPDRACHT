import {createRef, useEffect, useState} from "react";


export default function MapTopBarHooks(location,selectedGym) {
    const [mapType, setMapType] = useState('standard');
    const [highlightedGym, setHighlightedGym] = useState(null);

    const mapRef = createRef();


    const handleMapType = () => {
        setMapType((prevState) => prevState === 'standard' ? 'satellite' : 'standard')
    }
    const goToCurrentLocation = async () => {
        mapRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
        }, 6000);
    };


    const handleEventSelector = (value, event) => {
        if (event) {
            setHighlightedGym(value);
        } else {
            setHighlightedGym(null);
        }
    };

    // Second useEffect when the user selects a marker from the homescreen
    // SelectedGym contains the object with the info
    useEffect(() => {
        if (selectedGym) {
            setHighlightedGym(selectedGym)
            const markerTimer = setTimeout(setHighlightedGym((prevState) => prevState), 4500);

            return clearTimeout(markerTimer);
        }
    }, [selectedGym]);


    return{
        mapRef,
        mapType,
        highlightedGym,
        handleEventSelector,
        handleMapType,
        goToCurrentLocation,

    }

}
