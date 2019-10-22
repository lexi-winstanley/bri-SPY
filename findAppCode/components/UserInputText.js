import React from 'react';
import {View, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const UserInputText = props => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{props.label}:</Text>
            <TextInput style={styles.inputBox}/>
        </View>
    )
};

const styles = EStyleSheet.create({
    inputContainer: {
        flex: 0,
        marginBottom: '1rem'
    }, 
    inputLabel: {
        color: colors.accent,
        fontSize: '1.25rem',
        marginHorizontal: '1.5rem',
        marginBottom: '.5rem',
        fontFamily: fonts.primary
    }, 
    inputBox: {
        backgroundColor: colors.accent,
        marginHorizontal: '1.5rem',
        marginBottom: '1rem',
        padding: '.5rem',
        fontSize: '1.25rem', 
        borderRadius: '.5rem',
        fontFamily: fonts.primary
    }
});

export default UserInputText;