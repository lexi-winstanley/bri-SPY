import React from 'react';
import { View, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import imageList from '../constants/images';
import Thumbnail from '../components/Thumbnail';

const ThumbnailContainer = props => {
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={imageList.images}
                renderItem={(image) => (
                    <View style={styles.thumbnailHeightControl}>
                        <Thumbnail
                            id={image.item.id}
                            src={image.item.thumbnail}
                            buttonPress={props.buttonPress}
                            pageName={'gamePlay'}
                        />
                    </View>
                )}
                numColumns={3}
                keyExtractor={image => image.id}
            />
        </View>
    )
};

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    thumbnailHeightControl: {
        height: '10rem',
        width: '33.3333%',
        padding: '.5rem'
    }
});

export default ThumbnailContainer;