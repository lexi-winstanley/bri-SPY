import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles[props.version]}>{props.title}</Text>
        </View>
    )
};

const styles = EStyleSheet.create({
    headerContainer: {
        width: '100%',
        height: '15%',
        borderBottomColor: colors.accent,
        borderBottomWidth: '.25rem',
        paddingHorizontal: '.5rem',
        paddingVertical: '.5rem',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    appTitle: {
        color: colors.accent,
        fontSize: '2.5rem',
        fontFamily: fonts.primary
    },
    welcomeText: {
        color: colors.accent,
        fontSize: '1.5rem',
        fontFamily: fonts.primary
    }
});

export default Header;