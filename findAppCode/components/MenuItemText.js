import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const MenuText = props => {
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
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    messageText: {
        color: colors.accent,
        fontSize: '1.25rem',
        fontFamily: fonts.primary
    }
});

export default MenuText;