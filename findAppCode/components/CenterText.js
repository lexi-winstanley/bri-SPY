import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const CenterText = props => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.messageText}>{props.message}</Text>
        </View>
    )
};

const styles = EStyleSheet.create({
    textContainer: {
        marginHorizontal: '.5rem',
        marginTop: '.5rem',
        width: '100%',
        paddingHorizontal: '1.5rem',
        paddingTop: '1.5rem',
        paddingBottom: '.5rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        color: '#E6E6E6',
        fontSize: '1.25rem',
        textAlign: 'center'
    }
});

export default CenterText;