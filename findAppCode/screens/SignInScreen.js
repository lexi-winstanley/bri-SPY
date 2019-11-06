import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import UserAuthInputs from '../components/UserAuthInputs';

const SignInScreen = props => {
    return (
        <View style={styles.container}>
            <Header title='.find( )' version='appTitle'/>
            <UserAuthInputs buttonPress={props.buttonPress} pageName='thumbnail' title='Sign In'/>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default SignInScreen;