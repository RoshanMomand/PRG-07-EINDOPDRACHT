import MapView, {Marker} from 'react-native-maps';
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as Location from 'expo-location';
import {useEffect, useState} from "react";

export default function MapsScreen({item, route}) {

    const {selectedGym} = route?.params || {}
    const [highlightedGym,setHighlightedGym] = useState(null)
    const [location, setLocation] = useState(null)
    const [gymLocations, setGymLocations] = useState([])


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
                accuracy: Location.Accuracy.Highest,
                timeInterval: 1000,
                // distanceInterval:1000
            }
        )
        setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
            , latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
        })
    };
    useEffect(() => {
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

        fetchGyms();
        getCurrentLocation();
        if(selectedGym){
            setHighlightedGym(selectedGym)
            setTimeout(()=>{
                setHighlightedGym(null)
            },4000)
            // SelectedGym contains the object with the info
        }

    }, []);
    useEffect(() => {
        // console.log('Updated gymLocations:', gymLocations);
    }, [gymLocations]);


    return (
        <View style={styles.container}>

            <ScrollView style={styles.showAllGyms} horizontal={true}>
                <Pressable>
                    <Text>Hello</Text>
                </Pressable>

            </ScrollView>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                region={
                    selectedGym ? {
                        latitude: selectedGym.latitude,
                        longitude: selectedGym.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    } : location
                }
            >


                {gymLocations.map((gym) => (
                    <Marker
                        key={gym.id}
                        coordinate={{latitude: gym.latitude, longitude: gym.longitude}}
                        title={gym.title.toString()}
                        pinColor={highlightedGym  && highlightedGym.id === gym.id ? 'blue' : 'red'}
                    />
                ))}


                {/*{selectedGym && (*/}
                {/*    <Marker*/}
                {/*        coordinate={{*/}
                {/*            latitude: selectedGym.latitude,*/}
                {/*            longitude: selectedGym.longitude*/}
                {/*        }}*/}
                {/*        title={selectedGym.title.toString()}*/}
                {/*        pinColor={}*/}
                {/*    />*/}
                {/*)}*/}
            </MapView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }, map: {
        width: '100%',
        height: '100%',
    },
    showAllGyms: {
        backgroundColor: 'red',
        showAllGymsColor: {

            color: "black"
        },
        marginBottom: 100,
    },


});