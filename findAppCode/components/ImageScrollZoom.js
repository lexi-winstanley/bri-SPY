import React, {Component} from 'react';
import { View, Image, PanResponder, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import imageList from '../constants/images.js';

class ImageScrollZoom extends Component {
    constructor(props) {
        super(props);

        this.lastClickTime = 0;
        this.doubleClickThreshold = 250;
        this.scale = 1;
        this.animatedScale = new Animated.Value(this.scale);
        this.lastPositionX = 0;
        this.animatedPositionX = new Animated.Value(this.lastPositionX);
        this.lastPositionY = 0;
        this.animatedPositionY = new Animated.Value(0);
        this.lastZoomDistance = null;
        this.lastdx = 0;
        this.lastdy = 0;

        this.viewWidth = 0;
        this.viewHeight = 0;
        this.imageWidth = 0;
        this.imageHeight = 0;

        this.panResponder = null; 

        this.render.bind(this);
        this.onPanResponderLayout.bind(this);
        this.onImageLayout.bind(this);

        this.imageIndex = parseInt(this.props.selectedImageId) - 1;
        this.imageInfo = imageList.images[this.imageIndex];
        this.rawImageWidth = this.imageInfo.width;
        this.rawImageHeight = this.imageInfo.height;
        this.iconFromLeft = this.imageInfo.iconFromLeft;
        this.iconFromTop = this.imageInfo.iconFromTop;
        this.iconWidth = this.imageInfo.iconWidth;
        this.iconHeight = this.imageInfo.iconHeigth;

        // this.rawImageWidth = 1125;
        // this.rawImageHeight = 2031;
        // this.iconFromLeft = 203.5;
        // this.iconFromTop = 1950;
        // this.iconWidth = 12;
        // this.iconHeight = 14;
    }

    

    boundView() {
        console.log("X: " + this.lastPositionX)
        console.log("Y: " + this.lastPositionY)

        if (this.lastPositionX >= this.viewWidth/2 * (this.scale - 1)) {
            this.lastPositionX = this.viewWidth/2 * (this.scale - 1);
            console.log("Limit X < min");
        } else if (this.lastPositionX < this.viewWidth + (this.viewWidth/2 * (this.scale - 1)) - (this.scale * this.imageWidth)) {
            this.lastPositionX = this.viewWidth + (this.viewWidth/2 * (this.scale - 1)) - (this.scale * this.imageWidth);
            console.log("Limit X > max");
        }

        if (this.lastPositionY >= this.viewHeight/2 * (this.scale - 1)) {
            this.lastPositionY = this.viewHeight/2 * (this.scale - 1);
            console.log("Limit Y < min");
        } else if (this.lastPositionY < this.viewHeight + (this.viewHeight/2 * (this.scale - 1)) - (this.scale * this.imageHeight)) {
            this.lastPositionY = this.viewHeight + (this.viewHeight/2 * (this.scale - 1)) - (this.scale * this.imageHeight);
            console.log("Limit Y > max");
        }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create(
            {
                onStartShouldSetPanResponder: () => true,
                onPanResponderTerminationRequest: () => false,
                onPanResponderGrant: (evt) => {
                    let numChangedTouches = evt.nativeEvent.changedTouches.length;
                    console.log(evt.nativeEvent);

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
                    this.lastdx = 0;
                    this.lastdy = 0;

                    if (numChangedTouches === 1) {
                        const touchX = evt.nativeEvent.locationX;
                        const touchY = evt.nativeEvent.locationY;
                        
                        let rawImageAspectRatio = this.rawImageHeight / this.rawImageWidth;
                        let renderedContainerAspectRatio = this.viewHeight / this.viewWidth;

                        let baseScale = 1;
                        let barSizeX = 0, barSizeY = 0;
                        if (renderedContainerAspectRatio > rawImageAspectRatio) {
                            // Bars on the top.

                            let renderedHeight = this.viewWidth * rawImageAspectRatio;
                            barSizeY = this.scale * (this.viewHeight - renderedHeight) / 2;
                            baseScale = this.rawImageWidth / this.viewWidth;
                        } else {
                            // Bars on the sides.

                            let renderedWidth = this.viewHeight / rawImageAspectRatio;
                            barSizeX = this.scale * (this.viewWidth - renderedWidth) / 2;
                            baseScale = this.rawImageHeight / this.viewHeight;
                        }


                        let minX = this.viewWidth/2 * (this.scale - 1);
                        let minY = this.viewHeight/2 * (this.scale - 1)
                        
                        let imageTouchedX = (minX - this.lastPositionX) + (touchX - barSizeX);
                        let imageTouchedY = (minY - this.lastPositionY) + (touchY - barSizeY);

                        if (new Date().getTime() - this.lastClickTime < 250) {
                            console.log(`double click!`);
                            console.log(`baseScale: ${baseScale} barSizeY: ${barSizeY} barSizeX: ${barSizeX}`)
                            console.log(`xPos: ${this.lastPositionX} yPos: ${this.lastPositionY}`)
                            console.log(`minX: ${minX} minY: ${minY}`)
                            console.log(`doubleTouchX: ${evt.nativeEvent.locationX} doubleTouchY: ${evt.nativeEvent.locationY}`);
                            console.log(`Real Touch X: ${imageTouchedX} Y: ${imageTouchedY}`)
                            console.log(`barX: ${barSizeX}`);
                            console.log(`barY: ${barSizeY}`);
                            console.log(`bounding: ${this.viewWidth/2 * (this.scale - 1)}`);
                            let allowedErrorX =  50* this.scale / this.iconWidth;
                            let allowedErrorY = 50 * this.scale / this.iconHeight;

                            console.log(`dx: ${Math.abs(this.iconFromLeft * this.scale/baseScale - imageTouchedX)} dy: ${Math.abs(this.iconFromTop * this.scale/baseScale - imageTouchedY)}`)
                            console.log(`maxErrorX: ${allowedErrorX} maxErrorY: ${allowedErrorY}`)
                            if (Math.abs(this.iconFromLeft * this.scale/baseScale - imageTouchedX) < allowedErrorX && Math.abs(this.iconFromTop * this.scale/baseScale - imageTouchedY) < allowedErrorY) {
                                console.log(`doubleTouchX: ${touchX} doubleTouchY: ${touchY}`);
                                console.log('icon found');
                                console.log(this.props);
                                this.props.endTimer();
                                // this.props.buttonPress(this.props.pageName);
                                this.props.postNewTime();
                            }
                        }
                    }
                    this.lastClickTime = new Date().getTime();
                },
                onPanResponderMove: (evt, gestureState) => {
                    let numChangedTouches = evt.nativeEvent.changedTouches.length;
                    if (numChangedTouches === 1) {
                        this.lastPositionX += (gestureState.dx - this.lastdx);
                        this.lastPositionY += (gestureState.dy - this.lastdy);
                        this.lastdx = gestureState.dx;
                        this.lastdy = gestureState.dy;
                        this.boundView.bind(this)();
                        this.animatedPositionX.setValue(this.lastPositionX);
                        this.animatedPositionY.setValue(this.lastPositionY);
                    
                    } else if (numChangedTouches === 2) {
                        let touches = evt.nativeEvent.changedTouches;

                        let xWidth = Math.abs(touches[0].locationX - touches[1].locationX);
                        let yWidth = Math.abs(touches[0].locationY - touches[1].locationY);
                        let distance = Math.sqrt(Math.pow(xWidth, 2) + Math.pow(yWidth, 2));
                        
                        if (this.lastZoomDistance !== null) {
                            let distanceDiff = (distance - this.lastZoomDistance) / 150;

                            let newScale = Math.min(Math.max(this.scale + distanceDiff, 1), 5);
                            const oldScale = this.scale;
                            this.scale = newScale;
                            console.log(this.scale);
                            this.animatedScale.setValue(this.scale);

                            const deltaScale = this.scale/oldScale;
                            this.lastPositionX *= deltaScale;
                            this.lastPositionY *= deltaScale;    
                            this.boundView.bind(this)();
                            console.log(`lastXif: ${this.lastPositionX}`);
                            console.log(`lastYif: ${this.lastPositionY}`);  
                            console.log("View widthif: " + this.viewWidth);
                            console.log("View heightif: " + this.viewHeight);  
                            this.animatedPositionX.setValue(this.lastPositionX);
                            this.animatedPositionY.setValue(this.lastPositionY);
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
        this.props.toggleTimer();
        console.log(this.imageInfo);
    }

    

    render() {
        const animationTranslateConfig = {
            transform: [
                {
                    translateX: this.animatedPositionX
                },
                {
                    translateY: this.animatedPositionY
                },
                {
                    scale: this.animatedScale
                },
            ],
            width: "100%",
            height: '100%'
        };
        const animationScaleConfig = {
            width: "100%",
            height: '100%'
        };
        return (
            <View onLayout={this.onPanResponderLayout.bind(this)} style={styles.viewContainer} {...this.panResponder.panHandlers}>
                <Animated.View style={animationTranslateConfig} pointerEvents='none' renderToHardwareTextureAndroid>
                    <View style={styles.imageContainer} pointerEvents='none'>
                        <Image resizeMode="contain" pointerEvents='none' onLayout={this.onImageLayout.bind(this)} source={this.props.source} style={styles.image}/>
                    </View>
                </Animated.View>
            </View>
    
        )
    }
}


const styles = EStyleSheet.create({
    viewContainer: {
        width: "100%",
        height: '100%'

    },
    imageContainer: {
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});

export default ImageScrollZoom;    