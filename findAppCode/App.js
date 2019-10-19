import React from 'react';
import {Text, View, ImageBackground, Image, Button, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import WelcomeScreen from './screens/WelcomeScreen'
import StartGameScreen from './screens/StartGameScreen';
import GamePlayScreen from './screens/GamePlayScreen';

const {width} = Dimensions.get('window');
const rem = width > 340 ? 18 : 17;
EStyleSheet.build({
  $rem: rem,
});

export default function App() {
  return (
    <ImageBackground source={require('./assets/gradientBackground.png')} style={styles.backgroundImage}>
        {/* <WelcomeScreen/> */}
        {/* <StartGameScreen user='lwinstan'/> */}
        <GamePlayScreen/>
    </ImageBackground>
  );
}

const styles = EStyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    }
});
