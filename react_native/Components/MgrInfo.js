import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';



export default class MgrInfo extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
        role: '',
        mgr_fname: '',
        mgr_lname: '',
        mgr_email: '',
        mgr_phone: '',
    };
    
    this.checkEmpty = this.checkEmpty.bind(this);
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
    const role = navigation.getParam('role','none')
    

    
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
          placeholder="First Name"
          onChangeText={(mgr_fname) => this.setState({mgr_fname})}
          value={this.state.mgr_fname}
        />

        <TextInput
          style={styles.textBox}
          placeholder="Last Name"
          onChangeText={(mgr_lname) => this.setState({mgr_lname})}
          value={this.state.mgr_lname}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Email"          
          onChangeText={(mgr_email) => this.setState({mgr_email})}
          value={this.state.mgr_email}
        />
        
        <TextInput
          style={styles.textBox}
          placeholder="Phone num"
          onChangeText={(mgr_phone) => this.setState({mgr_phone})}
          value={this.state.mgr_phone}
        />        
        
          
       <Button 
        title = 'Club Info'
        onPress={() => {
            this.props.navigation.navigate('ClubInfo', {
                role: role,
                mgr_fname: this.state.mgr_fname,
                mgr_lname: this.state.mgr_lname,
                mgr_email: this.state.mgr_email,
                mgr_phone: this.state.mgr_phone,
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