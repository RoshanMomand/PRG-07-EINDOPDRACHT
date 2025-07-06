import React from 'react';
import { Modal, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons';
import ScreenDivider from "./ScreenDivider";

export default function GymModal({ visible, gym, darkMode, onClose }) {
    // Name the properties you want to call in the main component
    // onClose  = {function or useState in the main component E.g}
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <BlurView
                style={StyleSheet.absoluteFill}
                intensity={55}
                tint={darkMode ? "dark" : "light"}
            />

            <View style={styles.overlay}>
                <View style={[styles.modalContent, { backgroundColor: darkMode ? "#ffffff" : "#fff" }]}>

                    <Text style={styles.title}>{gym?.title}</Text>
                    <ScreenDivider
                        width={350}
                        marginBottom={14}
                        darkmode={darkMode}
                    />

                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={25} color="#181818"/>
                            <View>
                                <Text>{gym?.address}</Text>
                                <Text>{gym?.zipcode}</Text>
                                <Text style={styles.boldText}>{gym?.city}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Ionicons name={'pricetag-sharp'} color={'black'} size={20}/>
                            <Text>{gym?.label}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialIcons name={'star-purple500'} size={25} color={'#181818'}/>
                            <Text>{gym?.rating}</Text>
                        </View>
                    </View>

                    <ScreenDivider
                        width={380}
                        marginBottom={14}
                        marginTop={14}
                        darkmode={darkMode}
                    />
                    <Text>{gym?.description}</Text>

                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Sluiten</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        paddingVertical: "10%",
        borderRadius: 16,
        justifyContent: "space-evenly",
        minHeight: "60%",
        minWidth: "100%",
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 2
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5
    },
    infoRow: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center'
    },
    boldText: {
        fontWeight: 'bold'
    },
    closeButton: {
        marginTop: 18,
        backgroundColor: "#181818",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
    },
    closeButtonText: {
        color: "#fff"
    }
});
