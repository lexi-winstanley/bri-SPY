import React from 'react';
import { View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';

const LogoTitle = props => {
    return (
        <View style={styles.headerContainer}>
            <Image accessible={true} accessibilityLabel='bri-SPY' style={styles.image} source={require('../assets/Logo.png')} resizeMode='contain' />
        </View>
    )
};

const styles = EStyleSheet.create({
    headerContainer: {
        width: '100%',
        flex: 0,
        height: '7rem',
        flexDirection: 'row',
        borderBottomColor: colors.accent,
        borderBottomWidth: '.25rem',
        paddingHorizontal: '.5rem',
        paddingVertical: '1.5rem',
        marginTop: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        maxHeight: '4rem'
    }
});

export default LogoTitle;