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
        // console.log("Data", state.params.mgr_fname)
        this.state = {
            mgr_id: this.props.navigation.getParam("mgr_id"),
            mgr_fname: this.props.navigation.getParam("mgr_fname"),
            mgr_lname: this.props.navigation.getParam("mgr_lname"),
            mgr_account: this.props.navigation.getParam("mgr_account"),
            mgr_password: this.props.navigation.getParam("mgr_password"),
            mgr_email:  this.props.navigation.getParam("mgr_email"),
            mgr_phone:  this.props.navigation.getParam("mgr_phone"),
            disabledBtn: true,
        }
        // console.log(this.state.mgr_id, "------------------mgr id")
        // console.log(this.state.mgr_fname)
        // console.log(this.state.mgr_lname)
        // console.log(this.state.mgr_account)
        // console.log(this.state.mgr_password)
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

        // console.log(this.state.mgr_id, "------------------component did mount")
        // console.log(this.state.mgr_fname)
        // console.log(this.state.mgr_lname)
        // console.log(this.state.mgr_account)
        // console.log(this.state.mgr_password)
    }

    onSubmit() {
        // console.log(this.state.mgr_id)
            fetch('http://54.245.167.64:8080/api/clubMgrs/update/'+ this.state.mgr_id, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({mgr_fname: this.state.mgr_fname,mgr_lname: this.state.mgr_lname,mgr_account: this.state.mgr_account,mgr_password: this.state.mgr_password, mgr_email: this.state.mgr_email, mgr_phone: this.state.mgr_phone}),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(this.state.mgr_email, "------------------------inside personal details update")
                console.log(this.state.mgr_phone, "------------------------inside personal details update")
                // console.log(responseJson)
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
                            onPress: () => this.props.navigation.navigate("CardForMgr",{mgr_fname: this.state.mgr_fname, mgr_lname: this.state.mgr_lname, mgr_account: this.state.mgr_account, mgr_password: this.state.mgr_password, mgr_email: this.state.mgr_email, mgr_phone: this.state.mgr_phone},
                            Alert.alert(
                                "Success!",
                                "Profile Updated.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => this.props.navigation.navigate("CardForMgr")
                                    },
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
            "",
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
        const {mgr_fname, mgr_lname, mgr_account, mgr_password} = this.state
        return (
            <View style= {styles.container}>
                <Card containerStyle={styles.cardContainer}>
                    <View style= {styles.row}>
                    <Text style={styles.textStyle}> First Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {this.state.mgr_fname}
                    onChangeText={(mgr_fname) => this.setState({mgr_fname, disabledBtn: false})}
                    value={this.state.mgr_fname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Last Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {this.state.mgr_lname}
                    onChangeText={(mgr_lname) => this.setState({mgr_lname, disabledBtn: false})}
                    value={this.state.mgr_lname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Account:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.mgr_account}
                    onChangeText={(mgr_account) => this.setState({mgr_account, disabledBtn: false})}
                    value={this.state.mgr_account}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Password:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.mgr_password}
                    onChangeText={(mgr_password) => this.setState({mgr_password, disabledBtn: false})}
                    value={this.state.mgr_password}
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