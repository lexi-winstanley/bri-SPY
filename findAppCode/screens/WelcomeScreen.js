import React, {useState} from 'react';
import {View, ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import MainContent from '../components/MainContent';
import CenterText from '../components/CenterText';
import CenterIcon from '../components/CenterIcon';
import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = props => {
    return (
        <View style={styles.container}>
            <Header title='.find( )' version='appTitle'/>
            <MainContent>
                <CenterText message='Find the hidden icon in our library of images!'/>
                <CenterIcon/>
            </MainContent>
            <ButtonContainer>
                <CustomButton title='Sign In' buttonPress={props.buttonPress} pageName='signIn'/>
                <CustomButton title='Create Account' buttonPress={props.buttonPress} pageName='createAccount'/>
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