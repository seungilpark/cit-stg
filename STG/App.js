import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {

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

  render(){
    return (
      <View style={styles.container}>
        <Button onPress={ ()=>this.retrieveData() } title=" Retrieve Data " />
        <Text>{this.state.dbResponse}</Text>
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

