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
import { Font } from 'expo';





export default class MainApp extends React.Component {

    constructor() {

        super();
    }
    render() {
        return (
                

            <View style={styles.container}>

    <Text style={styles.welText}>Welcome!</Text>
    <Text>
        <Text style={styles.welunderText}>Hi! I’m </Text>
        <Text style={{ fontWeight: "bold", color: "#3AD289" }}>SAM</Text>
        <Text style={styles.welunderText}>, your Smart Athlete</Text>
    </Text>
    <Text style={styles.welunderText}>Manager, and I’m here to help you</Text>
    <Text style={styles.welunderText}>get started!</Text>

                <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate("AccountType");
                        }}
                    >
                        <Text style={styles.btnText}> SIGN UP </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button2}
                        onPress={() => {
                            this.props.navigation.navigate("SignIn");
                        }}
                    >
                        <Text style={styles.btnText2}> LOGIN </Text>
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
      },

    text: {
        justifyContent: "center",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    },
    welText: {
        textAlign: 'center', 
        justifyContent: 'center', 
        marginTop: "35%",
        fontSize: 32,
        color: "#3AD289",
    },
    welunderText: {
        textAlign: 'center', 
        justifyContent: 'center',
        fontSize: 14,
        color: "#C4C4C4",
    },


    btnText: {
        fontSize: 24,
        opacity: 1,
        color: "#fff",
    },
    btnText2: {
        fontSize: 24,
        opacity: 1,
        color: "#3AD289",
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
    button2: {
        opacity: 0.7,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor:"#3AD289",
        width: "57%",
        padding: 14,
        alignItems: "center",
        top: "14%",
        marginBottom: 38,
        borderRadius: 2
    }
});
