import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBhEMxR3qGSEN6u-MxaUjKbxAM6W6udUW8",
  authDomain: "alwaysproductive-df87c.firebaseapp.com",
  databaseURL: "https://alwaysproductive-df87c.firebaseio.com",
  projectId: "alwaysproductive-df87c",
  storageBucket: "alwaysproductive-df87c.appspot.com",
  messagingSenderId: "478161939233",
  appId: "1:478161939233:web:644a4b2c5afb39ef4a6c60"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)