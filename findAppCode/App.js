import React, { Component } from 'react';
import * as Google from 'expo-google-app-auth';
import { Dimensions, ImageBackground, SafeAreaView, Button, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

import CustomButton from './components/CustomButton';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import StartGameScreen from './screens/StartGameScreen';
import GamePlayScreen from './screens/GamePlayScreen';
import WinScreen from './screens/WinScreen';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          signedIn: false, 
          name: "", 
          photoUrl: "", 
          fontLoaded: false,
          page: 'welcome',
          username: '',
          password: ''}
    };

  async componentDidMount() {
    await Font.loadAsync({
      'barlowCondensed': require('./assets/fonts/BarlowCondensed-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  };

  apiRoot = 'http://192.168.1.18:8080/user';

  getUserInfo = async () => {
    try {
      let response = await fetch(
        this.apiRoot,
      );
      let responseJson = await response.json();
      return responseJson;
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  postUserInfo = (userName) => {
    console.log('i got called');
    fetch(this.apiRoot, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName
      }),
    });
  }



  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '581960141699-006fes5kkb1tfp6gte345sl6vd2eboqf.apps.googleusercontent.com',
        iosClientId: '581960141699-aptj7u212c0ggb15epfl9psmo0pvktog.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
        console.log(result);
        this.postUserInfo(result.user.name);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
}


  changeScreen = pageName => {
    this.setState({ page: pageName });
  }

  // inputSubmitted = (pageName, enteredUsername, enteredPassword) => {
  //   this.setState({ page: pageName, username: enteredUsername, password: enteredPassword });
  //   console.log(this.state.username);
  //   console.log(this.state.password);
  // }

  render() {
    const { width } = Dimensions.get('window');
    const rem = width > 340 ? 18 : 17;
    EStyleSheet.build({
      $rem: rem,
    });

    let content;
    switch (this.state.page) {
      case 'welcome':
        // content = <GamePlayScreen buttonPress={this.changeScreen}/>;
        if (this.state.signedIn === true) {
          content = <StartGameScreen buttonPress={this.changeScreen} user={this.state.name} />;
        } else {
          content = <WelcomeScreen buttonPress={this.signIn} />;
        }
        break;
      // case 'signIn':
      //   content = <SignInScreen buttonPress={this.inputSubmitted} />;
      //   break;
      // case 'createAccount':
      //   content = <CreateAccountScreen buttonPress={this.inputSubmitted} />;
      //   break;
      case 'startGame':
        content = <StartGameScreen buttonPress={this.changeScreen} user={this.state.name} />;
        break;
      case 'gamePlay':
        content = <GamePlayScreen buttonPress={this.changeScreen} />;
        break;
      case 'roundWon': 
        content = <WinScreen buttonPress={this.changeScreen} />;
        break;
    }

    return (
      <LinearGradient colors={['#680A4D', '#FC354C']} start={[0, .9]} end={[1, 0]} style={{ flex: 1 }}>
        {this.state.fontLoaded ? content : null}
      </LinearGradient>
      // <ImageBackground source={require('./assets/gradientBackground.png')} style={styles.backgroundImage}>
      // {this.state.fontLoaded ? content : null}      
      // </ImageBackground>
    )
  }
}

const styles = EStyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

export default App;