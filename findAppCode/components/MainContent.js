import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const mainContent = props => {
    return (
        <View style={styles.mainContainer}>
            {props.children}
        </View>
    )
};

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default mainContent;