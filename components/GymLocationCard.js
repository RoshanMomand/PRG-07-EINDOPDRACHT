import {Pressable, View, Text, StyleSheet, Animated} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenDivider from "../components/ScreenDivider";

import {useEffect, useRef} from "react";

function GymLocationCard({item, navigation, addToFavorites, isFavorite}) {

    console.log(item)

    const bounceAnim = useRef(new Animated.Value(-200)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const styles = getStyles(bounceAnim, fadeAnim)
    useEffect(() => {
        Animated.parallel([
            // Voeg hier je Animated.timing(naam van de animatie, {instellingen ervan})
            Animated.timing(fadeAnim, {

                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(bounceAnim, {
                toValue: 0,
                friction: 3,
                tension: 50,
                duration: 1000,
                useNativeDriver: true
            })]
        ).start()
    }, []);


    return (
        <Animated.View key={item.id} style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <ScreenDivider
                width={150}
                marginBottom={14}
                marginTop={14}
                darkmode={false}
            />
            <View style={styles.iconContainer}>
                <View>
                    <Pressable onPress={() => navigation.navigate('Maps', {selectedGym: item})}>
                        <Ionicons name={'location-outline'} size={31} color={'red'}/>
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
        </Animated.View>
    )
}


const getStyles = (bounceAnim, fadeAnim) => StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignContent:"space-around",
        justifyContent: "space-evenly",
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 20,
        margin: 5,
        opacity: fadeAnim,
        transform:
            [{translateY: bounceAnim}]
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
        justifyContent: "center",
        columnGap: 10,
    }
});


export default GymLocationCard
