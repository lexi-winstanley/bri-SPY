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
   
                <CenterText message='Congratulations! You found the icon!'/>
                <CenterIcon/>
          
            <ButtonContainer>
                <CustomButton title='Next Image' buttonPress={props.buttonPress} pageName='gamePlay' buttonColor='buttonPink' buttonTextColor='buttonTextPink'/>
                <CustomButton title='Main Menu' buttonPress={props.buttonPress} pageName='thumbnail' buttonColor='buttonPink' buttonTextColor='buttonTextPink'/>
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