import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Picker,
    Image,
    TouchableHighlight
} from "react-native";
import { NavigationEvents } from "react-navigation";
export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "ath",
            username: "",
            password: "",
            status: ""
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
                "http://54.191.100.200:8080/api/clubMgrs/signin",
                data
            );
        }
    }

    Validation() {
        this.Submit().then(response => {
            console.log(response.status);
            if (response.status === 200) {
                console.log("logged in");
                this.setState({
                    status: "loggedIn"
                });
            } else {
                this.setState({
                    status: "forbidden"
                });
            }
            if (this.state.status == "loggedIn") {
                this.props.navigation.navigate("Card");
            } else {
                alert("Wrong Username or Password");
            }
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
                <TouchableHighlight
                    style={styles.BackButton}
                    onPress={() => this.props.navigation.navigate("MainApp")}
                >
                    <Text style={styles.BackBtnText}>Menu</Text>
                </TouchableHighlight>

                <Text style={styles.pageText}>LOGIN</Text>
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

                <Picker
                    selectedValue={this.state.role}
                    style={{ height: 30, width: 300 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ role: itemValue })
                    }
                >
                    <Picker.Item label="Athlete" value="ath" color="black" />
                    <Picker.Item
                        label="Club Manager"
                        value="mgr"
                        color="black"
                    />
                </Picker>

                <TouchableHighlight
                    style={styles.button}
                    onPress={(onPress = this.Validation)}
                >
                    <Text style={styles.btnText}> Submit </Text>
                </TouchableHighlight>
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
        width: "75%",
        fontSize: 18,
        borderBottomWidth: 1,
        marginBottom: 20,
        borderColor: "#C4C4C4",
        opacity: 1,
        color: "black"
    }
});
