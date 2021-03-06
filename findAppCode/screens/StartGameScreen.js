import React, { useState } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import CenterText from '../components/CenterText';
import CenterIcon from '../components/CenterIcon';
import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton';
import Menu from '../components/Menu';
import MenuToggle from '../components/MenuToggle';

const StartGameScreen = props => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHandler = bool => {
        setMenuVisible(bool);
    }

    return (
        <View style={styles.container}>
            <Header title={`WELCOME ${props.user}`} version='welcomeText' />
            <CenterText message="Use two fingers to zoom in and scroll around the image to find Brian. Gently double tap on Brian's face to stop the clock!" />
            <CenterIcon />
            <ButtonContainer>
                <CustomButton title='Start' buttonPress={props.startPress} buttonColor='buttonPink' buttonTextColor='buttonTextPink' />
            </ButtonContainer>
            <MenuToggle imageName={require('../assets/SettingsLight.png')} menuToggle={menuHandler} headerToggle={true} version='outerContainerStart' />
            <Menu visible={menuVisible} buttonPress={props.buttonPress} menuToggle={menuHandler} visibleToggle={false} menuPress={props.menuPress} desiredButton='logOut' />
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default StartGameScreen;