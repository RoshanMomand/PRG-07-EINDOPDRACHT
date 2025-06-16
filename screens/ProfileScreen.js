import {StyleSheet, Switch, View} from "react-native";
import {useState, useEffect,createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({darkMode,updateDarkMode}) {

    console.log(darkMode)
    const [darkModeEnabled, setDarkModeEnabled] = useState(darkMode)


    const toggleDarkMode = (value) => {
        setDarkModeEnabled((oldState) => {return !oldState});
        updateDarkMode && updateDarkMode(!darkModeEnabled); // Roep de callback aan
    };


    const styles = getStyles(darkModeEnabled)

    return (
        <View style={styles.container}>

            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={darkModeEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDarkMode}
                value={darkModeEnabled}
            />
        </View>);


}

const getStyles = (darkModeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkModeEnabled ? '#000' : '#fff',
        alignItems: 'center', justifyContent: 'center',
    }
});

export default ProfileScreen