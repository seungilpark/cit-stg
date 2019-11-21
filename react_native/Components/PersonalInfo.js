import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, TouchableHighlight } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';



export default class PersonalInfo extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
        role: '',
        fname: 'testUser',
        lname: 'testUser',
        gender: 'M',
        dob: '1988-08-08',
        height: "188",
        weight: "80"
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
    
    return (
      
      
      <View style={styles.container}>
        <KeyboardAvoidingView
      style={styles.container}
    >
        <ScrollView>
        <Text style={styles.pageText}> PERSONAL INFO</Text>
        <Text>{this.state.alert}</Text>

        <TextInput
          style={styles.placeHolderText}
          placeholder="First Name"
          onChangeText={(fname) => this.setState({fname})}
          value={this.state.fname}
        />

        <TextInput
          style={styles.placeHolderText}
          placeholder="Last Name"
          onChangeText={(lname) => this.setState({lname})}
          value={this.state.lname}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Gender"          
          onChangeText={(gender) => this.setState({gender})}
          value={this.state.gender}
        />
        
        <TextInput
          style={styles.placeHolderText}
          placeholder="Date of Birth: yyyy/mm/dd"
          onChangeText={(dob) => this.setState({dob})}
          value={this.state.dob}
        />        
        
            
        <TextInput
          style={styles.placeHolderText}
          placeholder="Height"
          onChangeText={(height) => this.setState({height})}
          value={this.state.height}
        />
            
        <TextInput
          style={styles.placeHolderText}
          placeholder="Weight"
          onChangeText={(weight) => this.setState({weight})}
          value={this.state.weight}
        />
          
        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                          this.props.navigation.navigate('LocationInfo', {
                              role: role,
                              fname: this.state.fname,
                              lname: this.state.lname,
                              gender: this.state.gender,
                              dob: this.state.dob,
                              addr: this.state.addr,
                              height: this.state.height,
                              weight: this.state.weight});
                      }}
                    >
                        <Text style={styles.btnText}> LOCATION INFO </Text>
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
  },
  btnText: {
    fontSize: 24,
    opacity: 1,
    color: "#fff",
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
  textBox: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 2,
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
  }
});