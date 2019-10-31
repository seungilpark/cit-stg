import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Button, ScrollView, SafeAreaView, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/FontAwesome'


export default class SignIn extends React.Component {
  onPressButton1() {
    Alert.alert('Send to Personal details')
  }
  onPressButton2() {
    Alert.alert('Send to Medial details')
  }
  onPressButton3() {
    Alert.alert('Send to Statistics')
  }
  onPressButton4() {
    Alert.alert('Send to Settings')
  }
  onPressButton5() {
    Alert.alert('Signed Out!')
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
        <TouchableOpacity onPress = {this.onPressButton1}>
                <View style = {{backgroundColor: 'white', alignItems: 'Left', 
                                justifyContent: 'center', height:80, width:300, marginTop: 40, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Personal Details                                                 ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton2}>
                <View style = {{backgroundColor: 'white', alignItems: 'Left', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Medical Details                                                  ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton3}>
                <View style = {{backgroundColor: 'white', alignItems: 'Left', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Statistics                                                            ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton4}>
                <View style = {{backgroundColor: 'white', alignItems: 'Left', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#7C7C95'}}>Settings                                                              ></Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPressButton5}>
                <View style = {{backgroundColor: 'white', alignItems: 'Left', 
                                justifyContent: 'center', height:80, width:300, marginLeft: 35, borderColor: '#F6F6F9', borderTopWidth: 2, borderTopStyle: 'solid' }}
                       >
                    <Text style = {{color: '#2DC5F6'}}>Sign Out</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    width: 380, 
    height: 250
  },
  playerphoto: {
    borderRadius: 75,
    zIndex: 1,
    marginTop: 25,
    marginLeft: 'auto', 
    marginRight: 'auto', 
    width: 150, 
    height: 150
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
  }
});
