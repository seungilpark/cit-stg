import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up Page</Text>
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
