import React, {Component} from 'react';
import {View, Dimensions, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Font from 'expo-font';
import FindAppNavigator from './navigation/FindAppNavigator';

class App extends Component {
  state = {
    fontLoaded: false,
  }; 

  async componentDidMount() {
    await Font.loadAsync({
      'barlowCondensed': require('./assets/fonts/BarlowCondensed-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const {width} = Dimensions.get('window');
    const rem = width > 340 ? 18 : 17;
    EStyleSheet.build({
      $rem: rem,
    });

    return (
      <View style={styles.appContainer}>
        <ImageBackground source={require('./assets/gradientBackground.png')} style={styles.backgroundImage}>
      {this.state.fontLoaded ? (<FindAppNavigator style={styles.transparent}/>) : null}
      </ImageBackground>
      </View>
    )
}
}

const styles = EStyleSheet.create({
  appContainer: {
      flex: 1
    },
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    }
});

export default App;



// const {width} = Dimensions.get('window');
// const rem = width > 340 ? 18 : 17;
// EStyleSheet.build({
//   $rem: rem,
// });

// const fetchFonts = () => {
//   Font.loadAsync({
//     'barlowCondensed': require('./assets/fonts/BarlowCondensed-Regular.ttf')
//   });
// }

// export default function App() {


//   return (
        //<FindAppNavigator/>
//   );
// }

// const styles = EStyleSheet.create({
//   appContainer: {
//       flex: 1,
//       width: null,
//       height: null,
//       resizeMode: 'cover'
//     }
// });

// export default App;