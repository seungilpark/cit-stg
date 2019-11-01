import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';


export default class AccountType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        role: 'ath'
        
    };

}

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <ScrollView>
        <Text>Sign Up Page</Text>
        <Text>{this.state.alert}</Text>
        
        <Picker
          selectedValue={this.state.role}
          style={{height: 30, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({role: itemValue})
          }>
          <Picker.Item label="Athlete" value="ath" />
          <Picker.Item label="Club Manager" value="mgr" />
          
        </Picker>

        <Button 
        title = 'Personal Info'
        onPress={() => {
            this.props.navigation.navigate('PersonalInfo', {role: this.state.role});
        }}/>
        
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
});
