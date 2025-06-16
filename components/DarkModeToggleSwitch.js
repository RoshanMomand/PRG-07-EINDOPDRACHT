import {Pressable, StyleSheet, Switch, View, Dimensions} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function DarkModeToggleSwitch({toggleDarkMode,darkMode}) {

    const screenX = Dimensions.get('window').width;
    const screenY = Dimensions.get('window').height;

    const IconPositionY = screenY * 0.09
    const IconPositionX = screenX * 0.05

    const styles = getStyles(IconPositionY,IconPositionX)
    return(

            <View style={styles.darkModeSwitchContainer}>
                <Pressable onPress={toggleDarkMode}>
                    <Ionicons name={darkMode ? 'moon' : 'sunny'} size={30}
                              color={darkMode ? 'yellow' : 'black'}/>
                </Pressable>
            </View>
    )
}

const getStyles = (IconPositionY,IconPositionX) => StyleSheet.create({
    darkModeSwitchContainer: {
        position: 'absolute',
        top:IconPositionY,
        right:IconPositionX,
        zIndex:50,
    }
});
