import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GamePlayHeader from '../components/GamePlayHeader';
import GamePlayContainer from '../components/GamePlayContainer';
import StartGameScreen from '../screens/StartGameScreen';
import ImageScrollZoom from '../components/ImageScrollZoom';
import Menu from '../components/Menu';
import MenuText from '../components/MenuItemText';

const GamePlayScreen = props => {
    const apiRoot = 'https://project3-backend.herokuapp.com/time';
    const [bestSeconds, setBestSeconds] = useState(null);
    const [displayBest, setDisplayBest] = useState('00:00:00');
    const [menuVisible, setMenuVisible] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [visibleStatus, setVisibleStatus] = useState({
        start: 'visible',
        content: 'hidden'
    });
    const menuHandler = bool => {
        setMenuVisible(bool);
        toggleTimer();
    }
    const startHandler = bool => {
        setVisibleStatus({ start: 'hidden', content: 'visible' })
        toggleTimer();
    }
    const toggleTimer = () => {
        setTimerActive(!timerActive);
    }
    const endTimer = () => {
        setTimerActive(false);
    }
    const buildTime = num => {
        stringNum = String(num);
        return stringNum.length === 1 ? '0' + stringNum : stringNum;
    }

    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setTotalSeconds(totalSeconds => totalSeconds + 1);
            }, 1000);
        } else if (!timerActive && totalSeconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerActive, totalSeconds]);

    const buildDisplay = numSeconds => {
        let hours = buildTime(Math.floor(numSeconds / 3600));
        let minutes = buildTime(Math.floor((numSeconds - hours * 3600) / 60));
        let seconds = buildTime(numSeconds - (hours * 3600 + minutes * 60));
        let calcDisplayTime = `${hours}:${minutes}:${seconds}`;
        return calcDisplayTime;
    }
    let displayTime = buildDisplay(totalSeconds);

    const postNewTime = async () => {
        try {
            const response = await fetch(apiRoot, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    time: totalSeconds,
                    userId: props.user,
                    imageId: props.selectedImage
                })
            });
            if (bestSeconds === null) {
                props.buttonPress('newBest');
            } else if (bestSeconds > totalSeconds) {
                //new best
                props.buttonPress('newBest');
            } else {
                //win
                props.buttonPress('roundWon')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getBestTime = async () => {
        let imageId = props.selectedImage;
        try {
            let response = await fetch(
                `${apiRoot}/${imageId}`,
            );
            let responseJson = await response.json();
            if (responseJson === null) {
                console.log('error')
            }
            if (responseJson.length === 0) {
                const bestTime = null;
                setBestSeconds(bestTime);
            } else {
                const bestTime = responseJson[0].time;
                setBestSeconds(bestTime);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getBestTime();
    }, []);

    useEffect(() => {
        if (bestSeconds === null) {
            setDisplayBest('hide');
        } else {
            setDisplayBest(buildDisplay(bestSeconds));
        }
    }, [bestSeconds]);

    return (
        <View style={styles.container}>
            <View style={styles[visibleStatus.start]}>
                <StartGameScreen startPress={startHandler} buttonPress={props.buttonPress} visible={props.visible} user={props.userName} menuPress={props.menuPress} />
            </View>
            <View style={styles[visibleStatus.content]}>
                <GamePlayHeader bestTime={displayBest} currentTime={displayTime} menuToggle={menuHandler} headerToggle={true} visible={menuVisible} />
                <GamePlayContainer>
                    <ImageScrollZoom selectedImageId={props.selectedImage} source={props.selectedImageSrc} buttonPress={props.buttonPress} pageName='roundWon' toggleTimer={toggleTimer} endTimer={endTimer} postNewTime={postNewTime} bestTime={bestSeconds} />
                </GamePlayContainer>
                <Menu visible={menuVisible} buttonPress={props.buttonPress} menuToggle={menuHandler} visibleToggle={false} desiredButton='exit' paused={displayTime}>
                    <MenuText message="INSTRUCTIONS: Use your fingers to scroll and zoom around the image to find Brian. 
                    Gently double tap on Brian's face to stop the clock!" />
                </Menu>
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    hidden: {
        flex: 1,
        display: 'none'
    },
    visible: {
        flex: 1,
    }
});

export default GamePlayScreen;