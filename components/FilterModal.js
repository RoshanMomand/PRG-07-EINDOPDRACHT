import React from "react";
import {Pressable, Switch, Text, View,StyleSheet} from "react-native";
import Modal from "react-native-modal";


export default function FilterModal({isVisible,favoriteToggleSwitch,isEnabled,onClose}) {
    const styles = getStyles()

    return (
        <Modal
            animationIn="fadeInLeft"
            animationOut="fadeOutRight"
            animationInTiming={500}
            animationOutTiming={500}
            transparent={true}
            isVisible={isVisible}>
            {/* In this view yoou will find the toggle switch. */}
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalFirstDiv}>
                        <Text style={styles.modalInput}> Toggle favorites</Text>
                        <Switch style={styles.filterContainer}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                onValueChange={favoriteToggleSwitch} value={isEnabled}>
                        </Switch>
                    </View>

                    {/* Pressable to close the modal */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>

    )
}

const getStyles = () => StyleSheet.create({
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
    modalFirstDiv: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    modalInput: {
        color: '#000',
        fontSize: '16',
        fontWeight: 'bold',
    },
});
