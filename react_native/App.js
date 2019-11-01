import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import FirstPage from "./Components/FirstPage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import AthTest from "./Components/AthTest";
import ClubTest from "./Components/ClubTest";
import ProfilePageTest from "./Components/ProfilePageTest";
import AthlClubList from "./Components/AthlClubList";
import Profile from "./Components/Profile";

import ClubsCards from "./Components/ClubsCards";
import AccountType from './Components/AccountType';
import PersonalInfo from './Components/PersonalInfo';
import LocationInfo from './Components/LocationInfo';
import AccountInfo from './Components/AccountInfo';

// import ClubsCards from "./Components/ClubsCards"
import Card from "./Components/Card"

const RootStack = createStackNavigator(
  {
    FirstPage: {
      screen: FirstPage,
    },
    SignIn: {
      screen: SignIn,
    },
    AccountType: {
      screen: AccountType,
    },
    PersonalInfo: {
      screen: PersonalInfo,
    },
    LocationInfo: {
      screen: LocationInfo,
    },
    AccountInfo: {
      screen: AccountInfo,
    },
    AthTest: {
      screen: AthTest,
    },
    ClubTest: {
      screen: ClubTest,
    },
    ProfilePageTest: {
      screen: ProfilePageTest
    },
    AthlClubList: {
      screen: AthlClubList,
    },
    Profile:{
      screen:Profile,
    },
    Card: {
      screen: Card,
    }
  },
  {
    initialRouteName: "FirstPage",
    headermode: "none",
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

