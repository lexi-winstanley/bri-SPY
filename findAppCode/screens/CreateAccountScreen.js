import React, {useState} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import UserAuthInputs from '../components/UserAuthInputs';

const CreateAccountScreen = props => {
    return (
        <View style={styles.container}>
            <Header title='.find( )' version='appTitle'/>
            <UserAuthInputs buttonPress={props.buttonPress} pageName='startGame' title='Create Account'/>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default CreateAccountScreen;