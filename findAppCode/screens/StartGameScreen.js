import React from 'react';
import {View, ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import CenterText from '../components/CenterText';
import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton';

const StartGameScreen = props => {
    return (
        <ImageBackground source={require('../assets/gradientBackground.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <Header title={`WELCOME ${props.user}`} version='welcomeText'/>
            <CenterText message='Press the button below to get started finding your hidden icon!'/>
            <ButtonContainer>
                <CustomButton title='Start' buttonPress={() => {
                    props.navigation.navigate({routeName: 'GamePlay'});
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

export default StartGameScreen;