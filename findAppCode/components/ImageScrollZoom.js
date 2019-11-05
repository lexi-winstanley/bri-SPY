import React, {Component} from 'react';
import { View, Image, ScrollView, PanResponder, PanResponderInstance, Animated} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import EStyleSheet from 'react-native-extended-stylesheet';

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

        this.rawImageWidth = 1125;
        this.rawImageHeight = 2031;
        this.iconFromLeft = 195;
        this.iconFromBottom = 76;
        this.iconFromTop = 1941;
        this.iconWidth = 12;
        this.iconHeight = 14;
    }

    boundView() {
        console.log("X: " + this.lastPositionX)
        console.log("Y: " + this.lastPositionY)
        let borderWidth = 1;
        // console.log(((this.viewWidth / (2 * this.scale) - (this.imageWidth * this.scale / 2)) / this.scale) + (borderWidth * 3 * this.scale))

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
                        //should this be locationX/Y?
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
                        const aspectX = this.viewWidth / this.rawImageWidth;
                        const aspectY = this.viewHeight / this.rawImageHeight;
                        let barWidthX = 0;
                        let barWidthY = 0;
                        let renderedAspect; 
                        if (aspectX === aspectY) {
                            //no bars
                            barWidthX = 0;
                            barWidthY = 0; 
                            renderedAspect = aspectX;
                        } else if (aspectX < aspectY) {
                            //bars on top/bottom
                            barWidthY = (this.viewHeight - (this.rawImageHeight * aspectX))/2
                            renderedAspect = aspectX;
                        }else if (aspectX > aspectY) {
                            //bars on right/left
                            barWidthX = (this.viewWidth - (this.rawImageWidth * aspectY))/2
                            renderedAspect = aspectY;
                        }
                   
                        if (new Date().getTime() - this.lastClickTime < 250) {
                            console.log(`double click!`);
                            console.log(`doubleTouchX: ${evt.nativeEvent.locationX} doubleTouchY: ${evt.nativeEvent.locationY}`);
                            console.log(`renderedAspect: ${renderedAspect}`);
                            console.log(`barX: ${barWidthX}`);
                            console.log(`barY: ${barWidthY}`);
                            console.log(`bounding: ${this.viewWidth/2 * (this.scale - 1)}`);
                            let conditionX = this.iconFromLeft * renderedAspect * this.scale + (barWidthX * this.scale);
                            let allowedErrorX = this.iconWidth * 1/this.scale;
                            console.log('scale: ' + this.scale);
                            console.log('conditionX: ' + conditionX);
                            console.log(conditionX - allowedErrorX);
                            console.log(conditionX + allowedErrorX);

                            let conditionY = this.iconFromTop * renderedAspect * this.scale + (barWidthY * this.scale);
                            let allowedErrorY = this.iconHeight * 1/this.scale;
                            console.log('scale: ' + this.scale);
                            console.log('conditionY: ' + conditionY);
                            console.log(conditionY - allowedErrorY);
                            console.log(conditionY + allowedErrorY);
                
                            if (conditionX - allowedErrorX < touchX < conditionX + allowedErrorX) {
                                console.log(`doubleTouchX: ${touchX} doubleTouchY: ${touchY}`);
                                console.log(`condition: ${conditionX}`);
                                console.log('icon found');
                                console.log(this.props);
                                this.props.endTimer();
                                checkBest = async () => {
                                    const newBest = await this.props.getBestTime();
                                    if (newBest === true) {
                                        this.props.buttonPress('newBest');
                                    } else {
                                        this.props.buttonPress(this.props.pageName);
                                    } 
                                }
                            }
                        }
                    }
                    this.lastClickTime = new Date().getTime();
                },
                onPanResponderMove: (evt, gestureState) => {
                    let numChangedTouches = evt.nativeEvent.changedTouches.length;
                    if (numChangedTouches === 1) {
                        // let diffX = gestureState.dx - this.lastPositionX;
                        // let diffY = gestureState.dy - this.lastPositionY;
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
                        <Image resizeMode="contain" pointerEvents='none' onLayout={this.onImageLayout.bind(this)} source={require('../assets/ImageIcon.png')} style={styles.image}/>
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