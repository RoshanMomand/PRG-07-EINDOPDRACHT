import {useRef, useState} from "react";
import {SafeAreaView, View, Pressable, StyleSheet, Text} from "react-native";
import Modal from 'react-native-modal';
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from "@react-navigation/native";
import GymLocationCard from "../components/GymLocationCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import GymFlatList from "../components/GymFlatList";
import useGymData from "../hooks/GymDataHooks";

function HomeScreen({navigation, route, darkMode}) {
    const [isEnabled, setIsEnabled] = useState(false)
    const [filterModalVisibility, setFilterModalVisibility] = useState(false); // Set the initial state on false so the modal is not visible
    const [gymModalStatus, setGymModalStatus] = useState(false);


    const {
        gymSpots,
        searchGymSpots,
        favorites,
        searchvalue,
        handleSearch,
        addToFavorites,
    } = useGymData();


    function favoriteToggleSwitch() {
        setIsEnabled(prevState => !prevState)
    }

    const showGymInfoModal = (item) => {
        setGymModalStatus(true)
    }

    const styles = getStyles(darkMode)
    return (
        <SafeAreaView style={styles.hotspotsContainer}>
            <View style={styles.hotspotsContainer}>
                <View style={styles.firstDiv}>
                    <SearchBar
                        value={searchvalue}
                        onChangeText={handleSearch}
                        darkMode={darkMode}

                    />
                    <FilterModal
                        isVisible={filterModalVisibility}
                        favoriteToggleSwitch={favoriteToggleSwitch}
                        onClose={() => setFilterModalVisibility(false)}
                        isEnabled={isEnabled}
                    />
                    <View>
                        <Pressable
                            onPress={() => {
                                setFilterModalVisibility(true)
                            }}>
                            <Ionicons name={'filter-circle-sharp'} color={darkMode ? 'white' : 'black'} size={35}/>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Mocht het gefilterd zijn laat een andere flatlist zien met de favoriete*/}
            <GymFlatList
                data={isEnabled ? favorites : searchGymSpots}
                addToFavorites={addToFavorites}
                favorites={favorites}
                navigation={navigation}
            />
        </SafeAreaView>);
}

const getStyles = (darkMode) =>
    StyleSheet.create({
            hotspotsContainer: {
                backgroundColor: darkMode ? '#181818' : 'white',
            },
            centeredView: {
                flex: 0.3,
                margin: "auto",
                justifyContent: 'center',
                alignItems: 'center',
            },
            modalView: {
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 20,
                alignSelf: "center",
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 1,
            },
            button: {
                borderRadius: 20,
                padding: 10,
                elevation: 2,
            },
            buttonClose: {
                backgroundColor: '#2196F3',
            },
            textStyle: {
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
            },
            firstDiv: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: 'center',
                marginHorizontal: 20,
            },
        }
    );


export default HomeScreen
