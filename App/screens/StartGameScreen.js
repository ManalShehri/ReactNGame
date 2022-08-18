import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import Colors from '../constant/colors';
import InstructionText from '../components/ui/InstructionText';

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
        <View style={styles.rootContainer }>
            <Title>Guess My number</Title>
            <Card style={styles.inputContainer}>
                <InstructionText>Enter a Number</InstructionText>
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
            </Card >
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
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