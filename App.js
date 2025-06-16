import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Easing, Modal, Pressable, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {RouteProp} from "@react-navigation/core/src/types";
import {useEffect, useState} from "react"
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from "./screens/HomeScreen";
import MapsScreen from "./screens/MapsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();


export default function App() {
    const transitionAnimation = (duration) => {
        ({
            animation: 'timing',
            config: {
                duration: duration,
                easing: Easing.inOut(Easing.ease),
            },
        })
    }


    const [darkMode, setDarkMode] = useState(false);
    const [isDarkModeLoaded, setIsDarkModeLoaded] = useState(false);


    const loadDarkMode = async () => {
        try {
            const localDarkMode = await AsyncStorage.getItem('IS_DARK_MODE')
            const parsedLocalDarkMode = JSON.parse(localDarkMode)
            parsedLocalDarkMode && setDarkMode(parsedLocalDarkMode)
        } catch (error) {
            console.error(`Something went wrong ${error.message}`)
        } finally {
            setIsDarkModeLoaded(true)
        }
    }


    const updateDarkMode = async (value) => {
        try {
            setDarkMode(value);
            await AsyncStorage.setItem('IS_DARK_MODE', JSON.stringify(value));
            console.log(`Dark mode toggled to: ${value}`);
        } catch (error) {
            console.error(`Failed to update dark mode: ${error.message}`);
        }
    };

    useEffect(() => {
        loadDarkMode();


    }, []);

    return (
        isDarkModeLoaded ? (
                <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            animation: 'shift',
                            tabBarIcon: ({focused, size, color}) => {
                                let iconName;
                                switch (route.name) {
                                    case 'Home':
                                        iconName = "library";
                                        break
                                    case 'Profile':
                                        iconName = 'person-sharp';
                                        break
                                    case 'Maps':
                                        iconName = 'map'
                                        break
                                    default:
                                }
                                return <Ionicons name={iconName} size={size} color={color}/>;
                            },
                            tabBarLabelPosition: "beside-icon",
                            tabBarActiveTintColor: 'blue',
                            tabBarInactiveTintColor: 'gray',
                        })}>
                        <Tab.Screen
                            name="Home"
                            options={({navigation, route}) => ({
                                title: 'Homee',
                                transitionSpec: transitionAnimation(250),

                            })}>
                            {(props) => (
                                // name of the component
                                // Then set the name of the property u want to send with the component
                                <HomeScreen
                                    {...props}
                                    darkMode={darkMode}
                                />

                            )}
                        </Tab.Screen>
                        <Tab.Screen
                            name="Maps"
                            options={({navigation}) => ({
                                title: 'Gym Locator',
                                transitionSpec: transitionAnimation(250),
                            })}
                        >
                            {/*
                            When you are using a arrow function in the screens keep in
                            mind that you need to use () instead of {}
                            */}
                            {(props) =>
                                (
                                    <MapsScreen
                                        {...props}
                                        darkMode={darkMode}
                                    />
                                )
                            }
                        </Tab.Screen>


                        <Tab.Screen
                            name="Profile"
                            options={{
                                title: 'Profiel',
                                transitionSpec: transitionAnimation(150),
                                tabBarBadge: 4,
                                // Possibly could add the property of how many notifications*/}
                            }}
                        >
                            {() => (
                                <ProfileScreen
                                    darkMode={darkMode}
                                    updateDarkMode={updateDarkMode} // Je callback doorgeven
                                />
                            )}
                        </Tab.Screen>

                    </Tab.Navigator>
                </NavigationContainer>)
            :
            (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Loading...</Text>
            </View>)
    )

}

