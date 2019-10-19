import React from 'react';
import {ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const mainContent = props => {
    return (
        <ImageBackground source={require('./assets/gradientBackground.png')} style={styles.backgroundImage}>
            {props.children}
        </ImageBackground>
    )
};

const styles = EStyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
      }
});

export default mainContent;