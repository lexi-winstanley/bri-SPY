import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import MainContent from '../components/MainContent';

const CustomInputSubmit = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const usernameHandler = enteredText => {
        setEnteredUsername(enteredText);
    }
    const [enteredPassword, setEnteredPassword] = useState('');
    const passwordHandler = enteredText => {
        setEnteredPassword(enteredText);
    }
    return (
        <MainContent>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>username:</Text>
                <TextInput style={styles.inputBox} placeholder='Username' onChangeText={usernameHandler} value={enteredUsername} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>password:</Text>
                <TextInput style={styles.inputBox} placeholder='Password' onChangeText={passwordHandler} value={enteredPassword} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => props.buttonPress(props.pageName, enteredUsername, enteredPassword)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </MainContent>





    );
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
    },
    buttonContainer: {
        flex: 0,
        marginBottom: '1rem'
    },
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
        shadowOffset: { width: '.2rem', height: '.2rem' },
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

export default CustomInputSubmit;