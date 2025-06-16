import MapView, {Callout, Marker} from 'react-native-maps';
import {Button, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as Location from 'expo-location';
import {useEffect, useState, createRef} from "react";
import MapTopBarComponent from "../components/MapTopBarComponent";
import MapDataHooks from "../hooks/MapDataHooks";
import GymModalComponent from "../components/GymModalComponent";
import MapTopBarHooks from "../hooks/MapTopBarHooks";
import GymModalHooks from "../hooks/GymModalHooks";
import {MaterialIcons} from "@expo/vector-icons";

export default function MapsScreen({item, route, darkMode}) {
    const {selectedGym} = route?.params || {}

    const {location, gymLocations} = MapDataHooks()

    const {
        handleMapType,
        goToCurrentLocation,
        handleEventSelector,
        mapType,
        mapRef,
        highlightedGym
    } = MapTopBarHooks(location, selectedGym);


    const {openGymModal, closeGymModal, modalVisible, selectedGymInfo} = GymModalHooks();


    const styles = getStyles(darkMode)
    return (
        <View style={styles.container}>

            <MapTopBarComponent
                darkMode={darkMode}
                handleMapType={handleMapType}
                mapType={mapType}
                goToCurrentLocation={goToCurrentLocation}

            />


            <MapView
                // Add a function or a ternary that checks if the button is click to change the map type
                ref={mapRef}
                mapType={mapType}
                userInterfaceStyle={darkMode ? 'dark' : 'light'}
                style={styles.map}
                showsUserLocation={true}
                region={
                    selectedGym ? {
                        latitude: selectedGym.latitude,
                        longitude: selectedGym.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    } : location}
            >
                {gymLocations.map((gym) => (
                    <Marker
                        onSelect={() => handleEventSelector}
                        onDeselect={() => handleEventSelector}
                        key={gym.id}
                        coordinate={{latitude: gym.latitude, longitude: gym.longitude}}
                        title={gym.title.toString()}
                        pinColor={highlightedGym && highlightedGym.id === gym.id ? 'blue' : 'red'}
                    >
                        <Callout onPress={() => openGymModal(gym)}>
                            <View style={{padding: 15}}>
                                <Text style={{fontWeight: "bold",maxWidth:"100%" ,justifyContent:'center',textAlign:'center'}}>{gym.title}</Text>
                                <Pressable style={styles.moreInfoButton}>
                                    <Text style={styles.moreInfoText}>meer info</Text>
                                </Pressable>

                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <GymModalComponent
                visible={modalVisible}
                gym={selectedGymInfo}
                darkMode={darkMode}
                onClose={closeGymModal}
            />

        </View>
    )
}

const getStyles = (darkMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
        }, map: {
            width: '100%',
            height: '100%',
        },moreInfoButton: {
            backgroundColor: '#181818',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 45,
            alignItems: 'center',
            marginTop: 10,
        },
        moreInfoText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
        }

    });
