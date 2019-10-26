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

        this.viewWidth = 0;
        this.viewHeight = 0;
        this.imageWidth = 0;
        this.imageHeight = 0;

        this.panResponder = null; 

        this.render.bind(this);
        this.onPanResponderLayout.bind(this);
        this.onImageLayout.bind(this);
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

                        let xWidth = Math.abs(touches[0].locationX - touches[1].locationX);
                        let yWidth = Math.abs(touches[0].locationY - touches[1].locationY);
                        let distance = Math.sqrt(Math.pow(xWidth, 2) + Math.pow(yWidth, 2));
                        
                        if (this.lastZoomDistance !== null) {
                            let distanceDiff = (distance - this.lastZoomDistance) / 150;

                            let newScale = Math.min(Math.max(this.scale + distanceDiff, 1), 10);
                            const oldScale = this.scale;
                            this.scale = newScale;
                            console.log(this.scale);
                            this.animatedScale.setValue(this.scale);

                            const deltaScale = this.scale/oldScale;
                            this.lastPositionX -= (this.viewWidth/2) * deltaScale;
                            this.lastPositionY -= (this.viewHeight/2) * deltaScale;    
                            console.log(`lastXif: ${this.lastPositionX}`);
                            console.log(`lastYif: ${this.lastPositionY}`);  
                            console.log("View widthif: " + this.viewWidth);
                            console.log("View heightif: " + this.viewHeight);  
                            this.animatedPositionX.setValue(this.lastPositionX);
                            this.animatedPositionY.setValue(this.lastPositionY);
                        } else {
                            let xCenter = (touches[0].locationX + touches[1].locationX) /2;
                            let yCenter = (touches[0].locationY + touches[1].locationY) /2;
    
                            console.log(`xCenter: ${xCenter}`);
                            console.log(`yCenter: ${yCenter}`);
                            
                            console.log(`lastX: ${this.lastPositionX}`);
                            console.log(`lastY: ${this.lastPositionY}`);

                            this.lastPositionX = ((xCenter - this.lastPositionX) - this.viewWidth/2) * -1;
                            this.lastPositionY = ((yCenter - this.lastPositionY) - this.viewHeight/2) * -1;

                            console.log(`lastNewX: ${this.lastPositionX}`);
                            console.log(`lastNewY: ${this.lastPositionY}`);
                    
                            if (this.imageWidth * this.scale - this.viewWidth + this.lastPositionX <= 0) {
                                this.lastPositionX = this.viewWidth - (this.imageWidth * this.scale);
                            }
                            else if (this.lastPositionX > 0) {
                                this.lastPositionX = 0;
                            }
                            if (this.imageHeight * this.scale - this.viewHeight + this.lastPositionY <= 0) {
                                this.lastPositionY = this.viewHeight - (this.imageHeight * this.scale);
                            } 
                            else if (this.lastPositionY > 0) {
                                this.lastPositionY = 0;
                            }

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

    onPanResponderLayout(event) {
        var {x, y, width, height} = event.nativeEvent.layout;
        console.log("View width: " + width);
        console.log("View height" + height);
        this.viewWidth = width;
        this.viewHeight = height;
    }

    onImageLayout(event) {
        var {x, y, width, height} = event.nativeEvent.layout;
        console.log("Image width: " + width);
        console.log("Image height: " + height);
        this.imageWidth = width;
        this.imageHeight = height;
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
            <View onLayout={this.onPanResponderLayout.bind(this)} {...this.panResponder.panHandlers}>
                <Animated.View style={animationConfig} pointerEvents='none'>
                    <View style={styles.imageContainer} pointerEvents='none'>
                        <Image pointerEvents='none' onLayout={this.onImageLayout.bind(this)} source={require('../assets/image2.png')} style={styles.image}/>
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