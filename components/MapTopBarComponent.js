import {Pressable, ScrollView, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";


export default function MapTopBarComponent({darkMode,handleMapType,goToCurrentLocation,mapType = 'standard'}) {


    const styles = getStyles(darkMode)
    return(

        <ScrollView style={styles.MapHorizontalBar} horizontal={true}>
            <Pressable style={styles.showAllGyms} onPress={handleMapType}>
                <MaterialIcons
                    name={mapType === 'standard' ? 'map' : 'satellite'}
                    color={darkMode ? 'white' : 'black'} size={30}/>
            </Pressable>
            <Pressable
                style={styles.showAllGyms}
                onPress={goToCurrentLocation}
            >
                <MaterialIcons name={'my-location'} color={darkMode ? 'white' : 'black'} size={30}/>
            </Pressable>
        </ScrollView>
    )
}

const getStyles = (darkMode) =>
    StyleSheet.create({
        MapHorizontalBar: {
            alignSelf: "center",
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 80,
            zIndex: 50,
            overflow: 'visible',
            direction: "rtl"
        }
        ,
        showAllGyms: {
            backgroundColor: darkMode ? 'black' : 'white',
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 20,
            shadowColor: '#000000',
            shadowOffset: {width: 4, height: 2},
            shadowOpacity: 1,
            shadowRadius: 2,
            alignSelf: 'center',

        },
    });
