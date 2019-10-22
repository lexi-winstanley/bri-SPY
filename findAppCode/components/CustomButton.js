import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const CustomButton = props => {
    return (
    <TouchableOpacity onPress={props.buttonPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = EStyleSheet.create({
    button: {
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
        shadowOffset: {width: '.2rem',height: '.2rem'},
        shadowOpacity: .5,
        shadowRadius: '.2rem',
        elevation: '.5rem'
    },
    buttonText: {
        color: colors.accent,
        fontSize: '1.25rem',
        textTransform: 'uppercase',
        fontFamily: fonts.primary
    }
});

export default CustomButton;