import React from 'react';
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
        <ImageBackground source={require('../assets/gradientBackground.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Header title='.find( )' version='appTitle'/>
            <MainContent>
                <CenterText message='Find the hidden icon in our library of images!'/>
                <CenterIcon/>
            </MainContent>
            <ButtonContainer>
                <CustomButton title='Sign In' buttonPress={() => {
                    props.navigation.navigate({routeName: 'SignIn'});
                }}/>
                <CustomButton title='Create Account' buttonPress={() => {
                    props.navigation.navigate({routeName: 'CreateAccount'});
                }}/>
            </ButtonContainer>
        </View>
        </ImageBackground>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    }
});

export default WelcomeScreen;