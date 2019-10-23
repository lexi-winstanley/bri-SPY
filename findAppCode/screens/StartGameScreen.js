import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import CenterText from '../components/CenterText';
import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton';

const StartGameScreen = props => {
    return (
        <View style={styles.container}>
            <Header title={`WELCOME ${props.user}`} version='welcomeText'/>
            <CenterText message='Press the button below to get started finding your hidden icon!'/>
            <ButtonContainer>
                <CustomButton title='Start' buttonPress={props.buttonPress} pageName='gamePlay'/>
            </ButtonContainer>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default StartGameScreen;