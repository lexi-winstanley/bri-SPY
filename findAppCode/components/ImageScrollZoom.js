import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    props: {
        url: '',
        source: require('../assets/image2.png')
    }
}]


const ImageScrollZoom = props => {
    return (
            <ImageViewer imageUrls={images} style={styles.gamePlayModal}/>

    )
}

const styles = EStyleSheet.create({
    gamePlayModal: {
    }
});

export default ImageScrollZoom;    