import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        status: ''
    };
    this.Submit = this.Submit.bind(this);
    this.Validation = this.Validation.bind(this);
  }

  Submit(){
    fetch('Send login info endpoint', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
              'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.username,
      secondParam: this.state.password
    }),
  });
  }

  Validation(){
    submitInfo = this.Submit;
    fetch('receive response endpoint')
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.response == "200"){
        this.setState({status: true})
      }else{
        alert("User Name or Password Wrong")
        this.setState({status: false})
      }
    })
    .catch((error) => {
      console.error(error);
    });

    if(this.state.status == true){
      this.props.navigation.navigate('AthTest');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In Page</Text>
        <Text>User Name</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <Text>Password</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button title = 'Submit' onPress={onPress=this.Validation}/>
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
