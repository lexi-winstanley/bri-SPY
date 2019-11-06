import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainContent from '../components/MainContent';
import CenterText from '../components/CenterText';
import CenterIcon from '../components/CenterIcon';
import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton'

const newBestScreen = props => {
    return (
        <View style={styles.container}>
            <MainContent>
                <CenterText message='Congratulations! You found the icon! New Best Time!'/>
                <CenterIcon/>
            </MainContent>
            <ButtonContainer>
            <CustomButton title='Next Image' buttonPress={props.buttonPress} pageName='gamePlay' buttonColor='buttonPink' buttonTextColor='buttonTextPink'/>
                <CustomButton title='Main Screen' buttonPress={props.buttonPress} pageName='thumbnail' buttonColor='buttonPink' buttonTextColor='buttonTextPink'/>
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

export default newBestScreen;