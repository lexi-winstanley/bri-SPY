import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles[props.version]}>{props.title}</Text>
        </View>
    )
};

const styles = EStyleSheet.create({
    headerContainer: {
        width: '100%',
        height: '15%',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: '.25rem',
        paddingHorizontal: '.5rem',
        paddingVertical: '.5rem',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    }, 
    appTitle: {
        color: '#E6E6E6',
        fontSize: '2.5rem'
    }, 
    welcomeText: {
        color: '#E6E6E6',
        fontSize: '1.5rem'
    }
});

export default Header;