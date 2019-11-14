import React from "react";
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    View,
    Button,
    ScrollView,
    Image
} from "react-native";
import { NavigationEvents, StackNavigator } from "react-navigation";

export default class AthleteProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            athl_id: "",
            data: [],
            data2: [],

            athl_email: "",
            athl_phone: "",
            profile_photo_url: "test"
        };
    }

    componentDidMount() {
        fetch("http://54.191.100.200:8080/api/athletes/" + this.state.athl_id)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ data: responseJson });
            })
            .catch(error => {
                console.error(error);
            });
        fetch("http://54.191.100.200:8080/api/profiles" + this.state.athl_id)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ data2: responseJson });
            })
            .catch(error => {
                console.error(error);
            });
    }

    onPressEvent() {
        Alert.alert(
            "Sign Out ",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("FirstPage")
                }
            ],
            { cancelable: false }
        );
    }

    render() {
        if (this.state.data.length == 0 || this.state.data2.length == 0) {
            return <View></View>;
        }
        // console.log(this.state.data[0]);
        // console.log(this.state.data2[0]);
        console.log(
            "The profile_photo Url is --> ",
            this.state.data2[0].profile_photo
        );
        return (
            <ScrollView style={styles.container}>
                <Image
                    style={styles.topimage}
                    source={{
                        uri:
                            "https://3.bp.blogspot.com/-VAZP5k19wlI/XG1bDAq1bkI/AAAAAAAALJ8/Un1KDXjJiuM0N3b-SMxRj4oeRDst_OFMACHMYCw/s1600/best-100-free-background-images-hd-download-your-next.jpg"
                    }}
                />

                <Image
                    style={styles.playerphoto}
                    source={{
                        uri:
                            this.state.profile_photo_url !== ""
                                ? "http://shaqodoon.org/wp-content/uploads/blanl-image-shaqodoon.png"
                                : this.state.data2[0].profile_photo
                    }}
                />

                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 20,
                        textAlign: "center",
                        color: "red"
                    }}
                >
                    Hello
                </Text>
                <Text
                    style={{
                        marginTop: 12,
                        textAlign: "center",
                        color: "red"
                    }}
                >
                    {this.state.data[0].athl_fname}{" "}
                    {this.state.data[0].athl_lname}
                </Text>
                <Text></Text>

                <Text
                    style={{
                        marginTop: 35,
                        marginLeft: 35,
                        color: "#7C7C95"
                    }}
                >
                    Email
                </Text>

                <Text style={styles.infoUnder}>
                    {this.state.data[0].athl_email}
                </Text>

                <Text style={styles.infoAbove}>Contact Number</Text>
                <Text style={styles.infoUnder}>
                    {this.state.data[0].athl_phone}
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("PersonalDetailsPage");
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            height: 80,
                            width: 300,
                            marginTop: 40,
                            marginLeft: 35,
                            borderColor: "#F6F6F9",
                            borderTopWidth: 2,
                            borderTopStyle: "solid"
                        }}
                    >
                        <Text style={{ color: "#7C7C95" }}>
                            Personal Details >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressButton2}>
                    <View
                        style={{
                            backgroundColor: "white",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            height: 80,
                            width: 300,
                            marginLeft: 35,
                            borderColor: "#F6F6F9",
                            borderTopWidth: 2,
                            borderTopStyle: "solid"
                        }}
                    >
                        <Text style={{ color: "#7C7C95" }}>
                            Medical Details >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressButton3}>
                    <View
                        style={{
                            backgroundColor: "white",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            height: 80,
                            width: 300,
                            marginLeft: 35,
                            borderColor: "#F6F6F9",
                            borderTopWidth: 2,
                            borderTopStyle: "solid"
                        }}
                    >
                        <Text style={{ color: "#7C7C95" }}>Statistics ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressButton4}>
                    <View
                        style={{
                            backgroundColor: "white",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            height: 80,
                            width: 300,
                            marginLeft: 35,
                            borderColor: "#F6F6F9",
                            borderTopWidth: 2,
                            borderTopStyle: "solid"
                        }}
                    >
                        <Text style={{ color: "#7C7C95" }}>Settings ></Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <View style={styles.button2}>
                        <Button
                            flexDirection="row-reverse"
                            title="Sign Out"
                            onPress={() => this.onPressEvent()}
                        />
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => this.onPressEvent()}>
                    <Text style={styles.button}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    topimage: {
        flex: 1,
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: 250
    },
    playerphoto: {
        borderRadius: 75,
        zIndex: 1,
        marginTop: 25,
        marginLeft: "auto",
        marginRight: "auto",
        width: 150,
        height: 150
    },
    boxtext: {
        textAlign: "center",
        color: "white"
    },
    infoAbove: {
        marginTop: 25,
        marginLeft: 35,
        color: "#7C7C95"
    },
    infoUnder: {
        marginLeft: 35,
        color: "#6B6B6B"
    },
    button: {
        flex: 1,
        flexDirection: "row-reverse",
        top: 10,
        right: 32,
        borderRadius: 50
        // shadowOffset:{  width: 0,  height: 12,  },
        // shadowColor: 'black',
        // shadowOpacity: 1.0,
        // shadowRadius: 11,
    },
    // button2: {
    //     flex: 1,
    //     flexDirection: "row-reverse",
    //     bottom: 10,
    //     right: 32,
    //     borderRadius: 50
    // },
    button: {
        backgroundColor: "#2DC5F6",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        color: "#7C7C95",
        fontSize: 16,
        fontWeight: "bold",
        overflow: "hidden",
        padding: 12,
        textAlign: "center"
    }
});
