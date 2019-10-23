import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GamePlayHeader from '../components/GamePlayHeader';
import GamePlayContainer from '../components/GamePlayContainer';

//import ImageScrollZoom from '../components/ImageScrollZoom';
import ImageScrollZoomMVP from '../components/ImageScrollZoomMVP';
import ZoomableImage from '../components/ImageZoom';

const GamePlayScreen = props => {
    return (
        <View style={styles.container}>
            <GamePlayHeader bestTime='2:53' currentTime='0:00'/>
            <GamePlayContainer>
                {/* <ImageScrollZoom source={require('../assets/image2.png')}/> */}
                <ImageScrollZoomMVP/>
            </GamePlayContainer>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default GamePlayScreen;