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
        this.state = {
            mgr_id: this.props.navigation.getParam("mgr_id"),
            mgr_fname: this.props.navigation.getParam("mgr_fname"),
            mgr_lname: this.props.navigation.getParam("mgr_lname"),
            mgr_account: this.props.navigation.getParam("mgr_account"),
            mgr_password: this.props.navigation.getParam("mgr_password"),
            mgr_email:  this.props.navigation.getParam("mgr_email"),
            mgr_phone:  this.props.navigation.getParam("mgr_phone"),
            disabledBtn: true
        },
        console.log(this.state.mgr_fname, "--------------mgr fname in contact details")
        console.log(this.state.mgr_lname, "--------------mgr lname in contact details")

        console.log(this.state.mgr_email)
        console.log(this.state.mgr_phone)
    }

    componentDidMount(){
        this.setState({
            mgr_id: this.state.mgr_id,
            mgr_fname: this.state.mgr_fname,
            mgr_lname: this.state.mgr_lname,
            mgr_account: this.state.mgr_account,
            mgr_password: this.state.mgr_password,
            mgr_email: this.state.mgr_email,
            mgr_phone: this.state.mgr_phone
        })
    }
  

    onSubmit() {
        console.log(this.state.mgr_id, "-----------------onsubmit mgr id")
            fetch('http://54.191.100.200:8080/api/clubMgrs/update/' + this.state.mgr_id, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({mgr_fname: this.state.mgr_fname,mgr_lname: this.state.mgr_lname,mgr_account: this.state.mgr_account,mgr_password: this.state.mgr_password,mgr_email: this.state.mgr_email,mgr_phone: this.state.mgr_phone}),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(this.state.mgr_fname, "--------inside contact update")
                console.log(this.state.mgr_lname, "--------------inside contact update")

                Alert.alert(
                    "",
                    "Are you sure you want to update?",
                    [
                        {
                            text: 'No',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: "Yes",
                            onPress: () => this.props.navigation.navigate("ClubMgrProfile",{mgr_fname: this.state.mgr_fname,mgr_lname: this.state.mgr_lname, mgr_account: this.state.mgr_account,mgr_password: this.state.mgr_password,mgr_email: this.state.mgr_email, mgr_phone: this.state.mgr_phone},
                            Alert.alert(
                                "Success!",
                                "Profile Updated",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => this.props.navigation.navigate("ClubMgrProfile")
                                    }
                                ],
                                { cancelable: false }
                            ))
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
            {text: 'OK', onPress: () => this.props.navigation.navigate('ClubMgrProfile')},
          ],
          {cancelable: false},
        );
      }

    render() {
        const { mgr_email, mgr_phone} = this.state
        return (
            <View style= {styles.container}>
                <Card containerStyle={styles.cardContainer}>
                    <View style= {styles.row}>
                    <Text style={styles.textStyle}> Email:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {this.state.mgr_email}
                    onChangeText={(mgr_email) => this.setState({mgr_email, disabledBtn: false})}
                    value={this.state.mgr_email}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Phone:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {this.state.mgr_phone}
                    onChangeText={(mgr_phone) => this.setState({mgr_phone, disabledBtn: false})}
                    value={this.state.mgr_phone}
                    />
                    </View>

                        <View style={styles.buttonBar}>
                            <TouchableHighlight style= {styles.buttonBox2} onPress={() => {this.onPressEvent()}}>
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
        height: 250,
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