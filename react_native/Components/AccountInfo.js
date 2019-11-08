import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';


export default class AccountInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        role: '',
        fname: '',
        lname: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        addr: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        account: '',
        password: '',
        password1: ''
        
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
    if(checkPd == true && this.state.role === 'ath'){
      fetch('http://192.168.0.106:8080/api/athletes/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          athl_fname: this.state.fname,
          athl_lname: this.state.lname,
          athl_gender: this.state.gender,
          athl_dob: this.state.dob,
          athl_addr: this.state.addr,
          athl_height: this.state.height,
          athl_weight: this.state.weight,
          athl_email: this.state.email,
          athl_phone: this.state.phone,
          account: this.state.account,
          password: this.state.password,
          city: this.state.city,
          country: this.state.country
        }),
      });
      console.log("Athlete Created.")
    }
    else if(checkPd == true && this.state.role === 'mgr'){
      fetch('http://172.20.10.3:8080/api/clubMgrs/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mgr_fname: this.state.fname,
          mgr_lname: this.state.lname,
          // athl_gender: this.state.gender,
          // athl_dob: this.state.dob,
          // addr: this.state.addr,
          // athl_height: this.state.height,
          // athl_weight: this.state.weight,
          mgr_email: this.state.email,
          mgr_phone: this.state.phone,
          mgr_account: this.state.account,
          mgr_password: this.state.password,
          // city: this.state.city,
          // country: this.state.country
        }),
      });
      console.log("Manager Created.")
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


    const { navigation } = this.props
    const role = navigation.getParam('role','ath')
    const fname = navigation.getParam('fname', 'none')
    const lname = navigation.getParam('lname', 'none')
    const gender = navigation.getParam('gender', 'none')
    const dob = navigation.getParam('dob', 'none')
    const height = navigation.getParam('height', 'none')
    const weight = navigation.getParam('weight', 'none')
    const addr = navigation.getParam('addr', 'none')
    const email = navigation.getParam('email', 'none')
    const phone = navigation.getParam('phone', 'none')
    const city = navigation.getParam('city', 'none')
    const country = navigation.getParam('country', 'none')


    
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <ScrollView>
        <Text>Sign Up Page</Text>
        <Text>{this.state.alert}</Text>     
            
         
        <TextInput
          style={styles.textBox}
          placeholder="Account Name"
          onChangeText={(account) => this.setState({account})}
          value={this.state.account}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Enter your password again"
          onChangeText={(password1) => this.setState({password1})}
          value={this.state.password1}
        />

        <Button title = 'Submit' onPress={() => this.props.navigation.navigate("Card")}/>
        
        </ScrollView>
        </KeyboardAvoidingView>
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
  textBox: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 2
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
});
