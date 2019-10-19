import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import ImageZoom from 'react-native-image-pan-zoom';

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
        marginBottom: '1.25rem',
        marginTop: '.25rem',
        borderColor: '#E6E6E6',
        borderWidth: '.25rem',
        borderRadius: '.25rem',
        overflow: 'hidden',
        flexDirection: 'row'
    }
});

export default GamePlayContainer;