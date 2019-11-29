import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, Alert, alertMessage } from 'react-native';
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
        valid: false,
        fvalid: false,
        lvalid: false,
        evalid: false,
        pvalid: false

    };
    
}



async CheckPage(){
  const { navigation } = this.props
  const role = navigation.getParam('role','mgr')


  while(this.state.valid == false){
    await this.checkEmptyFname()
    if(this.state.fvalid == false){
      break;
    }
    await this.checkEmptyLname()
    if(this.state.lvalid == false){
      break;
    }
    await this.checkEmptyEmail()
    if(this.state.evalid == false){
      break;
    }
    await this.checkEmptyPhone()
    if(this.state.pvalid == false){
      break;
    }
  
    this.setState({valid: true})
    }
  
  


if(this.state.valid == true) {
  this.props.navigation.navigate('ClubInfo', {
    role: role,
    mgr_fname: this.state.mgr_fname,
    mgr_lname: this.state.mgr_lname,
    mgr_email: this.state.mgr_email,
    mgr_phone: this.state.mgr_phone});
}
}



checkEmptyFname(){
  if(this.state.mgr_fname == ''){
  
    Alert.alert('First name cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({fvalid: false})},
  ])
}
else{
  this.setState({fvalid: true})
}
}

checkEmptyLname(){
if(this.state.mgr_lname == ''){

  Alert.alert('Last name cannot be empty', alertMessage, [

    {text: 'OK', onPress: () => this.setState({lvalid: false})},
])
}
else{
this.setState({lvalid: true})
}
}

checkEmptyEmail(){
  if(this.state.mgr_email == ''){
  
    Alert.alert('Email cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({evalid: false})},
  ])
}
else{
  this.setState({evalid: true})
}
}


checkEmptyPhone(){

  var regEx = /^\d{3}-\d{3}-\d{4}$/;
  if(this.state.mgr_phone == ''){
  
    Alert.alert('Must enter Phone number cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({pvalid: false})},
  ])
} else if(!regEx.test(this.state.mgr_phone)){
  Alert.alert('Number must be in xxx-xxx-xxxx format', alertMessage, [

    {text: 'OK', onPress: () => this.setState({pvalid: false})},
])

} else{
  this.setState({pvalid: true})
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
        <Text  style={styles.pageText}>MANAGER INFO</Text>
        <Text>{this.state.alert}</Text>

        <TextInput
          style={styles.placeHolderText}
          placeholder="First Name"
          onChangeText={(mgr_fname) => this.setState({mgr_fname})}
          value={this.state.mgr_fname}
        />

        <TextInput
          style={styles.placeHolderText}
          placeholder="Last Name"
          onChangeText={(mgr_lname) => this.setState({mgr_lname})}
          value={this.state.mgr_lname}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Email"          
          onChangeText={(mgr_email) => this.setState({mgr_email})}
          value={this.state.mgr_email}
        />
        
        <TextInput
          style={styles.placeHolderText}
          placeholder="Phone number: xxx-xxx-xxxx"
          onChangeText={(mgr_phone) => this.setState({mgr_phone})}
          value={this.state.mgr_phone}
        />        
        
          

        <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.CheckPage()}
                    >
                        <Text style={styles.btnText}> CLUB INFO </Text>
                </TouchableHighlight> 
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
    placeHolderText: {
      // position: "relative",
      // bottom: "25%",
      backgroundColor: "white",
      alignContent: "center",
      height: "4%",
      width: 300,
      fontSize: 18,
      borderBottomWidth: 1,
      marginBottom: 20,
      borderColor: "#C4C4C4",
      opacity: 1,
      color: "black"
    },
    button: {
      opacity: 0.7,
      backgroundColor: "#6ED2F2",
      width: "90%",
      padding: 14,
      marginTop: 9,
      borderRadius: 2
    },
    pageText: {
      // position: "relative",
      // bottom: "25%",
      // backgroundColor: "#ffbf00",
      marginBottom: 90,
      color: "#6ED2F2",
      fontSize: 32,
      alignItems: "center",
      padding: 4,
      marginTop: 10,
    },
    btnText: {
      fontSize: 24,
      opacity: 1,
      color: "#fff",
    },
    
});