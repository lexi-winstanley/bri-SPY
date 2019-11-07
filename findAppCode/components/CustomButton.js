import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={() => props.buttonPress(props.pageName)}>
            <View style={styles[props.buttonColor]}>
                <Text style={styles[props.buttonTextColor]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = EStyleSheet.create({
    buttonPink: {
        backgroundColor: colors.primary,
        alignSelf: 'center',
        borderRadius: '1.25rem',
        paddingHorizontal: '.75rem',
        paddingTop: '.25rem',
        paddingBottom: '.3rem',
        marginHorizontal: '.5rem',
        marginTop: '.5rem',
        marginBottom: '1rem',
        shadowColor: 'black',
        shadowOffset: { width: '.2rem', height: '.2rem' },
        shadowOpacity: .5,
        shadowRadius: '.2rem',
        elevation: '.5rem'
    },
    buttonLight: {
        backgroundColor: colors.accent,
        alignSelf: 'center',
        borderRadius: '1.25rem',
        paddingHorizontal: '.75rem',
        paddingTop: '.25rem',
        paddingBottom: '.3rem',
        marginHorizontal: '.5rem',
        marginTop: '.5rem',
        marginBottom: '1rem',
        shadowColor: 'black',
        shadowOffset: { width: '.2rem', height: '.2rem' },
        shadowOpacity: .5,
        shadowRadius: '.2rem',
        elevation: '.5rem'
    },
    buttonTextPink: {
        color: colors.accent,
        fontSize: '1.25rem',
        textTransform: 'uppercase',
        fontFamily: fonts.primary
    },
    buttonTextLight: {
        color: colors.menu,
        fontSize: '1.25rem',
        textTransform: 'uppercase',
        fontFamily: fonts.primary
    }
});

export default CustomButton;