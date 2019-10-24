import React, {Component} from 'react';
import {Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Font from 'expo-font';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import StartGameScreen from './screens/StartGameScreen';
import GamePlayScreen from './screens/GamePlayScreen';

class App extends Component {
  state = {
    fontLoaded: false,
    page: 'welcome',
    username: '',
    password: ''
  }; 

  async componentDidMount() {
    await Font.loadAsync({
      'barlowCondensed': require('./assets/fonts/BarlowCondensed-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  };

  changeScreen = pageName => {
    this.setState({page: pageName});
  }

  inputSubmitted = (pageName, enteredUsername, enteredPassword) => {
    this.setState({page: pageName, username: enteredUsername, password: enteredPassword});
    console.log(this.state.username); 
    console.log(this.state.password); 
  }

  render() {
    const {width} = Dimensions.get('window');
    const rem = width > 340 ? 18 : 17;
    EStyleSheet.build({
      $rem: rem,
    });

    let content;
    switch (this.state.page) {
      case 'welcome': 
      content = <WelcomeScreen buttonPress={this.changeScreen}/>;
      break;
      case 'signIn': 
      content = <SignInScreen buttonPress={this.inputSubmitted}/>;
      break;
      case 'createAccount': 
      content = <CreateAccountScreen buttonPress={this.inputSubmitted}/>;
      break;
      case 'startGame': 
      content = <StartGameScreen buttonPress={this.changeScreen} user={this.state.username}/>;
      break;
      case 'gamePlay': 
      content = <GamePlayScreen buttonPress={this.changeScreen}/>;
      break;
    }

    return (
      <ImageBackground source={require('./assets/gradientBackground.png')} style={styles.backgroundImage}>
          {this.state.fontLoaded ? content : null}
      </ImageBackground>
    )
}
}

const styles = EStyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    }, 
    safeArea: {
      flex: 1,
      backgroundColor: 'rgba(52, 52, 52, 0)'
    }
});

export default App;