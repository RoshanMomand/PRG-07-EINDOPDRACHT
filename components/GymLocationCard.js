import {Pressable, SafeAreaView, View, Text, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

function GymLocationCard({item, navigation, addToFavorites, isFavorite,showGymInfoModal}) {





    return (
        <View key={item.id} style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.iconContainer}>
                <View style={styles.mapsButton}>
                    <Pressable onPress={() => navigation.navigate('Maps', {selectedGym: item})}>
                        <Ionicons name={'location-outline'} size={30} color={'red'}/>
                    </Pressable>
                </View>
                <View>
                    <Pressable>
                        <Ionicons onPress={() => {
                            showGymInfoModal(item)
                        }} name={'information'} size={30} color={'red'}/>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => {
                        addToFavorites(item)
                    }}>
                        {/* Ternary check of het favorite is zo ja heart outline anders heart*/}
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={30}
                            color={"red"}
                        />
                    </Pressable>
                </View>
            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 2,
        paddingVertical: 20,
        margin: 5
    },
    list: {
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flex: 1,
        margin: 10,
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        // // backgroundColor: "#e0e0e0",
        // // borderRadius: 50,
        // // width:"100%",
        // // margin:'auto',
        // // padding: 10,
        // alignItems: "center",
        justifyContent: "center",
    }, mapsButton: {
        color: 'black',
    }


});


export default GymLocationCard