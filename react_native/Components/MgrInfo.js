import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
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
          placeholder="Phone num"
          onChangeText={(mgr_phone) => this.setState({mgr_phone})}
          value={this.state.mgr_phone}
        />        
        
          

        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                          this.props.navigation.navigate('ClubInfo', {
                              role: role,
                              mgr_fname: this.state.mgr_fname,
                              mgr_lname: this.state.mgr_lname,
                              mgr_email: this.state.mgr_email,
                              mgr_phone: this.state.mgr_phone,
                              });
                      }}
                    >
                        <Text style={styles.btnText}> CLUB INFO </Text>
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