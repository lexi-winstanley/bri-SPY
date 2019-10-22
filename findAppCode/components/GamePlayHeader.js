import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const GamePlayHeader = props => {
    return (
        <View style={styles.gameHeaderContainer}>
            <Text style={styles.gameHeaderText}>Best: {props.bestTime}</Text>
            <Text style={styles.gameHeaderText}>Current: {props.currentTime}</Text>
        </View>
    )
};

const styles = EStyleSheet.create({
    gameHeaderContainer: {
        width: '100%',
        height: '15%',
        paddingHorizontal: '.5rem',
        paddingVertical: '.5rem',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    }, 
    gameHeaderText: {
        width: '100%',
        color: colors.accent,
        fontSize: '1.25rem',
        fontFamily: fonts.primary
    }
});

export default GamePlayHeader;