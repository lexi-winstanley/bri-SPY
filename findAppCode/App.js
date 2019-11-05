import React, { Component } from 'react';
import * as Google from 'expo-google-app-auth';
import { Dimensions, ImageBackground, SafeAreaView, Button, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

import WelcomeScreen from './screens/WelcomeScreen';
import ThumbnailScreen from './screens/ThumbnailScreen';
import StartGameScreen from './screens/StartGameScreen';
import GamePlayScreen from './screens/GamePlayScreen';
import WinScreen from './screens/WinScreen';
import NewBestScreen from './screens/NewBestScreen';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          signedIn: false, 
          name: '', 
          id: '',
          accessToken: '',
          photoUrl: '', 
          fontLoaded: false,
          page: 'welcome',
          imageId: 1
          }
    };

  async componentDidMount() {
    await Font.loadAsync({
      'barlowCondensed': require('./assets/fonts/BarlowCondensed-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  };

  apiRoot = 'http://10.156.28.227:8080/user';

  getUserInfo = async (userId) => {
    try {
      let response = await fetch(
        `${this.apiRoot}/${userId}`,
      );
      let responseJson = await response.json();
      if (responseJson === null) {
        this.postUserInfo(userId);
      }
      console.log(responseJson);
      return responseJson;  
    } catch (error) {
      console.error(error);
    }
  };

  postUserInfo = (stateId) => {
    console.log('i got called');
    fetch(this.apiRoot, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: stateId
      }),
    });
  };

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
          id: result.user.id,
          accessToken: result.accessToken,
          photoUrl: result.user.photoUrl
        });
        console.log(result);
        this.getUserInfo(result.user.id);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  signOut = async (pageName) => {
    console.log('hello');
    const config = {
      androidClientId: '581960141699-006fes5kkb1tfp6gte345sl6vd2eboqf.apps.googleusercontent.com',
      iosClientId: '581960141699-aptj7u212c0ggb15epfl9psmo0pvktog.apps.googleusercontent.com'
    };
//     const { type, accessToken } = await Google.logInAsync(config);

// if (type === 'success') {
//       /* Log-Out */
      await Google.logOutAsync({accessToken: this.state.accessToken, ...config });
      console.log('signed out');
      this.changeScreen(pageName);
      /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
// }
  };

  changeScreen = pageName => {
    this.setState({ page: pageName });
  };

  changeScreenImage = (pageName, id) => {
    this.setState({ page: pageName, imageId: id });
  };



  render() {
    const { width } = Dimensions.get('window');
    const rem = width > 340 ? 18 : 17;
    EStyleSheet.build({
      $rem: rem,
    });

    let content;
    switch (this.state.page) {
      case 'welcome':
        content = <GamePlayScreen buttonPress={this.changeScreen}/>;
        //content = <ThumbnailScreen buttonPress={this.changeScreenImage} user={this.state.name} menuPress={this.signOut} selectedImage={this.state.imageId}/>;
        // content = <StartGameScreen buttonPress={this.changeScreen} user={this.state.name} />;
        // if (this.state.signedIn === true) {
        //   content = <ThumbnailScreen buttonPress={this.changeScreen} user={this.state.name} menuPress={this.signOut}/>;
        // } else {
        //   content = <WelcomeScreen buttonPress={this.signIn} />;
        // }
        break;
      case 'startGame':
          content = <ThumbnailScreen buttonPress={this.changeScreenImage} user={this.state.name} menuPress={this.signOut} selectedImage={this.state.imageId}/>;
        // content = <StartGameScreen buttonPress={this.changeScreen} user={this.state.name} menuPress={this.signOut}/>;
        break;
      case 'gamePlay':
        content = <GamePlayScreen buttonPress={this.changeScreen} user={this.state.id} selectedImage={this.state.imageId}/>;
        break;
      case 'roundWon': 
        content = <WinScreen buttonPress={this.changeScreen} />;
        break;
      case 'newBest': 
        content = <NewBestScreen buttonPress={this.changeScreen} />;
        break;
    }

    return (
      <LinearGradient colors={['#680A4D', '#FC354C']} start={[0, .9]} end={[1, 0]} style={{ flex: 1 }}>
        {this.state.fontLoaded ? content : null}
      </LinearGradient>
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