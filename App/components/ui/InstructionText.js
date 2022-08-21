import { StyleSheet, Text } from "react-native";
import Colors from "../../constant/colors";

function InstructionText({children, style }) {
    // here we pass the style from the GameScreen file (style) 
    // we can put the styles in an arrays like bellow 
    // the first index in the array will excute first which means the default will excute then the one from GameScreen
    // the instructionText pass from here to gameScreen 
    return <Text style={[styles.instructionText, style ]}>{children }</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    }, 
});