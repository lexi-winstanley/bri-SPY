import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Thumbnail = props => {
    return (
        <View style={styles.clickableImageContainer}>
    <TouchableOpacity style={styles.clickableImage} onPress={() => props.buttonPress(props.pageName, props.id)}>
        <Image style={styles.clickableImage} source={props.src} resizeMode='contain'/>
    </TouchableOpacity>
    </View>
    );
};

const styles = EStyleSheet.create({
    clickableImageContainer: {
        flex: 1
    },
    clickableImage: {
        flex: 1,
        height: undefined,
        width: undefined
    }
});

export default Thumbnail;

//props.buttonPress(props.pageName)