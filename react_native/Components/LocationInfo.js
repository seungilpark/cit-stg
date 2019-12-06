import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  TouchableHighlight,
  Alert,
  alertMessage
} from "react-native";
import { NavigationEvents } from "react-navigation";
import RNPickerSelect from 'react-native-picker-select';
// import { ScrollView } from 'react-native-gesture-handler';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      fname: "",
      lname: "",
      gender: "",
      dob: "",
      height: "",
      weight: "",
      addr: "testAddr",
      email: "abcd@abcd.com",
      phone: "123-123-1234",
      city: "Vancouver",
      country: "Canada",
      valid: false,
      avalid: false,
      evalid: false,
      pvalid: false,
      cvalid: false
    };
  }



  async CheckPage(){
    const { navigation } = this.props;
    const role = navigation.getParam("role", "ath");
    const fname = navigation.getParam("fname", "none");
    const lname = navigation.getParam("lname", "none");
    const gender = navigation.getParam("gender", "none");
    const dob = navigation.getParam("dob", "none");
    const height = navigation.getParam("height", "none");
    const weight = navigation.getParam("weight", "none");

    while(this.state.valid == false){
      await this.checkEmptyAddr()
      if(this.state.avalid == false){
        break;
      }
      await this.checkEmptyCity()
      if(this.state.cvalid == false){
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
    this.props.navigation.navigate("AccountInfo", {
      role: role,
      fname: fname,
      lname: lname,
      gender: gender,
      dob: dob,
      height: height,
      weight: weight,
      addr: this.state.addr,
      email: this.state.email,
      phone: this.state.phone,
      city: this.state.city,
      country: this.state.country
    });
  }
  }


  checkEmptyAddr(){
    if(this.state.addr == ''){
    
      Alert.alert('Address cannot be empty', alertMessage, [
  
        {text: 'OK', onPress: () => this.setState({avalid: false})},
    ])
  }
  else{
    this.setState({avalid: true})
  }
  }

  checkEmptyEmail(){
    if(this.state.email == ''){
    
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
    if(this.state.phone == ''){
    
      Alert.alert('Must enter Phone number cannot be empty', alertMessage, [
  
        {text: 'OK', onPress: () => this.setState({pvalid: false})},
    ])
  } else if(!regEx.test(this.state.phone)){
    Alert.alert('Number must be in xxx-xxx-xxxx format', alertMessage, [
  
      {text: 'OK', onPress: () => this.setState({pvalid: false})},
  ])
  
  } else{
    this.setState({pvalid: true})
  }
  }


  checkEmptyCity(){
    if(this.state.city == ''){
    
      Alert.alert('City cannot be empty', alertMessage, [
  
        {text: 'OK', onPress: () => this.setState({cvalid: false})},
    ])
  }
  else{
    this.setState({cvalid: true})
  }
  }

  render() {
    const { navigation } = this.props;
    const role = navigation.getParam("role", "ath");
    const fname = navigation.getParam("fname", "none");
    const lname = navigation.getParam("lname", "none");
    const gender = navigation.getParam("gender", "none");
    const dob = navigation.getParam("dob", "none");
    const height = navigation.getParam("height", "none");
    const weight = navigation.getParam("weight", "none");

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text  style={styles.pageText}>LOCATION INFO</Text>
            <Text>{this.state.alert}</Text>

            <TextInput
              style={styles.placeHolderText}
              placeholder="Address"
              onChangeText={addr => this.setState({ addr })}
              value={this.state.addr}
            />

            <TextInput
              style={styles.placeHolderText}
              placeholder="City"
              onChangeText={city => this.setState({ city })}
              value={this.state.city}
            />

            {/* <TextInput
          style={styles.textBox}
          placeholder="country"
          onChangeText={(country) => this.setState({country})}
          value={this.state.country}
        /> */}

            <TextInput
              style={styles.placeHolderText}
              placeholder="Email: youremail@email.com"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <TextInput
              style={styles.placeHolderText}
              placeholder="Phone Number: 000-000-0000"
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
            />
            <RNPickerSelect
                    selectedValue={this.state.country}
                    style={pickerSelectStyles}
                    placeholder={{
                        label: "Select a country..."
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ country: itemValue})
                    }
                    
                    items={[
                        { label: 'Canada', value: 'Canada',color: "black" },
                        { label: 'England', value: 'England', color: "black" },
                        { label: 'Spain', value: 'Spain', color: "black" },
                        { label: 'France', value: 'France', color: "black" },
                    ]}
                />

              <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                          this.CheckPage()
                      }}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textBox: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    margin: 2
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20
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
    backgroundColor: "#3AD289",
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
    color: "#3AD289",
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    width: 305,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 18,
      width: 305,
      borderBottomWidth: 1,
      borderColor: '#C4C4C4',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
});
