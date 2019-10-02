import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import FirstPage from "./Components/FirstPage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";


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
    }
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

