import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const MenuToggle = props => {
    return (
        <TouchableOpacity onPress={() => props.menuToggle(props.visibleToggle)} style={styles[props.version]}>
        <View style={styles.toggleContainer}>
            {props.label ? <Text style={styles.labelText}>{props.label}</Text> : null }
            {/* <Text style={styles.labelText}>{props.label}</Text> */}
            <Image style={styles.settingsImage} source={props.imageName} resizeMode='contain' />
        </View>
        </TouchableOpacity>
    )
};

const styles = EStyleSheet.create({
    outerContainerHeader: {
        flex: 1, 
        flexDirection: 'row'
    },
    outerContainerMenu: {
        flexDirection: 'row',  
        alignItems: 'flex-start' 
    },
    outerContainerStart: {
        flex: 1,
        flexDirection: 'row',  
        alignItems: 'flex-end'
    },
    outerContainerThumbnail: {
        flexDirection: 'row',  
        alignItems: 'flex-end'
    },
    toggleContainer: {
        marginHorizontal: '.5rem',
        marginTop: '.5rem',
        width: '100%',
        paddingTop: '.5rem',
        paddingBottom: '1.5rem',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    settingsImage: {
        width: '2rem',
        height: '2rem',
        paddingHorizontal: '2.5rem'
    }, 
    labelText: {
        color: colors.accent,
        fontSize: '1.25rem',
        fontFamily: fonts.primary, 
        textTransform: 'uppercase'
    }
});

export default MenuToggle;