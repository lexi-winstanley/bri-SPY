import React, { Component } from 'react';
import * as Google from 'expo-google-app-auth';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

import WelcomeScreen from './screens/WelcomeScreen';
import ThumbnailScreen from './screens/ThumbnailScreen';
import GamePlayScreen from './screens/GamePlayScreen';
import WinScreen from './screens/WinScreen';
import NewBestScreen from './screens/NewBestScreen';

import imageList from './constants/images';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: '',
      id: '',
      accessToken: '',
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

  apiRoot = 'https://project3-backend.herokuapp.com/user';
  numImages = imageList.images.length;

  getUserInfo = async (userId) => {
    try {
      let response = await fetch(
        `${this.apiRoot}/${userId}`,
      );
      let responseJson = await response.json();
      if (responseJson === null) {
        this.postUserInfo(userId);
      }
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  postUserInfo = (stateId) => {
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
          page: 'thumbnail'
        });
        this.getUserInfo(result.user.id);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  signOut = async (pageName) => {
    const config = {
      androidClientId: '581960141699-006fes5kkb1tfp6gte345sl6vd2eboqf.apps.googleusercontent.com',
      iosClientId: '581960141699-aptj7u212c0ggb15epfl9psmo0pvktog.apps.googleusercontent.com'
    };
    await Google.logOutAsync({ accessToken: this.state.accessToken, ...config });
    this.setState({ signedIn: false, name: '', id: '', accessToken: '' });
    this.changeScreen('welcome');
  };

  changeScreen = pageName => {
    this.setState({ page: pageName });
  };

  changeScreenImage = (pageName, id) => {
    this.setState({ page: pageName, imageId: id });
  };

  changeScreenNext = (pageName) => {
    let id = this.state.imageId;
    let nextId;
    if (id < this.numImages) {
      nextId = parseInt(id) + 1;
    } else {
      nextId = 1;
    }
    this.setState({ page: pageName, imageId: nextId });
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
        if (this.state.signedIn === true) {
          content = <ThumbnailScreen buttonPress={this.changeScreen} user={this.state.name} menuPress={this.signOut} />;
        } else {
          content = <WelcomeScreen buttonPress={this.signIn} />;
        }
        break;
      case 'thumbnail':
        content = <ThumbnailScreen buttonPress={this.changeScreenImage} user={this.state.name} menuPress={this.signOut} />;
        break;
      case 'gamePlay':
        content = <GamePlayScreen menuPress={this.signOut} buttonPress={this.changeScreen} user={this.state.id} userName={this.state.name} selectedImage={this.state.imageId} selectedImageSrc={imageList.images[this.state.imageId - 1].source} />;
        break;
      case 'roundWon':
        content = <WinScreen buttonPress={this.changeScreenNext} />;
        break;
      case 'newBest':
        content = <NewBestScreen buttonPress={this.changeScreenNext} />;
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