import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';


export default class SignUp extends React.Component {

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
        country: ''
        
        
    };
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
          placeholder="Address"
          onChangeText={(addr) => this.setState({addr})}
          value={this.state.addr}
        />
            
        <TextInput
          style={styles.textBox}
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          value={this.state.city}
        />
            
        <TextInput
          style={styles.textBox}
          placeholder="country"
          onChangeText={(country) => this.setState({country})}
          value={this.state.country}
        />
            
            
        <TextInput
          style={styles.textBox}
          placeholder="Email: youremail@email.com"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          style={styles.textBox}
          placeholder="Phone Number: 000-000-0000"
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />

        <Button 
        title = 'Account Info'
        onPress={() => {
            this.props.navigation.navigate('AccountInfo', {
                role: role,
                fname: fname,
                lname: lname,
                gender: gender,
                dob: dob,
                addr: this.state.addr,
                height: height,
                weight: weight,
                addr: this.state.addr,
                email: this.state.email,
                phone: this.state.phone,
                city: this.state.city,
                country: this.state.country
                });
        }}/>

        
      
        
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
