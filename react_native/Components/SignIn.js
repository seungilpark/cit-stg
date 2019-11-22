import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Picker,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import RNPickerSelect from 'react-native-picker-select';
export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "ath",
            username: "",
            password: "",
            status: "",
            athl_id: null,
            mgr_id: null,
            club_id: null,
            button1: {
                opacity: 0.7,
                backgroundColor: "#3AD289",
                width: "57%",
                padding: 14,
                alignItems: "center",
                top: "10%",
                marginTop: 40,
                marginBottom: 28,
                borderRadius: 2
            },
            button2:{
                opacity: 0.7,
                backgroundColor: "#6ED2F2",
                width: "57%",
                padding: 14,
                alignItems: "center",
                top: "10%",
                marginTop: 40,
                marginBottom: 28,
                borderRadius: 2
            },
            pageText1: {
                // position: "relative",
                // bottom: "25%",
                // backgroundColor: "#ffbf00",
                marginBottom: 70,
                color: "#3AD289",
                fontSize: 32,
                padding: 4,
                margin: 4
            },
            pageText2: {
                // position: "relative",
                // bottom: "25%",
                // backgroundColor: "#ffbf00",
                marginBottom: 70,
                color: "#6ED2F2",
                fontSize: 32,
                padding: 4,
                margin: 4
            },
        };
        this.Submit = this.Submit.bind(this);
        this.Validation = this.Validation.bind(this);
    }

    // let data = {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   mode: 'same-origin',
    //   body: JSON.stringify({
    //     appoid: appo_id
    //   }),
    //   headers: {
    //     'Accept':       'application/json',
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken':  cookie.load('csrftoken')
    //   }
    // }
    // return fetch('/appointments/get_appos', data)
    //         .then(response => response.json())  // promise
    //         .then(json => dispatch(receiveAppos(json)))
    // }

    Submit() {
        let data = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account: this.state.username,
                password: this.state.password
            })
        };
        if (this.state.role === "ath") {
            return fetch(
                "http://54.191.100.200:8080/api/athletes/signin",
                data
            );
        } else {
            return fetch(
                "http://54.191.100.200:8080/api/clubs/signin",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        mgr_account: this.state.username,
                        mgr_password: this.state.password
                    })
                }
            );
        }
    }

    Validation() {
        this.Submit().then(response => {
            console.log(response);
        //    response.text().then(t => console.log(t));
            if (response.status === 200 && this.state.role === "ath") {
                console.log("Athlete logged in");
                
               response.json().then(rjson => {
                console.log("new 1 club mgr sigin response-------------",rjson[0].mgr_id)
                    this.setState({
                        status: "loggedIn",
                        athl_id: rjson[0].athl_id,
                    });
                    if (this.state.status == "loggedIn")
                    { this.props.navigation.navigate("Card", {athl_id: this.state.athl_id});}else{
                        alert("Wrong Username or Password");}
                    console.log("new club mgr sigin response-------------",rjson[0].mgr_id)
                });
//                const responseJson = response.json();
  //              this.setState({
    //                status: "loggedIn",
      //              athl_id: responseJson[0].athl_id
        //        });
            }else if(response.status === 200 && this.state.role === "mgr"){
                console.log("Manager logged in");
               response.json().then(rjson => {
                console.log("new 1 club mgr sigin response-------------",rjson[0].mgr_id)
                    this.setState({
                        status: "loggedIn",
                        mgr_id: rjson[0].mgr_id,
                        club_id: rjson[0].club_id,
                    });
                    if (this.state.status == "loggedIn")
                    {this.props.navigation.navigate("CardForMgr", {mgr_id: this.state.mgr_id, club_id: this.state.club_id});}else{
                        alert("Wrong Username or Password");}
                    console.log("new club mgr sigin response-------------",rjson[0].mgr_id)
                });
                
                console.log("club mgr sigin response-------------",this.state.mgr_id)
            } else  {
                this.setState({
                    status: "forbidden"
                });
            }
            // if (this.state.role == "ath" && this.state.status == "loggedIn") {
            //     this.props.navigation.navigate("Card", {athl_id: this.state.athl_id});
            // } else if(this.state.role == "mgr" && this.state.status == "loggedIn") {
            //     this.props.navigation.navigate("CardForMgr", {mgr_id: this.state.mgr_id, club_id: this.state.club_id});
            // }else {
            //     alert("Wrong Username or Password");
            // }
            // console.log(result);
        });
    }
    // onPressEvent() {
    //     Alert.alert(
    //         "Sign Out ",
    //         "Are you sure you want to sign out?",
    //         [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => console.log("Cancel Pressed"),
    //                 style: "cancel"
    //             },
    //             {
    //                 text: "OK",
    //                 onPress: () => this.props.navigation.navigate("MainApp")
    //             }
    //         ],
    //         { cancelable: false }
    //     );
    // }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image
                    source={require("../assets/signIn.jpg")}
                    style={styles.pic}
                /> */}
                <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                >
                    

                <Text style={this.state.role == "mgr" ? this.state.pageText2: this.state.pageText1}>LOGIN</Text>
                
                <TextInput
                    style={styles.placeHolderText}
                    placeholder="Username"
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.placeHolderText}
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />

                <RNPickerSelect
                    selectedValue={this.state.role}
                    style={pickerSelectStyles}
                    placeholder={{
                        label: " Select a type..."
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ role: itemValue})
                    }
                    
                    items={[
                        { label: ' Athlete', value: 'ath',color: "black" },
                        { label: ' Club Manager', value: 'mgr', color: "black" },
                    ]}
                />

                <TouchableHighlight
                    style={this.state.role == "mgr" ? this.state.button2: this.state.button1}
                    onPress={(onPress = this.Validation)}
                >
                    <Text style={styles.btnText}> SUBMIT </Text>
                </TouchableHighlight>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center"
    },
    pic: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "stretch"
    },
    btnText: {
        fontSize: 24,
        opacity: 1,
        color: "#fff"
    },
    pageText: {
        // position: "relative",
        // bottom: "25%",
        // backgroundColor: "#ffbf00",
        marginBottom: 70,
        color: "#3AD289",
        fontSize: 32,
        padding: 4,
        margin: 4
    },
    button: {
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "57%",
        padding: 14,
        alignItems: "center",
        top: "10%",
        marginTop: 80,
        marginBottom: 28,
        borderRadius: 2
    },
    BackButton: {
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "16%",
        // height: "6%",
        padding: 14,
        alignItems: "center",
        bottom: "18%",
        right: "40%",
        borderRadius: 2
    },
    BackBtnText: {
        fontSize: 14,
        opacity: 1,
        color: "#fff"
    },
    placeHolderText: {
        // position: "relative",
        // bottom: "25%",
        backgroundColor: "white",
        height: "4%",
        width: 300,
        fontSize: 18,
        borderBottomWidth: 1,
        marginBottom: 20,
        borderColor: "#C4C4C4",
        opacity: 1,
        color: "black"
    }
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 18,
      width: 305,
      borderBottomWidth: 1,
      borderColor: '#C4C4C4',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 18,
        width: 305,
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
