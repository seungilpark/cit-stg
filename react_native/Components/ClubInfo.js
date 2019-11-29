import React from 'react';
import { StyleSheet,TouchableHighlight, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, Alert, alertMessage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
// import { ScrollView } from 'react-native-gesture-handler';



export default class ClubInfo extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
        role: '',
        club_name: '',
        club_size: 'Medium',
        club_status: '',
        club_url: '',
        club_contact: '',
        street_name: '',
        city: '',
        country: '',
        valid: false,
        c_name_valid: false,
        c_size_valid: false,
        c_statust_valid: false,
        c_url_valid: false,
        c_contact_valid: false,
        s_name_valid: false,
        city_valid: false,
        country_valid: false
    };
}


async CheckPage(){
  const { navigation } = this.props
  const role = navigation.getParam('role','none')
  const mgr_fname = navigation.getParam('mgr_fname', 'none')
  const mgr_lname = navigation.getParam('mgr_lname', 'none')
  const mgr_email = navigation.getParam('mgr_email', 'none')
  const mgr_phone = navigation.getParam('mgr_phone', 'none')

  while(this.state.valid == false){
    await this.checkEmptyClubname()
    if(this.state.c_name_valid == false){
      break;
    }
    await this.checkEmptyStatus()
    if(this.state.c_statust_valid == false){
      break;
    }
    await this.checkEmptyCluburl()
    if(this.state.c_url_valid == false){
      break;
    }
    await this.checkEmptyContact()
    if(this.state.c_contact_valid == false){
      break;
    }
    await this.checkEmptyStreetName()
    if(this.state.s_name_valid == false){
      break;
    }
    await this.checkEmptyCity()
    if(this.state.city_valid == false){
      break;
    }
    await this.checkEmptyCountry()
    if(this.state.country_valid == false){
      break;
    }
  
    this.setState({valid: true})
    }
  
  
  
if(this.state.valid == true) {
  this.props.navigation.navigate('MgrAccountInfo', {
    role: role,
    mgr_fname: mgr_fname,
    mgr_lname: mgr_lname,
    mgr_email: mgr_email,
    mgr_phone: mgr_phone,
    club_name: this.state.club_name,
    club_size: this.state.club_size,
    club_status: this.state.club_status,
    club_url: this.state.club_url,
    club_contact: this.state.club_contact,
    street_name: this.state.street_name,
    city: this.state.city,
    country: this.state.country});
}
}


checkEmptyClubname(){
  if(this.state.club_name == ''){
  
    Alert.alert('Name cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({c_name_valid: false})},
  ])
}
else{
  this.setState({c_name_valid: true})
}
}



checkEmptyStatus(){
  if(this.state.club_status == ''){
  
    Alert.alert('Club status cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({c_statust_valid: false})},
  ])
}
else{
  this.setState({c_statust_valid: true})
}
}


checkEmptyCluburl(){
  if(this.state.club_url == ''){
  
    Alert.alert('Url cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({c_url_valid: false})},
  ])
}
else{
  this.setState({c_url_valid: true})
}
}


checkEmptyContact(){

  var regEx = /^\d{3}-\d{3}-\d{4}$/;
  if(this.state.club_contact == ''){
  
    Alert.alert('Must enter Phone number cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({c_contact_valid: false})},
  ])
} else if(!regEx.test(this.state.club_contact)){
  Alert.alert('Number must be in xxx-xxx-xxxx format', alertMessage, [

    {text: 'OK', onPress: () => this.setState({c_contact_valid: false})},
])

} else{
  this.setState({c_contact_valid: true})
}
}


checkEmptyStreetName(){
  if(this.state.street_name == ''){
  
    Alert.alert('Street name cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({s_name_valid: false})},
  ])
}
else{
  this.setState({s_name_valid: true})
}
}


checkEmptyCity(){
  if(this.state.city == ''){
  
    Alert.alert('City cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({city_valid: false})},
  ])
}
else{
  this.setState({city_valid: true})
}
}


checkEmptyCountry(){
  if(this.state.country == ''){
  
    Alert.alert('Country cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({country_valid: false})},
  ])
}
else{
  this.setState({country_valid: true})
}
}






  render() {
   
    return (
      
      
      <View style={styles.container}>
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <Text  style={styles.pageText}>CLUB INFO</Text>
        <Text>{this.state.alert}</Text>

        <TextInput
          style={styles.placeHolderText}
          placeholder="Club Name"
          onChangeText={(club_name) => this.setState({club_name})}
          value={this.state.club_name}
        />
        <RNPickerSelect
          selectedValue={this.state.club_size}
          style={pickerSelectStyles}
          placeholder={{
            label: "Select a club size..."
            }}
          onValueChange={(itemValue) =>
              this.setState({ club_size: itemValue})
            }
                    
          items={[
            { label: 'Small', value: 'Small',color: "black" },
            { label: 'Medium', value: 'Medium', color: "black" },
            { label: 'Large', value: 'Large', color: "black" },
          ]}
        />
        <RNPickerSelect
          selectedValue={this.state.club_status}
          style={pickerSelectStyles}
          placeholder={{
            label: "Select a club status..."
            }}
          onValueChange={(itemValue) =>
              this.setState({ club_status: itemValue})
            }
                    
          items={[
            { label: ' Vacant', value: 'Vacant',color: "black" },
            { label: ' Full', value: 'Full', color: "black" },
          ]}
        />

        <TextInput
          style={styles.placeHolderText}
          placeholder="Club URL"          
          onChangeText={(club_url) => this.setState({club_url})}
          value={this.state.club_url}
        />

        <TextInput
          style={styles.placeHolderText}
          placeholder="Contact"
          onChangeText={(club_contact) => this.setState({club_contact})}
          value={this.state.club_contact}
        />
        
        
        <TextInput
          style={styles.placeHolderText}
          placeholder="Street name"
          onChangeText={(street_name) => this.setState({street_name})}
          value={this.state.street_name}
        />

        <TextInput
          style={styles.placeHolderText}
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          value={this.state.city}
        />  

        <TextInput
          style={styles.placeHolderText}
          placeholder="Country"
          onChangeText={(country) => this.setState({country})}
          value={this.state.country}
        />
        <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.CheckPage()}
                    >
                        <Text style={styles.btnText}> ACCOUNT INFO </Text>
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
    pickerBox: {
        height: 10,
        width: 250,
        margin: -5
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
      borderRadius: 2
    },
    pageText: {
      // position: "relative",
      // bottom: "25%",
      // backgroundColor: "#ffbf00",
      marginBottom: 20,
      color: "#6ED2F2",
      fontSize: 32,
      alignItems: "center",
      padding: 4,
      marginTop: 50,
    },
    btnText: {
      fontSize: 24,
      opacity: 1,
      color: "#fff",
    },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    width: 305,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: '#C4C4C4',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 18,
      width: 305,
      borderBottomWidth: 1,
      marginBottom: 20,
      borderColor: '#C4C4C4',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
});