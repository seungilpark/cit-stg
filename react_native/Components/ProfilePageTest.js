import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Button, ScrollView, SafeAreaView, Image } from 'react-native';
import { NavigationEvents, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/FontAwesome'
import { getCurrentFrame } from 'expo/build/AR';


export default class SignIn extends React.Component {
  // onPressButton1() {
  //  this.props.navigation.navigate('PersonalDetailsPage');
  // }
  onPressButton2() {
    Alert.alert('Send to Medical details')
  }
  onPressButton3() {
    Alert.alert('Send to Statistics')
  }
  onPressButton4() {
    Alert.alert('Send to Settings')
  }
  onPressEvent(){
    Alert.alert(
      'Sign Out ',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.navigation.navigate('FirstPage')},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.topimage}
          source={{uri: 'https://3.bp.blogspot.com/-VAZP5k19wlI/XG1bDAq1bkI/AAAAAAAALJ8/Un1KDXjJiuM0N3b-SMxRj4oeRDst_OFMACHMYCw/s1600/best-100-free-background-images-hd-download-your-next.jpg'}}
        />
        <Image
          style={styles.playerphoto}
          source={{uri: 'https://i.pinimg.com/originals/8e/40/5a/8e405aa5cc73d7b1453aaa69f4f00a5a.png'}}
        />
        <Text style={{marginTop: 10, fontSize: 20, textAlign: 'center', color: '#ffffff'}}>
          FirstName LastName
        </Text>
        <Text style={{marginTop: 12, textAlign: 'center', color: '#ffffff'}}>
          Defender - Right-Back
        </Text>
        {/* <View style={styles.button}>
          <Button
          title = 'Liked Clubs'
          onPress={() => {
          this.props.navigation.navigate('AthlClubList');
        }}/>
        </View> */}
        <Text style={{marginTop: 35, marginLeft: 35, color: '#7C7C95'}}>
          Email
        </Text>
        <Text style={styles.infoUnder}>
          flastname@email.com
        </Text>
        <Text style={styles.infoAbove}>
          Password
        </Text>
        <Text style={styles.infoUnder}>
          **********
        </Text>
        <Text style={styles.infoAbove}>
          Contact Number
        </Text>
        <Text style={styles.infoUnder}>
          +1 (604) 111 1111
        </Text>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('PersonalDetailsPage')}}>
                <View style = {{backgroundColor: 'white', alignItems: 'flex-start', 
                                justifyContent: 'center', height:80, width:300, marginTop: 40, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Personal Details                                                ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton2}>
                <View style = {{backgroundColor: 'white', alignItems: 'flex-start', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Medical Details                                                  ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton3}>
                <View style = {{backgroundColor: 'white', alignItems: 'flex-start', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Statistics                                                            ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton4}>
                <View style = {{backgroundColor: 'white', alignItems: 'flex-start', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Settings                                                              ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity>
                <View style={styles.button2}>
                  <Button flexDirection='row-reverse' title='Sign Out' onPress={() => this.onPressEvent()}/>
                </View>
        </TouchableOpacity>
       </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topimage: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    width: "100%", 
    height: 250
  },
  playerphoto: {
    borderRadius: 75,
    zIndex: 1,
    marginTop: 25,
    marginLeft: 'auto', 
    marginRight: 'auto', 
    width: 150, 
    height: 150,
  },
  boxtext : {
    textAlign: 'center',
    color: 'white',
  },
  infoAbove:{
    marginTop: 25, 
    marginLeft: 35, 
    color: '#7C7C95',
  },
  infoUnder: {
    marginLeft: 35, 
    color: '#6B6B6B',
  },
  button: {
    flex:1,
    flexDirection: 'row-reverse',
    top: 10,
    right: 32,
    borderRadius: 50
    // shadowOffset:{  width: 0,  height: 12,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
    // shadowRadius: 11,
  },
  button2: {
    flex:1,
    flexDirection: 'row-reverse',
    bottom: 10,
    right: 32,
    borderRadius: 50
  }
});