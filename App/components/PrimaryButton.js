import {View, Text, Pressable, StyleSheet} from 'react-native'

function PrimaryButton({children}) {
    function pressHandler(){
        console.log('pressed');
    }
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                // condition ? ture : false 
                style={ ({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} // here this style props can take a style object dirictly or it can holds a function {} that will act whenever this component is pressed
                onPress={pressHandler} 
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
