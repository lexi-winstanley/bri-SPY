import React, {Component} from 'react';
import { View, Image, ScrollView, PanResponder, PanResponderInstance, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class ImageScrollZoom extends Component {
    constructor(props) {
        super(props);
        this.lastClickTime = new Date().getTime();
        this.doubleClickThreshold = 250;
        this.scale = 1;
        this.animatedScale = new Animated.Value(1);
        this.lastPositionX = 0;
        this.animatedPositionX = new Animated.Value(0);
        this.lastPositionY = 0;
        this.animatedPositionY = new Animated.Value(0);
        this.lastZoomDistance = null;

        this.panResponder = null; 

        this.render.bind(this);
    }

    componentWillMount() {
        this.panResponder = PanResponder.create(
            {
                onStartShouldSetPanResponder: () => true,
                onPanResponderTerminationRequest: () => false,
                onPanResponderGrant: (evt) => {
                    let numChangedTouches = evt.nativeEvent.changedTouches.length;

                    // average touches
                    let avgX = 0;
                    let avgY = 0;
                    this.lastZoomDistance = null;
                    evt.nativeEvent.changedTouches.forEach((touchEvent) => {
                        avgX += touchEvent.pageX;
                        avgY += touchEvent.pageY;
                    })
                    avgX /= numChangedTouches;
                    avgY /= numChangedTouches;
                    console.log("AvgX: " + avgX)
                    console.log("AvgY:" + avgY)

                    if (numChangedTouches === 1) {
                        if (new Date().getTime() - this.lastClickTime < 50) {
                            // This is a double click!
                            // This is the user attempting to click on the icon.
                        }
                    }
                },
                onPanResponderMove: (evt, gestureState) => {
                    let numChangedTouches = evt.nativeEvent.changedTouches.length;
                    if (numChangedTouches === 1) {
                        let diffX = gestureState.dx - this.lastPositionX;
                        let diffY = gestureState.dy - this.lastPositionY;
                    } else if (numChangedTouches === 2) {
                        let touches = evt.nativeEvent.changedTouches;

                        let xWidth = Math.abs(touches[0].pageX - touches[1].pageX);
                        let yWidth = Math.abs(touches[0].pageY - touches[1].pageY);
                        let distance = Math.sqrt(Math.pow(xWidth, 2) + Math.pow(yWidth, 2));

                        if (this.lastZoomDistance !== null) {
                            let distanceDiff = (distance - this.lastZoomDistance) / 150;

                            let newScale = Math.min(Math.max(this.scale + distanceDiff, 1), 10);
                            const oldScale = this.scale;
                            this.scale = newScale;
                            console.log(this.scale);
                            this.animatedScale.setValue(this.scale);

                            const deltaScale = this.scale/oldScale;
                            this.lastPositionX *= deltaScale;
                            this.lastPositionY *= deltaScale;        
                            this.animatedPositionX.setValue(this.lastPositionX);
                            this.animatedPositionY.setValue(this.lastPositionY);
                        } else {
                            let xCenter = (touches[0].pageX + touches[1].pageX) /2 - 250;
                            let yCenter = (touches[0].pageY + touches[1].pageY) /2 - 250;
    
                            this.lastPositionX = xCenter;
                            this.lastPositionY = yCenter;
                            this.animatedPositionX.setValue(this.lastPositionX);
                            this.animatedPositionY.setValue(this.lastPositionY);
                            console.log("X: " + this.lastPositionX)
                            console.log("Y: " + this.lastPositionY)
                        }

                        this.lastZoomDistance = distance;
                    }


                }
            })
    }

    render() {
        const animationConfig = {
            transform: [
                {
                    scale: this.animatedScale
                },
                {
                    translateX: this.animatedPositionX
                },
                {
                    translateY: this.animatedPositionY
                }
            ]
        };
        return (
            <View {...this.panResponder.panHandlers}>
                <Animated.View style={animationConfig}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/image2.png')} style={styles.image}/>
                    </View>
                </Animated.View>
            </View>
    
        )
    }
}


const styles = EStyleSheet.create({
    imageContainer: {
        width: 500,
        height: 500
    },
    image: {
        flex: 1, 
        width: undefined,
        height: undefined
    }
});

export default ImageScrollZoom;    