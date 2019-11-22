import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, TouchableHighlight, Alert, alertMessage } from 'react-native';
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
        password1: '',
        position:"GK",
        valid: false
        
    };
    this.Submit = this.Submit.bind(this);
    this.verPd = this.verPd.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
    this.RegisterVar = this.RegisterVar.bind(this);
}

RegisterVar(){

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

  this.setState({
    role: role,
    fname: fname,
    lname: lname,
    gender: gender,
    dob: dob,
    height: height,
    weight: weight,
    addr: addr,
    email: email,
    phone: phone,
    city: city,
    country: country
  })
  console.log("in RegisterVar: ", this.state.role);
}

componentDidMount(){
  this.RegisterVar();
}

Submit(){

  this.checkEmptyAcct()
  this.checkEmptyPass()
  if(this.state.valid){
  checkEmpty = this.checkEmpty();
  console.log(checkEmpty);
  if(checkEmpty != false){
    checkPd = this.verPd();
    console.log(checkPd);
    addVar = this.RegisterVar();
    console.log("in submit: ", checkPd, this.state.role);
    if(checkPd == true && this.state.role === 'ath'){
      console.log("in Submit() for athl", this.state);

      fetch('http://54.191.100.200:8080/api/athletes/register', {
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
          city: this.state.city,
          country: this.state.country,
          account: this.state.account,
          password: this.state.password,
          position:this.state.position
        }),
      }).then(response => response.json())
      .then((responseJson) => {
        console.log("Athlete Created.")
        console.log(responseJson.Error, "--------------------------------response json error")
        if(responseJson.Error !== undefined){
          console.log(responseJson,"-----------------------------data of created athlete from the db")
          console.log(responseJson)
            const id = responseJson[0].athl_id;
            console.log(id, "########################################################id of athlete getting passed to card page")
            this.props.navigation.navigate("Card", {
                athl_id: id
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
                    onPress: () => this.props.navigation.navigate("AccountInfo")
                }
            ],
            { cancelable: false }
        );
        }
        });
      
    }
    else if(checkPd == true && this.state.role === 'mgr'){
      fetch('http://54.191.100.200:8080/api/clubMgrs/create', {
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
}

checkEmptyAcct(){
  if(this.state.account == ''){
  
    Alert.alert('Account cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({valid: false})},
  ])
}
else{
  this.setState({valid: true})
}
}
checkEmptyPass(){
  if(this.state.password == ''){
  
    Alert.alert('Password cannot be empty', alertMessage, [

      {text: 'OK', onPress: () => this.setState({valid: false})},
  ])
}
else{
  this.setState({valid: true})
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
        
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <ScrollView>
        <Text  style={styles.pageText}>ACCOUNT INFO</Text>
        <Text>{this.state.alert}</Text>     
            
         
        <TextInput
          style={styles.placeHolderText}
          placeholder="Account Name"
          onChangeText={(account) => this.setState({account})}
          value={this.state.account}
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
        <Text>Choose a Position:</Text>
        <Picker
              selectedValue={this.state.position}
              style={{ height: 30, width: 300 }}
              onValueChange={(p, itemIndex) =>
                this.setState({ position: p })
              }
            >
              <Picker.Item label="GK" value="GK" />
              <Picker.Item label="RF" value="RF" />
              <Picker.Item label="LF" value="LF" />
              <Picker.Item label="CB" value="CB" />
              <Picker.Item label="DM" value="DM" />
              <Picker.Item label="RW" value="RW" />
              <Picker.Item label="RM" value="RM" />
              <Picker.Item label="CM" value="CM" />
              <Picker.Item label="BM" value="BM" />
              <Picker.Item label="SK" value="SK" />
              <Picker.Item label="AP" value="AP" />
              <Picker.Item label="LW" value="LW" />
              <Picker.Item label="LM" value="LM" />
              <Picker.Item label="AM" value="AM" />
            </Picker>

        <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.Submit()}
                    >
                        <Text style={styles.btnText}> SUBMIT </Text>
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
