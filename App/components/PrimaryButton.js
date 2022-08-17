import {View, Text, Pressable, StyleSheet} from 'react-native'

function PrimaryButton({children, onPress}) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                // here this style props can take a style object dirictly 
                // or it can holds a function {} which means the style will appear whenever this component is pressed 
                // we can use if condition to achive this 
                // condition ? ture : false 
                style={ ({pressed}) => 
                pressed ? [styles.buttonInnerContainer, styles.pressed] 
                : styles.buttonInnerContainer                 }
                onPress={onPress} 
                android_ripple={{color:'#640233'}} 
            >
                <Text style={styles.buttonText} >{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',

    },
    buttonInnerContainer: {
        backgroundColor:'#72063c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
})
