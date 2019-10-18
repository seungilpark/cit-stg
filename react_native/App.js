import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import FirstPage from "./Components/FirstPage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import AthTest from "./Components/AthTest";
import ClubTest from "./Components/ClubTest";
import Profile from "./Components/Profile";
import ClubsCards from "./Components/ClubsCards"

const RootStack = createStackNavigator(
  {
    FirstPage: {
      screen: FirstPage,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    AthTest: {
      screen: AthTest,
    },
    ClubTest: {
      screen: ClubTest,
    },
    Profile:{
      screen:Profile,
    },

  },
  {
    initialRouteName: "FirstPage",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);


export default class App extends React.Component {

  render(){
    return (
      <AppContainer />
    );
  }  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

