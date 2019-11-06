import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const ButtonContainer = props => {
    return (
        <View style={styles.buttonContainer}>
            {props.children}
        </View>
    )
};

const styles = EStyleSheet.create({
    buttonContainer: {
        flex: 0,
        marginBottom: '1rem', 
        marginTop: '1.5rem'
    }
});

export default ButtonContainer;