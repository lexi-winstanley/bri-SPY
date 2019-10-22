import React from 'react';
import {View, ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GamePlayHeader from '../components/GamePlayHeader';
import GamePlayContainer from '../components/GamePlayContainer';

//import ImageScrollZoom from '../components/ImageScrollZoom';
import ImageScrollZoomMVP from '../components/ImageScrollZoomMVP';

const GamePlayScreen = props => {
    return (
        <ImageBackground source={require('../assets/gradientBackground.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <GamePlayHeader bestTime='2:53' currentTime='0:00'/>
            <GamePlayContainer>
                {/* <ImageScrollZoom source={require('../assets/image2.png')}/> */}
                <ImageScrollZoomMVP/>
            </GamePlayContainer>
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

export default GamePlayScreen;