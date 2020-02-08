import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import GoalsScreen from './screens/GoalsScreen'
import AddScreen from './screens/AddScreen'
import AlarmScreen from './screens/AlarmScreen'
import ProfileScreen from './screens/ProfileScreen'


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

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor} />
      }
    },
    Goals: {
      screen: GoalsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-today" size={24} color={tintColor} />
      }
    },
    Add: {
      screen: AddScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons 
            name="ios-add-circle" 
            size= {36} 
            color= "#E9446A" 
            style={{
              shadowColor: "#E9446A",
              shadowOffset: { width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3 }
            }}
            />
        )
      }
    },
    Alarm: {
      screen: AlarmScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-alarm" size={24} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor} />
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveColor: "#B8BBC4",
      showLabel: false
    }
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)