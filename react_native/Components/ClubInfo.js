import React from 'react';
import { StyleSheet,TouchableHighlight, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';
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
        country: ''
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
    const mgr_fname = navigation.getParam('mgr_fname', 'none')
    const mgr_lname = navigation.getParam('mgr_lname', 'none')
    const mgr_email = navigation.getParam('mgr_email', 'none')
    const mgr_phone = navigation.getParam('mgr_phone', 'none')
    
    
    return (
      
      
      <View style={styles.container}>
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <ScrollView>
        <Text  style={styles.pageText}>CLUB INFO</Text>
        <Text>{this.state.alert}</Text>

        <TextInput
          style={styles.placeHolderText}
          placeholder="Club Name"
          onChangeText={(club_name) => this.setState({club_name})}
          value={this.state.club_name}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Club Size"
          onChangeText={(club_size) => this.setState({club_size})}
          value={this.state.club_size}
        />
        <TextInput
          style={styles.placeHolderText}
          placeholder="Club Status"          
          onChangeText={(club_status) => this.setState({club_status})}
          value={this.state.club_status}
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
                        onPress={() => {
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
      backgroundColor: "#3AD289",
      width: "90%",
      padding: 14,
      top: "10%",
      marginTop: 20,
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