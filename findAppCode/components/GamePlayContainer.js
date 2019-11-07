import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';

const GamePlayContainer = props => {
    return (
        <View style={styles.gamePlayContainer}>
            {props.children}
        </View>
    )
};

const styles = EStyleSheet.create({
    gamePlayContainer: {
        flex: 1,
        marginHorizontal: '1rem',
        marginBottom: '1rem',
        marginTop: '.5rem',
        overflow: 'hidden',
        flexDirection: 'row'
    }
});

export default GamePlayContainer;