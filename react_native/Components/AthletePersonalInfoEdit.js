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
        console.log("Data", state.params.athl_id, state.params.athl_fname)
        this.state = {
            // athl_id: state.params.athl_id,
            athl_id: this.props.navigation.getParam("athl_id"),
            athl_fname: this.props.navigation.getParam("athl_fname"),
            athl_lname: this.props.navigation.getParam("athl_lname"),
            athl_gender: this.props.navigation.getParam("athl_gender"),
            athl_height: this.props.navigation.getParam("athl_height"),
            athl_weight: this.props.navigation.getParam("athl_weight"),
            athl_dob: this.props.navigation.getParam("athl_dob"),
            athl_addr: this.props.navigation.getParam("athl_addr"),
            account: this.props.navigation.getParam("account"),
            password: this.props.navigation.getParam("password"),
            athl_email: this.props.navigation.getParam("athl_email"),
            athl_phone: this.props.navigation.getParam("athl_phone"),
            city: this.props.navigation.getParam("city"),
            country: this.props.navigation.getParam("country"),
            disabledBtn: true
        }
        console.log(this.state.athl_fname)
        console.log(this.state.athl_lname)
        console.log(this.state.athl_gender)
        console.log(this.state.athl_height)
        console.log(this.state.athl_weight)
        console.log(this.state.athl_dob)
        console.log(this.state.athl_addr)
        console.log(this.state.athl_email)
        console.log(this.state.athl_phone)
        console.log(this.state.account)
        console.log(this.state.password)
        console.log(this.state.city)
        console.log(this.state.country)
    }

    componentDidMount() {
        this.setState({
            athl_id: this.state.athl_id,
            athl_fname: this.state.athl_fname,
            athl_lname: this.state.athl_lname,
            athl_gender: this.state.athl_gender,
            athl_height: this.state.athl_height,
            athl_weight: this.state.athl_weight,
            athl_dob: this.state.athl_dob,
            athl_addr: this.state.athl_addr,            
            athl_email: this.state.athl_email,
            athl_phone:  this.state.athl_phone,
            account:  this.state.account,
            password: this.state.password,
            city: this.state.city,
            country: this.state.country,
        })        
    }

    onSubmit() {
        console.log(this.state.athl_id, "----------------on submit athlete personal info")
            if(this.state.athl_id != null && this.state.athl_id != undefined){
                fetch('http://54.191.100.200:8080/api/athletes/update/' + this.state.athl_id, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({athl_fname: this.state.athl_fname,athl_lname: this.state.athl_lname,athl_gender: this.state.athl_gender,athl_height: this.state.athl_height,athl_weight: this.state.athl_weight,athl_dob: this.state.athl_dob,athl_addr: this.state.athl_addr,athl_email: this.state.athl_email,athl_phone:  this.state.athl_phone,account:  this.state.account,password: this.state.password,city: this.state.city,country: this.state.country}),
                })
                .then((response) => response.json())
                .then((responseJson) => {

                    console.log(responseJson)
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
                                onPress: () => this.props.navigation.navigate("AthleteProfile",{
                                    athl_fname: this.state.athl_fname,
                                    athl_lname: this.state.athl_lname,
                                    athl_gender: this.state.athl_gender,
                                    athl_height: this.state.athl_height,
                                    athl_weight: this.state.athl_weight,
                                    athl_dob: this.state.athl_dob,
                                    athl_addr: this.state.athl_addr,            
                                    athl_email: this.state.athl_email,
                                    athl_phone:  this.state.athl_phone,
                                    account:  this.state.account,
                                    password: this.state.password,
                                    city: this.state.city,
                                    country: this.state.country   
                                },
                                Alert.alert(
                                    "Success!",
                                    "Please sign out for any changes to take effect.",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => this.props.navigation.navigate("AthleteProfile")
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
        const {athl_fname, athl_lname, athl_gender, athl_height, athl_weight, athl_dob, athl_addr, city, country, account, password} = this.state
        return (
            <View style= {styles.container}>
                <Card containerStyle={styles.cardContainer}>
                    <View style= {styles.row}>
                    <Text style={styles.textStyle}> First Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {this.state.athl_fname}
                    onChangeText={(athl_fname) => this.setState({athl_fname, disabledBtn: false})}
                    value={this.state.athl_fname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Last Name:</Text>
                    <TextInput
                    style={styles.textBox}
                    placeholder= {this.state.athl_lname}
                    onChangeText={(athl_lname) => this.setState({athl_lname, disabledBtn: false})}
                    value={this.state.athl_lname}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Account:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.account}
                    onChangeText={(account) => this.setState({account, disabledBtn: false})}
                    value={this.state.account}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Password:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.password}
                    onChangeText={(password) => this.setState({password, disabledBtn: false})}
                    value={this.state.password}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Gender:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.athl_gender}
                    onChangeText={(athl_gender) => this.setState({athl_gender, disabledBtn: false})}
                    value={this.state.athl_gender}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Height:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.athl_height.toString()}
                    onChangeText={(athl_height) => this.setState({athl_height, disabledBtn: false})}
                    value={this.state.athl_height.toString()}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Weight:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.athl_weight.toString()}
                    onChangeText={(athl_weight) => this.setState({athl_weight, disabledBtn: false})}
                    value={this.state.athl_weight.toString()}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Date of Birth:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.athl_dob.toString().slice(0,10)}
                    onChangeText={(athl_dob) => this.setState({athl_dob, disabledBtn: false})}
                    value={this.state.athl_dob.toString().slice(0,10)}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Address:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.athl_addr}
                    onChangeText={(athl_addr) => this.setState({athl_addr, disabledBtn: false})}
                    value={this.state.athl_addr}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> City:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.city}
                    onChangeText={(city) => this.setState({city, disabledBtn: false})}
                    value={this.state.city}
                    />
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.textStyle}> Country:</Text>    
                    <TextInput
                    style={styles.textBox}
                    placeholder={this.state.country}
                    onChangeText={(country) => this.setState({country, disabledBtn: false})}
                    value={this.state.country}
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
        height: 650,
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
        marginTop: 90
  },
    buttonBox2: {
        width: 75,
        backgroundColor: "red",
        opacity: 0.7,
        borderRadius: 4,
        right: 25,
        padding: 10,
        justifyContent: "center",
        marginTop: 90
  },
});