import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import StartGameScreen from '../screens/StartGameScreen';
import GamePlayScreen from '../screens/GamePlayScreen';

const FindAppNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    SignIn: {
        screen: SignInScreen
    },
    CreateAccount: CreateAccountScreen,
    StartGame: StartGameScreen,
    GamePlay: GamePlayScreen},
    {
    headerMode: 'none'
    }, 
    {transparentCard: true}, 
    
);

export default createAppContainer(FindAppNavigator);