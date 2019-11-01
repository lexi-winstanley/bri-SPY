import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet, { setStyleAttributePreprocessor } from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import MenuToggle from '../components/MenuToggle';

const GamePlayHeader = props => {
    return (
        <View style={styles.gameHeaderContainer}>
            <View style={styles.textWrap}>
            <Text style={styles.gameHeaderText}>Best: {props.bestTime}</Text>
            <Text style={styles.gameHeaderText}>Current: {props.currentTime}</Text>
            </View>
            <MenuToggle imageName={require('../assets/SettingsLight.png')} menuToggle={props.menuToggle} visibleToggle={props.headerToggle} version='outerContainerHeader'/>
        </View>
    )
};

const styles = EStyleSheet.create({
    gameHeaderContainer: {
        width: '100%',
        height: '15%',
        paddingHorizontal: '.5rem',
        paddingVertical: '.5rem',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }, 
    textWrap: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    gameHeaderText: {
        width: '100%',
        color: colors.accent,
        fontSize: '1.25rem',
        fontFamily: fonts.primary,
        textTransform: 'uppercase'
    }
});

export default GamePlayHeader;