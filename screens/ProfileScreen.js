import {StyleSheet, View} from "react-native";
import DarkModeToggleSwitch from "../components/DarkModeToggleSwitch";
import DarkModeHooks from "../hooks/DarkModeHooks";

export default function ProfileScreen({darkMode, updateDarkMode}) {

    // When you're calling hooks destructure them . Name of the function you created -> Keep in mind what you pass through the function
    const {darkModeEnabled, toggleDarkMode} = DarkModeHooks(darkMode, updateDarkMode);


    const styles = getStyles(darkModeEnabled)

    return (
        <View style={styles.container}>
            <DarkModeToggleSwitch
                darkMode={darkModeEnabled}
                toggleDarkMode={toggleDarkMode}
            />
        </View>
    );
}

const getStyles = (darkModeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: darkModeEnabled ? '#181818' : 'white',

    }
});

