import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, Alert, alertMessage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';


export default class MgrAccountInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        role: '',
        club_name: '',
        club_size: '',
        club_status: '',
        club_url: '',
        club_contact: '',
        street_name: '',
        city: '',
        country: '',
        mgr_fname: '',
        mgr_lname: '',
        mgr_email: '',
        mgr_phone: '',
        fk_sports_id: 1,
        mgr_account: '',
        password: '',
        password1: '',
        valid: false,
        Avalid: false,
        Pvalid: false
        
    };
    this.Submit = this.Submit.bind(this);
    this.verPd = this.verPd.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
    this.RegisterVar = this.RegisterVar.bind(this);
}

RegisterVar(){

    const { navigation } = this.props
    const role = navigation.getParam('role','none')
    const mgr_fname = navigation.getParam('mgr_fname', 'none')
    const mgr_lname = navigation.getParam('mgr_lname', 'none')
    const mgr_email = navigation.getParam('mgr_email', 'none')
    const mgr_phone = navigation.getParam('mgr_phone', 'none')
    const club_name = navigation.getParam('club_name', 'none')
    const club_size = navigation.getParam('club_size', 'none')
    const club_status = navigation.getParam('club_status', 'none')
    const club_url = navigation.getParam('club_url', 'none')
    const club_contact = navigation.getParam('club_contact', 'none')
    const street_name = navigation.getParam('street_name', 'none')
    const city = navigation.getParam('city', 'none')
    const country = navigation.getParam('country', 'none')


  this.setState({
    role: role,
    mgr_fname: mgr_fname,
    mgr_lname: mgr_lname,
    mgr_email: mgr_email,
    mgr_phone: mgr_phone,
    club_name: club_name,
    club_size: club_size,
    club_status: club_status,
    club_url: club_url,
    club_contact: club_contact,
    street_name: street_name,
    city: city,
    country: country
  })
}

componentDidMount(){
  this.RegisterVar();
}

async Submit(){

  while(this.state.valid == false){
    await this.checkEmptyAcct()
    if(this.state.Avalid == false){
      break;
    }
    await this.checkEmptyPass()
    if(this.state.Pvalid == false){
      break;
    }
  
    this.setState({valid: true})
    }
  if(this.state.valid){
  checkEmpty = this.checkEmpty();
  if(checkEmpty != false){
    checkPd = this.verPd();
    console.log(checkPd);
    addVar = this.RegisterVar();

    if(checkPd == true && this.state.role === 'mgr'){
      fetch('http://54.191.100.200:8080/api/clubs/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          club_name: this.state.club_name,
          club_size: this.state.club_size,
          club_status: this.state.club_status,
          club_url: this.state.club_url,
          club_contact: this.state.club_contact,
          fk_sports_id: this.state.fk_sports_id,
          street_name: this.state.street_name,
          city: this.state.city,
          country: this.state.country,
          mgr_fname: this.state.mgr_fname,
          mgr_lname: this.state.mgr_lname,
          mgr_email: this.state.mgr_email,
          mgr_phone: this.state.mgr_phone,
          mgr_account: this.state.mgr_account,
          mgr_password: this.state.password,
          
        }),
      }).then(response => response.json())
      .then((responseJson) => {
        console.log("Manager Created.")
        console.log(responseJson)
        if(responseJson.Error == undefined){
          const id = responseJson[0].mgr_id;
          const clubId = responseJson[0].fk_clubs_id
          console.log(id)
          this.props.navigation.navigate("CardForMgr", {
              mgr_id: id,
              club_id: clubId,
          });
        }else{
          Alert.alert(
            "Error",
            "User already Exists",
            [
                // {
                //     text: "Cancel",
                //     onPress: () => console.log("Cancel Pressed"),
                //     style: "cancel"
                // },
                {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("MgrAccountInfo")
                }
            ],
            { cancelable: false }
        );
        }
        });
    }else{
      this.setState({
        alert: "Please confirm your password."
      })
    }
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

checkEmptyAcct(){
  if(this.state.mgr_account == ''){
  
    Alert.alert('Account cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({Avalid: false})},
  ])
}
else{
  this.setState({Avalid: true})
}
}
checkEmptyPass(){
  if(this.state.password == ''){
  
    Alert.alert('Password cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({Pvalid: false})},
  ])
}
else{
  this.setState({Pvalid: true})
}
}



  render() {
    return (
      <View style={styles.container}>
        
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <Text  style={styles.pageText}>ACCOUNT INFO</Text>
        <Text>{this.state.alert}</Text>     
            
         
        <TextInput
          style={styles.placeHolderText}
          placeholder="Account Name"
          onChangeText={(mgr_account) => this.setState({mgr_account})}
          value={this.state.mgr_account}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Enter your password again"
          onChangeText={(password1) => this.setState({password1})}
          value={this.state.password1}
        />
        <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.Submit()}
                    >
                        <Text style={styles.btnText}> SUBMIT </Text>
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
      top: "10%",
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
