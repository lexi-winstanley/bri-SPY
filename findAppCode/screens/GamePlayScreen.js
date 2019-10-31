import React, {useState} from 'react';
import {View, Button} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GamePlayHeader from '../components/GamePlayHeader';
import GamePlayContainer from '../components/GamePlayContainer';

import ImageScrollZoom from '../components/ImageScrollZoom';
import Menu from '../components/Menu';
import MenuText from '../components/MenuItemText';

const GamePlayScreen = props => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHandler = bool => {
        setMenuVisible(bool);
    }

    return (
        <View style={styles.container}>
            <GamePlayHeader bestTime='2:53' currentTime='0:00' menuToggle={menuHandler} headerToggle={true} visible={menuVisible}/>
            <GamePlayContainer>
                <ImageScrollZoom source={require('../assets/ImageIcon.png')} buttonPress={props.buttonPress} pageName='roundWon'/>
            </GamePlayContainer>
            <Menu visible={menuVisible} buttonPress={props.buttonPress} menuToggle={menuHandler} visibleToggle={false} desiredButton='exit'>
                <MenuText message='INSTRUCTIONS: Use your fingers to scroll and zoom around the image to find the hidden icon.'/>
            </Menu>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default GamePlayScreen;