import React from 'react';
import { View} from 'react-native';
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
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.accent,
        overflow: 'hidden',
        flexDirection: 'row'
    }
});

export default GamePlayContainer;