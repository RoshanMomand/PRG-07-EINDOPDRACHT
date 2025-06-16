import {View, StyleSheet} from "react-native";
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {Text, PlatformPressable} from '@react-navigation/elements';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MyTabBar({state, descriptors, navigation, darkMode}) {

    const {colors} = useTheme();
    const {buildHref} = useLinkBuilder();

    const styles = getStyles()
    return (
        <View style={[styles.myTabs, {
            backgroundColor: darkMode ? 'white' : '#181818',
        }]}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const color = isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor
                const size = isFocused ? 24 : 25;

                const iconColor = darkMode ? (isFocused ? 'white' : 'grey') : (isFocused ? 'black' : 'grey');
                const icon = options.tabBarIcon({focused: isFocused, color: iconColor, size})
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const tabBarLabelPos = options.tabBarLabelPosition
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const styles = getStyles(tabBarLabelPos, isFocused, darkMode)
                return (
                    <PlatformPressable
                        key={route.key}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{flex: 1}}
                    >
                        <View style={[styles.tabBarLabelPos, {
                            flexDirection: tabBarLabelPos === 'beside' ? 'row' : 'column',
                        }]}>
                            {/*{isFocused ? icon[route.name] : icon}*/}
                            <View style={[
                                isFocused ? styles.floatingIcon : '', {
                                    backgroundColor: isFocused ? (darkMode ? 'black' : 'white') : 'transparent',
                                }]}>
                                {icon}
                            </View>

                            <Text style={[styles.labelText, {
                                color: isFocused ? (darkMode ? 'black' : 'white') : color,
                            }]}>
                                {label}
                            </Text>
                        </View>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}
const getStyles = (tabBarLabelPos, isFocused, darkMode) =>
    StyleSheet.create({
        myTabs: {
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            elevation: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            borderRadius: 40,
            paddingTop: 20,
            margin: 10,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: darkMode ? '#ffffff' : '#000000',


        },
        tabBarLabelPos: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        labelText: {
            textShadowColor: '#000000',
            fontSize: 15,
            fontWeight: isFocused ? 'bold' : 'normal',
            letterSpacing: 1,
            position: 'relative',
            top: isFocused ? 15 : 2,

        },
        floatingIcon: {
            position: 'absolute',
            borderRadius: 30,
            padding: 10,
            transform: [
                {scale: 1.4},
                {translateY: -30},
            ],
            shadowColor: darkMode ? '#ffffff' : '#000000',
            shadowOffset: {width: 4, height: 2},
            shadowOpacity: 1,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: darkMode ? '#ffffff' : '#000000',


        },
    });
