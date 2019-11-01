import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        role: 'ath',
        username: '',
        password: '',
        status: ''
    };
    this.Submit = this.Submit.bind(this);
    this.Validation = this.Validation.bind(this);
  }

  // let data = {
  //   method: 'POST',
  //   credentials: 'same-origin',
  //   mode: 'same-origin',
  //   body: JSON.stringify({
  //     appoid: appo_id
  //   }),
  //   headers: {
  //     'Accept':       'application/json',
  //     'Content-Type': 'application/json',
  //     'X-CSRFToken':  cookie.load('csrftoken')
  //   }
  // }
  // return fetch('/appointments/get_appos', data)
  //         .then(response => response.json())  // promise
  //         .then(json => dispatch(receiveAppos(json)))
  // }

  Submit(){
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          account: this.state.username,
          password: this.state.password
        })
    };
    if(this.state.role === 'ath'){
      return fetch('http://54.191.100.200:8080/api/athletes/signin', data);
    }else{
      return fetch('http://54.191.100.200:8080/api/clubMgrs/signin', data);
    }
  }

  Validation(){
    this.Submit().then((response) => {
      console.log(response.status);
      if(response.status === 203){
        console.log('logged in');
        this.setState({
          status: 'loggedIn'
        })
      }else{
        this.setState({
          status: 'forbidden'
        })
      }
      if(this.state.status == 'loggedIn'){
        this.props.navigation.navigate('AthTest');
      }else{
        alert('Wrong Username or Password');
      }
      // console.log(result);
  });
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

        <Picker
          selectedValue={this.state.role}
          style={{height: 30, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({role: itemValue})
          }>
          <Picker.Item label="Athlete" value="ath" />
          <Picker.Item label="Club Manager" value="mgr" />
          
        </Picker>

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
