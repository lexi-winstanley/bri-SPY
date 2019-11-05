import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GamePlayHeader from '../components/GamePlayHeader';
import GamePlayContainer from '../components/GamePlayContainer';

import ImageScrollZoom from '../components/ImageScrollZoom';
import Menu from '../components/Menu';
import MenuText from '../components/MenuItemText';

const GamePlayScreen = props => {
    const apiRoot = 'http://10.156.28.227:8080/time';
    const [menuVisible, setMenuVisible] = useState(false);
    const menuHandler = bool => {
        setMenuVisible(bool);
        toggleTimer();
    }
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const toggleTimer = () => {
        setTimerActive(!timerActive);
        console.log('timer started');
    }

    const endTimer = () => {
        setTimerActive(false);
        console.log('timer ended');
    }

    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!timerActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerActive, seconds]);

    postNewTime = () => {
        console.log('posted');
        fetch(apiRoot, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                time: seconds,
                userId: props.user,
                imageId: 1
            }),
        });
    }

    getBestTime = async () => {
        let imageId = 1;
        try {
            let response = await fetch(
                `${apiRoot}/${imageId}`,
            );
            let responseJson = await response.json();
            if (responseJson === null) {
                console.log('error')
            }
            console.log('get results: ' + seconds);
            console.log(responseJson[0].time);
            if (responseJson[0].time > seconds) {
                console.log('new best time');
                postNewTime(seconds);
                return true;
            } else {
                postNewTime(seconds);
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <GamePlayHeader bestTime='2:53' currentTime={seconds} menuToggle={menuHandler} headerToggle={true} visible={menuVisible} />
            <GamePlayContainer>
                <ImageScrollZoom source={require('../assets/ImageIcon.png')} buttonPress={props.buttonPress} pageName='roundWon' toggleTimer={toggleTimer} endTimer={endTimer} postNewTime={postNewTime} getBestTime={getBestTime} />
            </GamePlayContainer>
            <Menu visible={menuVisible} buttonPress={props.buttonPress} menuToggle={menuHandler} visibleToggle={false} desiredButton='exit'>
                <MenuText message='INSTRUCTIONS: Use your fingers to scroll and zoom around the image to find the hidden icon.' />
            </Menu>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1
    }
});

export default GamePlayScreen;