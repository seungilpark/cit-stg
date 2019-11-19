import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, Picker} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { Card } from "react-native-elements";
// import { ScrollView } from 'react-native-gesture-handler';

export default class PersonalDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        const {state} = props.navigation
        console.log("Data", state.params.athl_fname)
        this.state = {
            athl_id: state.params.athl_id,
            athl_fname: state.params.athl_fname,
            athl_lname: state.params.athl_lname,
            athl_account: state.params.athl_account,
            athl_password: state.params.athl_password,
            disabledBtn: true
        }
        console.log(this.state.athl_fname)
        console.log(this.state.athl_lname)
        console.log(this.state.athl_account)
        console.log(this.state.athl_password)
    }

    onSubmit() {
        console.log(this.state.athl_id)
            fetch('http://54.191.100.200:8080/api/athletes/update/1', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({athl_fname: this.state.athl_fname,athl_lname: this.state.athl_lname,athl_account: this.state.account,athl_password: this.state.password}),
            })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson)
                Alert.alert(
                    "Success",
                    "Profile Updated!",
                    [
                        {
                            text: "OK",
                            onPress: () => this.props.navigation.navigate("AthleteProfile")
                        }
                    ],
                    { cancelable: false }
                );
            })
    }


    onPressEvent(){
        Alert.alert(
            '',
            'Are you sure you want to cancel your changes?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.navigation.navigate('AthleteProfile')},
          ],
          {cancelable: false},
        );
      }

    render() {
        const {athl_fname, athl_lname, athl_account, athl_password} = this.state
        return (
            <View style= {styles.container}>
                <Card containerStyle={styles.cardContainer}>
                    <View style= {styles.row}>
                    <Text style={styles.textStyle}> First Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {athl_fname}
                    onChangeText={(athl_fname) => this.setState({athl_fname, disabledBtn: false})}
                    value={this.state.athl_fname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Last Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {athl_lname}
                    onChangeText={(athl_lname) => this.setState({athl_lname, disabledBtn: false})}
                    value={this.state.athl_lname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Account:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={athl_account}
                    onChangeText={(athl_account) => this.setState({athl_account, disabledBtn: false})}
                    value={this.state.athl_account}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Password:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={athl_password}
                    onChangeText={(athl_password) => this.setState({athl_password, disabledBtn: false})}
                    value={this.state.athl_password}
                    />
                    </View>
                        <View style={styles.buttonBar}>
                            <TouchableHighlight disabled={this.state.disabledBtn} style= {styles.buttonBox2} onPress={() => {this.onPressEvent()}}>
                                <View ><Text style={{textAlign: "center", color: "#FFF", opacity: 1}}>Cancel</Text></View>
                            </TouchableHighlight>
                            <TouchableHighlight disabled={this.state.disabledBtn} style={styles.buttonBox1}  onPress={() => {this.onSubmit()}}>
                                <View ><Text style={{textAlign: "center", color: "#FFF", opacity: 1}}>Update</Text></View>
                            </TouchableHighlight>
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
      flexDirection: "column",
      justifyContent: "center",
    },
    textBox : {
        height: 40,
        width: 200,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        color: "grey",
        margin: 2,
        right: 50,
        top: 50,
        paddingLeft: 5,
        borderRadius: 5,
    },
    cardContainer: {
        borderRadius: 7,
        height: 350,
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5
    },

    row : {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textStyle : {
        top: 62,
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
    opacity: 0.7,
    left: 25,
    borderRadius: 2,
    backgroundColor: "#3AD289",
    justifyContent: "center",
    marginTop: 70
  },
  buttonBox2: {
    width: 75,
    backgroundColor: "red",
    opacity: 0.7,
    borderRadius: 4,
    right: 25,
    padding: 10,
    justifyContent: "center",
    marginTop: 70
  },
});