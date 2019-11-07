import React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const MenuItemImage = props => {
    return (
        <View style={styles.textImageContainer}>
            <Text style={styles.messageText}>{props.label}</Text>
            <Image style={styles.settingsImage} source={props.imageName} resizeMode='contain' />
        </View>
    )
};

const styles = EStyleSheet.create({
    textImageContainer: {
        flexDirection: 'row',
        marginHorizontal: '.5rem',
        marginTop: '.5rem',
        width: '100%',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    messageText: {
        color: colors.accent,
        fontSize: '1.25rem',
        fontFamily: fonts.primary,
        textTransform: 'uppercase'
    },
    settingsImage: {
        width: '3rem',
        height: '3rem',
        paddingHorizontal: '2.5rem'
    }
});

export default MenuItemImage;