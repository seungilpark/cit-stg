import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        fname: '',
        lname: '',
        gender: '',
        dob: '',
        addr: '',
        height: '',
        weight: '',
        email: '',
        phone: '',
        account: '',
        password: '',
        password1: '',
        city: '',
        country: '',
        alert: ''
    };
    this.Submit = this.Submit.bind(this);
    this.verPd = this.verPd.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
}

Submit(){
  checkEmpty = this.checkEmpty();
  console.log(checkEmpty);
  if(checkEmpty != false){
    checkPd = this.verPd();
    console.log(checkPd);
    if(checkPd == true){
      fetch('http://ec2-54-190-129-112.us-west-2.compute.amazonaws.com:8080/api', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          gender: this.state.gender,
          dob: this.state.dob,
          addr: this.state.addr,
          height: this.state.height,
          weight: this.state.weight,
          email: this.state.email,
          phone: this.state.phone,
          account: this.state.account,
          password: this.state.password,
          city: this.state.city,
          country: this.state.country
        }),
      });
      console.log("User Created.")
    }else{
      this.setState({
        alert: "Please confirm your password."
      })
    }
  }
}

verPd(){
  if (this.state.password == this.state.password1){
    return true;
  }else{
    return false;
  }
}

checkEmpty(){
  var i;
  for (i = 0; i < this.state.length; i++) {
    if(this.state[i] == ''){
      this.setState({alert: "Missing field(s)"});
      return false;
    }
  }
}



  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up Page</Text>
        <Text>{this.state.alert}</Text>
        <TextInput
          // style={{height: 40}}
          placeholder="First Name"
          onChangeText={(fname) => this.setState({fname})}
          value={this.state.fname}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Last Name"
          onChangeText={(lname) => this.setState({lname})}
          value={this.state.lname}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Gender"
          onChangeText={(gender) => this.setState({gender})}
          value={this.state.gender}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Date of birth"
          onChangeText={(dob) => this.setState({dob})}
          value={this.state.dob}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Address"
          onChangeText={(addr) => this.setState({addr})}
          value={this.state.addr}
        />
        <TextInput
          style={{height: 40}}
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          value={this.state.city}
        />
        <TextInput
          style={{height: 40}}
          placeholder="country"
          onChangeText={(country) => this.setState({country})}
          value={this.state.country}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Height"
          onChangeText={(height) => this.setState({height})}
          value={this.state.height}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Weight"
          onChangeText={(weight) => this.setState({weight})}
          value={this.state.weight}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Phone Number"
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Account Name"
          onChangeText={(account) => this.setState({account})}
          value={this.state.account}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your password again"
          onChangeText={(password1) => this.setState({password1})}
          value={this.state.password1}
        />
        <Button title = 'Submit' onPress={onPress=this.Submit}/>
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
