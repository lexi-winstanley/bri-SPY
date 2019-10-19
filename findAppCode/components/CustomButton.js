import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const CustomButton = props => {
    return (
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = EStyleSheet.create({
    button: {
        backgroundColor: '#FC354C',
        alignSelf: 'center',
        borderRadius: '1.25rem',
        paddingHorizontal: '.75rem',
        paddingTop: '.25rem',
        paddingBottom: '.3rem',
        marginHorizontal: '.5rem',
        marginTop: '.5rem',
        marginBottom: '1rem',
        shadowColor: 'black',
        shadowOffset: {width: '.2rem',height: '.2rem'},
        shadowOpacity: .5,
        shadowRadius: '.2rem',
        elevation: '.5rem'
    },
    buttonText: {
        color: '#E6E6E6',
        fontSize: '1.25rem'
    }
});

export default CustomButton;