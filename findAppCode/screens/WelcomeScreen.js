import React, {useState} from 'react';
import {View, ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import MainContent from '../components/MainContent';
import CenterText from '../components/CenterText';
import CenterIcon from '../components/CenterIcon';
import ButtonContainer from '../components/ButtonContainer';
import GoogleSignInButton from '../components/GoogleSignIn';

const WelcomeScreen = props => {
    // console.log('welButton: ' + props.buttonPress);
    return (
        <View style={styles.container}>
            <Header title='.find( )' version='appTitle'/>
            <MainContent>
                <CenterText message='Find the icon below hidden in our library of images!'/>
                <CenterIcon/>
            </MainContent>
            <ButtonContainer>
                {/* <CustomButton title='Sign In' buttonPress={props.buttonPress} pageName='signIn'/>
                <CustomButton title='Create Account' buttonPress={props.buttonPress} pageName='createAccount'/> */}
                <GoogleSignInButton title="Sign in with Google" buttonPress={props.buttonPress}/>
            </ButtonContainer>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default WelcomeScreen;