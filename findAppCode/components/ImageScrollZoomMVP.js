import React from 'react';
import {Dimensions, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImageViewer from 'react-native-image-zoom-viewer';
// import ImageZoom from 'react-native-image-pan-zoom';

const images = [{
    props: {
        url: '',
        source: require('../assets/image1.png')
    }
}]


const ImageScrollZoomMVP = props => {
    return (
            <ImageViewer imageUrls={images} style={styles.gamePlayModal}/>
            // <ImageZoom cropWidth={Dimensions.get('window').width}
            //            cropHeight={Dimensions.get('window').height}
            //            imageWidth={200}
            //            imageHeight={200}>
            //     <Image style={{width:200, height:200}}
            //            source={require('../assets/image2.png')}/>
            // </ImageZoom>

    )
}

const styles = EStyleSheet.create({
    gamePlayModal: {
    }
});

export default ImageScrollZoomMVP;    