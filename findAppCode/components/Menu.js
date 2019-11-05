import React from 'react';
import {Modal, Text, Button, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';

import ButtonContainer from '../components/ButtonContainer';
import CustomButton from '../components/CustomButton';
import MenuText from '../components/MenuItemText';
import MenuItemImage from '../components/MenuItemImage';
import MenuToggle from '../components/MenuToggle';

const Menu = props => {
  let button;


  switch (props.desiredButton) {
    case 'exit':
      button = <ButtonContainer><CustomButton title='Exit Game' buttonPress={props.buttonPress} pageName='startGame' buttonColor='buttonLight' buttonTextColor='buttonTextLight'/></ButtonContainer>;
      break;
    case 'logOut':
      button = <ButtonContainer><CustomButton title='Log Out' buttonPress={props.menuPress} pageName='welcome' buttonColor='buttonLight' buttonTextColor='buttonTextLight'/></ButtonContainer>;
      break;
  }
    return (
        <Modal style={styles.modal} visible={props.visible} transparent={true} >
          <View style={styles.settingsContainer}>
            <MenuToggle imageName={require('../assets/SettingsLight.png')} menuToggle={props.menuToggle} visibleToggle={props.visibleToggle} style={styles.menuToggler} version='outerContainerMenu'/>
            <MenuItemImage label='Icon:' imageName={require('../assets/hiddenIcon.png')}/>
            {props.children}
            <View style={styles.menuButton}>
              {button}
            </View>
          </View>
        </Modal>
    )
};

const styles = EStyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    settingsContainer: {
      flex: 1, 
      backgroundColor: colors.menu, 
      justifyContent: 'flex-start',
      alignItems: 'flex-start', 
      marginLeft: '3rem',
      padding: '.75rem'
    }, 
    menuToggler: {
      alignSelf: 'flex-start',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end', 
    }, 
    menuButton: {
      flex: 1, 
      justifyContent: 'flex-end'
    }
});

export default Menu;