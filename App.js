import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Easing, Modal, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import {RouteProp} from "@react-navigation/core/src/types";
import {useEffect, useState} from "react"
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from "./screens/HomeScreen";
import MapsScreen from "./screens/MapsScreen";

const Tab = createBottomTabNavigator();




function ProfileScreen() {
    return (
        <View style={styles.container}>

            <Text>Welkom op het Profile scherm!</Text>
        </View>
    );
}




function MyTabs() {
    const transitionAnimation = (duration) => {
        ({
            animation: 'timing',
            config: {
                duration: duration,
                easing: Easing.inOut(Easing.ease),
            },
        })
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    animation:'shift',
                    tabBarIcon: ({focused, size,color}) => {
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
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen
                    options={({navigation}) => ({
                        title: 'Homee',
                        transitionSpec: transitionAnimation(250),

                    })}
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    options={({navigation}) => ({
                        title: 'Gym Locator',
                        transitionSpec: transitionAnimation(250)
                    })}
                    name="Maps"
                    component={MapsScreen}
                />


                <Tab.Screen

                    options={({navigation}) => ({
                        title: 'Profiel',
                        transitionSpec: transitionAnimation(150),
                        tabBarBadge:3
                        // Possibly could add the property of how many notifications
                    })}
                    name="Profile"
                    component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <MyTabs/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
