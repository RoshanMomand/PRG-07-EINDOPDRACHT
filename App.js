import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Easing, Modal, Pressable, useColorScheme, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {RouteProp} from "@react-navigation/core/src/types";
import {useEffect, useState} from "react"
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from "./screens/HomeScreen";
import MapsScreen from "./screens/MapsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTabBar from "./components/MyTabBar";

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
                        tabBar={(props) => (
                            <MyTabBar {...props}
                                      darkMode={darkMode}/>)}
                        screenOptions={({route, navigation}) => ({
                            animation: 'shift',
                            tabBarIcon: ({focused, size, color, style}) => {
                                let iconName;
                                switch (route.name) {
                                    case 'Home':
                                        iconName = "home";
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
                            tabBarLabelPosition: "below-icon",
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: 'gray',
                        })}>

                        <Tab.Screen
                            name="Home"
                            options={({navigation, route,d}) => ({
                                title: 'Home',
                                transitionSpec: transitionAnimation(250),
                                headerShown: false,

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
                                title: 'Maps',
                                transitionSpec: transitionAnimation(250),
                                headerShown: false,
                            })}>
                            {/*
                            When you are using a arrow function in the screens keep in
                            mind that you need to use () instead of {}
                            */}
                            {
                                (props) =>
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
                                headerShown: false,

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

