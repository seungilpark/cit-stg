import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker, TouchableHighlight, Alert, alertMessage } from 'react-native';
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
        weight: "80",
        valid: false
    };
    
    this.checkEmpty = this.checkEmpty.bind(this);
}




CheckPage(){
  const { navigation } = this.props
  const role = navigation.getParam('role','ath')


  this.checkEmpty(this.state.fname)
  this.checkEmpty(this.state.lname)
  this.checkEmpty(this.state.gender)
  this.checkEmpty(this.state.dob)
  this.checkEmpty(this.state.addr)
  this.checkEmpty(this.state.height)
  this.checkEmpty(this.state.weight)

if(this.state.valid == true) {
  this.props.navigation.navigate('LocationInfo', {
    role: role,
    fname: this.state.fname,
    lname: this.state.lname,
    gender: this.state.gender,
    dob: this.state.dob,
    addr: this.state.addr,
    height: this.state.height,
    weight: this.state.weight});
}
}


btnPress1(){
  Alert.alert('You have been logged out', alertMessage, [

      {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
  ])
}



checkEmpty(entry){
    if(this.state.entry == ''){
      Alert.alert('Missing entry(s)', alertMessage, [

        {text: 'OK', onPress: () => this.setState({valid: false})},
    ])

  }
  else{
    this.setState({valid: true})
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
          placeholder="Date of Birth: yyyy-mm-dd"
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
                        onPress={() => this.CheckPage()}
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