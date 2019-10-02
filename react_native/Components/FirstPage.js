import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class FirstPage extends React.Component {

    constructor() {
        super();
        this.state = {
            dbResponse: ""
        }
        }

    retrieveData = () => {
        fetch('http://18.236.181.191:8080')
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            dbResponse: JSON.stringify(responseJson)
        })
        console.log(responseJson);
        })
        .catch((error) => {
        console.error(error);
        });
    }


  render() {
    return (
      <View style={styles.container}>
        <Text>This is the first page</Text>
        <Text>{JSON.stringify(this.state.dbResponse)}</Text>

        <Button
        title = 'Sign In'
        onPress={() => {
            this.props.navigation.navigate('SignIn');
        }}/>

        <Button 
        title = 'Sign Up'
        onPress={() => {
            this.props.navigation.navigate('SignUp');
            console.log("g");
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
