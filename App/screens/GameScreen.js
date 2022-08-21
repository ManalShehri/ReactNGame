import { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Alert, FlatList} from 'react-native'
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import NumberContainer from '../components/game/NumberContianer';
import GuessLogItem from '../components/game/GuessLogItem';
import PrimaryButton from '../components/ui/PrimaryButton';
import {Ionicons} from '@expo/vector-icons'

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  let minBoundary = 1;
  let maxBoundary = 100;

function GameScreen ({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(1,100, userNumber);
    const [currentGuess, setCurrentGuess] =  useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    // whenever one of the three [,,] values changes, this effect will excute. 
    useEffect(() => {
        if (currentGuess == userNumber) {
            onGameOver(guessRounds.length);
        }

    }, [currentGuess,userNumber,onGameOver]);
    
    // when the guess is changed
    useEffect(() => {
        minBoundary=1;
        maxBoundary= 100;
    }, [])
      
    function nextGuessHandler(direction){

        if (
            (direction ==='lower' && currentGuess < userNumber) || 
            (direction ==='greater ' && currentGuess > userNumber)
        ) {
            Alert.alert('dont lie','you know it is wrong',[{text: 'Sorry', style: 'cancel'}]);
            return; 
        }

        if (direction === 'lower'){
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        console.log(minBoundary, maxBoundary);
        const newRanGuess = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRanGuess);
        setGuessRounds(prevGuessRounds => [newRanGuess, ...prevGuessRounds])
    };

    const guessRoundListLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.InstructionText}>Higer or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                            <Ionicons name='md-remove' size={24} color= "white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                            <Ionicons name='md-add' size={24} color= "white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* here we used the key as same as the guessed number because it is by default a unique  */}
                {/* {guessRounds.map(guessRound => <Text key={guessRound}> {guessRound} </Text>)} */}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => (
                        <GuessLogItem 
                            roundNumber={guessRoundListLength - itemData.index} 
                            guess={itemData.index} 
                        /> 
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}


export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    InstructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
});