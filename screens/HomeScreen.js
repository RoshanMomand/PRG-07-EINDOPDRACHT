import {useEffect, useState} from "react";
import {Alert, FlatList, Modal, Pressable, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from "@react-navigation/native";
import GymLocationCard from "../components/GymLocationCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({navigation, route, darkMode}) {
    const [gymSpots, setGymSpots] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false)
    const [searchGymSpots, setSearchGymSpots] = useState([]);
    const [filterModalVisibility, setFilterModalVisibility] = useState(false); // Set the initial state on false so the modal is not visible
    const [gymModalStatus,setGymModalStatus] = useState(false)
    const [favorites, setFavorites] = useState([]);
    const [searchvalue, setSearchvalue] = useState('')

    const handleSearch = (text) => {
        // Issue: You might need to convert the search text to lowercase for case-insensitive comparison.

        setSearchvalue(text)
        const filtered = gymSpots.filter((spots) => {
            return (
                // Incorrect: This assumes `spots.title` and `spots.description` always exist. Null/undefined values could cause errors here.
                // Check if 'title' and 'description' exist before calling 'toLowerCase()'.
                spots?.title?.toLowerCase().includes(text.toLowerCase()) ||
                spots?.description?.toLowerCase().includes(text.toLowerCase())
            );
        });

        setSearchGymSpots(filtered); // Confirm if gymSpots is set correctly beforehand.
    };

    useEffect(() => {


        const fetchGyms = async () => {
            try {
                const url = `https://stud.hosted.hr.nl/1028086/trainmore-spots/trainmore-locations.json?timestamp=${Date.now()}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json"
                    }
                });
                const data = await response.json()
                setGymSpots(data);
                setSearchGymSpots(data)
            } catch (e) {
                console.log("Couldnt fetch data" + e)
            }

        }
        fetchGyms();


        const gymFavorites = async () => {
            // Als er niks in de favorites is haal de objecten op uit de showFavorites en zet die setShowFavorite bij elke render
            try {
                const storedFavorites = await AsyncStorage.getItem('my-favorites');
                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites);
                    setFavorites(parsedFavorites);
                }
            } catch (err) {
                console.log(err)
            }


        }
        gymFavorites();


    }, []);


    const addToFavorites = async (item) => {

        // The some method is an iterative method it calls a provided callbackfn  once for each element,
        // in an array, until the cbFN returns a truthy value.
        // If such element is found the some() method immediately returns a true and stops iterating through the array.
        if (favorites.some(favorite => favorite.id === item.id)) {
            console.log(`you have unclicked the `, item.id)
            const removeFavorite = favorites.filter((favorite) => favorite.id !== item.id);

            // removing the favorites and giving a new updated array with the favorites you already have
            //favorite.id !== item.id betekent: hou alleen de favorieten waarvan de id anders is dan die van het aangeklikte item.
            await AsyncStorage.setItem('my-favorites', JSON.stringify(removeFavorite))
            setFavorites(removeFavorite)
            console.log('removed the', item)
        } else {
            console.log('You have clicked the item with the id ', item.id)
            // the favorites now contains the item object where we clicked on so item.id is now in favorites.id
            const newFavorites = [...favorites, item]
            await AsyncStorage.setItem('my-favorites', JSON.stringify(newFavorites))
            setFavorites(newFavorites);
            // console.log('added the', item)
        }
    }


    function favoriteToggleSwitch() {
        setIsEnabled(prevState => !prevState)
    }
    const showGymInfoModal = (item) =>{
        setGymModalStatus(true)
    }

    const styles = getStyles(darkMode)
    return (
        <View style={styles.hotspotsContainer}>
            <View style={styles.firstDiv}>
                <View>
                    <Pressable style={styles.searchContainer}>
                        {/* Dit wordt een input met een place holder */}
                        <TextInput style={styles.input} placeholder={'Search your gyms'}
                                   placeholderTextColor={darkMode ? 'black' : 'white'}
                                   value={searchvalue} onChangeText={handleSearch}>
                        </TextInput>
                        <Ionicons name={'search'} color={darkMode ? 'black' : 'white'} size={20}/>
                    </Pressable>
                </View>



                <Modal
                    animationType={'slide'}
                    transparent={true}
                    // visiblitiy is false
                    visible={filterModalVisibility}>
                    {/* In this view yoou will find the toggle switch. */}
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalFirstDiv}>
                                <Text style={styles.modalInput}> Toggle favorites</Text>
                                <Switch style={styles.filterContainer} trackColor={{false: '#767577', true: '#81b0ff'}}
                                        onValueChange={favoriteToggleSwitch} value={isEnabled}>
                                </Switch>
                            </View>

                            {/* Pressable to close the modal */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setFilterModalVisibility(false)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View>
                    <Pressable
                        onPress={() => {
                            setFilterModalVisibility(true)
                        }}>
                        <Ionicons name={'filter-circle-sharp'} color={darkMode ? 'white' : 'black'} size={35}/>
                    </Pressable>
                </View>
                <View>
                </View>
            </View>

            <Modal
                animationType={'slide'}
                visible={gymModalStatus}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalFirstDiv}>
                            <Text style={styles.modalInput}></Text>
                        </View>

                        {/* Pressable to close the modal */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setGymModalStatus(false)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Mocht het gefilterd zijn laat een andere flatlist zien met de favoriete*/}
            {isEnabled ?
                (
                    <FlatList
                        data={favorites}
                        renderItem={({item}) => (
                            <GymLocationCard addToFavorites={addToFavorites}

                                             isFavorite={favorites.some(favorite => favorite.id === item.id)}
                                             navigation={navigation} item={item}/>
                        )}
                        keyExtractor={item => item?.id}
                        numColumns={2}

                    />
                ) :
                (
                    <FlatList
                        data={searchGymSpots}
                        renderItem={({item}) => (
                            <GymLocationCard addToFavorites={addToFavorites}
                                             isFavorite={favorites.some(favorite => favorite.id === item.id)}
                                             navigation={navigation} item={item}
                                             showGymInfoModal={showGymInfoModal}
                            />
                        )}
                        keyExtractor={item => item?.id}
                        numColumns={2}

                    />
                )
            }

        </View>
    );
}

const getStyles = (darkMode) =>
    StyleSheet.create({
        hotspotsContainer: {
            backgroundColor: darkMode ? 'black' : 'white',
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
        buttonOpen: {
            backgroundColor: '#F194FF',
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
        firstDiv: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            marginHorizontal: 20,
        },
        searchContainer: {
            flexDirection: 'row',
            padding: 5,
            paddingHorizontal: 20,
            borderRadius: 100,
            gap: 20,
            alignItems: 'center',
            backgroundColor: darkMode ? 'white' : 'black',
            marginVertical: 8,
        },
        filterContainer: {
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',

        },
        input: {
            fontSize: '16',
            fontWeight: 'bold',
            color: darkMode ? 'black' : 'white'
        },
        modalInput: {
            color: '#000',
            fontSize: '16',
            fontWeight: 'bold',
        },
        modalFirstDiv: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
        }

    });


export default HomeScreen