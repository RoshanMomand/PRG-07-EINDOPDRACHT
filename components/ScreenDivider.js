import {View, StyleSheet, Dimensions} from 'react-native';
import {useContext} from "react";

const {width: screenWidth} = Dimensions.get('window');
export default function DividerComponent({
                                             darkMode,
                                             width = screenWidth,  // Default width
                                             marginBottom = marginBottom,
                                             marginTop = marginTop,
                                             height = 2,                 // Default height
                                             style,                      // Custom style prop
                                             ...props
                                         }) {

    return (
        <View style={[
            styles.line,
            {
                backgroundColor: darkMode ? 'hsl(0 0 100%)' : 'hsl(0 0% 0%)',
                width: width,
                marginBottom: marginBottom,
                marginTop: marginTop,
                height: height,
            },
            style  // Override met custom style
        ]}/>

    );
};

const styles = StyleSheet.create({
    line: {
        margin: 0,
        alignSelf: "center",
        borderRadius: 100

    }
});
