import { useState } from 'react';
import {TextInput, View, StyleSheet, Alert} from 'react-native'
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../constant/colors';

function StartGameScreen ({onPickNumber}) {
    const [enterdNumber, setEnterdNumber] = useState('');

    function numberInputHandler(enterdText){
        setEnterdNumber(enterdText);
    }

    function resetInputHandler(){
        setEnterdNumber('');
    }

    function confirmInputHandler(){
        // convert the enterd text into a number 
        const chosenNumber = parseInt(enterdNumber);
        // entry checks: (is a number and not negative...etc)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // show an alert ... 
            // alert (title,message,buttons)
            Alert.alert(
                'Invalid Input', 
                'Number must be a number between 1 and 99',
                [{text: 'Okay', style:'destructive', onPress: resetInputHandler}]
            )
            return; // to stop the function otherwise, it will excute forever 
        }
        console.log('Valid Number');
        onPickNumber(chosenNumber);
    }


    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.numberInput} 
                maxLength={2} 
                keyboardType='number-pad'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enterdNumber}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.bottonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.bottonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton> 
                </View>
            </View>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, // shadow, works only for Andriod 
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer:{
        flexDirection: 'row',
    },
    bottonContainer: {
        flex: 1,
    },
});