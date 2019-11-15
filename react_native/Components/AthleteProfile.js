import React from "react";
import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    View,
    Button,
    ScrollView,
    Image,
    ImageBackground
} from "react-native";
import { AppLoading, Font } from "expo";
import { NavigationEvents, StackNavigator } from "react-navigation";
import { Card } from 'react-native-elements';
import { symbol } from "prop-types";

export default class AthleteProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            athl_id: 45,
            data: [],
            data2: [],

            athl_email: "",
            athl_phone: "",
            profile_photo_url: ""
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
        fetch("http://54.191.100.200:8080/api/profiles/" + this.state.athl_id)
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

    onPressEvent1() {
        Alert.alert(
            "Edit",
            "Editing Contact Information",
            [
                {
                    text: "OK",
                    onPress: () => console.log("Okay Pressed")
                }
            ],
            { cancelable: false }
        )
    }

    onPressEvent2() {
        Alert.alert(
            "Edit",
            "Editing Personal Information",
            [
                {
                    text: "OK",
                    onPress: () => console.log("Okay Pressed")
                }
            ],
            { cancelable: false }
        )
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
                    <View>
                        <Card containerStyle={styles.playerphotoCard}>
                        {/* <Image
                            style={styles.playerphoto}
                            source={{
                                uri:
                                    this.state.profile_photo_url !== ""
                                        ? "https://therefreshedhome.com/wp-content/uploads/2017/09/garage-full-of-stuff.jpg"
                                        : this.state.data2[0].profile_photo
                            }}
                        /> */}
                            <Image source={require("../assets/stockMgr.jpg")} style={styles.playerphoto}/>
                        </Card>
                        <Card containerStyle={styles.cardStyle1}>
                            <View style={{marginTop: 70}}>
                                <Text style={{fontSize: 15, fontWeight:"bold", textAlign: "center", color: "#3AD289", fontFamily:"Montserrat-Regular" }}>
                                    Welcome
                                </Text>
                                <Text style={{textAlign: "center", color: "black", fontSize: 25, fontWeight:"bold", }}>
                                    {this.state.data[0].athl_fname}{" "}
                                    {this.state.data[0].athl_lname}
                                </Text>
                            </View>
                        </Card>
                    
                </View>
                <View>
                        <Card containerStyle={styles.cardStyle2}>
                            <View style={styles.row}>
                                <Text style= {{fontSize: 15, fontWeight: "bold", bottom: 5}}>Contact Information</Text>
                                <TouchableOpacity onPress={() => this.onPressEvent1()}>
                                    <Image style={styles.editIconStyle} source={require("../assets/editIcon.png")}/>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 5}}>Email</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].athl_email}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 5}}>Phone Number</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].athl_phone}</Text>
                            </View>
                        </Card>
                </View>
                <View>
                        <Card containerStyle={styles.cardStyle3}>
                            <View style={styles.row}>
                                <Text style= {{fontSize: 15, fontWeight: "bold", bottom: 5}}>Personal Information</Text>
                                <TouchableOpacity onPress={() => this.onPressEvent2()}>
                                    <Image style={styles.editIconStyle} source={require("../assets/editIcon.png")}/>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>First Name</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].athl_fname}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Last Name</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].athl_lname}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Account Name</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>{this.state.data[0].athl_account}</Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", paddingTop: 10}}>Password</Text>
                                <Text style={{fontSize: 12, color: "grey"}}>********</Text>
                            </View>
                        </Card>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity>
                            <Text
                            style={styles.signOutButton}
                                onPress={() => this.onPressEvent()}
                            >Sign Out
                            </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>      
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "white"
    },
    playerphotoCard: {
        borderRadius: 150/2,
        width: 150,
        height: 150,
        marginTop: 10,
        position: "absolute",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowOffset:{  width: 0,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
        backgroundColor:'#3AD289',
    },
    playerphoto: {
        borderWidth: 5,
        borderColor:"black",
        borderRadius: 150/2,
        width: 150,
        height: 150,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },

    cardStyle1: {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 70,
        width: '95%',
        height: 175,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        
    },
    cardStyle2: {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 10,
        width: '95%',
        height: 150,
        alignSelf: 'center',
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,

    },
    cardStyle3: {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 10,
        width: '95%',
        height: 250,
        alignSelf: 'center',
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    },
    editIconStyle : {
        width: 15,
        height: 15,
        bottom: 5,
        top: 2
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgrey",
        bottom:10
    },
    signOutButton: {
        justifyContent: "center",
        color: "white"
    },
    buttonRow : {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        opacity: 0.7,
        backgroundColor: "#3AD289",
        width: "57%",
        padding: 14,
        borderRadius: 2
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        alignItems: "center"
    },
})
               