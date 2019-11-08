import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ImageBackground,
    TouchableHighlight
} from "react-native";
import { NavigationEvents } from "react-navigation";





export default class MainApp extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>STG Mobile</Text>

                <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate("SignIn");
                        }}
                    >
                        <Text style={styles.btnText}> Sign In </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate("AccountType");
                        }}
                    >
                        <Text style={styles.btnText}> Sign Up </Text>
                    </TouchableHighlight>

                
                
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

    text: {
        justifyContent: "center",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    },
    btnText: {
        fontSize: 14,
        fontWeight: "bold",
        opacity: 1,
        color: "blue"
    },
    button: {
        opacity: 0.7,
        backgroundColor: "#DDDDDD",
        width: "38%",
        padding: 14,
        alignItems: "center",
        justifyContent: "center",
        top: "14%"
    }
});
