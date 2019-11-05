import React, {useState} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';
import CenterText from '../components/CenterText';
import ThumbnailContainer from '../components/ThumbnailContainer';
import Menu from '../components/Menu';
import MenuToggle from '../components/MenuToggle';

const ThumbnailScreen = props => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHandler = bool => {
        setMenuVisible(bool);
    }
    console.log(props);


    return (
        <View style={styles.container}>
            <Header title={`WELCOME ${props.user}`} version='welcomeText'/>
            <CenterText message='Select an image below to get started!'/>
            <ThumbnailContainer buttonPress={props.buttonPress} pageName='gamePlay'/>
            <MenuToggle imageName={require('../assets/SettingsLight.png')} menuToggle={menuHandler} headerToggle={true} version='outerContainerThumbnail'/>
            <Menu visible={menuVisible} buttonPress={props.buttonPress} menuToggle={menuHandler} visibleToggle={false} menuPress={props.menuPress} desiredButton='logOut'/>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default ThumbnailScreen;