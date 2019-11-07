import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import LogoTitle from '../components/LogoTitle';
import MainContent from '../components/MainContent';
import CenterText from '../components/CenterText';
import CenterIcon from '../components/CenterIcon';
import ButtonContainer from '../components/ButtonContainer';
import GoogleSignInButton from '../components/GoogleSignIn';

const WelcomeScreen = props => {
    return (
        <View style={styles.container}>
            <LogoTitle />
            <MainContent>
                <CenterText message='See if you can find Brian hidden in our library of images!' />
                <CenterIcon />
            </MainContent>
            <ButtonContainer>
                <GoogleSignInButton title="Sign in with Google" buttonPress={props.buttonPress} />
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