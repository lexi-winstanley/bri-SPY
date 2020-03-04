# bri-SPY
[Back End Repository](https://github.com/lexi-winstanley/bri-SPYBackEnd)

## Motivation 
To begin learning React Native and create a mobile game that would feature beautiful images and be low stress and fun to play.

## Summary
bri-SPY is a "Where's Waldo?" inspired React Native mobile game in which users pinch-to-zoom and pan to find the hidden character, Brian, then double tap to stop the clock and store their time. If their time beats the stored "Best Time" for that image they are notified. 

## Details
After the application loads the user is presented with a sign-in screen powered by Google Authentication, once the user successfully signs in an API call is made to the backend to check if the user exists in the MongoDB database. If they already exist their information is returned to personalize the user's display and allow for storage of their image solve times. If the user does not exist in the database their information is stored. The user can then choose from the library of images and begin playing. Once they click an image and press the "Start" button, a timer begins and the user can pinch-to-zoom and pan around the image in order to find the hidden icon. Once they find the icon they double tap which stops the timer and another API call is made to determine if they have beat the stored best time for that specific image. The user is alerted on the next screen if they achieved a new best time and is presented with the option to return to the image library or continue to the next image. The application also features a menu which opens as an overlay and pauses the timer during game play or allows users the option to exit their current image and return to the main screen where they can chose to sign out. 

## Future Development
Continue developing the component which handles pinch-to-zoom, pan and double tap actions during game play to create a smoother experience. Also explore options to create a higher resolution icon without sacrificing background image quality and decrease loading times for images. Allow users the option to create game specific usernames and create leaderboards. Add optional background music and sound effects. Continuing polishing with goal to release on Google Play Store and Apple App Store.

## Role
Technical lead of a three person development team. Collaborated with team members regarding application functionality and design. Helped team members as needed to deliver integration with Google Authentication, timer functionality and was responsible for all other code including the backend as well as styling to comply agreed upon design. Also created custom component to handle pinch-to-zoom, pan and double tap actions during game play. 

## Additional Collaborators
[Edouard Angus-DePaolo](https://github.com/edepaolo)
<br/>[Saranda Sharpe](https://github.com/annda7)

## Technologies
HTML
<br/>CSS
<br/>React Native
<br/>Expo
<br/>JavaScript
<br/>MongoDB
<br/>Mongoose
<br/>Node.js
<br/>Express
<br/>Heroku
<br/>**Node Packages:** 
<br/>expo-font, expo-google-app-auth, expo-linear-gradient, react-native-extended stylesheet, react-native-gesture-handler, react-native-reanimated
