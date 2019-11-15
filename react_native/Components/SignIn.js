import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Picker,
    Image,
    TouchableOpacity
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

    render() {
        return (
            <View style={styles.container}>
                {/* <Image
                    source={require("../assets/signIn.jpg")}
                    style={styles.pic}
                /> */}
                <Text style={styles.headText}>Sign In</Text>
                <Text style={styles.pageText}>User Name</Text>
                <TextInput
                    style={styles.placeHolderText}
                    placeholder="Type here"
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                />
                <Text style={styles.pageText}>Password</Text>
                <TextInput
                    style={styles.placeHolderText}
                    placeholder="Type here"
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
                    <Picker.Item label="Athlete" value="ath" color="white" />
                    <Picker.Item
                        label="Club Manager"
                        value="mgr"
                        color="white"
                    />
                </Picker>

                {/* <Button
                    title="Submit"
                    color="white"
                    onPress={(onPress = this.Validation)}
                /> */}

                <TouchableOpacity onPress={this.Validation}>
                    <Text style={styles.button}>Submit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={this.handlPress}>
                    <Text style={styles.button}>Click Me!</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3AD289",
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
    pageText: {
        bottom: "25%",
        // backgroundColor: "#ffbf00",
        color: "white",
        width: "35%",
        fontSize: 18,
        padding: 4,
        margin: 4,
        fontWeight: "bold"
    },
    headText: {
        bottom: "25%",
        color: "white",
        width: "35%",
        fontSize: 40,
        padding: 4,
        margin: 4,
        fontWeight: "bold"
    },
    placeHolderText: {
        bottom: "25%",
        backgroundColor: "white",
        height: "4%",
        width: "50%",
        fontSize: 18,
        fontWeight: "bold",
        opacity: 1,
        color: "black",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#7C7C95",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        overflow: "hidden",
        padding: 12,
        textAlign: "center"
    }
});
