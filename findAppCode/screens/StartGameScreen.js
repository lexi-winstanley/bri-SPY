import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import CenterText from '../components/CenterText';

const StartGameScreen = props => {
    return (
        <View style={styles.container}>
            <Header title={`WELCOME ${props.user}`} version='welcomeText'/>
            <CenterText message=''/>
        </View>
        
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default StartGameScreen;