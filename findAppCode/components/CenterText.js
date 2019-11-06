import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

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
        marginBottom: '1.5rem',
        width: '100%',
        paddingHorizontal: '1.5rem',
        paddingTop: '1.5rem',
        paddingBottom: '.5rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        color: colors.accent,
        fontSize: '1.25rem',
        textAlign: 'center',
        fontFamily: fonts.primary
    }
});

export default CenterText;