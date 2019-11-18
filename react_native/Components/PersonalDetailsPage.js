import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from "react-native-elements";
// import { ScrollView } from 'react-native-gesture-handler';

export default class PersonalDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        const {state} = props.navigation
        console.log("Data", state.params.mgr_fname)
        this.state = {
            mgr_id: state.params.mgr_id,
            mgr_fname: state.params.mgr_fname,
            mgr_lname: state.params.mgr_lname,
            mgr_account: state.params.mgr_account,
            mgr_password: state.params.mgr_password
        }
        console.log(this.state.mgr_fname)
        console.log(this.state.mgr_lname)
        console.log(this.state.mgr_account)
        console.log(this.state.mgr_password)
    }

    // RegisterVar(){
    //     const{ state } = props.navigation
    //     const mgr_id = state.params.mgr_id
    //     console
    //     // const mgr_account = navigation.getParam('mgr_account')
    //     // const mgr_password = navigation.getParam('mgr_password')
    //     // const mgr_fname = navigation.getParam('mgr_fname')
    //     // const mgr_lname = navigation.getParam('mgr_lname')

    //     this.setState({
    //         mgr_id : mgr_id,
    //         mgr_account : mgr_account,
    //         mgr_password : mgr_password,
    //         mgr_account : mgr_account,
    //         mgr_fname : mgr_fname,
    //         mgr_lname : mgr_lname
    //     })

    // }

    onSubmit() {
        console.log(this.state.mgr_id)
            fetch('http://54.191.100.200:8080/api/clubMgrs/update/1', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({mgr_fname: this.state.mgr_fname,mgr_lname: this.state.mgr_lname,mgr_account: this.state.mgr_account,mgr_password: this.state.mgr_password}),
            })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log("Club Manager Updated.")
                // console.log()
            })
                    
            // console.log("Club Manager Updated")
            // console.log("in submit function")
            // console.log(this.state.mgr_fname)
            // console.log(this.state.mgr_lname)
            // console.log(this.state.mgr_account)
            // console.log(this.state.mgr_password)
            
        
    }


    onPressEvent(){
        Alert.alert(
          'Sign Out ',
          'Are you sure you want to cancel your changes?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.navigation.navigate('ProfilePageTest')},
          ],
          {cancelable: false},
        );
      }

    render() {
        const {mgr_fname, mgr_lname, mgr_account, mgr_password} = this.state
        return (
            <View style= {styles.container}>
                <Card style={styles.cardContainer}>
                    <View style= {styles.row}>
                    <Text style={styles.textStyle}> First Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {mgr_fname}
                    onChangeText={(mgr_fname) => this.setState({mgr_fname})}
                    value={this.state.mgr_fname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Last Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {mgr_lname}
                    onChangeText={(mgr_lname) => this.setState({mgr_lname})}
                    value={this.state.mgr_lname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Account:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={mgr_account}
                    onChangeText={(mgr_account) => this.setState({mgr_account})}
                    value={this.state.mgr_account}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Password:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={mgr_password}
                    onChangeText={(mgr_password) => this.setState({mgr_password})}
                    value={this.state.mgr_password}
                    />
                    </View>
                        <View style={styles.buttonBar}>
                            <TouchableOpacity style= {styles.buttonBox2} onPress={() => {this.onPressEvent()}}>
                                <View ><Text style= {{textAlign: "center"}} >Cancel</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonBox1}  onPress={() => {this.onSubmit()}}>
                                <View ><Text style={{textAlign: "center"}}>Submit</Text></View>
                            </TouchableOpacity>
                        </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: "column"
    },
    textBox : {
        height: 40,
        width: 200,
        borderColor: 'grey',
        borderWidth: 1,
        margin: 2,
        right: 50,
        top: 20

    },
    cardContainer: {
        borderRadius: 7,
        height: 350,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center"
    },
    row : {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textStyle : {
        top: 31,
        left: 5,
        fontWeight: "bold",
        fontSize: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonBar: {
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonBox1: {
    width: 75,
    padding: 10,
    left: 25,
    borderRadius: 4,
    backgroundColor: "green",
    justifyContent: "center",
    marginTop: 50
  },
  buttonBox2: {
    width: 75,
    backgroundColor: "red",
    borderRadius: 4,
    right: 25,
    padding: 10,
    justifyContent: "center",
    marginTop: 50
  },
  valueStyle: {
      color: "grey"
  }
});