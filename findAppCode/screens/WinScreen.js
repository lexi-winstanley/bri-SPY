import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainContent from '../components/MainContent';
import CenterText from '../components/CenterText';
import CenterIcon from '../components/CenterIcon';
import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton';

const WinScreen = props => {
    return (
        <View style={styles.container}>
            <MainContent>
                <CenterText message='Congratulations! You found the icon!'/>
                <CenterIcon/>
            </MainContent>
            <ButtonContainer>
                <CustomButton title='New Image' buttonPress={props.buttonPress} pageName='startGame' buttonColor='buttonPink' buttonTextColor='buttonTextPink'/>
            </ButtonContainer>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '3rem'
    }
});

export default WinScreen;