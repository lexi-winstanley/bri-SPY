import React from 'react';
import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const CenterIcon = props => {
    return (
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/hiddenIcon.png')} resizeMode='contain'/>
        </View>
    )
};

const styles = EStyleSheet.create({
    imageContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    image: {
        width: '50%'
    }
});

export default CenterIcon;