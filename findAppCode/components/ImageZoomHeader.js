import React from 'react';
import { View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const ImageZoomHeader = props => {
    return (
        <View style={styles.newHeader}/>
    )
};

const styles = EStyleSheet.create({
    newHeader: {
        backgroundColor: 'blue'
    }
});

export default ImageZoomHeader;