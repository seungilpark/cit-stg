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
      phone: "1234-1234-1234",
      city: "Vancouver",
      country: "Canada",
      valid: false
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
  
    await this.checkEmptyAddr()
    await this.checkEmptyEmail()
    await this.checkEmptyPhone()
    await this.checkEmptyCity()
  
  
  
  
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
  
        {text: 'OK', onPress: () => this.setState({valid: false})},
    ])
  }
  else{
    this.setState({valid: true})
  }
  }

  checkEmptyEmail(){
    if(this.state.email == ''){
    
      Alert.alert('Email cannot be empty', alertMessage, [
  
        {text: 'OK', onPress: () => this.setState({valid: false})},
    ])
  }
  else{
    this.setState({valid: true})
  }
  }


  checkEmptyPhone(){

    var regEx = /^\d{3}-\d{3}-\d{4}$/;
    if(this.state.phone == ''){
    
      Alert.alert('Must enter Phone number cannot be empty', alertMessage, [
  
        {text: 'OK', onPress: () => this.setState({valid: false})},
    ])
  } else if(!regEx.test(this.state.phone)){
    Alert.alert('Number must be in xxx-xxx-xxxx format', alertMessage, [
  
      {text: 'OK', onPress: () => this.setState({valid: false})},
  ])
  
  } else{
    this.setState({valid: true})
  }
  }


  checkEmptyCity(){
    if(this.state.city == ''){
    
      Alert.alert('City cannot be empty', alertMessage, [
  
        {text: 'OK', onPress: () => this.setState({valid: false})},
    ])
  }
  else{
    this.setState({valid: true})
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
          <ScrollView>
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
            <Text>Choose a Country:</Text>
            <Picker
              selectedValue={this.state.country}
              style={{ height: 30, width: 300}}
              onValueChange={(name, itemIndex) =>
                this.setState({ country: name })
              }
            >
              <Picker.Item label="Canada" value="Canada" />
              <Picker.Item label="England" value="England" />
              <Picker.Item label="Spain" value="Spain" />
              <Picker.Item label="France" value="France" />
            </Picker>

              <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                          this.CheckPage()
                      }}
                    >
                        <Text style={styles.btnText}> ACCOUNT INFO </Text>
                </TouchableHighlight>    
          </ScrollView>
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
    top: "10%",
    marginTop: 80,
    marginBottom: 28,
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
