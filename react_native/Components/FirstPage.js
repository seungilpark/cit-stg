import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class FirstPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the first page</Text>
        {/* <Text>{JSON.stringify(this.state.dbResponse)}</Text> */}

        <Button
        title = 'Sign In'
        onPress={() => {
            this.props.navigation.navigate('SignIn');
        }}/>

        <Button 
        title = 'Sign Up'
        onPress={() => {
            this.props.navigation.navigate('AccountType');
        }}/>

        <Button 
        title = 'Athlete Data Test'
        onPress={() => {
            this.props.navigation.navigate('AthTest');
        }}/>

        <Button 
        title = 'Club Data Test'
        onPress={() => {
            this.props.navigation.navigate('ClubTest');
        }}/>

        <Button 
        title = 'Profile Page Test'
        onPress={() => {
            this.props.navigation.navigate('ProfilePageTest');
        }}/>
        <Button
        title = 'Athlete Club List'
        onPress={() => {
            this.props.navigation.navigate('AthlClubList');
        }}/>
 
        <Button 
        title = 'Profile'
        onPress={() => {
            this.props.navigation.navigate('Profile');
        }}/>

        <Button 
        title = 'Cards'
        onPress={() => {
            this.props.navigation.navigate('Card');
        }}/>      
      </View>
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
