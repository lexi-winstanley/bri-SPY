import React, {useState} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import CenterText from '../components/CenterText';
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
            <Header title={`WELCOME ${props.user}`} version='welcomeText'/>
            <CenterText message='Press the button below to get started finding your hidden icon!'/>
            <ButtonContainer>
                <CustomButton title='Start' buttonPress={props.buttonPress} pageName='gamePlay' buttonColor='buttonPink' buttonTextColor='buttonTextPink'/>
            </ButtonContainer>
            <MenuToggle imageName={require('../assets/SettingsLight.png')} menuToggle={menuHandler} headerToggle={true} version='outerContainerStart'/>
            <Menu visible={menuVisible} buttonPress={props.buttonPress} menuToggle={menuHandler} visibleToggle={false} menuPress={props.menuPress} desiredButton='logOut'/>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default StartGameScreen;