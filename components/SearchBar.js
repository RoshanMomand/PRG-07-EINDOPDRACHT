import React from "react";
import {TextInput, View, StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function SearchBar({value, onChangeText, darkMode, placeholder = 'Search your gyms'}) {


    const styles = getStyles(darkMode)
    return (
        <View style={styles.searchContainer}>
            <View>
                {/* Dit wordt een input met een place holder */}
                <TextInput style={styles.input} placeholder={placeholder}
                           placeholderTextColor={darkMode ? 'black' : 'white'}
                           value={value} onChangeText={onChangeText}>
                </TextInput>
            </View>
            <Ionicons name={'search'} color={darkMode ? 'black' : 'white'} size={20}/>
        </View>
    )
}
const getStyles = (darkMode) => StyleSheet.create({
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
    input: {
        fontSize: '16',
        fontWeight: 'bold',
        color: darkMode ? 'black' : 'white'
    },
});
